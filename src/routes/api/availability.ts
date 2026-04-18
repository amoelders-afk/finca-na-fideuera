import { createFileRoute } from "@tanstack/react-router";
import ICAL from "ical.js";

const ICAL_URL =
  "https://calendar.google.com/calendar/ical/33d24fe357566ae72b4a090b3d7c7732a02bd8bba698fef7ee53f7a19f9d477d%40group.calendar.google.com/private-971afc75b4329a42b04fcd51873f4b6d/basic.ics";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

// In-memory cache (1 hour)
let cache: { data: { start: string; end: string; summary: string }[]; ts: number } | null = null;
const CACHE_MS = 60 * 60 * 1000;

export const Route = createFileRoute("/api/availability")({
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
