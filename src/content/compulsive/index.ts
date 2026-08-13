/**
 * Compulsive / connective hubs registry (ideas 1, 7–12, 14, 17, 20–23, 25–26, 28–30).
 * Single source for paths, waves, and sitemap wiring.
 */

export type CompulsiveWave = "A" | "B" | "C" | "D" | "E";

export type CompulsiveHub = {
  id: string;
  idea: number;
  wave: CompulsiveWave;
  path: string;
  title: string;
  sitemapPriority: number;
  changeFrequency: "daily" | "weekly" | "monthly";
};

export const COMPULSIVE_HUBS = [
  {
    id: "chennai-today",
    idea: 1,
    wave: "A",
    path: "/chennai-today",
    title: "Chennai today in 60 seconds",
    sitemapPriority: 0.9,
    changeFrequency: "daily",
  },
  {
    id: "petrol-vs-ev",
    idea: 7,
    wave: "A",
    path: "/guides/chennai-petrol-vs-ev-cost",
    title: "Petrol vs EV cost-of-day",
    sitemapPriority: 0.72,
    changeFrequency: "monthly",
  },
  {
    id: "ac-bill",
    idea: 8,
    wave: "A",
    path: "/guides/chennai-ac-bill-predictor",
    title: "AC bill predictor",
    sitemapPriority: 0.72,
    changeFrequency: "monthly",
  },
  {
    id: "afford-area",
    idea: 28,
    wave: "A",
    path: "/guides/chennai-afford-area-calculator",
    title: "Can I afford this area on my CTC?",
    sitemapPriority: 0.74,
    changeFrequency: "monthly",
  },
  {
    id: "which-chennai",
    idea: 9,
    wave: "B",
    path: "/guides/which-chennai-are-you",
    title: "Which Chennai are you?",
    sitemapPriority: 0.7,
    changeFrequency: "monthly",
  },
  {
    id: "rivalries",
    idea: 10,
    wave: "B",
    path: "/guides/chennai-area-rivalries",
    title: "Area rivalry cards",
    sitemapPriority: 0.65,
    changeFrequency: "monthly",
  },
  {
    id: "moved-checklist",
    idea: 11,
    wave: "B",
    path: "/guides/moved-to-chennai-checklist",
    title: "Moved to Chennai checklist",
    sitemapPriority: 0.72,
    changeFrequency: "monthly",
  },
  {
    id: "pg-red-flags",
    idea: 12,
    wave: "B",
    path: "/guides/chennai-pg-flatmate-red-flags",
    title: "PG / flatmate red flags",
    sitemapPriority: 0.68,
    changeFrequency: "monthly",
  },
  {
    id: "slang",
    idea: 26,
    wave: "B",
    path: "/guides/chennai-slang-decoder",
    title: "Chennai slang decoder",
    sitemapPriority: 0.7,
    changeFrequency: "monthly",
  },
  {
    id: "address-fixer",
    idea: 14,
    wave: "C",
    path: "/civic-tools/address-form-fixer",
    title: "Ward vs pincode fixer",
    sitemapPriority: 0.72,
    changeFrequency: "weekly",
  },
  {
    id: "streetlight",
    idea: 17,
    wave: "C",
    path: "/civic-tools/streetlight-dead-spots",
    title: "Streetlight dead-spots",
    sitemapPriority: 0.68,
    changeFrequency: "weekly",
  },
  {
    id: "property-tax",
    idea: 20,
    wave: "C",
    path: "/guides/chennai-property-tax-checklist",
    title: "Property tax overpay checklist",
    sitemapPriority: 0.7,
    changeFrequency: "monthly",
  },
  {
    id: "filter-coffee",
    idea: 21,
    wave: "D",
    path: "/guides/chennai-filter-coffee-map",
    title: "Filter coffee map",
    sitemapPriority: 0.68,
    changeFrequency: "monthly",
  },
  {
    id: "biryani",
    idea: 22,
    wave: "D",
    path: "/guides/chennai-biryani-bracket",
    title: "Biryani war bracket",
    sitemapPriority: 0.68,
    changeFrequency: "monthly",
  },
  {
    id: "temple-quiet",
    idea: 23,
    wave: "D",
    path: "/guides/chennai-temple-quiet-hours",
    title: "Temple quiet-hour guide",
    sitemapPriority: 0.66,
    changeFrequency: "monthly",
  },
  {
    id: "margazhi",
    idea: 25,
    wave: "D",
    path: "/guides/chennai-margazhi-this-week",
    title: "Margazhi kutcheri desk",
    sitemapPriority: 0.66,
    changeFrequency: "weekly",
  },
  {
    id: "used-vehicle",
    idea: 29,
    wave: "E",
    path: "/guides/chennai-used-vehicle-price-pulse",
    title: "Used vehicle price pulse",
    sitemapPriority: 0.66,
    changeFrequency: "monthly",
  },
  {
    id: "wedding-venue",
    idea: 30,
    wave: "E",
    path: "/guides/chennai-wedding-venue-costs",
    title: "Wedding venue cost reality",
    sitemapPriority: 0.66,
    changeFrequency: "monthly",
  },
] as const satisfies readonly CompulsiveHub[];

export type CompulsiveHubId = (typeof COMPULSIVE_HUBS)[number]["id"];

/** Non-civic paths only — `/civic-tools/*` already ships via `CIVIC_TOOL_SITEMAP_PATHS`. */
export const COMPULSIVE_SITEMAP_ENTRIES = COMPULSIVE_HUBS.filter(
  (h) => !h.path.startsWith("/civic-tools"),
).map((h) => ({
  path: h.path,
  priority: h.sitemapPriority,
  changeFrequency: h.changeFrequency,
}));

export function compulsivePath(id: CompulsiveHubId): string {
  const hub = COMPULSIVE_HUBS.find((h) => h.id === id);
  if (!hub) throw new Error(`Unknown compulsive hub: ${id}`);
  return hub.path;
}
