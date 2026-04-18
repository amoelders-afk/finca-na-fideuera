import { createFileRoute } from "@tanstack/react-router";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

const ContactSchema = z.object({
  name: z.string().min(1).max(200),
  email: z.string().email().max(320),
  von: z.string().max(50).optional().default(""),
  bis: z.string().max(50).optional().default(""),
  personen: z.string().max(10).optional().default(""),
  nachricht: z.string().max(5000).optional().default(""),
});

export const Route = createFileRoute("/api/contact")({
  server: {
    handlers: {
      OPTIONS: async () =>
        new Response(null, { status: 204, headers: corsHeaders }),
      POST: async ({ request }) => {
        try {
          const body = await request.json();
          const parsed = ContactSchema.safeParse(body);
          if (!parsed.success) {
            return new Response(
              JSON.stringify({ error: "Ungültige Eingabe", details: parsed.error.flatten() }),
              { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } },
            );
          }

          const data = parsed.data;
          const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
          const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
          if (!supabaseUrl || !serviceKey) {
            return new Response(JSON.stringify({ error: "Server-Konfiguration fehlt" }), {
              status: 500,
              headers: { "Content-Type": "application/json", ...corsHeaders },
            });
          }

          const supabase = createClient(supabaseUrl, serviceKey);

          const idempotencyKey = `contact-${crypto.randomUUID()}`;

          // Call internal send route with service role auth
          const url = new URL(request.url);
          const sendUrl = `${url.origin}/lovable/email/transactional/send`;

          const sendRes = await fetch(sendUrl, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${serviceKey}`,
            },
            body: JSON.stringify({
              templateName: "contact-inquiry",
              recipientEmail: "sarah.hofer0608@gmail.com",
              idempotencyKey,
              templateData: data,
            }),
          });

          if (!sendRes.ok) {
            const errText = await sendRes.text();
            console.error("Email send failed", { status: sendRes.status, body: errText });
            return new Response(
              JSON.stringify({ error: "E-Mail konnte nicht gesendet werden" }),
              { status: 502, headers: { "Content-Type": "application/json", ...corsHeaders } },
            );
          }

          return new Response(JSON.stringify({ success: true }), {
            status: 200,
            headers: { "Content-Type": "application/json", ...corsHeaders },
          });
        } catch (err) {
          console.error("Contact API error", err);
          return new Response(JSON.stringify({ error: "Interner Fehler" }), {
            status: 500,
            headers: { "Content-Type": "application/json", ...corsHeaders },
          });
        }
      },
    },
  },
});
