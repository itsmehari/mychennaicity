import { getSiteUrl } from "@/lib/env";

export type EventPosterSpec = {
  src: string;
  alt: string;
};

/**
 * Self-hosted event posters under `public/images/events/`.
 * Add an entry when you drop `{slug}.jpg` (or another path) for a listing.
 */
const POSTERS_BY_SLUG: Record<string, EventPosterSpec> = {
  "tote-bag-paint-and-play-thinnai-porur-june-2026": {
    src: "/images/events/tote-bag-paint-and-play-thinnai-porur-june-2026.jpg",
    alt: "Tote Bag Paint and Play poster — Thinnai board games café, Madhanandapuram, Porur, Chennai, 13 June 2026",
  },
};

export function getEventPosterImage(
  slug: string,
  fallbackTitle?: string,
): EventPosterSpec | null {
  const hit = POSTERS_BY_SLUG[slug.trim()];
  if (hit) return hit;
  if (!fallbackTitle?.trim()) return null;
  return null;
}

export function eventPosterAbsoluteUrl(slug: string): string | null {
  const poster = getEventPosterImage(slug);
  if (!poster) return null;
  return new URL(poster.src, getSiteUrl()).toString();
}
