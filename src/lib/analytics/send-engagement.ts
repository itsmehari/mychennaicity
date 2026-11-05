import type { ContentKind, EngagementEventKind } from "@/lib/analytics/engagement-events";
import { isCrawlerUserAgent } from "@/lib/analytics/crawler-ua";
import { bannerClickSlug, parseBannerClickSlug } from "@/lib/partner-ads";

const PAGEVIEW_MS = 30 * 60 * 1000;
const CLICK_MS = 8 * 1000;

function storageKey(kind: string, slug: string, event: string): string {
  return `mcc_eng:${kind}:${slug}:${event}`;
}

function recentlySent(key: string, windowMs: number): boolean {
  try {
    const raw = sessionStorage.getItem(key);
    if (!raw) return false;
    const at = Number(raw);
    return Number.isFinite(at) && Date.now() - at < windowMs;
  } catch {
    return false;
  }
}

function markSent(key: string): void {
  try {
    sessionStorage.setItem(key, String(Date.now()));
  } catch {
    /* private mode */
  }
}

function postEngagement(kind: ContentKind, slug: string, event: EngagementEventKind): void {
  const body = JSON.stringify({ kind, slug, event });
  try {
    const blob = new Blob([body], { type: "application/json" });
    if (typeof navigator.sendBeacon === "function" && navigator.sendBeacon("/api/analytics/engagement", blob)) {
      return;
    }
  } catch {
    /* fall through */
  }
  void fetch("/api/analytics/engagement", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body,
    keepalive: true,
    credentials: "same-origin",
  }).catch(() => undefined);
}

function shouldSkipBrowser(): boolean {
  if (typeof navigator === "undefined") return true;
  if (isCrawlerUserAgent(navigator.userAgent)) return true;
  if ("webdriver" in navigator && navigator.webdriver) return true;
  return false;
}

export function sendContentEngagement(
  kind: ContentKind,
  slug: string,
  event: EngagementEventKind,
): void {
  if (shouldSkipBrowser()) return;
  const key = storageKey(kind, slug, event);
  const windowMs = event === "pageview" ? PAGEVIEW_MS : CLICK_MS;
  if (recentlySent(key, windowMs)) return;
  markSent(key);
  postEngagement(kind, slug, event);
}

/** Partner rotator click. Same person on the same banner counts again after 8 seconds. */
export function sendBannerClick(partnerId: string, placement: string): void {
  const slug = bannerClickSlug(partnerId, placement);
  if (!parseBannerClickSlug(slug)) return;
  sendContentEngagement("banner", slug, "banner_click");
}

export function sendPageViewWhenVisible(kind: ContentKind, slug: string): () => void {
  let cancelled = false;
  const fire = () => {
    if (cancelled) return;
    if (document.visibilityState === "hidden") return;
    sendContentEngagement(kind, slug, "pageview");
  };
  if (document.visibilityState !== "hidden") {
    fire();
    return () => {
      cancelled = true;
    };
  }
  const onVis = () => {
    if (document.visibilityState === "hidden") return;
    document.removeEventListener("visibilitychange", onVis);
    fire();
  };
  document.addEventListener("visibilitychange", onVis);
  return () => {
    cancelled = true;
    document.removeEventListener("visibilitychange", onVis);
  };
}
