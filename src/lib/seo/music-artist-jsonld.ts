import { concertHoldEnd, concertStartLabel } from "@/content/music/format";
import {
  MUSIC_ARTISTS_PATH,
  musicArtistPath,
  type MusicArtist,
} from "@/content/music/types";
import { getSiteUrl } from "@/lib/env";

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
    description: artist.summary,
    url: pageUrl,
    image,
    sameAs: [artist.ticketUrl],
    subjectOf: {
      "@type": "ItemList",
      name: `${artist.name} concert schedule`,
      itemListElement: artist.concerts.map((concert, index) => {
        const hold = concertHoldEnd(concert);
        const eventUrl = concert.eventSlug
          ? `${base}/chennai-local-events/${concert.eventSlug}`
          : pageUrl;
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
            ...(hold
              ? {
                  endDate: isoDateTime(concert.date, hold.hour, hold.minute),
                  description: `Calendar hold until ${concertStartLabel({
                    ...concert,
                    startHour: hold.hour,
                    startMinute: hold.minute,
                  })}. The schedule sheet does not print a closing time.`,
                }
              : {
                  description:
                    concert.note ??
                    "Time printed as TBD on the schedule sheet.",
                }),
            eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
            eventStatus: "https://schema.org/EventScheduled",
            url: eventUrl,
            performer: { "@type": "Person", name: artist.name, url: pageUrl },
            ...(concert.organiser
              ? { organizer: { "@type": "Organization", name: concert.organiser } }
              : {}),
            location: {
              "@type": "Place",
              name: concert.venueName,
              address: concert.venueAddress,
            },
          },
        };
      }),
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
        name: "Music artists",
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
