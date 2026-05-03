/** Canonical slot ids — new pages append here, then use the id in templates. */
export const ALL_SLOTS = [
  "article-top",
  "article-mid",
  "homepage-top",
  "homepage-mid",
  "content-top",
  "content-mid",
  "listing-top",
  "sidebar",
  "global-top",
  "jobs-index-top",
  "jobs-index-mid",
  "jobs-detail-mid",
  "hostels-index-top",
  "hostels-index-mid",
  "hostels-detail-mid",
  "rent-lease-index-top",
  "rent-lease-detail-mid",
  "buy-sell-index-top",
  "buy-sell-detail-mid",
  "classified-ads-index-top",
  "classified-ads-detail-mid",
  "listings-index-top",
  "listings-detail-mid",
  "events-index-top",
  "events-index-mid",
  "events-detail-mid",
  "coworking-index-top",
  "coworking-detail-mid",
  "elections-top",
  "elections-mid",
  "discover-top",
] as const;

export type SlotId = (typeof ALL_SLOTS)[number];

export const AD_SIZES = ["728x90", "336x280", "300x250", "320x50"] as const;
export type AdSize = (typeof AD_SIZES)[number];

export type AdDesign =
  | "resumedoctor"
  | "vacancychennai"
  | "mycovai"
  | "colourchemist"
  | "bseri"
  | "resumebuilder";

/** House ads rotated on `/chennai-jobs` (random per page view). */
export const RESUMEDOCTOR_CREATIVE_ID = "resumedoctor-1";
export const VACANCYCHENNAI_CREATIVE_ID = "vacancychennai-1";

export const CHENNAI_JOBS_PARTNER_CREATIVE_IDS = [
  RESUMEDOCTOR_CREATIVE_ID,
  VACANCYCHENNAI_CREATIVE_ID,
] as const;

export type AdCreative = {
  id: string;
  advertiser: string;
  url: string;
  slot_ids: readonly string[];
  sizes: readonly AdSize[];
  design: AdDesign;
  headline: string;
  tagline: string;
  active: boolean;
};

const SLOT_LIST: string[] = [...ALL_SLOTS];

export const ADS: AdCreative[] = [
  {
    id: "resumedoctor-1",
    advertiser: "ResumeDoctor",
    url: "https://www.resumedoctor.in/",
    slot_ids: SLOT_LIST,
    sizes: ["728x90", "336x280", "300x250", "320x50"],
    design: "resumedoctor",
    headline: "Make your resume in minutes",
    tagline:
      "Choose a layout, add your details, download and send to employers",
    active: true,
  },
  {
    id: "vacancychennai-1",
    advertiser: "Vacancy Chennai",
    url: "https://vacancychennai.in/",
    slot_ids: SLOT_LIST,
    sizes: ["728x90", "336x280", "300x250", "320x50"],
    design: "vacancychennai",
    headline: "Hyperlocal jobs across Chennai",
    tagline:
      "OMR, Tambaram, Porur & more — browse by area and apply quickly",
    active: true,
  },
  {
    id: "mycovai-1",
    advertiser: "MyCovai",
    url: "https://mycovai.in",
    slot_ids: SLOT_LIST,
    sizes: ["728x90", "336x280", "300x250", "320x50"],
    design: "mycovai",
    headline: "MyCovai — Your Covai Community",
    tagline: "News, local info & community for Coimbatore",
    active: true,
  },
  {
    id: "colourchemist-1",
    advertiser: "Colourchemist",
    url: "https://colourchemist.co.in",
    slot_ids: SLOT_LIST,
    sizes: ["728x90", "336x280", "300x250", "320x50"],
    design: "colourchemist",
    headline: "Colourchemist — Graphic & Web Design Studio",
    tagline: "Branding, print & digital — logos, sites, campaigns",
    active: true,
  },
  {
    id: "bseri-1",
    advertiser: "BSERI",
    url: "https://bseri.net",
    slot_ids: SLOT_LIST,
    sizes: ["728x90", "336x280", "300x250", "320x50"],
    design: "bseri",
    headline: "ISO Standards Education & Training",
    tagline: "9001 · 27001 · 22301 — Implementer courses",
    active: true,
  },
];
