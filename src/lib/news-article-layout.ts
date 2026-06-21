/**
 * Stable per-slug layout variant for article detail pages (newspaper-style shells).
 * Same article always maps to the same variant (SSR-safe, cache-friendly).
 */
export const ARTICLE_LAYOUT_VARIANTS = [
  "masthead",
  "metro-columns",
  "feature-ribbon",
  "editorial-grid",
] as const;

export type ArticleLayoutVariant = (typeof ARTICLE_LAYOUT_VARIANTS)[number];

/** Long-form government / transfer desks — stable masthead layout. */
const SLUG_LAYOUT_OVERRIDES: Partial<Record<string, ArticleLayoutVariant>> = {
  "tamil-nadu-ias-reshuffle-collectors-may-2026": "masthead",
  "tamil-nadu-cabinet-portfolios-may-2026": "masthead",
  "tamil-nadu-fiscal-white-paper-2026-debt-revenue-deficit-analysis": "masthead",
  "international-yoga-day-2026-chennai-yoga-for-healthy-ageing": "feature-ribbon",
  "ozone-greens-perumbakkam-power-crisis-generator-electricity-issue": "masthead",
  "tiruvallur-ammonia-leak-seafood-unit-seven-dead-2026": "masthead",
};

export function articleLayoutVariantForSlug(slug: string): ArticleLayoutVariant {
  const override = SLUG_LAYOUT_OVERRIDES[slug];
  if (override) return override;

  let h = 0;
  for (let i = 0; i < slug.length; i++) {
    h = (Math.imul(31, h) + slug.charCodeAt(i)) | 0;
  }
  const idx = Math.abs(h) % ARTICLE_LAYOUT_VARIANTS.length;
  return ARTICLE_LAYOUT_VARIANTS[idx]!;
}
