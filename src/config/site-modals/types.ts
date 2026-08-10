/**
 * Site modal system — types for campaigns, content pool, and policy.
 * Portable MyOMR-style architecture: shell + controller + orchestrator + config.
 */

export type SiteModalCta = {
  label: string;
  href?: string;
  /** Opens another modal key (e.g. newsletter) instead of navigating. */
  action?: "open-newsletter" | "dismiss";
};

export type SiteModalCampaign = {
  id: string;
  /** Maps from `data-site-cta="…"` */
  ctaKey: string;
  eyebrow: string;
  title: string;
  body: string;
  image: string;
  imageAlt: string;
  benefits?: string[];
  primaryCta: SiteModalCta;
  secondaryCta?: SiteModalCta;
  /** Higher = more likely on first-visit random pick */
  priority: number;
  /** When set, only auto-eligible on these path prefixes (empty = all allowed paths). */
  pathAllowPrefixes?: string[];
};

export type SiteModalPoolItem = {
  slug: string;
  title: string;
  summary: string;
  category: string;
  image: string;
  url: string;
};

/** Rotation slot: dynamic news or a campaign id */
export type SiteModalRotationSlot = "top-story" | string;

export type SiteModalPolicy = {
  /** Auto-pop only on homepage (recommended). */
  autoHomeOnly: boolean;
  firstVisitDelayMs: number;
  rotationIntervalMs: number;
  /** Hard cap on auto-opens per browser session. */
  maxAutoShowsPerSession: number;
  /** Don't open while user is actively scrolling. */
  scrollSettleMs: number;
  /** Path prefixes where auto-pop is never allowed. */
  suppressPathPrefixes: string[];
  /** Exact path matches to suppress. */
  suppressPaths: string[];
  rotationSlots: SiteModalRotationSlot[];
  storageKeys: {
    firstVisitShown: string;
    rotationIndex: string;
    newsIndex: string;
    autoShowCount: string;
  };
};
