/**
 * Partner ad creatives for mychennaicity.in.
 * Copy and themes live here — the rotator only renders `{ ads, shape, placement }`.
 */

import { CIVIC_TOOL_PREVIEW_PATHS } from "@/lib/routes/civic-tools";

export const PARTNER_AD_UTM_SOURCE = "mychennaicity";
export const PARTNER_AD_UTM_MEDIUM = "referral";
export const PARTNER_AD_UTM_CAMPAIGN = "partner_ad";

export const PARTNER_AD_ROTATE_MS = 6500;

export type PartnerAdShape = "square" | "rectangle";

export type PartnerAdTheme = "resume" | "covai" | "studio" | "iso" | "solar";

/** Stable placement ids — also used as `utm_content`. */
export const PARTNER_AD_PLACEMENTS = [
  "home_after_areas",
  "jobs_hub_mid",
  "job_detail_square",
  "news_hub_mid",
  "news_topic",
  "article_sidebar",
  "article_top",
  "article_mid",
  "article_end",
  "events_hub_mid",
  "events_detail",
  "directory_index",
  "classifieds_index",
  "classifieds_detail",
  "area_hub",
  "elections_hub",
  "tech_careers",
  "tn_plus_two",
  "site_band",
] as const;

export type PartnerAdPlacementId = (typeof PARTNER_AD_PLACEMENTS)[number];
export type PartnerAdPlacement = PartnerAdPlacementId | (string & {});

export type PartnerAdCreative = {
  id: string;
  partner: string;
  eyebrow: string;
  kicker: string;
  headline: string;
  body: string;
  cta: string;
  href: string;
  theme: PartnerAdTheme;
  /** Self-hosted photo. When set, the photo layout replaces the gradient banner. */
  image?: string;
  /** Dark panel the photo fades into. */
  ink?: string;
  /** Button dot and arrow. */
  accent?: string;
  /** 2–3 word uppercase label. Glass pill on the square. */
  photoLabel?: string;
  /** 1–3 word italic line. */
  offer?: string;
  /** Quiet line under the offer, about 8 words. Hidden when there is no photo. */
  support?: string;
  /** 2–3 word button on the wide band and the square. */
  photoCta?: string;
  /** Shorter button on the phone strip. */
  ctaShort?: string;
  /**
   * Offer size multiplier for this partner only.
   * Use when a long brand name is the offer. Omit to keep the shared size.
   */
  offerScale?: number;
  /** CSS object-position so the subject survives the square, strip, and thumbnail. */
  photoPosition?: string;
};

type PartnerAdSource = Omit<PartnerAdCreative, "href"> & {
  url: string;
};

/** Photo layout is on only when the image and the four short lines are all set. */
export function isPartnerPhotoAd(ad: PartnerAdCreative): boolean {
  return Boolean(
    ad.image &&
      ad.ink &&
      ad.accent &&
      ad.photoLabel &&
      ad.offer &&
      ad.support &&
      ad.photoCta &&
      ad.ctaShort,
  );
}

