import { createFileRoute } from "@tanstack/react-router";
import ICAL from "ical.js";

const ICAL_URL =
  "https://calendar.google.com/calendar/ical/f8a8ff49301650d-f340834630f5b9fb24c9ee8a-e09b337b3f98487712dc1f3d5%40group.calendar.google.com/private-2f94d394140-de21619c7e4cb85ad0918/basic.ics";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

// In-memory cache (1 hour)
let cache: { data: { start: string; end: string; summary: string }[]; ts: number } | null = null;
const CACHE_MS = 60 * 60 * 1000;

export const Route = createFileRoute("/api/availability")({
  // @ts-expect-error - server handlers supported at runtime by TanStack Start
  server: {
    handlers: {
      OPTIONS: async () =>
        new Response(null, { status: 204, headers: corsHeaders }),
      GET: async () => {
        try {
          if (cache && Date.now() - cache.ts < CACHE_MS) {
            return new Response(JSON.stringify({ events: cache.data, cached: true }), {
              status: 200,
              headers: { "Content-Type": "application/json", ...corsHeaders },
            });
          }

          const res = await fetch(ICAL_URL, {
            headers: { "User-Agent": "Mozilla/5.0 FincaNaFideuera/1.0" },
          });

          if (!res.ok) {
            return new Response(
              JSON.stringify({
                error: `iCal-Feed nicht erreichbar (HTTP ${res.status}). Bitte URL prüfen.`,
                events: [],
              }),
              { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } },
            );
          }

          const text = await res.text();
          const jcal = ICAL.parse(text);
          const comp = new ICAL.Component(jcal);
          const vevents = comp.getAllSubcomponents("vevent");

          const events = vevents.map((ve) => {
            const ev = new ICAL.Event(ve);
            return {
              start: ev.startDate.toJSDate().toISOString(),
              end: ev.endDate.toJSDate().toISOString(),
              summary: ev.summary || "Belegt",
            };
          });

          cache = { data: events, ts: Date.now() };

          return new Response(JSON.stringify({ events }), {
            status: 200,
            headers: { "Content-Type": "application/json", ...corsHeaders },
          });
        } catch (err) {
          const message = err instanceof Error ? err.message : "Unbekannter Fehler";
          return new Response(
            JSON.stringify({ error: message, events: [] }),
            { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } },
          );
        }
      },
    },
  },
});
