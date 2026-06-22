import { revalidatePath } from "next/cache";
import { revalidateSitemapSurfaces } from "@/lib/revalidate-sitemap-surfaces";

/** Paths that list or surface published Chennai articles. */
const NEWS_LIST_PATHS = ["/", "/chennai-local-news"] as const;

/**
 * Bust Next.js full-route cache for home + news hub (and one article when provided).
 * Safe to call after DB seeds or future admin publish — listing reads hit Neon directly.
 */
export function revalidateNewsSurfaces(articleSlug?: string): void {
  for (const path of NEWS_LIST_PATHS) {
    revalidatePath(path);
  }
  if (articleSlug?.trim()) {
    revalidatePath(`/chennai-local-news/${articleSlug.trim()}`);
  }
  revalidateSitemapSurfaces();
  revalidatePath("/chennai-local-news/feed.xml");
}
