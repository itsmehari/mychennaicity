import { getSiteUrl } from "@/lib/env";

export function classifiedImageUrls(
  imageUrls: string[] | null | undefined,
): string[] {
  if (!Array.isArray(imageUrls)) return [];
  return imageUrls
    .map((u) => u.trim())
    .filter((u) => u.startsWith("/") || /^https?:\/\//i.test(u));
}

export function classifiedCoverSrc(
  imageUrls: string[] | null | undefined,
): string | null {
  return classifiedImageUrls(imageUrls)[0] ?? null;
}

/** Walkthrough hosted under /videos/classifieds/ and ending in .mp4. */
export function classifiedVideoSrc(url: string | null | undefined): string | null {
  const value = url?.trim() ?? "";
  if (!value.startsWith("/videos/classifieds/") || !value.endsWith(".mp4")) return null;
  if (value.includes("..") || value.includes("//")) return null;
  return value;
}

export function classifiedCoverAbsoluteUrl(
  imageUrls: string[] | null | undefined,
): string | null {
  const src = classifiedCoverSrc(imageUrls);
  if (!src) return null;
  if (src.startsWith("/")) return `${getSiteUrl()}${src}`;
  return src;
}
