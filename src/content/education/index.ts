/**
 * TN Plus Two education desk registry — sitemap and cluster wiring.
 * Only `EDUCATION_SHIPPED_WAVES` entries are public in sitemap.
 */

import {
  EDUCATION_CHOOSE_PATH,
  EDUCATION_COMPARE_PATH,
  EDUCATION_HUB_PATH,
  EDUCATION_STRUCTURE_PATH,
  educationGroupPath,
} from "@/content/education/paths";

export type EducationWave = "A" | "B" | "C" | "D" | "E";

export type EducationHubEntry = {
  id: string;
  wave: EducationWave;
  path: string;
  title: string;
  sitemapPriority: number;
  changeFrequency: "weekly" | "monthly";
};

/** Waves that have live routes. Expand when later waves ship. */
export const EDUCATION_SHIPPED_WAVES: readonly EducationWave[] = ["A"];

export const EDUCATION_PAGES = [
  {
    id: "hub",
    wave: "A",
    path: EDUCATION_HUB_PATH,
    title: "Tamil Nadu Higher Secondary group guide",
    sitemapPriority: 0.85,
    changeFrequency: "weekly",
  },
  {
    id: "group-2502",
    wave: "A",
    path: educationGroupPath("2502"),
    title: "Group 2502 — Maths + Computer Science",
    sitemapPriority: 0.75,
    changeFrequency: "monthly",
  },
  {
    id: "group-2503",
    wave: "A",
    path: educationGroupPath("2503"),
    title: "Group 2503 — Maths + Biology",
    sitemapPriority: 0.75,
    changeFrequency: "monthly",
  },
  {
    id: "group-2702",
    wave: "A",
    path: educationGroupPath("2702"),
    title: "Group 2702 — Commerce + Computer Applications",
    sitemapPriority: 0.75,
    changeFrequency: "monthly",
  },
  {
    id: "group-2708",
    wave: "A",
    path: educationGroupPath("2708"),
    title: "Group 2708 — Commerce + Business Maths",
    sitemapPriority: 0.75,
    changeFrequency: "monthly",
  },
  {
    id: "group-2804",
    wave: "A",
    path: educationGroupPath("2804"),
    title: "Group 2804 — Humanities + Political Science",
    sitemapPriority: 0.75,
    changeFrequency: "monthly",
  },
  {
    id: "group-2802",
    wave: "A",
    path: educationGroupPath("2802"),
    title: "Group 2802 — Humanities + Computer Applications",
    sitemapPriority: 0.75,
    changeFrequency: "monthly",
  },
  {
    id: "compare",
    wave: "A",
    path: EDUCATION_COMPARE_PATH,
    title: "Compare five Higher Secondary groups",
    sitemapPriority: 0.72,
    changeFrequency: "monthly",
  },
  {
    id: "hse-structure",
    wave: "A",
    path: EDUCATION_STRUCTURE_PATH,
    title: "Tamil Nadu HSE structure — six papers",
    sitemapPriority: 0.72,
    changeFrequency: "monthly",
  },
  {
    id: "how-to-choose",
    wave: "A",
    path: EDUCATION_CHOOSE_PATH,
    title: "How to choose a Higher Secondary group",
    sitemapPriority: 0.72,
    changeFrequency: "monthly",
  },
] as const satisfies readonly EducationHubEntry[];

export const EDUCATION_SITEMAP_ENTRIES = EDUCATION_PAGES.filter((p) =>
  EDUCATION_SHIPPED_WAVES.includes(p.wave),
).map((p) => ({
  path: p.path,
  priority: p.sitemapPriority,
  changeFrequency: p.changeFrequency,
}));
