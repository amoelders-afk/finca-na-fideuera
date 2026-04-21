import { createFileRoute } from "@tanstack/react-router";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

export const Route = createFileRoute("/hooks/weekly-report")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const auth = request.headers.get("authorization");
        if (!auth?.startsWith("Bearer ")) {
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

        // Trigger transactional email send
        const url = new URL(request.url);
        const origin = `${url.protocol}//${url.host}`;
        const sendRes = await fetch(`${origin}/lovable/email/transactional/send`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: auth,
          },
          body: JSON.stringify({
            templateName: "weekly-visitor-report",
            templateData: {
              weekStart: fmt(weekAgo),
              weekEnd: fmt(now),
              totalViews,
              uniqueVisitors,
              topPages,
            },
          }),
        });

        const sendBody = await sendRes.text();
        if (!sendRes.ok) {
          console.error("send failed", sendRes.status, sendBody);
          return Response.json({ ok: false, status: sendRes.status, body: sendBody }, { status: 500 });
        }

        return Response.json({ ok: true, totalViews, uniqueVisitors, topPagesCount: topPages.length });
      },
    },
  },
});