/** Copy matches MyOMR’s ad registry (`core/ad-registry.php`): headline, offer, price hook, tagline, buttons. */
const PARTNER_AD_SOURCES: readonly PartnerAdSource[] = [
  {
    id: "resumedoctor",
    partner: "ResumeDoctor",
    eyebrow: "Partner",
    kicker: "resumedoctor.in",
    headline: "ResumeDoctor",
    body: "Pick a layout, add your details, download.",
    cta: "Build my resume",
    url: "https://www.resumedoctor.in/",
    theme: "resume",
    image: "/images/partner-ads/resumedoctor.webp",
    ink: "#0f172a",
    accent: "#22d3ee",
    photoLabel: "ResumeDoctor",
    offer: "In minutes",
    support: "A resume you can send",
    photoCta: "Build my resume",
    ctaShort: "Build resume",
    photoPosition: "center 42%",
  },
  {
    id: "mycovai",
    partner: "MyCovai",
    eyebrow: "Partner",
    kicker: "mycovai.in",
    headline: "Coimbatore",
    body: "The city, in one place.",
    cta: "Explore Covai",
    url: "https://mycovai.in/",
    theme: "covai",
    image: "/images/partner-ads/mycovai.webp",
    ink: "#312e81",
    accent: "#c084fc",
    photoLabel: "Coimbatore",
    offer: "MyCovai",
    support: "News and local talk",
    photoCta: "Explore Covai",
    ctaShort: "Explore",
    photoPosition: "center 48%",
  },
  {
    id: "colourchemist",
    partner: "Colourchemist",
    eyebrow: "Partner",
    kicker: "colourchemist.co.in",
    headline: "Design studio",
    body: "Branding for print and the web.",
    cta: "See the work",
    url: "https://colourchemist.co.in/",
    theme: "studio",
    image: "/images/partner-ads/colourchemist.webp",
    ink: "#1e1b4b",
    accent: "#fb7185",
    photoLabel: "Design studio",
    offer: "Colourchemist",
    support: "Logos, sites, campaigns",
    photoCta: "See the work",
    ctaShort: "See work",
    offerScale: 0.78,
    photoPosition: "center 55%",
  },
  {
    id: "bseri",
    partner: "BSERI",
    eyebrow: "Partner",
    kicker: "bseri.net",
    headline: "ISO training",
    body: "Implementer courses for working teams.",
    cta: "View courses",
    url: "https://bseri.net/",
    theme: "iso",
    image: "/images/partner-ads/bseri.webp",
    ink: "#0f172a",
    accent: "#fbbf24",
    photoLabel: "ISO training",
    offer: "ISO courses",
    support: "9001, 27001, 22301",
    photoCta: "View courses",
    ctaShort: "Courses",
    photoPosition: "42% 55%",
  },
  {
    id: "agsunwin",
    partner: "AG Sunwin",
    eyebrow: "Partner",
    kicker: "agsunwinenergysolutions.com",
    headline: "Home solar · Chennai",
    body: "For eligible homes. Survey, design and net metering.",
    cta: "Check subsidy",
    url: "https://agsunwinenergysolutions.com/",
    theme: "solar",
    image: "/images/partner-ads/agsunwin.webp",
    ink: "#0c4a6e",
    accent: "#f59e0b",
    photoLabel: "Home solar",
    offer: "₹1 lakh",
    support: "Central + state subsidy",
    photoCta: "Check subsidy",
    ctaShort: "Check subsidy",
    photoPosition: "center 62%",
  },
];

/** Hostnames (no `www.`) used for outbound click analytics. */
export const PARTNER_AD_HOSTS = new Set(
  PARTNER_AD_SOURCES.map((ad) => hostnameWithoutWww(ad.url)),
);

function hostnameWithoutWww(href: string): string {
  try {
    return new URL(href).hostname.replace(/^www\./i, "").toLowerCase();
  } catch {
    return "";
  }
}

export function isPartnerAdHost(hostname: string): boolean {
  return PARTNER_AD_HOSTS.has(hostname.replace(/^www\./i, "").toLowerCase());
}

export function withPartnerUtm(href: string, placement: string): string {
  const url = new URL(href);
  url.searchParams.set("utm_source", PARTNER_AD_UTM_SOURCE);
  url.searchParams.set("utm_medium", PARTNER_AD_UTM_MEDIUM);
  url.searchParams.set("utm_campaign", PARTNER_AD_UTM_CAMPAIGN);
  url.searchParams.set("utm_content", placement);
  return url.toString();
}

