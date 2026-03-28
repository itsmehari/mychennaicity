import { getSiteUrl } from "@/lib/env";

/** Path to App Router default OG image (see `app/opengraph-image.tsx`). */
export const DEFAULT_OG_IMAGE_PATH = "/opengraph-image";

export function defaultOgImageAbsoluteUrl(): string {
  return new URL(DEFAULT_OG_IMAGE_PATH, getSiteUrl()).toString();
}

/** Optional comma-separated profile URLs for Organization JSON-LD (`sameAs`). */
export function orgSameAsUrls(): string[] {
  const raw = process.env.NEXT_PUBLIC_ORG_SAME_AS?.trim();
  if (!raw) return [];
  return raw
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}
