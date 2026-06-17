import type { PublicEventRow } from "@/domains/events";
import {
  extractBookingUrlFromDescription,
  extractOrganizerFromDescription,
  extractPerformerFromTitle,
} from "@/lib/events/event-detail-helpers";
import { eventPosterAbsoluteUrl } from "@/lib/events/event-poster-image";
import { getSiteUrl } from "@/lib/env";
import { defaultOgImageAbsoluteUrl } from "@/lib/seo/site-defaults";

/** Approximate locality centres for Event `location.geo` (not cadastral). */
const LOCALITY_GEO: Record<string, { lat: number; lng: number }> = {
  mylapore: { lat: 13.034, lng: 80.2707 },
  porur: { lat: 13.035, lng: 80.158 },
  sholinganallur: { lat: 13.006, lng: 80.220 },
  teynampet: { lat: 13.041, lng: 80.251 },
  royapettah: { lat: 13.052, lng: 80.262 },
  alwarpet: { lat: 13.043, lng: 80.256 },
  kodambakkam: { lat: 13.052, lng: 80.225 },
  guindy: { lat: 13.006, lng: 80.220 },
  egmore: { lat: 13.073, lng: 80.261 },
  nungambakkam: { lat: 13.06, lng: 80.242 },
  velachery: { lat: 12.98, lng: 80.22 },
  adyar: { lat: 13.006, lng: 80.257 },
  chetpet: { lat: 13.074, lng: 80.241 },
  nandanam: { lat: 13.029, lng: 80.24 },
  thoraipakkam: { lat: 12.945, lng: 80.238 },
  taramani: { lat: 13.011, lng: 80.237 },
  anna: { lat: 13.085, lng: 80.27 },
};

function plainDescription(raw: string | null | undefined, max = 5000): string {
  if (!raw?.trim()) return "";
  return raw
    .replace(/\*\*(.+?)\*\*/g, "$1")
    .replace(/^#+\s+/gm, "")
    .trim()
    .slice(0, max);
}

function localityGeo(locality: string | null | undefined): {
  lat: number;
  lng: number;
} | null {
  const key = locality?.trim().toLowerCase() ?? "";
  if (!key) return null;
  for (const [name, coords] of Object.entries(LOCALITY_GEO)) {
    if (key.includes(name)) return coords;
  }
  return { lat: 13.0827, lng: 80.2707 };
}

function buildEventLocation(event: PublicEventRow): Record<string, unknown> {
  const loc: Record<string, unknown> = {
    "@type": "Place",
    name: event.venueName?.trim() || event.localityLabel?.trim() || "Chennai",
  };
  const geo = localityGeo(event.localityLabel);
  if (geo) {
    loc.geo = {
      "@type": "GeoCoordinates",
      latitude: geo.lat,
      longitude: geo.lng,
    };
  }
  if (event.venueAddress?.trim()) {
    loc.address = {
      "@type": "PostalAddress",
      streetAddress: event.venueAddress.trim(),
      addressLocality: event.localityLabel?.trim() || "Chennai",
      addressRegion: "Tamil Nadu",
      postalCode: extractPostalCode(event.venueAddress),
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
  return loc;
}

function extractPostalCode(address: string): string | undefined {
  const m = address.match(/\b(\d{6})\b/);
  return m?.[1];
}

/** Core Event node — embed in hub ItemList or wrap with @context on detail pages. */
export function buildEventSchemaNode(event: PublicEventRow): Record<string, unknown> {
  const base = getSiteUrl();
  const url = `${base}/chennai-local-events/${event.slug}`;
  const start = event.startsAt.toISOString();
  const end = (event.endsAt ?? event.startsAt).toISOString();
  const bookingUrl = extractBookingUrlFromDescription(event.description);
  const organizerName = extractOrganizerFromDescription(event.description);
  const performerName = extractPerformerFromTitle(event.title);
  const imageUrl =
    eventPosterAbsoluteUrl(event.slug, event.title, event.description) ??
    defaultOgImageAbsoluteUrl();

  const payload: Record<string, unknown> = {
    "@type": "Event",
    "@id": `${url}#event`,
    name: event.title,
    description: plainDescription(event.description) || event.title,
    startDate: start,
    endDate: end,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: buildEventLocation(event),
    url,
    image: imageUrl,
    isAccessibleForFree: /free entry/i.test(event.description ?? ""),
  };

  if (organizerName) {
    payload.organizer = {
      "@type": "Organization",
      name: organizerName,
    };
  }

  if (performerName) {
    payload.performer = {
      "@type": "Person",
      name: performerName,
    };
  }

  if (bookingUrl) {
    payload.offers = {
      "@type": "Offer",
      url: bookingUrl,
      availability: "https://schema.org/InStock",
    };
  }

  return payload;
}

export function buildEventJsonLd(event: PublicEventRow) {
  return {
    "@context": "https://schema.org",
    ...buildEventSchemaNode(event),
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

export function buildEventsHubBreadcrumbNode() {
  const base = getSiteUrl();
  const pageUrl = `${base}/chennai-local-events`;
  return {
    "@type": "BreadcrumbList",
    "@id": `${pageUrl}#breadcrumb`,
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
        item: pageUrl,
      },
    ],
  };
}
