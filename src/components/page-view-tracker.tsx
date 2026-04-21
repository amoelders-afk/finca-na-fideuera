import { useEffect } from "react";
import { useLocation } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";

function getVisitorId(): string {
  if (typeof window === "undefined") return "ssr";
  let id = localStorage.getItem("visitor_id");
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem("visitor_id", id);
  }
  return id;
}

export function PageViewTracker() {
  const location = useLocation();

  useEffect(() => {
    if (typeof window === "undefined") return;
    // Don't track preview/sandbox traffic
    if (window.location.hostname.includes("lovable.app") || window.location.hostname === "localhost") return;

    const visitor_id = getVisitorId();
    supabase.from("page_views").insert({
      path: location.pathname,
      visitor_id,
      user_agent: navigator.userAgent,
      referrer: document.referrer || null,
    }).then(({ error }) => {
      if (error) console.warn("page view log failed", error.message);
    });
  }, [location.pathname]);

  return null;
}
