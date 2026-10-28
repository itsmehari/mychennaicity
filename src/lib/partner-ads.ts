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
  /** Marketing lines for this advertiser. The rotator advances one line per visit. */
  lines?: readonly PartnerAdLine[];
};

export type PartnerAdLine = {
  headline: string;
  body: string;
  cta: string;
  photoLabel: string;
  offer: string;
  support: string;
  photoCta: string;
  ctaShort: string;
  offerScale?: number;
};

type PartnerAdSource = Omit<PartnerAdCreative, "href" | "headline" | "body" | "cta" | "photoLabel" | "offer" | "support" | "photoCta" | "ctaShort" | "offerScale" | "lines"> & {
  url: string;
  lines: readonly PartnerAdLine[];
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

/**
 * Three lines per advertiser, all from MyOMR’s registry facts:
 * ResumeDoctor — minutes, a resume you can send, pick a layout, add details, download.
 * MyCovai — Coimbatore, news and local talk, the city in one place.
 * Colourchemist — design studio, logos, sites, campaigns, print and the web.
 * BSERI — ISO 9001, 27001, 22301, implementer courses for working teams.
 * AG Sunwin — ₹1 lakh, central and state subsidy, eligible homes, survey, design, net metering.
 */
const PARTNER_AD_SOURCES: readonly PartnerAdSource[] = [
  {
    id: "resumedoctor",
    partner: "ResumeDoctor",
    eyebrow: "Partner",
    kicker: "resumedoctor.in",
    url: "https://www.resumedoctor.in/",
    theme: "resume",
    image: "/images/partner-ads/resumedoctor.webp",
    ink: "#0f172a",
    accent: "#22d3ee",
    photoPosition: "center 42%",
    lines: [
      {
        headline: "A resume you can send",
        body: "Pick a layout, add your details, download.",
        cta: "Build my resume",
        photoLabel: "Resume help",
        offer: "In minutes",
        support: "A resume you can send",
        photoCta: "Build my resume",
        ctaShort: "Build resume",
      },
      {
        headline: "Pick a layout",
        body: "Add your details, then download a resume you can send.",
        cta: "Build my resume",
        photoLabel: "Your layout",
        offer: "Pick a layout",
        support: "Add your details, download.",
        photoCta: "Build my resume",
        ctaShort: "Build resume",
      },
      {
        headline: "Ready to send",
        body: "In minutes: pick a layout, add your details, download.",
        cta: "Build my resume",
        photoLabel: "Ready to send",
        offer: "Send it today",
        support: "A resume you can send",
        photoCta: "Build my resume",
        ctaShort: "Build resume",
      },
    ],
  },
  {
    id: "mycovai",
    partner: "MyCovai",
    eyebrow: "Partner",
    kicker: "mycovai.in",
    url: "https://mycovai.in/",
    theme: "covai",
    image: "/images/partner-ads/mycovai.webp",
    ink: "#312e81",
    accent: "#c084fc",
    photoPosition: "center 48%",
    lines: [
      {
        headline: "Coimbatore",
        body: "The city, in one place. News and local talk.",
        cta: "Explore Covai",
        photoLabel: "Coimbatore",
        offer: "MyCovai",
        support: "News and local talk",
        photoCta: "Explore Covai",
        ctaShort: "Explore",
      },
      {
        headline: "The city, in one place",
        body: "News and local talk for Coimbatore, in one place.",
        cta: "Explore Covai",
        photoLabel: "One city",
        offer: "One place",
        support: "The city, in one place.",
        photoCta: "Explore Covai",
        ctaShort: "Explore",
      },
      {
        headline: "News and local talk",
        body: "Coimbatore news and local talk, in one place.",
        cta: "Explore Covai",
        photoLabel: "Local talk",
        offer: "Local news",
        support: "News and local talk",
        photoCta: "Explore Covai",
        ctaShort: "Explore",
      },
    ],
  },
  {
    id: "colourchemist",
    partner: "Colourchemist",
    eyebrow: "Partner",
    kicker: "colourchemist.co.in",
    url: "https://colourchemist.co.in/",
    theme: "studio",
    image: "/images/partner-ads/colourchemist.webp",
    ink: "#1e1b4b",
    accent: "#fb7185",
    photoPosition: "center 55%",
    lines: [
      {
        headline: "Design studio",
        body: "Branding for print and the web. Logos, sites, campaigns.",
        cta: "See the work",
        photoLabel: "Design studio",
        offer: "Colourchemist",
        support: "Logos, sites, campaigns",
        photoCta: "See the work",
        ctaShort: "See work",
        offerScale: 0.78,
      },
      {
        headline: "Branding for print and the web",
        body: "Logos, sites, and campaigns for print and the web.",
        cta: "See the work",
        photoLabel: "Print and web",
        offer: "Print and web",
        support: "Logos, sites, campaigns",
        photoCta: "See the work",
        ctaShort: "See work",
      },
      {
        headline: "Logos, sites, campaigns",
        body: "A design studio for branding, print, and the web.",
        cta: "See the work",
        photoLabel: "Logos, sites",
        offer: "Brand work",
        support: "Branding for print and the web.",
        photoCta: "See the work",
        ctaShort: "See work",
      },
    ],
  },
  {
    id: "bseri",
    partner: "BSERI",
    eyebrow: "Partner",
    kicker: "bseri.net",
    url: "https://bseri.net/",
    theme: "iso",
    image: "/images/partner-ads/bseri.webp",
    ink: "#0f172a",
    accent: "#fbbf24",
    photoPosition: "42% 55%",
    lines: [
      {
        headline: "ISO training",
        body: "Implementer courses for working teams.",
        cta: "View courses",
        photoLabel: "ISO training",
        offer: "ISO courses",
        support: "9001, 27001, 22301",
        photoCta: "View courses",
        ctaShort: "Courses",
      },
      {
        headline: "Courses for working teams",
        body: "Implementer courses for working teams on 9001, 27001, and 22301.",
        cta: "View courses",
        photoLabel: "Working teams",
        offer: "For teams",
        support: "Courses for working teams.",
        photoCta: "View courses",
        ctaShort: "Courses",
      },
      {
        headline: "9001, 27001, 22301",
        body: "Implementer courses covering 9001, 27001, and 22301.",
        cta: "View courses",
        photoLabel: "Three standards",
        offer: "Three ISOs",
        support: "9001, 27001, 22301",
        photoCta: "View courses",
        ctaShort: "Courses",
      },
    ],
  },
  {
    id: "agsunwin",
    partner: "AG Sunwin",
    eyebrow: "Partner",
    kicker: "agsunwinenergysolutions.com",
    url: "https://agsunwinenergysolutions.com/",
    theme: "solar",
    image: "/images/partner-ads/agsunwin.webp",
    ink: "#0c4a6e",
    accent: "#f59e0b",
    photoPosition: "center 62%",
    lines: [
      {
        headline: "Home solar · Chennai",
        body: "For eligible homes. Survey, design and net metering.",
        cta: "Check subsidy",
        photoLabel: "Home solar",
        offer: "₹1 lakh",
        support: "Central + state subsidy",
        photoCta: "Check subsidy",
        ctaShort: "Check subsidy",
      },
      {
        headline: "For eligible homes",
        body: "Survey, design and net metering for eligible homes.",
        cta: "Check subsidy",
        photoLabel: "Eligible homes",
        offer: "For homes",
        support: "Survey, design, net metering.",
        photoCta: "Check subsidy",
        ctaShort: "Check subsidy",
      },
      {
        headline: "Central + state subsidy",
        body: "Central and state subsidy for eligible homes. Survey, design and net metering.",
        cta: "Check subsidy",
        photoLabel: "Chennai homes",
        offer: "Net metering",
        support: "Central + state subsidy",
        photoCta: "Check subsidy",
        ctaShort: "Check subsidy",
      },
    ],
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

/** Applies one marketing line. Index wraps. The first line is the default. */
export function partnerAdWithLine(
  ad: PartnerAdCreative,
  lineIndex = 0,
): PartnerAdCreative {
  const lines = ad.lines;
  if (!lines?.length) return ad;
  const line = lines[((lineIndex % lines.length) + lines.length) % lines.length];
  return {
    ...ad,
    headline: line.headline,
    body: line.body,
    cta: line.cta,
    photoLabel: line.photoLabel,
    offer: line.offer,
    support: line.support,
    photoCta: line.photoCta,
    ctaShort: line.ctaShort,
    offerScale: line.offerScale,
  };
}

/** Same creative list for every slot; UTMs change with `placement`. */
export function partnerAds(placement: PartnerAdPlacement): PartnerAdCreative[] {
  const slot = placement.trim() || "site_band";
  return PARTNER_AD_SOURCES.map((ad) =>
    partnerAdWithLine({
      id: ad.id,
      partner: ad.partner,
      eyebrow: ad.eyebrow,
      kicker: ad.kicker,
      headline: "",
      body: "",
      cta: "",
      theme: ad.theme,
      href: withPartnerUtm(ad.url, slot),
      image: ad.image,
      ink: ad.ink,
      accent: ad.accent,
      photoPosition: ad.photoPosition,
      lines: ad.lines,
    }),
  );
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
  "/business-profile/",
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
