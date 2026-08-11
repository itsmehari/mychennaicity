import { getFestivalRichContent } from "@/content/special-events";
import type { PublicEventRow } from "@/domains/events";
import type { MockEvent } from "@/lib/home-mock";
import { getEventPosterImage } from "@/lib/events/event-poster-image";

export const EVENT_HUB_CATEGORIES = [
  { id: "all", label: "All" },
  { id: "today", label: "Today" },
  { id: "weekend", label: "This weekend" },
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

/** Calendar Y-M-D in Asia/Kolkata for a UTC instant. */
export function istYmd(date: Date): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: IST,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
}

/** Weekday short name in IST (Sun…Sat). */
function istWeekday(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: IST,
    weekday: "short",
  }).format(date);
}

/**
 * True if event start falls on “today” in IST.
 * Uses sortKey as epoch ms when available (DB cards).
 */
export function eventStartsToday(card: EventHubCardData, now = new Date()): boolean {
  if (!Number.isFinite(card.sortKey) || card.sortKey < 1_000_000_000_000) {
    return false;
  }
  return istYmd(new Date(card.sortKey)) === istYmd(now);
}

/**
 * True if event start is Sat or Sun in IST on the coming weekend window:
 * from today through the next Sunday (inclusive), only Sat/Sun days.
 */
export function eventStartsThisWeekend(
  card: EventHubCardData,
  now = new Date(),
): boolean {
  if (!Number.isFinite(card.sortKey) || card.sortKey < 1_000_000_000_000) {
    return false;
  }
  const start = new Date(card.sortKey);
  const day = istWeekday(start);
  if (day !== "Sat" && day !== "Sun") return false;

  const todayYmd = istYmd(now);
  const startYmd = istYmd(start);
  if (startYmd < todayYmd) return false;

  // Cap at end of the upcoming Sunday (approx 8 days ahead is enough).
  const horizon = new Date(now.getTime() + 8 * 24 * 60 * 60 * 1000);
  return startYmd <= istYmd(horizon);
}

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
    /concert|theatre|theater|music|dance|art|paint|creative|bollywood|candlelight|musical|sam vishal|stand-up|stand up|comedy|open mic|comedian|puppet|singalong|rave|dj|orchestra|grammy|carnatic|kutcheri|ghazal|baithak|mehfil|tabla|spoken.?word|indie/.test(
      text,
    )
  ) {
    tags.add("culture");
  }
  if (
    /award|lions|council|networking|startup|workshop|training|ecommerce|business|entrepreneur|meetup|magento|storage|seminar|tech|snia|property expo|rpa|kafka|freelancer|claude code|data science/.test(
      text,
    )
  ) {
    tags.add("business");
  }
  if (
    /exhibition|shopping|bazaar|market|craft|sale|festival|property|lifestyle|open mic for words|poetry|community|neighbourhood|gathering|local|marathon|run for|awareness run|kidzathon|kidathon|board games|meditation|wellness|baking|poker/.test(
      text,
    )
  ) {
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
  const poster = getEventPosterImage(ev.slug, ev.title, ev.description);
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
