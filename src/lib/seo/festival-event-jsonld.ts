import type { PublicEventRow } from "@/domains/events";
import type { FestivalRichContent } from "@/content/special-events/types";
import { getSiteUrl } from "@/lib/env";

/** Rich Event JSON-LD with geo, image, optional organizer — does not replace `buildEventJsonLd` for standard pages. */
export function buildFestivalRichEventJsonLd(
  event: PublicEventRow,
  content: FestivalRichContent,
) {
  const base = getSiteUrl();
  const url = `${base}/chennai-local-events/${event.slug}`;
  const start = event.startsAt.toISOString();
  const end = (event.endsAt ?? event.startsAt).toISOString();

  const loc: Record<string, unknown> = {
    "@type": "Place",
    name: event.venueName ?? "Sri Kapaleeshwarar Temple, Mylapore",
  };

  const street = event.venueAddress?.trim();
  const locality = event.localityLabel?.trim() || "Mylapore";
  loc.address = {
    "@type": "PostalAddress",
    ...(street ? { streetAddress: street } : {}),
    addressLocality: locality,
    addressRegion: "Tamil Nadu",
    addressCountry: "IN",
  };

  if (content.placeGeo) {
    loc.geo = {
      "@type": "GeoCoordinates",
      latitude: content.placeGeo.lat,
      longitude: content.placeGeo.lng,
    };
  }

  const orgName = content.organizerName?.trim();
  const organizer = orgName
    ? {
        "@type": "Organization" as const,
        name: orgName,
      }
    : undefined;

  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.title,
    description:
      content.seo.metaDescription.trim() ||
      content.answerFirstParagraphs.join(" ").slice(0, 2000) ||
      event.title,
    startDate: start,
    endDate: end,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: loc,
    url,
    image: [content.seo.ogImageUrl],
    ...(organizer ? { organizer } : {}),
  };
}

export function buildFaqPageJsonLdFromItems(
  items: { question: string; answer: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}
