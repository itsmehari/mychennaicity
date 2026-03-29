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

export function articleLayoutVariantForSlug(slug: string): ArticleLayoutVariant {
  let h = 0;
  for (let i = 0; i < slug.length; i++) {
    h = (Math.imul(31, h) + slug.charCodeAt(i)) | 0;
  }
  const idx = Math.abs(h) % ARTICLE_LAYOUT_VARIANTS.length;
  return ARTICLE_LAYOUT_VARIANTS[idx]!;
}
