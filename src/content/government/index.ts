/**
 * TN Council of Ministers government desk registry — sitemap and cluster wiring.
 */

import { MINISTER_SLUGS } from "@/content/government/ministers-may-2026";
import {
  GOVERNMENT_CHENNAI_PATH,
  GOVERNMENT_CHENNAI_TA_PATH,
  GOVERNMENT_DEPARTMENTS_PATH,
  GOVERNMENT_DEPARTMENTS_TA_PATH,
  GOVERNMENT_HUB_PATH,
  GOVERNMENT_HUB_TA_PATH,
  GOVERNMENT_IAS_PATH,
  GOVERNMENT_IAS_TA_PATH,
  GOVERNMENT_OFFICIAL_SOURCES_PATH,
  GOVERNMENT_OFFICIAL_SOURCES_TA_PATH,
  ministerPath,
} from "@/content/government/paths";

export type GovernmentWave = "A" | "B" | "C" | "D" | "E";

export type GovernmentHubEntry = {
  id: string;
  wave: GovernmentWave;
  path: string;
  title: string;
  sitemapPriority: number;
  changeFrequency: "weekly" | "monthly";
};

export const GOVERNMENT_SHIPPED_WAVES: readonly GovernmentWave[] = [
  "A",
  "B",
  "C",
  "D",
  "E",
];

const STATIC_PAGES: GovernmentHubEntry[] = [
  {
    id: "hub",
    wave: "A",
    path: GOVERNMENT_HUB_PATH,
    title: "Tamil Nadu Council of Ministers",
    sitemapPriority: 0.85,
    changeFrequency: "monthly",
  },
  {
    id: "hub-ta",
    wave: "E",
    path: GOVERNMENT_HUB_TA_PATH,
    title: "Tamil Nadu Council of Ministers (Tamil)",
    sitemapPriority: 0.82,
    changeFrequency: "monthly",
  },
  {
    id: "official-sources",
    wave: "A",
    path: GOVERNMENT_OFFICIAL_SOURCES_PATH,
    title: "Official Lok Bhavan sources",
    sitemapPriority: 0.72,
    changeFrequency: "monthly",
  },
  {
    id: "official-sources-ta",
    wave: "E",
    path: GOVERNMENT_OFFICIAL_SOURCES_TA_PATH,
    title: "Official sources (Tamil)",
    sitemapPriority: 0.7,
    changeFrequency: "monthly",
  },
  {
    id: "departments",
    wave: "B",
    path: GOVERNMENT_DEPARTMENTS_PATH,
    title: "Department lookup",
    sitemapPriority: 0.75,
    changeFrequency: "monthly",
  },
  {
    id: "departments-ta",
    wave: "E",
    path: GOVERNMENT_DEPARTMENTS_TA_PATH,
    title: "Department lookup (Tamil)",
    sitemapPriority: 0.72,
    changeFrequency: "monthly",
  },
  {
    id: "chennai",
    wave: "C",
    path: GOVERNMENT_CHENNAI_PATH,
    title: "Chennai — who handles what",
    sitemapPriority: 0.78,
    changeFrequency: "monthly",
  },
  {
    id: "chennai-ta",
    wave: "E",
    path: GOVERNMENT_CHENNAI_TA_PATH,
    title: "Chennai shelf (Tamil)",
    sitemapPriority: 0.75,
    changeFrequency: "monthly",
  },
  {
    id: "ias",
    wave: "C",
    path: GOVERNMENT_IAS_PATH,
    title: "IAS leadership shelf",
    sitemapPriority: 0.72,
    changeFrequency: "monthly",
  },
  {
    id: "ias-ta",
    wave: "E",
    path: GOVERNMENT_IAS_TA_PATH,
    title: "IAS shelf (Tamil)",
    sitemapPriority: 0.7,
    changeFrequency: "monthly",
  },
];

const MINISTER_PAGES_EN: GovernmentHubEntry[] = MINISTER_SLUGS.map((slug) => ({
  id: `minister-${slug}`,
  wave: "B" as const,
  path: ministerPath(slug, "en"),
  title: `Minister — ${slug}`,
  sitemapPriority: 0.7,
  changeFrequency: "monthly" as const,
}));

const MINISTER_PAGES_TA: GovernmentHubEntry[] = MINISTER_SLUGS.map((slug) => ({
  id: `minister-${slug}-ta`,
  wave: "E" as const,
  path: ministerPath(slug, "ta"),
  title: `Minister (Tamil) — ${slug}`,
  sitemapPriority: 0.68,
  changeFrequency: "monthly" as const,
}));

export const GOVERNMENT_PAGES = [
  ...STATIC_PAGES,
  ...MINISTER_PAGES_EN,
  ...MINISTER_PAGES_TA,
] as const satisfies readonly GovernmentHubEntry[];

export const GOVERNMENT_SITEMAP_ENTRIES = GOVERNMENT_PAGES.filter((p) =>
  GOVERNMENT_SHIPPED_WAVES.includes(p.wave),
).map((p) => ({
  path: p.path,
  priority: p.sitemapPriority,
  changeFrequency: p.changeFrequency,
}));
