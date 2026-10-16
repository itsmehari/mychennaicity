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

export function classifiedCoverAbsoluteUrl(
  imageUrls: string[] | null | undefined,
): string | null {
  const src = classifiedCoverSrc(imageUrls);
  if (!src) return null;
  if (src.startsWith("/")) return `${getSiteUrl()}${src}`;
  return src;
}
