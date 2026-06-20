import type { PublicArticleRow } from "@/domains/news";
import { getSiteUrl } from "@/lib/env";

/** Site-owned editorial fallback when DB has no hero (matches seed script). */
export const DEFAULT_ARTICLE_HERO_PATH = "/images/explore-chennai-madras-high-court.jpg";

/** @deprecated Use {@link defaultArticleHeroPath} — Picsum is not used on public pages. */
export function picsumHeroUrlForSlug(slug: string, width = 800, height = 500): string {
  void slug;
  void width;
  void height;
  return DEFAULT_ARTICLE_HERO_PATH;
}

export function defaultArticleHeroPath(): string {
  return DEFAULT_ARTICLE_HERO_PATH;
}

const NEXT_IMAGE_REMOTE_HOSTS = new Set([
  "picsum.photos",
  "fastly.picsum.photos",
  "images.unsplash.com",
  "pplx-res.cloudinary.com",
  "images.news9live.com",
  "img-cdn.publive.online",
  "metrorailnews.in",
  "static.amazon.jobs",
  "thumbs.dreamstime.com",
  "pbs.twimg.com",
  "www.adotrip.com",
  "dc-cdn.s3-ap-southeast-1.amazonaws.com",
  "assets.vccircle.com",
  "images.samsung.com",
  "imagesvs.oneindia.com",
  "upload.wikimedia.org",
  "s3.ap-south-1.amazonaws.com",
]);

/**
 * Raw `hero_image_url` from DB: external https URL or site path (`/images/...`).
 * Returns null when empty or unrecognized.
 */
export function normalizeArticleHeroUrl(
  heroImageUrl: string | null | undefined,
): string | null {
  const raw = heroImageUrl?.trim();
  if (!raw) return null;
  if (/^https?:\/\//i.test(raw)) {
    return raw.replace(/^http:\/\//i, "https://");
  }
  if (raw.startsWith("/")) return raw;
  return null;
}

/**
 * Hero src for `<Image>` / `<img>`: external URL as-is; same-origin absolute URLs
 * become paths; relative paths unchanged; else Picsum fallback.
 */
export function resolveArticleHeroSrc(
  article: Pick<PublicArticleRow, "slug" | "heroImageUrl">,
): string {
  const normalized = normalizeArticleHeroUrl(article.heroImageUrl);
  if (!normalized) {
    return defaultArticleHeroPath();
  }

  if (normalized.startsWith("/")) {
    return normalized;
  }

  try {
    const origin = getSiteUrl();
    const parsed = new URL(normalized);
    if (parsed.origin === origin) {
      return `${parsed.pathname}${parsed.search}`;
    }
  } catch {
    /* fall through */
  }

  return normalized;
}

/** Absolute URL for Open Graph, JSON-LD, and RSS. */
export function resolveArticleHeroAbsoluteUrl(
  article: Pick<PublicArticleRow, "slug" | "heroImageUrl">,
): string {
  const src = resolveArticleHeroSrc(article);
  if (src.startsWith("/")) {
    return `${getSiteUrl()}${src}`;
  }
  return src;
}

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
    return NEXT_IMAGE_REMOTE_HOSTS.has(u.hostname);
  } catch {
    return false;
  }
}
