import { listMusicArtists } from "@/content/music";
import { MUSIC_SEASON_PASSAGE } from "@/content/aeo/jobs-events-passages";
import { artistAnswer, artistFaq, MUSIC_SEASON_HUB_TITLE } from "@/content/music/search-copy";
import {
  MUSIC_ARTISTS_PATH,
  musicArtistPath,
  type MusicArtist,
  type MusicConcert,
} from "@/content/music/types";
import { getSiteUrl } from "@/lib/env";

function musicEventPlace(concert: MusicConcert): Record<string, unknown> {
  const address: Record<string, string> = {
    "@type": "PostalAddress",
    addressLocality: concert.localityLabel || concert.city,
  };
  if (concert.city === "Chennai") {
    address.addressRegion = "Tamil Nadu";
    address.addressCountry = "IN";
  }
  const bare = `${concert.venueName}, ${concert.city}`;
  if (
    concert.venueAddress &&
    concert.venueAddress !== bare &&
    !concert.note?.includes("does not print a street")
  ) {
    address.streetAddress = concert.venueAddress;
  }
  return {
    "@type": "Place",
    name: concert.venueName,
    address,
  };
}

function printedEndIso(concert: MusicConcert): string | null {
  if (concert.printedEndHour == null || concert.printedEndMinute == null) return null;
  let date = concert.date;
  if (concert.printedEndNextDay) {
    const [year, month, day] = concert.date.split("-").map(Number);
    const next = new Date(Date.UTC(year, month - 1, day + 1));
    date = next.toISOString().slice(0, 10);
  }
  return isoDateTime(date, concert.printedEndHour, concert.printedEndMinute);
}

function isoDateTime(
  date: string,
  hour: number | null,
  minute: number | null,
): string {
  if (hour == null || minute == null) return date;
  return `${date}T${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}:00+05:30`;
}

export function buildMusicArtistJsonLd(artist: MusicArtist): Record<string, unknown> {
  const base = getSiteUrl().replace(/\/$/, "");
  const pageUrl = `${base}${musicArtistPath(artist.slug)}`;
  const image = new URL(artist.poster.src, base).toString();

  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: artist.name,
    description: artistAnswer(artist),
    url: pageUrl,
    image,
    ...(artist.ticketUrl ? { sameAs: [artist.ticketUrl] } : {}),
    subjectOf: {
      "@type": "ItemList",
      name: `${artist.name} concert schedule`,
      itemListElement: artist.concerts.map((concert, index) => {
        const eventUrl = concert.eventSlug
          ? `${base}/chennai-local-events/${concert.eventSlug}`
          : pageUrl;
        const endDate = printedEndIso(concert);
        return {
          "@type": "ListItem",
          position: index + 1,
          item: {
            "@type": "MusicEvent",
            name: `${artist.name} — ${concert.title}`,
            startDate: isoDateTime(
              concert.date,
              concert.startHour,
              concert.startMinute,
            ),
            ...(endDate ? { endDate } : {}),
            description:
              concert.note ??
              (endDate
                ? "The sheet prints this finish."
                : "The schedule sheet does not print a closing time."),
            eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
            eventStatus: "https://schema.org/EventScheduled",
            url: eventUrl,
            performer: { "@type": "Person", name: artist.name, url: pageUrl },
            ...(concert.organiser
              ? { organizer: { "@type": "Organization", name: concert.organiser } }
              : {}),
            location: musicEventPlace(concert),
          },
        };
      }),
    },
  };
}

export function buildMusicArtistFaqJsonLd(
  artist: MusicArtist,
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: artistFaq(artist).map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

export function buildMusicHubJsonLd(): Record<string, unknown> {
  const base = getSiteUrl().replace(/\/$/, "");
  const artists = listMusicArtists();
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: MUSIC_SEASON_HUB_TITLE,
    description: MUSIC_SEASON_PASSAGE,
    url: `${base}${MUSIC_ARTISTS_PATH}`,
    mainEntity: {
      "@type": "ItemList",
      name: MUSIC_SEASON_HUB_TITLE,
      itemListElement: artists.map((artist, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: artist.name,
        url: `${base}${musicArtistPath(artist.slug)}`,
      })),
    },
  };
}

export function buildMusicArtistBreadcrumbJsonLd(
  artist: MusicArtist,
): Record<string, unknown> {
  const base = getSiteUrl().replace(/\/$/, "");
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: base },
      {
        "@type": "ListItem",
        position: 2,
        name: "Music season",
        item: `${base}${MUSIC_ARTISTS_PATH}`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: artist.name,
        item: `${base}${musicArtistPath(artist.slug)}`,
      },
    ],
  };
}
