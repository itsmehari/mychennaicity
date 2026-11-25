import { jobEnglishSlug } from "@/lib/jobs/job-language";

/**
 * Time-boxed job features. English slug is the key; the Tamil twin comes from
 * `job-language`. A campaign drops off the morning after `until` (IST, inclusive).
 * Add a row here — do not hardcode these slugs in page components.
 */
export type FeaturedJobCampaign = {
  id: string;
  englishSlug: string;
  /** Inclusive first day, YYYY-MM-DD, Asia/Kolkata. Omit to start immediately. */
  from?: string;
  /** Inclusive last day, YYYY-MM-DD, Asia/Kolkata. */
  until: string;
  /** Area hubs where the workplace sits in or beside the belt. */
  areaHubSlugs: readonly string[];
  contextEn: string;
  contextTa: string;
};

/** Assetowns Padur OMR six-pack through 17 Jan 2027. Casting studio through 13 Dec 2026. Guindy office assistant through 1 Dec 2026. Lenskart walk-in through 27 Nov 2026. Wedding Assist Guindy telesales through 23 Feb 2027. */
export const FEATURED_JOB_CAMPAIGNS: readonly FeaturedJobCampaign[] = [
  {
    id: "wedding-assist-tele-sales-guindy-2026-11",
    englishSlug:
      "tele-sales-executive-wedding-assist-guindy-walk-in-november-2026",
    from: "2026-11-25",
    until: "2027-02-23",
    areaHubSlugs: ["saidapet-guindy-alandur"],
    contextEn:
      "Tele Sales Executive — Wedding Assist, Guindy walk-in (RR Tower 3). Full-time on-roll; Mon–Sat 9:30 AM–6:30 PM. 1–8 yrs telesales. Call HR Rahman.",
    contextTa:
      "டெலி சேல்ஸ் எக்ஸிக்யூட்டிவ் — Wedding Assist, கிண்டி வாக்-இன் (RR Tower 3). புல் டைம் ஆன்-ரோல்; திங்கள்–சனி காலை 9:30 – மாலை 6:30. டெலிசேல்ஸில் 1–8 வருடம். HR ரஹ்மானை அழைக்கவும்.",
  },
  {
    id: "lenskart-sales-associate-walk-in-2026-11",
    englishSlug: "sales-associate-lenskart-walk-in-chennai-november-2026",
    from: "2026-11-22",
    until: "2026-11-27",
    areaHubSlugs: [
      "omr-perungudi-sholinganallur",
      "ambattur-annanagar",
      "valasaravakkam-porur",
    ],
    contextEn:
      "Lenskart Sales Associate walk-in — Thoraipakkam 24 Nov, Anna Nagar 26 Nov, Porur 27 Nov. 11 AM–5 PM. ₹2.5–4 LPA + incentive. Freshers welcome.",
    contextTa:
      "Lenskart சேல்ஸ் அசோசியேட் வாக்-இன் — தோரப்பாக்கம் 24 நவ, அண்ணா நகர் 26 நவ, போரூர் 27 நவ. காலை 11 – மாலை 5. ₹2.5–4 LPA + இன்சென்டிவ். புதிதாக வேலை தேடுபவரும் வரவேற்பு.",
  },
  {
    id: "assetowns-senior-telecaller-padur-2026-11",
    englishSlug: "senior-telecaller-female-assetowns-padur-omr",
    from: "2026-11-18",
    until: "2027-01-17",
    areaHubSlugs: ["omr-perungudi-sholinganallur"],
    contextEn:
      "Senior telecaller (female) at Assetowns Property Solutions, Padur OMR. Real-estate leads — WhatsApp CV.",
    contextTa:
      "Assetowns Property Solutions — சீனியர் டெலிகேல்லர் (பெண்), பாதூர் OMR. ரியல் எஸ்டேட் லீட்ஸ் — வாட்ஸ்அப் சீவி.",
  },
  {
    id: "assetowns-bde-male-padur-2026-11",
    englishSlug: "business-development-executive-male-assetowns-padur-omr",
    from: "2026-11-18",
    until: "2027-01-17",
    areaHubSlugs: ["omr-perungudi-sholinganallur"],
    contextEn:
      "Business development executive (male), Padur OMR. Property / smart-asset sales — field role on the corridor.",
    contextTa:
      "பிசினஸ் டெவலப்மென்ட் எக்ஸிக்யூட்டிவ் (ஆண்), பாதூர் OMR. ப்ராபர்டி விற்பனை — OMR தெருவில் ஃபீல்ட் வேலை.",
  },
  {
    id: "assetowns-hr-manager-padur-2026-11",
    englishSlug: "hr-manager-assetowns-padur-omr",
    from: "2026-11-18",
    until: "2027-01-17",
    areaHubSlugs: ["omr-perungudi-sholinganallur"],
    contextEn:
      "HR manager at Assetowns, Padur OMR. Recruitment and employee coordination for a growing property desk.",
    contextTa:
      "Assetowns எச்ஆர் மேனேஜர், பாதூர் OMR. ரெக்ரூட்மென்ட் மற்றும் ஊழியர் ஒருங்கிணைப்பு.",
  },
  {
    id: "assetowns-sales-exec-male-padur-2026-11",
    englishSlug: "sales-executive-male-assetowns-padur-omr",
    from: "2026-11-18",
    until: "2027-01-17",
    areaHubSlugs: ["omr-perungudi-sholinganallur"],
    contextEn:
      "Sales executive (male), Padur OMR. Client-facing property sales with telecaller and CRM support.",
    contextTa:
      "சேல்ஸ் எக்ஸிக்யூட்டிவ் (ஆண்), பாதூர் OMR. வாடிக்கையாளர் முன் ரியல் எஸ்டேட் விற்பனை.",
  },
  {
    id: "assetowns-crm-exec-female-padur-2026-11",
    englishSlug: "customer-relationship-executive-female-assetowns-padur-omr",
    from: "2026-11-18",
    until: "2027-01-17",
    areaHubSlugs: ["omr-perungudi-sholinganallur"],
    contextEn:
      "Customer relationship executive (female), Padur OMR. Post-sale client updates and documentation.",
    contextTa:
      "கஸ்டமர் ரிலேஷன்ஷிப் எக்ஸிக்யூட்டிவ் (பெண்), பாதூர் OMR. விற்பனைக்குப் பிறகு வாடிக்கையாளர் ஒருங்கிணைப்பு.",
  },
  {
    id: "assetowns-crm-manager-padur-2026-11",
    englishSlug: "customer-relationship-manager-assetowns-padur-omr",
    from: "2026-11-18",
    until: "2027-01-17",
    areaHubSlugs: ["omr-perungudi-sholinganallur"],
    contextEn:
      "Customer relationship manager, Padur OMR. End-to-end client accounts for property solutions.",
    contextTa:
      "கஸ்டமர் ரிலேஷன்ஷிப் மேனேஜர், பாதூர் OMR. முழு வாடிக்கையாளர் கணக்கு மேலாண்மை.",
  },
  {
    id: "south-style-casting-studio-2026-11",
    englishSlug:
      "male-models-south-style-casting-studio-ponneri-minjur-thiruvallur-chennai",
    from: "2026-11-13",
    until: "2026-12-13",
    areaHubSlugs: ["tiruvottiyur-manali-belt"],
    contextEn:
      "Male models, ages 20–30, for fashion and commercial photoshoots. Ponneri, Minjur, Thiruvallur, and Chennai. Local talent welcome. Pay is per shoot.",
    contextTa:
      "ஆண் மாடல்கள், வயது 20–30. ஃபேஷன் மற்றும் கமர்ஷியல் போட்டோஷூட். பொன்னேரி, மிஞ்சூர், திருவள்ளூர், சென்னை. உள்ளூர் திறமை வரவேற்கப்படுகிறது. பணம் ஷூட் ஒன்றுக்கு.",
  },
  {
    id: "guindy-male-office-assistant-2026-11",
    englishSlug: "male-office-assistant-guindy-race-course",
    from: "2026-11-01",
    until: "2026-12-01",
    areaHubSlugs: ["saidapet-guindy-alandur"],
    contextEn:
      "Male office assistant at Guindy Race Course. Tamil with Hindi, or Tamil with Telugu. Six hours a day, ₹15,000 a month.",
    contextTa:
      "கிண்டி ரேஸ் கோர்ஸில் ஆண் ஆபிஸ் அசிஸ்டென்ட். தமிழ் மற்றும் ஹிந்தி, அல்லது தமிழ் மற்றும் தெலுங்கு. நாள் ஒன்றுக்கு 6 மணி. மாதம் ₹15,000.",
  },
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
  from?: string,
): boolean {
  const today = istCalendarDate(now);
  if (from && today < from) return false;
  return today <= until;
}

export function activeFeaturedJobCampaigns(
  now: Date = new Date(),
): FeaturedJobCampaign[] {
  return FEATURED_JOB_CAMPAIGNS.filter((campaign) =>
    isFeaturedJobCampaignActive(campaign.until, now, campaign.from),
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
    path.startsWith("/super-admin") ||
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
