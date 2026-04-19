import * as React from "react";
import { render as renderAsync } from "@react-email/components";
import { createFileRoute } from "@tanstack/react-router";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";
import { TEMPLATES } from "@/lib/email-templates/registry";

const SITE_NAME = "Finca Na Fideuera";
const SENDER_DOMAIN = "notify.finca-na-fideuera.de";
const FROM_DOMAIN = "notify.finca-na-fideuera.de";

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

function generateToken(): string {
  const bytes = new Uint8Array(32);
  crypto.getRandomValues(bytes);
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

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
            console.error("Missing Supabase env vars");
            return new Response(JSON.stringify({ error: "Server-Konfiguration fehlt" }), {
              status: 500,
              headers: { "Content-Type": "application/json", ...corsHeaders },
            });
          }

          const supabase = createClient(supabaseUrl, serviceKey);

          const templateName = "contact-inquiry";
          const template = TEMPLATES[templateName];
          if (!template) {
            console.error("Template not found", { templateName });
            return new Response(JSON.stringify({ error: "Template fehlt" }), {
              status: 500,
              headers: { "Content-Type": "application/json", ...corsHeaders },
            });
          }

          const recipient = template.to;
          if (!recipient) {
            console.error("Template recipient missing");
            return new Response(JSON.stringify({ error: "Empfänger fehlt" }), {
              status: 500,
              headers: { "Content-Type": "application/json", ...corsHeaders },
            });
          }

          const messageId = crypto.randomUUID();
          const idempotencyKey = `contact-${messageId}`;
          const normalizedRecipient = recipient.toLowerCase();

          // Suppression check
          const { data: suppressed, error: suppressionError } = await supabase
            .from("suppressed_emails")
            .select("id")
            .eq("email", normalizedRecipient)
            .maybeSingle();

          if (suppressionError) {
            console.error("Suppression check failed", suppressionError);
            return new Response(JSON.stringify({ error: "Interner Fehler" }), {
              status: 500,
              headers: { "Content-Type": "application/json", ...corsHeaders },
            });
          }

          if (suppressed) {
            console.warn("Recipient is suppressed", { recipient: normalizedRecipient });
            return new Response(JSON.stringify({ error: "Empfänger nicht erreichbar" }), {
              status: 502,
              headers: { "Content-Type": "application/json", ...corsHeaders },
            });
          }

          // Get or create unsubscribe token
          let unsubscribeToken: string;
          const { data: existingToken } = await supabase
            .from("email_unsubscribe_tokens")
            .select("token, used_at")
            .eq("email", normalizedRecipient)
            .maybeSingle();

          if (existingToken && !existingToken.used_at) {
            unsubscribeToken = existingToken.token;
          } else {
            unsubscribeToken = generateToken();
            await supabase
              .from("email_unsubscribe_tokens")
              .upsert(
                { token: unsubscribeToken, email: normalizedRecipient },
                { onConflict: "email", ignoreDuplicates: true },
              );
            const { data: storedToken } = await supabase
              .from("email_unsubscribe_tokens")
              .select("token")
              .eq("email", normalizedRecipient)
              .maybeSingle();
            if (storedToken) unsubscribeToken = storedToken.token;
          }

          // Render template
          const element = React.createElement(template.component, data);
          const html = await renderAsync(element);
          const plainText = await renderAsync(element, { plainText: true });
          const subject =
            typeof template.subject === "function" ? template.subject(data) : template.subject;

          // Log pending
          await supabase.from("email_send_log").insert({
            message_id: messageId,
            template_name: templateName,
            recipient_email: recipient,
            status: "pending",
          });

          // Enqueue
          const { error: enqueueError } = await supabase.rpc("enqueue_email", {
            queue_name: "transactional_emails",
            payload: {
              message_id: messageId,
              to: recipient,
              from: `${SITE_NAME} <noreply@${FROM_DOMAIN}>`,
              sender_domain: SENDER_DOMAIN,
              subject,
              html,
              text: plainText,
              purpose: "transactional",
              label: templateName,
              idempotency_key: idempotencyKey,
              unsubscribe_token: unsubscribeToken,
              queued_at: new Date().toISOString(),
            },
          });

          if (enqueueError) {
            console.error("Enqueue failed", enqueueError);
            await supabase.from("email_send_log").insert({
              message_id: messageId,
              template_name: templateName,
              recipient_email: recipient,
              status: "failed",
              error_message: "Failed to enqueue",
            });
            return new Response(JSON.stringify({ error: "E-Mail konnte nicht gesendet werden" }), {
              status: 502,
              headers: { "Content-Type": "application/json", ...corsHeaders },
            });
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
