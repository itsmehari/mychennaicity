/**
 * Must stay in sync with `title.template` in `src/app/layout.tsx`.
 * Page `metadata.title` strings are segments; the root layout appends this suffix.
 */
export const SITE_TITLE_SUFFIX = " · mychennaicity.in";

export const SITE_TITLE_TEMPLATE = `%s${SITE_TITLE_SUFFIX}`;

/** Full `<title>` / OG / Twitter title for a page segment (after template applied). */
export function fullSiteTitle(segment: string): string {
  return `${segment.trimEnd()}${SITE_TITLE_SUFFIX}`;
}

const ARTICLE_TITLE_TAIL = " · Chennai local news";

/**
 * Shorten a long headline so the full document title stays near SERP-friendly length.
 * Full title = headline + ARTICLE_TITLE_TAIL + SITE_TITLE_SUFFIX.
 */
export function clipArticleHeadlineForTitle(
  headline: string,
  maxTotal = 68,
): string {
  const tail = `${ARTICLE_TITLE_TAIL}${SITE_TITLE_SUFFIX}`;
  const budget = Math.max(24, maxTotal - tail.length);
  const t = headline.trim();
  if (t.length <= budget) return t;
  return `${t.slice(0, budget - 1).trimEnd()}…`;
}
