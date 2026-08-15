/**
 * Partner ad creatives for mychennaicity.in.
 * Copy and themes live here — the rotator only renders `{ ads, shape, placement }`.
 */

export const PARTNER_AD_UTM_SOURCE = "mychennaicity";
export const PARTNER_AD_UTM_MEDIUM = "referral";
export const PARTNER_AD_UTM_CAMPAIGN = "partner_ad";

export const PARTNER_AD_ROTATE_MS = 6500;

export type PartnerAdShape = "square" | "rectangle";

export type PartnerAdTheme = "vacancy" | "resume" | "solar";

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
};

type PartnerAdSource = Omit<PartnerAdCreative, "href"> & {
  url: string;
};

const PARTNER_AD_SOURCES: readonly PartnerAdSource[] = [
  {
    id: "resumedoctor",
    partner: "ResumeDoctor",
    eyebrow: "Partner",
    kicker: "resumedoctor.in",
    headline: "Don’t send a bad photo of your résumé",
    body: "Make a neat one in five minutes. Download PDF or Word — or share a link the recruiter can open on their phone.",
    cta: "Make my resume — ₹49",
    url: "https://www.resumedoctor.in/",
    theme: "resume",
  },
  {
    id: "vacancychennai",
    partner: "Vacancy Chennai",
    eyebrow: "Partner",
    kicker: "vacancychennai.in",
    headline: "Hyperlocal jobs across Chennai",
    body: "OMR, Tambaram, Porur and more — browse by area and apply on the employer’s own page.",
    cta: "Browse Vacancy Chennai",
    url: "https://vacancychennai.in/",
    theme: "vacancy",
  },
  {
    id: "agsunwin",
    partner: "AG Sunwin",
    eyebrow: "Partner",
    kicker: "agsunwinenergysolutions.com",
    headline: "Home solar with subsidy support",
    body: "Site survey, design, and net-metering help for Chennai rooftops.",
    cta: "Get a free quote",
    url: "https://agsunwinenergysolutions.com/",
    theme: "solar",
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
]);

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
