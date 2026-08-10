/** Shared types for `/api/nav/preview` megamenu live rails. */

export type NavPreviewListItem = {
  href: string;
  title: string;
  meta: string;
  sub?: string;
};

export type NavPreviewSectionPayload = {
  eyebrow: string;
  title: string;
  countLabel: string;
  items: NavPreviewListItem[];
  ctaHref: string;
  ctaLabel: string;
};

export type NavPreviewResponse = {
  updatedAt: string;
  news: NavPreviewSectionPayload;
  jobs: NavPreviewSectionPayload;
  events: NavPreviewSectionPayload;
  explore: NavPreviewSectionPayload;
  areas: NavPreviewSectionPayload;
};

/** Megamenu section keys that have a live preview rail. */
export type MegaNavLiveKind = Exclude<keyof NavPreviewResponse, "updatedAt">;
