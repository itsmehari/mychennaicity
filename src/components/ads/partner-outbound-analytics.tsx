"use client";

import { useEffect } from "react";
import { isPartnerAdHost } from "@/lib/partner-ads";

type GtagFn = (
  command: "event",
  eventName: string,
  params?: Record<string, string | undefined>,
) => void;

function gtag(): GtagFn | null {
  if (typeof window === "undefined") return null;
  const w = window as Window & { gtag?: GtagFn };
  return typeof w.gtag === "function" ? w.gtag : null;
}

/**
 * Fires `partner_outbound_click` for rotator cards (`data-partner-link`) and
 * other links to known partner hosts.
 */
export function PartnerOutboundClickTracker() {
  useEffect(() => {
    function onClick(event: MouseEvent) {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const anchor = target.closest("a");
      if (!(anchor instanceof HTMLAnchorElement) || !anchor.href) return;

      let parsed: URL;
      try {
        parsed = new URL(anchor.href, window.location.origin);
      } catch {
        return;
      }

      const marked = anchor.hasAttribute("data-partner-link");
      if (!marked && !isPartnerAdHost(parsed.hostname)) return;
      if (parsed.origin === window.location.origin) return;

      gtag()?.("event", "partner_outbound_click", {
        event_category: "partner_ad",
        link_url: parsed.href,
        utm_content: anchor.getAttribute("data-utm-content") ?? undefined,
        partner: anchor.getAttribute("data-partner-link") ?? parsed.hostname,
      });
    }

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
