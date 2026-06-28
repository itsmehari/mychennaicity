/**
 * Stable per-slug layout variant for article detail pages.
 * All standard articles use the Civic Editorial Explainer layout.
 */
export const ARTICLE_LAYOUT_VARIANTS = [
  "civic-editorial",
  "masthead",
  "metro-columns",
  "feature-ribbon",
  "editorial-grid",
] as const;

export type ArticleLayoutVariant = (typeof ARTICLE_LAYOUT_VARIANTS)[number];

/** Long-form government / transfer desks — stable civic layout. */
const SLUG_LAYOUT_OVERRIDES: Partial<Record<string, ArticleLayoutVariant>> = {
  "tamil-nadu-ias-reshuffle-collectors-may-2026": "civic-editorial",
  "tamil-nadu-cabinet-portfolios-may-2026": "civic-editorial",
  "tamil-nadu-fiscal-white-paper-2026-debt-revenue-deficit-analysis": "civic-editorial",
  "international-yoga-day-2026-chennai-yoga-for-healthy-ageing": "civic-editorial",
  "ozone-greens-perumbakkam-power-crisis-generator-electricity-issue": "civic-editorial",
  "tiruvallur-ammonia-leak-seafood-unit-seven-dead-2026": "civic-editorial",
  "namma-arasu-whatsapp-chatbot-tamil-nadu-2026": "civic-editorial",
};

export function articleLayoutVariantForSlug(slug: string): ArticleLayoutVariant {
  const override = SLUG_LAYOUT_OVERRIDES[slug];
  if (override) return override;
  return "civic-editorial";
}
