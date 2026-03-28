import type { PublicEventRow } from "@/domains/events";
import { getSiteUrl } from "@/lib/env";
import { defaultOgImageAbsoluteUrl } from "@/lib/seo/site-defaults";

function plainDescription(raw: string | null | undefined, max = 5000): string {
  if (!raw?.trim()) return "";
  return raw
    .replace(/\*\*(.+?)\*\*/g, "$1")
    .replace(/^#+\s+/gm, "")
    .trim()
    .slice(0, max);
}

export function buildEventJsonLd(event: PublicEventRow) {
  const base = getSiteUrl();
  const url = `${base}/chennai-local-events/${event.slug}`;
  const start = event.startsAt.toISOString();
  const end = (event.endsAt ?? event.startsAt).toISOString();
  const loc: Record<string, unknown> = {
    "@type": "Place",
    name: event.venueName ?? "Chennai",
  };
  if (event.venueAddress?.trim()) {
    loc.address = {
      "@type": "PostalAddress",
      streetAddress: event.venueAddress.trim(),
      addressLocality: event.localityLabel?.trim() || "Chennai",
      addressRegion: "Tamil Nadu",
      addressCountry: "IN",
    };
  } else if (event.localityLabel?.trim()) {
    loc.address = {
      "@type": "PostalAddress",
      addressLocality: event.localityLabel.trim(),
      addressRegion: "Tamil Nadu",
      addressCountry: "IN",
    };
  }

  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.title,
    description: plainDescription(event.description) || event.title,
    startDate: start,
    endDate: end,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: loc,
    url,
    image: defaultOgImageAbsoluteUrl(),
  };
}

export function buildEventBreadcrumbJsonLd(
  slug: string,
  title: string,
) {
  const base = getSiteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: base,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Chennai local events",
        item: `${base}/chennai-local-events`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: title,
        item: `${base}/chennai-local-events/${slug}`,
      },
    ],
  };
}
