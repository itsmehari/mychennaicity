import { getSiteUrl } from "@/lib/env";

export type EventPosterSpec = {
  src: string;
  alt: string;
};

/** Self-hosted event posters keyed by event slug. Add a row when a flyer is supplied. */
const POSTERS_BY_SLUG: Record<string, EventPosterSpec> = {
  "kathakali-tamil-solo-play-restore-kottivakkam-june-2026": {
    src: "/images/events/kathakali-restore-kottivakkam-june-2026.png",
    alt: "Kathakali Tamil solo play poster — Seetha Lakshmi at reStore, Kottivakkam, Chennai, 27 June 2026",
  },
  "tote-bag-paint-and-play-thinnai-porur-june-2026": {
    src: "/images/events/tote-bag-paint-and-play-thinnai-porur-june-2026.jpg",
    alt: "Tote Bag Paint and Play poster — Thinnai board games café, Madhanandapuram, Porur, Chennai, 13 June 2026",
  },
  "jolly-phonics-workshop-tweeties-online-july-2026": {
    src: "/images/events/jolly-phonics-workshop-tweeties-july-2026.jpg",
    alt: "Jolly Phonics Workshop poster — Tweeties Institute of Education and Jolly Learning, 8-day online training July 2026",
  },
  "grand-vegetable-exhibition-heirloom-seed-festival-t-nagar-july-2026": {
    src: "/images/events/grand-vegetable-exhibition-heirloom-seed-festival-t-nagar-july-2026.png",
    alt: "Grand Vegetable Exhibition and Heirloom Seed Festival poster — Thakkar Baba Vidyalaya School, T. Nagar, Chennai, 26 July 2026",
  },
  "myavtar-sheworks-career-fair-mop-vaishnav-july-2026": {
    src: "/images/events/myavtar-sheworks-career-fair-mop-vaishnav-july-2026.png",
    alt: "myAvtar SheWorks Career Fair poster — MOP Vaishnav College for Women, Nungambakkam, Chennai, 4 July 2026",
  },
  "print-expo-chennai-trade-centre-july-2026": {
    src: "/images/events/print-expo-chennai-trade-centre-july-2026.png",
    alt: "Print Expo Chennai poster — South India prints here, Chennai Trade Centre, 9–11 July 2026",
  },
  "seafood-expo-bharat-chennai-trade-centre-july-2026": {
    src: "/images/events/seafood-expo-bharat-chennai-trade-centre-july-2026.png",
    alt: "Seafood Expo Bharat 2026 poster — Connect. Discover. Grow., Chennai Trade Centre, 1–3 July 2026",
  },
};

export function getRegisteredEventPoster(slug: string): EventPosterSpec | null {
  return POSTERS_BY_SLUG[slug.trim()] ?? null;
}

/** Returns a poster only when one is explicitly registered for the slug. */
export function getEventPosterImage(
  slug: string,
  _fallbackTitle?: string,
  _description?: string | null,
): EventPosterSpec | null {
  return getRegisteredEventPoster(slug);
}

export function hasEventPosterImage(slug: string): boolean {
  return getRegisteredEventPoster(slug) !== null;
}

export function eventPosterAbsoluteUrl(
  slug: string,
  title?: string,
  description?: string | null,
): string | null {
  const poster = getEventPosterImage(slug, title, description);
  if (!poster) return null;
  return new URL(poster.src, getSiteUrl()).toString();
}