/** Same creative list for every slot; UTMs change with `placement`. */
export function partnerAds(placement: PartnerAdPlacement): PartnerAdCreative[] {
  const slot = placement.trim() || "site_band";
  return PARTNER_AD_SOURCES.map((ad) => ({
    id: ad.id,
    partner: ad.partner,
    eyebrow: ad.eyebrow,
    kicker: ad.kicker,
    headline: ad.headline,
    body: ad.body,
    cta: ad.cta,
    theme: ad.theme,
    href: withPartnerUtm(ad.url, slot),
    image: ad.image,
    ink: ad.ink,
    accent: ad.accent,
    photoLabel: ad.photoLabel,
    offer: ad.offer,
    support: ad.support,
    photoCta: ad.photoCta,
    ctaShort: ad.ctaShort,
    offerScale: ad.offerScale,
    photoPosition: ad.photoPosition,
  }));
}

export function normalizeAdPathname(pathname: string): string {
  const raw = pathname.trim() || "/";
  if (raw === "/") return "/";
  return raw.replace(/\/+$/, "") || "/";
}

const DEDICATED_EXACT = new Set([
  "/",
  "/chennai-jobs",
  "/chennai-local-news",
  "/chennai-local-events",
  "/directory",
  "/chennai-classifieds",
  "/elections-2026",
  "/guides/chennai-tech-careers",
]);

/**
 * Paths that already mount `<PageAdSlot />`. The site-wide band must skip these
 * so readers do not see two partner rotators on one page.
 */
export function hasDedicatedPartnerAdSlot(pathname: string): boolean {
  const path = normalizeAdPathname(pathname);

  if (DEDICATED_EXACT.has(path)) return true;

  if (
    path.startsWith("/chennai-jobs/") &&
    !path.startsWith("/chennai-jobs/looking-for-work")
  ) {
    return true;
  }

  if (path.startsWith("/chennai-local-news/")) return true;

  if (
    path.startsWith("/chennai-local-events/") &&
    path !== "/chennai-local-events/submit"
  ) {
    return true;
  }

  if (path.startsWith("/chennai-classifieds/")) return true;

  if (path.startsWith("/areas/") && path !== "/areas") return true;

  if (
    path === "/guides/tn-plus-two" ||
    path.startsWith("/guides/tn-plus-two/") ||
    path === "/guides/tn-plus-two-tamil" ||
    path.startsWith("/guides/tn-plus-two-tamil/") ||
    path === "/class-11-groups-chennai" ||
    path === "/class-11-groups-chennai-tamil" ||
    path === "/plus-two-textbooks-pdf" ||
    path === "/plus-two-textbooks-pdf-tamil"
  ) {
    return true;
  }

  if (
    path === "/guides/tn-council-of-ministers" ||
    path.startsWith("/guides/tn-council-of-ministers/") ||
    path === "/guides/tn-council-of-ministers-tamil" ||
    path.startsWith("/guides/tn-council-of-ministers-tamil/")
  ) {
    return true;
  }

  return false;
}

const BLOCKED_EXACT = new Set([
  "/privacy",
  "/terms",
  "/cookies",
  "/community-guidelines",
  "/editorial-standards",
  "/contact",
  "/about",
  "/glossary",
  "/search",
  "/whatsapp-community/partners",
]);

const BLOCKED_CIVIC_PREVIEW = new Set(CIVIC_TOOL_PREVIEW_PATHS);

const BLOCKED_PREFIXES = [
  "/admin",
  "/api/auth",
  "/api/",
  "/login",
  "/register",
  "/reset",
  "/subscribe",
  "/settings",
  "/checkout",
  "/billing",
  "/dashboard",
];

function isBlockedPartnerAdPath(pathname: string): boolean {
  const path = normalizeAdPathname(pathname);
  if (BLOCKED_EXACT.has(path)) return true;
  if (BLOCKED_CIVIC_PREVIEW.has(path)) return true;
  if (path === "/chennai-local-events/submit") return true;
  return BLOCKED_PREFIXES.some(
    (prefix) => path === prefix.replace(/\/+$/, "") || path.startsWith(prefix),
  );
}

/** Catch-all band: public pages that do not already have an inline slot. */
export function shouldShowSiteWideAd(pathname: string): boolean {
  if (isBlockedPartnerAdPath(pathname)) return false;
  if (hasDedicatedPartnerAdSlot(pathname)) return false;
  return true;
}
