import type { PublicArticleRow } from "@/domains/news";
import type { SiteModalPoolItem } from "@/config/site-modals";

const FALLBACK_IMAGE = "/images/explore-chennai-madras-high-court.jpg";

export function articlesToModalPool(
  rows: PublicArticleRow[],
): SiteModalPoolItem[] {
  return rows.map((row) => ({
    slug: row.slug,
    title: row.title,
    summary: (row.summary || row.dek || "").trim().slice(0, 220),
    category: row.category || "News",
    image: row.heroImageUrl?.trim() || FALLBACK_IMAGE,
    url: `/chennai-local-news/${row.slug}`,
  }));
}

/** Skip the story the reader is already on (MyOMR pattern). */
export function pickPoolItem(
  pool: SiteModalPoolItem[],
  newsIndex: number,
  pathname: string,
): { item: SiteModalPoolItem | null; nextIndex: number } {
  if (pool.length === 0) return { item: null, nextIndex: newsIndex };

  const currentSlug = pathname.match(
    /^\/chennai-local-news\/([^/]+)\/?$/,
  )?.[1];

  let idx = ((newsIndex % pool.length) + pool.length) % pool.length;
  for (let i = 0; i < pool.length; i++) {
    const candidate = pool[(idx + i) % pool.length];
    if (currentSlug && candidate.slug === currentSlug) continue;
    return {
      item: candidate,
      nextIndex: (idx + i + 1) % pool.length,
    };
  }
  return { item: null, nextIndex: (idx + 1) % pool.length };
}
