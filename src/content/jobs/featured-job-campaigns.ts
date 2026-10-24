import { jobEnglishSlug } from "@/lib/jobs/job-language";

/**
 * Time-boxed job features. English slug is the key; the Tamil twin comes from
 * `job-language`. A campaign drops off the morning after `until` (IST, inclusive).
 * Add a row here — do not hardcode these slugs in page components.
 */
export type FeaturedJobCampaign = {
  id: string;
  englishSlug: string;
  /** Inclusive last day, YYYY-MM-DD, Asia/Kolkata. */
  until: string;
  /** Area hubs where the workplace sits in or beside the belt. */
  areaHubSlugs: readonly string[];
  contextEn: string;
  contextTa: string;
};

/** VV Placement Services — AC technician / helper and HR recruiter. Through 12 Nov 2026. */
export const FEATURED_JOB_CAMPAIGNS: readonly FeaturedJobCampaign[] = [
  {
    id: "vv-ac-madipakkam-2026-10",
    englishSlug: "ac-technician-helper-50-vacancies-madipakkam-chennai",
    until: "2026-11-12",
    areaHubSlugs: ["saidapet-guindy-alandur"],
    contextEn:
      "50 AC technician and helper openings in Madipakkam, on the south side of the Guindy–Alandur belt.",
    contextTa:
      "மடிப்பாக்கத்தில் ஏசி டெக்னீஷன் மற்றும் ஹெல்பருக்கு 50 காலியிடங்கள். கிண்டி–ஆலந்தூர் பட்டிக்கு தெற்கே.",
  },
  {
    id: "vv-hr-sembakkam-2026-10",
    englishSlug: "hr-recruiter-10-vacancies-sembakkam-chennai",
    until: "2026-11-12",
    areaHubSlugs: ["saidapet-guindy-alandur"],
    contextEn:
      "10 HR recruiter openings in Sembakkam, south of Guindy toward Tambaram.",
    contextTa:
      "செம்பாக்கத்தில் எச்ஆர் ரெக்ரூட்டருக்கு 10 காலியிடங்கள். கிண்டிக்கு தெற்கே, தாம்பரம் பக்கம்.",
  },
];

/** Calendar date in Asia/Kolkata as YYYY-MM-DD. */
export function istCalendarDate(now: Date = new Date()): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now);
}

export function isFeaturedJobCampaignActive(
  until: string,
  now: Date = new Date(),
): boolean {
  return istCalendarDate(now) <= until;
}

export function activeFeaturedJobCampaigns(
  now: Date = new Date(),
): FeaturedJobCampaign[] {
  return FEATURED_JOB_CAMPAIGNS.filter((campaign) =>
    isFeaturedJobCampaignActive(campaign.until, now),
  );
}

export function isActiveFeaturedJobSlug(
  slug: string,
  now: Date = new Date(),
): boolean {
  const english = jobEnglishSlug(slug);
  return activeFeaturedJobCampaigns(now).some(
    (campaign) => campaign.englishSlug === english,
  );
}

/** Latest inclusive end date among active campaigns, or null when none are live. */
export function featuredJobsPinnedThrough(now: Date = new Date()): string | null {
  const active = activeFeaturedJobCampaigns(now);
  if (active.length === 0) return null;
  return active.reduce(
    (latest, campaign) => (campaign.until > latest ? campaign.until : latest),
    active[0].until,
  );
}

export function formatFeaturedUntilLabel(
  isoDate: string,
  language: "en" | "ta",
): string {
  const [year, month, day] = isoDate.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  return date.toLocaleDateString(language === "ta" ? "ta-IN" : "en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

const HIDE_CATCH_ALL_EXACT = new Set([
  "/",
  "/chennai-jobs",
  "/chennai-jobs/looking-for-work",
  "/chennai-local-news",
  "/chennai-today",
  "/chennai-today-tamil",
  "/chennai-local-events",
  "/chennai-classifieds",
  "/directory",
  "/chennai-gold-rate",
  "/areas/saidapet-guindy-alandur",
  "/privacy",
  "/terms",
  "/cookies",
  "/community-guidelines",
  "/editorial-standards",
  "/contact",
  "/about",
  "/disclaimer",
]);

/**
 * Pages that already show the featured rail in context, plus legal and admin.
 * Other public pages get the catch-all band above the footer.
 */
export function pageHidesFeaturedJobsCatchAll(pathname: string): boolean {
  const raw = pathname.trim() || "/";
  const path = raw === "/" ? "/" : raw.replace(/\/+$/, "") || "/";
  if (HIDE_CATCH_ALL_EXACT.has(path)) return true;
  if (
    path.startsWith("/admin") ||
    path.startsWith("/advertise") ||
    path.startsWith("/login") ||
    path.startsWith("/register")
  ) {
    return true;
  }
  if (path.startsWith("/chennai-jobs/")) return true;
  if (path.startsWith("/chennai-local-events/")) return true;
  if (
    path.startsWith("/chennai-local-news/") &&
    !path.startsWith("/chennai-local-news/topic")
  ) {
    return true;
  }
  return false;
}
