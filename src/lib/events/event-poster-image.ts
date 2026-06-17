import { extractCategoryFromDescription } from "@/lib/events/event-detail-helpers";
import { getSiteUrl } from "@/lib/env";

export type EventPosterSpec = {
  src: string;
  alt: string;
};

const POSTERS_BY_SLUG: Record<string, EventPosterSpec> = {
  "tote-bag-paint-and-play-thinnai-porur-june-2026": {
    src: "/images/events/tote-bag-paint-and-play-thinnai-porur-june-2026.jpg",
    alt: "Tote Bag Paint and Play poster — Thinnai board games café, Madhanandapuram, Porur, Chennai, 13 June 2026",
  },
  "jolly-phonics-workshop-tweeties-online-july-2026": {
    src: "/images/events/jolly-phonics-workshop-tweeties-july-2026.jpg",
    alt: "Jolly Phonics Workshop poster — Tweeties Institute of Education and Jolly Learning, 8-day online training July 2026",
  },
};

const CATEGORY_PLACEHOLDER: Record<string, EventPosterSpec> = {
  "live music": {
    src: "/images/events/placeholders/live-music.svg",
    alt: "Live music event in Chennai",
  },
  comedy: {
    src: "/images/events/placeholders/comedy.svg",
    alt: "Stand-up comedy event in Chennai",
  },
  exhibition: {
    src: "/images/events/placeholders/exhibition.svg",
    alt: "Exhibition or shopping event in Chennai",
  },
  theatre: {
    src: "/images/events/placeholders/theatre.svg",
    alt: "Theatre or family event in Chennai",
  },
  meetup: {
    src: "/images/events/placeholders/meetup.svg",
    alt: "Community or business meetup in Chennai",
  },
};

function categoryPlaceholder(
  category: string | null,
  title: string,
): EventPosterSpec | null {
  const c = (category ?? "").toLowerCase();
  if (/music|concert|rave|singalong|orchestra/.test(c)) {
    return { ...CATEGORY_PLACEHOLDER["live music"]!, alt: `${title} — live music in Chennai` };
  }
  if (/comedy|stand-up|open mic/.test(c)) {
    return { ...CATEGORY_PLACEHOLDER.comedy!, alt: `${title} — comedy in Chennai` };
  }
  if (/exhibition|shopping|lifestyle|property|bazaar|sale/.test(c)) {
    return { ...CATEGORY_PLACEHOLDER.exhibition!, alt: `${title} — exhibition in Chennai` };
  }
  if (/theatre|theater|family|puppet/.test(c)) {
    return { ...CATEGORY_PLACEHOLDER.theatre!, alt: `${title} — theatre in Chennai` };
  }
  if (/meetup|tech|business|community/.test(c)) {
    return { ...CATEGORY_PLACEHOLDER.meetup!, alt: `${title} — meetup in Chennai` };
  }
  return null;
}

export function getEventPosterImage(
  slug: string,
  fallbackTitle?: string,
  description?: string | null,
): EventPosterSpec | null {
  const hit = POSTERS_BY_SLUG[slug.trim()];
  if (hit) return hit;

  const category = extractCategoryFromDescription(description ?? "");
  const fromCategory = categoryPlaceholder(category, fallbackTitle ?? "Chennai event");
  if (fromCategory) return fromCategory;

  if (!fallbackTitle?.trim()) return null;
  return null;
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
