"use client";

import { useEffect } from "react";
import { waFunnelEventsEnabled } from "@/lib/whatsapp-community-flags";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

function fire(name: string, params: Record<string, string>) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", name, {
    event_category: "whatsapp_community",
    ...params,
  });
}

/** Delegated funnel events. Never send name or phone. */
export function WhatsAppFunnelRoot() {
  useEffect(() => {
    if (!waFunnelEventsEnabled()) return;
    const seen = new Set<string>();

    function view(el: Element) {
      const placement = el.getAttribute("data-wa-placement") || "unknown";
      const type = el.getAttribute("data-wa-type") || "request";
      const content = el.getAttribute("data-wa-content") || placement;
      const key = `${type}:${placement}:${content}`;
      if (seen.has(key)) return;
      seen.add(key);
      fire("wa_cta_view", { wa_type: type, wa_placement: placement, wa_content: content });
    }

    document.querySelectorAll("[data-wa-type]").forEach(view);
    const observer = new MutationObserver(() => {
      document.querySelectorAll("[data-wa-type]").forEach(view);
    });
    observer.observe(document.body, { childList: true, subtree: true });

    function onClick(event: MouseEvent) {
      const el = (event.target as Element | null)?.closest?.("[data-wa-type]");
      if (!el) return;
      const type = el.getAttribute("data-wa-type") || "request";
      const placement = el.getAttribute("data-wa-placement") || "unknown";
      const content = el.getAttribute("data-wa-content") || placement;
      fire(type === "share" ? "wa_share_click" : "wa_cta_click", {
        wa_type: type,
        wa_placement: placement,
        wa_content: content,
      });
    }
    document.addEventListener("click", onClick);
    return () => {
      observer.disconnect();
      document.removeEventListener("click", onClick);
    };
  }, []);

  return null;
}
