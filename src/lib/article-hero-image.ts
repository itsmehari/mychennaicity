import type { PublicArticleRow } from "@/domains/news";

/** Stable placeholder per slug when DB has no hero (matches seed script). */
export function picsumHeroUrlForSlug(slug: string, width = 800, height = 500): string {
  return `https://picsum.photos/seed/${encodeURIComponent(slug)}/${width}/${height}`;
}

/**
 * Hero image for cards and OG. Uses `hero_image_url` when set; otherwise a deterministic Picsum URL.
 */
export function resolveArticleHeroSrc(article: Pick<PublicArticleRow, "slug" | "heroImageUrl">): string {
  const raw = article.heroImageUrl?.trim();
  if (raw && /^https?:\/\//i.test(raw)) {
    return raw;
  }
  return picsumHeroUrlForSlug(article.slug);
}

/** Hosts allowed in `next.config` `images.remotePatterns` — else use `<img>`. */
/** Accessible hero / thumbnail copy: title + topic + place (not decorative). */
export function articleHeroAlt(article: {
  title: string;
  category?: string | null;
}): string {
  const topic = article.category?.trim() || "Chennai";
  return `${article.title} — ${topic}, Chennai local news`;
}

export function articleHeroUsesNextImage(src: string): boolean {
  if (src.startsWith("/")) return true;
  try {
    const u = new URL(src);
    if (u.protocol !== "https:" && u.protocol !== "http:") return false;
    return (
      u.hostname === "picsum.photos" ||
      u.hostname === "fastly.picsum.photos" ||
      u.hostname === "images.unsplash.com" ||
      u.hostname === "pplx-res.cloudinary.com"
    );
  } catch {
    return false;
  }
}
