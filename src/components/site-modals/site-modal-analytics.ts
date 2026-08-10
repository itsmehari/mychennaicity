/**
 * Thin GA4 wrapper for site modals — stable event names for dashboards.
 */

import type { SiteModalPoolItem } from "@/config/site-modals";

type GtagFn = (
  command: "event",
  eventName: string,
  params?: Record<string, string | number | undefined>,
) => void;

function gtag(): GtagFn | null {
  if (typeof window === "undefined") return null;
  const w = window as Window & { gtag?: GtagFn };
  return typeof w.gtag === "function" ? w.gtag : null;
}

export function trackSiteModalView(opts: {
  modalId: string;
  trigger: string;
  poolItem?: SiteModalPoolItem | null;
}) {
  gtag()?.("event", "modal_view", {
    event_category: "site_modal",
    modal_id: opts.modalId,
    trigger: opts.trigger,
    article_slug: opts.poolItem?.slug,
    article_title: opts.poolItem?.title,
  });
}

export function trackSiteModalCta(opts: {
  modalId: string;
  cta: "primary" | "secondary";
  poolItem?: SiteModalPoolItem | null;
}) {
  gtag()?.("event", "modal_cta_click", {
    event_category: "site_modal",
    modal_id: opts.modalId,
    cta: opts.cta,
    article_slug: opts.poolItem?.slug,
    article_title: opts.poolItem?.title,
  });
}

export function trackSiteModalDismiss(modalId: string) {
  gtag()?.("event", "modal_dismiss", {
    event_category: "site_modal",
    modal_id: modalId,
  });
}
