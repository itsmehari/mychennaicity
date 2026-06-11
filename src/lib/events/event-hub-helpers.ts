import { getFestivalRichContent } from "@/content/special-events";
import type { PublicEventRow } from "@/domains/events";
import type { MockEvent } from "@/lib/home-mock";
import { getEventPosterImage } from "@/lib/events/event-poster-image";

export const EVENT_HUB_CATEGORIES = [
  { id: "all", label: "All" },
  { id: "festivals", label: "Festivals" },
  { id: "culture", label: "Culture & arts" },
  { id: "community", label: "Community" },
  { id: "business", label: "Business & talks" },
  { id: "featured", label: "Featured" },
] as const;

export type EventHubCategoryId = (typeof EVENT_HUB_CATEGORIES)[number]["id"];

export type EventHubCardData = {
  id: string;
  title: string;
  href: string;
  external?: boolean;
  dateBadge: string;
  venueLine: string;
  statusLabel: string;
  statusTone: "accent" | "muted" | "external";
  imageSrc: string | null;
  imageAlt: string;
  placeholderTone: "festival" | "culture" | "business" | "community" | "default";
  tags: EventHubCategoryId[];
  featured: boolean;
  sortKey: number;
};

const IST = "Asia/Kolkata";

export function formatEventDateBadge(date: Date): string {
  return date.toLocaleString("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
    timeZone: IST,
  });
}

function inferTagsFromText(
  title: string,
  description: string | null | undefined,
  presentationKey: string | null | undefined,
  featured: boolean,
): EventHubCategoryId[] {
  const tags = new Set<EventHubCategoryId>(["all"]);
  if (featured) tags.add("featured");
  if (presentationKey === "festival_rich") tags.add("festivals");

  const text = `${title} ${description ?? ""}`.toLowerCase();
  if (/festival|utsavam|temple|panguni|ther|kapaleeshwar|peruvizha|vaibhavam/.test(text)) {
    tags.add("festivals");
  }
  if (
    /concert|theatre|music|dance|art|paint|creative|bollywood|candlelight|musical|sam vishal/.test(
      text,
    )
  ) {
    tags.add("culture");
  }
  if (/award|lions|council|networking|startup|workshop|training|ecommerce|business|entrepreneur/.test(text)) {
    tags.add("business");
  }
  if (/meetup|community|neighbourhood|gathering|local/.test(text)) {
    tags.add("community");
  }

  if (tags.size === 1) tags.add("community");
  return Array.from(tags);
}

function inferPlaceholderTone(
  tags: EventHubCategoryId[],
): EventHubCardData["placeholderTone"] {
  if (tags.includes("festivals")) return "festival";
  if (tags.includes("culture")) return "culture";
  if (tags.includes("business")) return "business";
  if (tags.includes("community")) return "community";
  return "default";
}

function resolveEventImage(
  ev: PublicEventRow,
): { src: string; alt: string } | null {
  if (ev.contentRef?.trim()) {
    const content = getFestivalRichContent(ev.contentRef);
    if (content?.gallery[0]?.src) {
      return { src: content.gallery[0].src, alt: content.gallery[0].alt };
    }
    if (content?.seo.ogImageUrl) {
      return { src: content.seo.ogImageUrl, alt: ev.title };
    }
  }
  const poster = getEventPosterImage(ev.slug, ev.title);
  if (poster) return poster;
  return null;
}

function venueLineFromEvent(ev: PublicEventRow): string {
  const parts = [ev.venueName?.trim(), ev.localityLabel?.trim()].filter(Boolean);
  if (parts.length) return parts.join(", ");
  return "Chennai";
}

export function buildHubCardFromDb(ev: PublicEventRow): EventHubCardData {
  const tags = inferTagsFromText(
    ev.title,
    ev.description,
    ev.presentationKey,
    ev.featured,
  );
  const image = resolveEventImage(ev);

  return {
    id: ev.id,
    title: ev.title,
    href: `/chennai-local-events/${ev.slug}`,
    dateBadge: formatEventDateBadge(ev.startsAt),
    venueLine: venueLineFromEvent(ev),
    statusLabel: "See details",
    statusTone: "accent",
    imageSrc: image?.src ?? null,
    imageAlt: image?.alt ?? ev.title,
    placeholderTone: inferPlaceholderTone(tags),
    tags,
    featured: ev.featured,
    sortKey: ev.startsAt.getTime(),
  };
}

function mockDateBadge(when: string): string {
  const bit = when.split("·")[0]?.trim() ?? when;
  return bit.length > 24 ? `${bit.slice(0, 22)}…` : bit;
}

function inferMockTags(e: MockEvent): EventHubCategoryId[] {
  const tags = new Set<EventHubCategoryId>(["all"]);
  const text = `${e.title} ${e.when} ${e.where}`.toLowerCase();
  if (/festival|utsavam|temple|panguni|kapaleeshwar|vaibhavam/.test(text)) {
    tags.add("festivals");
  }
  if (/concert|theatre|music|dance|bollywood|candlelight|rajadhiraaj|sam vishal/.test(text)) {
    tags.add("culture");
  }
  if (/award|champions|lions/.test(text)) tags.add("business");
  if (tags.size === 1) tags.add("community");
  return Array.from(tags);
}

export function buildHubCardFromMock(e: MockEvent, index: number): EventHubCardData {
  const tags = inferMockTags(e);
  const featured = index === 0;

  return {
    id: `${e.href}-${e.title}`,
    title: e.title,
    href: e.href,
    external: e.external,
    dateBadge: mockDateBadge(e.when),
    venueLine: e.where,
    statusLabel: e.external ? "Tickets ↗" : "See details",
    statusTone: e.external ? "external" : "accent",
    imageSrc: null,
    imageAlt: e.title,
    placeholderTone: inferPlaceholderTone(
      featured ? [...tags, "featured"] : tags,
    ),
    tags: featured ? [...new Set([...tags, "featured" as const])] : tags,
    featured,
    sortKey: index,
  };
}

export function groupHubCards(cards: EventHubCardData[]): {
  featured: EventHubCardData[];
  upcoming: EventHubCardData[];
} {
  const featured = cards.filter((c) => c.featured);
  const upcoming = cards.filter((c) => !c.featured);
  return { featured, upcoming };
}
