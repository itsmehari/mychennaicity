/**
 * Newsletter promo modal: which routes auto-open, timing, and storage keys.
 * Add new `match` rules for future pages (e.g. new hubs) — first matching rule wins.
 */

export const LS_NEWSLETTER_DISMISSED_AT = "mcc_newsletter_dismissed_at";
export const LS_NEWSLETTER_SUBSCRIBED_AT = "mcc_newsletter_subscribed_at";
export const SS_NEWSLETTER_AUTO_SHOWN = "mcc_newsletter_auto_shown_session";

/** Hide auto modal for this long after dismiss (ms). */
export const DISMISS_COOLDOWN_MS = 30 * 24 * 60 * 60 * 1000;

export type NewsletterModalRule = {
  id: string;
  match: (pathname: string) => boolean;
  /** Auto-open after this delay unless scroll fires first (when scrollPercent set). */
  delayMs: number;
  /** When set, auto-open when user scrolls this far down the page (0–100). */
  scrollPercent?: number;
};

function segments(pathname: string): string[] {
  return pathname.split("/").filter(Boolean);
}

/**
 * Ordered rules — first match applies.
 * - Home: delay only.
 * - Article detail: delay OR scroll (whichever first).
 * - Job / event detail: ready for discovery funnels without extra code changes later.
 */
export const newsletterModalRules: NewsletterModalRule[] = [
  {
    id: "home",
    match: (p) => p === "/" || p === "",
    delayMs: 10_000,
  },
  {
    id: "news-article",
    match: (p) => {
      const s = segments(p);
      if (s.length !== 2 || s[0] !== "chennai-local-news") return false;
      if (s[1] === "feed.xml") return false;
      return true;
    },
    delayMs: 20_000,
    scrollPercent: 50,
  },
  {
    id: "job-detail",
    match: (p) => {
      const s = segments(p);
      return s.length === 2 && s[0] === "jobs";
    },
    delayMs: 18_000,
    scrollPercent: 45,
  },
  {
    id: "event-detail",
    match: (p) => {
      const s = segments(p);
      return s.length === 2 && s[0] === "chennai-local-events";
    },
    delayMs: 18_000,
    scrollPercent: 45,
  },
];

export function newsletterRuleForPathname(pathname: string): NewsletterModalRule | null {
  const path = pathname || "/";
  for (const rule of newsletterModalRules) {
    if (rule.match(path)) return rule;
  }
  return null;
}

export const NEWSLETTER_OPEN_EVENT = "mcc:open-newsletter-modal";

export function dispatchOpenNewsletterModal(): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(NEWSLETTER_OPEN_EVENT));
}
