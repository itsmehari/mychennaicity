export type AdvertisePanelVariant =
  | "home"
  | "news"
  | "events"
  | "jobs"
  | "directory"
  | "classifieds"
  | "area"
  | "civic";

export type AdvertisePanelLayout = "hero" | "section" | "strip";

export type AdvertisePanelCopy = {
  /** Tracking token appended to WhatsApp prefill — never shown on page. */
  source: string;
  eyebrow: string;
  headline: string;
  headlineAccent?: string;
  body: string;
  ctaLabel: string;
  ctaSideTitle?: string;
  ctaSideBody?: string;
  prefill: string;
  categories?: readonly string[];
};

const basePrefill =
  "Hi — I would like to advertise my business on mychennaicity.in.";

const copy: Record<AdvertisePanelVariant, AdvertisePanelCopy> = {
  home: {
    source: "home_banner",
    eyebrow: "Local advertising",
    headline: "Advertise your business on",
    headlineAccent: "My Chennai City",
    body: "Reach Chennai readers through news, events, jobs, area pages and local discovery sections.",
    ctaSideTitle: "Grow your business with local visibility",
    ctaSideBody: "Direct enquiry only — tap the button below.",
    ctaLabel: "Enquire on WhatsApp",
    prefill: basePrefill,
    categories: ["Shops", "Services", "Events", "Institutes", "Clinics", "Startups"],
  },
  news: {
    source: "news_hub_banner",
    eyebrow: "News & articles",
    headline: "Place your business where Chennai readers are already paying attention.",
    body: "Sponsor a strip, sidebar feature, or contextual placement alongside local reporting.",
    ctaLabel: "Enquire on WhatsApp",
    prefill: `${basePrefill} (news section)`,
  },
  events: {
    source: "events_hub_banner",
    eyebrow: "Events",
    headline: "Promote your event, venue or local brand in Chennai.",
    body: "Reach people browsing concerts, festivals, meetups and neighbourhood calendars.",
    ctaLabel: "Promote on WhatsApp",
    prefill: `${basePrefill} (events section)`,
  },
  jobs: {
    source: "jobs_hub_banner",
    eyebrow: "Jobs",
    headline: "Hiring in Chennai? Promote your opening or employer brand.",
    body: "Connect with local job seekers browsing curated Chennai listings.",
    ctaLabel: "Post / Promote Job",
    prefill: `${basePrefill} (jobs section)`,
  },
  directory: {
    source: "directory_hub_banner",
    eyebrow: "Directory & business",
    headline: "Make your business easier to discover in Chennai.",
    body: "Featured listings, category highlights, and neighbourhood visibility on the directory.",
    ctaLabel: "Get Listed",
    prefill: `${basePrefill} (directory section)`,
  },
  classifieds: {
    source: "classifieds_hub_banner",
    eyebrow: "Classifieds",
    headline: "Reach Chennai readers browsing local wanted ads and services.",
    body: "Promote tuition centres, home services, rentals, or your business alongside reader listings.",
    ctaLabel: "Advertise Now",
    prefill: `${basePrefill} (classifieds section)`,
  },
  area: {
    source: "area_hub_banner",
    eyebrow: "Area pages",
    headline: "Reach customers in this Chennai neighbourhood.",
    body: "Hyper-local visibility on area guides where residents search for shops and services.",
    ctaLabel: "Advertise Locally",
    prefill: `${basePrefill} (area page)`,
  },
  civic: {
    source: "civic_tools_banner",
    eyebrow: "Local advertising",
    headline: "Advertise your business where Chennai residents look up civic info.",
    body: "Reach people using zone finders, maps, and neighbourhood tools — then browsing news, events, and local discovery.",
    ctaLabel: "Enquire on WhatsApp",
    prefill: `${basePrefill} (civic tools)`,
  },
};

/** Detail-page strip sources — distinct from hub banners for click tracking. */
export const advertiseDetailSources: Record<
  Exclude<AdvertisePanelVariant, "home">,
  string
> = {
  news: "news_article_strip",
  events: "events_detail_strip",
  jobs: "jobs_detail_strip",
  directory: "directory_detail_strip",
  classifieds: "classifieds_detail_strip",
  area: "area_detail_strip",
  civic: "civic_tools_strip",
};

export function getAdvertisePanelCopy(
  variant: AdvertisePanelVariant,
): AdvertisePanelCopy {
  return copy[variant] ?? copy.home;
}

export function advertisePanelHref(
  source: string,
  prefill: string,
): string {
  const params = new URLSearchParams({ source, text: prefill });
  return `/api/contact/whatsapp?${params.toString()}`;
}
