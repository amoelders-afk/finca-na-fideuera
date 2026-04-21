import * as React from "react";
import { render } from "@react-email/components";
import { createFileRoute } from "@tanstack/react-router";
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import { TEMPLATES } from "@/lib/email-templates/registry";

const SITE_NAME = "finca-vibes-explorer";
const SENDER_DOMAIN = "notify.finca-na-fideuera.de";
const FROM_DOMAIN = "notify.finca-na-fideuera.de";

function generateToken(): string {
  const bytes = new Uint8Array(32);
  crypto.getRandomValues(bytes);
  return Array.from(bytes).map((b) => b.toString(16).padStart(2, "0")).join("");
}

export const Route = createFileRoute("/hooks/weekly-report")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const auth = request.headers.get("authorization");
        const expected = process.env.SUPABASE_PUBLISHABLE_KEY;
        if (!auth || !expected || auth !== `Bearer ${expected}`) {
          return new Response("Unauthorized", { status: 401 });
        }

        const now = new Date();
        const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

        const { data: views, error } = await supabaseAdmin
          .from("page_views")
          .select("path, visitor_id")
          .gte("created_at", weekAgo.toISOString())
          .lte("created_at", now.toISOString());

        if (error) {
          console.error("page_views query failed", error);
          return Response.json({ error: error.message }, { status: 500 });
        }

        const totalViews = views?.length ?? 0;
        const uniqueVisitors = new Set(views?.map((v) => v.visitor_id) ?? []).size;

        const counts = new Map<string, number>();
        for (const v of views ?? []) {
          counts.set(v.path, (counts.get(v.path) ?? 0) + 1);
        }
        const topPages = Array.from(counts.entries())
          .map(([path, views]) => ({ path, views }))
          .sort((a, b) => b.views - a.views)
          .slice(0, 10);

        const fmt = (d: Date) =>
          d.toLocaleDateString("de-DE", { day: "2-digit", month: "2-digit", year: "numeric" });

        const templateData = {
          weekStart: fmt(weekAgo),
          weekEnd: fmt(now),
          totalViews,
          uniqueVisitors,
          topPages,
        };

        const tpl = TEMPLATES["weekly-visitor-report"];
        if (!tpl || !tpl.to) {
          return Response.json({ error: "Template not configured" }, { status: 500 });
        }
        const recipient = tpl.to;
        const messageId = crypto.randomUUID();

        // Suppression check
        const { data: suppressed } = await supabaseAdmin
          .from("suppressed_emails")
          .select("id")
          .eq("email", recipient.toLowerCase())
          .maybeSingle();

        if (suppressed) {
          await supabaseAdmin.from("email_send_log").insert({
            message_id: messageId,
            template_name: "weekly-visitor-report",
            recipient_email: recipient,
            status: "suppressed",
          });
          return Response.json({ ok: false, reason: "suppressed" });
        }

        // Get/create unsubscribe token
        let unsubscribeToken: string;
        const { data: existing } = await supabaseAdmin
          .from("email_unsubscribe_tokens")
          .select("token, used_at")
          .eq("email", recipient.toLowerCase())
          .maybeSingle();

        if (existing && !existing.used_at) {
          unsubscribeToken = existing.token;
        } else {
          unsubscribeToken = generateToken();
          await supabaseAdmin
            .from("email_unsubscribe_tokens")
            .upsert(
              { token: unsubscribeToken, email: recipient.toLowerCase() },
              { onConflict: "email", ignoreDuplicates: true }
            );
          const { data: stored } = await supabaseAdmin
            .from("email_unsubscribe_tokens")
            .select("token")
            .eq("email", recipient.toLowerCase())
            .maybeSingle();
          if (stored) unsubscribeToken = stored.token;
        }

        // Render email
        const element = React.createElement(tpl.component, templateData);
        const html = await render(element);
        const text = await render(element, { plainText: true });
        const subject =
          typeof tpl.subject === "function" ? tpl.subject(templateData) : tpl.subject;

        await supabaseAdmin.from("email_send_log").insert({
          message_id: messageId,
          template_name: "weekly-visitor-report",
          recipient_email: recipient,
          status: "pending",
        });

        const { error: enqueueError } = await supabaseAdmin.rpc("enqueue_email", {
          queue_name: "transactional_emails",
          payload: {
            message_id: messageId,
            to: recipient,
            from: `${SITE_NAME} <noreply@${FROM_DOMAIN}>`,
            sender_domain: SENDER_DOMAIN,
            subject,
            html,
            text,
            purpose: "transactional",
            label: "weekly-visitor-report",
            idempotency_key: messageId,
            unsubscribe_token: unsubscribeToken,
            queued_at: new Date().toISOString(),
          },
        });

        if (enqueueError) {
          console.error("enqueue failed", enqueueError);
          await supabaseAdmin.from("email_send_log").insert({
            message_id: messageId,
            template_name: "weekly-visitor-report",
            recipient_email: recipient,
            status: "failed",
            error_message: "Failed to enqueue email",
          });
          return Response.json({ error: "Failed to enqueue" }, { status: 500 });
        }

        return Response.json({
          ok: true,
          totalViews,
          uniqueVisitors,
          topPagesCount: topPages.length,
        });
      },
    },
  },
});
