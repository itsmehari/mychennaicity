import { getSiteUrl } from "@/lib/env";

/** English slug → Tamil twin slug (`-tamil` suffix). */
export const ARTICLE_TAMIL_TWINS: Record<string, string> = {
  "gcc-suspends-property-tax-reassessment-august-2026":
    "gcc-suspends-property-tax-reassessment-august-2026-tamil",
  "chennai-mayor-el-nino-50cm-northeast-monsoon-warning-august-2026":
    "chennai-mayor-el-nino-50cm-northeast-monsoon-warning-august-2026-tamil",
  "cmrl-water-metro-ennore-mahabalipuram-feasibility-august-2026":
    "cmrl-water-metro-ennore-mahabalipuram-feasibility-august-2026-tamil",
  "chennai-independence-day-2026-security-airport-red-zone":
    "chennai-independence-day-2026-security-airport-red-zone-tamil",
  "chennai-weekend-watch-independence-day-tax-rain-monday-august-2026":
    "chennai-weekend-watch-independence-day-tax-rain-monday-august-2026-tamil",
  "chennai-metro-nilgiri-tbm-breakthrough-moolakadai-2026":
    "chennai-metro-nilgiri-tbm-breakthrough-moolakadai-2026-tamil",
};

const TAMIL_TO_EN: Record<string, string> = Object.fromEntries(
  Object.entries(ARTICLE_TAMIL_TWINS).map(([en, ta]) => [ta, en]),
);

export function isTamilArticleSlug(slug: string): boolean {
  return slug.endsWith("-tamil") || slug in TAMIL_TO_EN;
}

export function articleInLanguage(slug: string): "en-IN" | "ta-IN" {
  return isTamilArticleSlug(slug) ? "ta-IN" : "en-IN";
}

export function englishSlugForArticle(slug: string): string {
  return TAMIL_TO_EN[slug] ?? slug;
}

export function tamilSlugForArticle(slug: string): string | undefined {
  if (TAMIL_TO_EN[slug]) return slug;
  return ARTICLE_TAMIL_TWINS[slug];
}

export function articleLanguageAlternates(
  slug: string,
): { "en-IN": string; "ta-IN": string; "x-default": string } | undefined {
  const enSlug = englishSlugForArticle(slug);
  const taSlug = tamilSlugForArticle(slug) ?? TAMIL_TO_EN[slug];
  if (!taSlug || !ARTICLE_TAMIL_TWINS[enSlug]) return undefined;
  const base = getSiteUrl();
  const en = `${base}/chennai-local-news/${enSlug}`;
  const ta = `${base}/chennai-local-news/${taSlug}`;
  return { "en-IN": en, "ta-IN": ta, "x-default": en };
}
