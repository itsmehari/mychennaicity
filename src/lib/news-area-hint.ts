/**
 * Optional editorial hint: DB `area_hub_slug` or category → macro area hub.
 * See docs/CONTENT_ARCHITECTURE.md.
 */
import type { PublicArticleRow } from "@/domains/news";
import { chennaiZones } from "@/lib/chennai-zones";

const CATEGORY_TO_AREA_SLUG: Record<string, string> = {
  Chennai: "teynampet-nungambakkam",
  Politics: "teynampet-nungambakkam",
  Elections: "kodambakkam-t-nagar",
  Economy: "saidapet-guindy-alandur",
  Consumer: "kodambakkam-t-nagar",
  Mobility: "saidapet-guindy-alandur",
};

const ZONE_SLUGS = new Set(chennaiZones.map((z) => z.slug));

export function normalizeAreaHubSlug(
  raw: string | null | undefined,
): string | null {
  const s = raw?.trim();
  if (!s) return null;
  return ZONE_SLUGS.has(s) ? s : null;
}

export function areaHubSlugForCategory(
  category: string | null | undefined,
): string | null {
  if (!category?.trim()) return null;
  return CATEGORY_TO_AREA_SLUG[category.trim()] ?? null;
}

/** Prefer `articles.area_hub_slug` when valid; else category map. */
export function areaHubSlugForArticle(
  article: Pick<PublicArticleRow, "areaHubSlug" | "category">,
): string | null {
  const fromDb = normalizeAreaHubSlug(article.areaHubSlug);
  if (fromDb) return fromDb;
  return areaHubSlugForCategory(article.category);
}
