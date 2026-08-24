import {
  CABINET_NEWS_MAY16_PATH,
  CABINET_NEWS_EXPANSION_PATH,
  GOVERNMENT_HUB_PATH,
  GOVERNMENT_IAS_PATH,
} from "@/content/government/paths";

export type IasArticleLink = {
  slug: string;
  title: string;
  date: string;
  summary: string;
};

export const IAS_ARTICLE_LINKS: IasArticleLink[] = [
  {
    slug: "tamil-nadu-ias-reshuffle-collectors-may-2026",
    title: "Tamil Nadu IAS reshuffle — collectors and senior postings (May 2026)",
    date: "May 2026",
    summary:
      "Mass cadre reshuffle after the new government — district collectors and secretaries realigned.",
  },
  {
    slug: "yet-another-tamil-nadu-ias-reshuffle-july-2026",
    title: "Yet another Tamil Nadu IAS reshuffle (July 2026)",
    date: "July 2026",
    summary: "Follow-up senior leadership changes mid-year.",
  },
  {
    slug: "tamil-nadu-ias-prakash-malarvizhi-archives-revenue-swap-august-2026",
    title: "IAS swap — Prakash ↔ Malarvizhi (Archives / Revenue)",
    date: "August 2026",
    summary:
      "Targeted two-officer exchange under G.O. (Rt.) No. 2892 — disaster management and archives chairs.",
  },
  {
    slug: "tamil-nadu-government-order-portal-outdated-missing-gos-transparency-july-2026",
    title: "TN G.O. portal — missing orders and transparency",
    date: "July 2026",
    summary: "Public-interest desk on finding official Government Orders online.",
  },
];

export const RELATED_NEWS_SLUGS = [
  CABINET_NEWS_MAY16_PATH.replace("/chennai-local-news/", ""),
  CABINET_NEWS_EXPANSION_PATH.replace("/chennai-local-news/", ""),
  "tamil-nadu-fiscal-white-paper-2026-debt-revenue-deficit-analysis",
  "chennai-corporation-zones-current-15-proposed-20-map-explained",
  "namma-arasu-whatsapp-chatbot-tamil-nadu-2026",
  "minister-n-anand-chennai-flood-preparedness-review-august-2026",
];

export const GOVERNMENT_HUB_RELATED = [
  { href: GOVERNMENT_IAS_PATH, label: "IAS leadership shelf" },
  { href: `${GOVERNMENT_HUB_PATH}/chennai`, label: "Chennai — who handles what" },
  { href: `${GOVERNMENT_HUB_PATH}/departments`, label: "Department lookup" },
  { href: `${GOVERNMENT_HUB_PATH}/official-sources`, label: "Official Lok Bhavan PDFs" },
  { href: CABINET_NEWS_MAY16_PATH, label: "News — first portfolios (16 May)" },
  { href: CABINET_NEWS_EXPANSION_PATH, label: "News — 35-minister expansion (21 May)" },
  { href: "/chennai-local-news/topic/politics", label: "Politics topic desk" },
  { href: "/guides/tn-plus-two", label: "TN Plus Two education desk" },
];

export const GOVERNMENT_HUB_RELATED_TA = [
  { href: "/guides/tn-council-of-ministers-tamil/ias-leadership", label: "IAS shelf (Tamil hub)" },
  { href: "/guides/tn-council-of-ministers-tamil/chennai", label: "சென்னை — யார் பொறுப்பு" },
  { href: "/guides/tn-council-of-ministers-tamil/departments", label: "துறை lookup" },
  { href: "/guides/tn-council-of-ministers-tamil/official-sources", label: "Lok Bhavan PDF" },
  { href: GOVERNMENT_HUB_PATH, label: "English desk" },
];
