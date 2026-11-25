import type { Metadata } from "next";
import { MUSIC_SEASON_PASSAGE } from "@/content/aeo/jobs-events-passages";
import { formatConcertDate } from "@/content/music/format";
import {
  MUSIC_ARTISTS_PATH,
  musicArtistPath,
  type MusicArtist,
  type MusicConcert,
} from "@/content/music/types";
import { getSiteUrl } from "@/lib/env";
import { fullSiteTitle } from "@/lib/seo/site-titles";

export const MUSIC_SEASON_HUB_TITLE = "Music season in Chennai";

export const MUSIC_SEASON_FOOTER_LINK = {
  href: MUSIC_ARTISTS_PATH,
  label: "Music season",
};

export type MusicFaqItem = {
  question: string;
  answer: string;
};

function chennaiConcerts(artist: MusicArtist): MusicConcert[] {
  return artist.concerts.filter((concert) => concert.city === "Chennai");
}

function uniqueHalls(concerts: MusicConcert[]): string[] {
  return [...new Set(concerts.map((concert) => concert.venueName))];
}

/** Quotable first paragraph. Same text as the meta description and the page. */
export function artistAnswer(artist: MusicArtist): string {
  const dates = chennaiConcerts(artist);
  const span = dates.length > 0 ? dates : artist.concerts;
  const first = span[0];
  const last = span[span.length - 1];
  const halls = uniqueHalls(dates.length > 0 ? dates : span);
  const away = artist.concerts.filter((concert) => concert.city !== "Chennai");
  const range =
    first && last
      ? ` from ${formatConcertDate(first.date)} to ${formatConcertDate(last.date)}`
      : "";
  const awayLine =
    away.length > 0
      ? ` ${away
          .map((concert) => {
            const when = formatConcertDate(concert.date);
            return concert.city
              ? `${when} is in ${concert.city}`
              : `${when} does not name a city`;
          })
          .join(". ")}. These dates stay on this page.`
      : "";
  const tickets = artist.ticketLabel
    ? `Tickets are on ${artist.ticketLabel}.`
    : "The sheet does not print a ticket link.";
  return `${artist.name}, ${artist.role}, has ${dates.length || span.length} Chennai concert dates${range}, across ${halls.length} halls.${awayLine} ${tickets} mychennaicity.in does not sell these tickets.`;
}

export function artistPageTitle(artist: MusicArtist): string {
  return `${artist.name} — concert schedule, Chennai`;
}

export function artistFaq(artist: MusicArtist): MusicFaqItem[] {
  const dates = chennaiConcerts(artist);
  const span = dates.length > 0 ? dates : artist.concerts;
  const first = span[0];
  const last = span[span.length - 1];
  const halls = uniqueHalls(dates.length > 0 ? dates : span);
  const when =
    first && last
      ? `${artist.name} has Chennai dates on this sheet from ${formatConcertDate(first.date)} to ${formatConcertDate(last.date)}.`
      : `${artist.name} has no dated concerts on this sheet.`;
  return [
    {
      question: `When is ${artist.name} performing in Chennai?`,
      answer: when,
    },
    {
      question: `Where are ${artist.name}'s Chennai concerts?`,
      answer:
        halls.length > 0
          ? `The Chennai dates on this sheet are at ${halls.join(", ")}.`
          : "This sheet does not name a Chennai hall.",
    },
    {
      question: `Where do I buy tickets for ${artist.name}?`,
      answer: artist.ticketUrl
        ? `Tickets are on ${artist.ticketUrl}. mychennaicity.in does not sell these tickets.`
        : "The sheet does not print a ticket link. mychennaicity.in does not sell these tickets.",
    },
  ];
}

export function musicArtistMetadata(artist: MusicArtist): Metadata {
  const base = getSiteUrl().replace(/\/$/, "");
  const url = `${base}${musicArtistPath(artist.slug)}`;
  const title = artistPageTitle(artist);
  const description = artistAnswer(artist);
  const image = new URL(artist.poster.src, base).toString();
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: fullSiteTitle(title),
      description,
      url,
      type: "website",
      images: [{ url: image, alt: artist.poster.alt }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullSiteTitle(title),
      description,
      images: [image],
    },
  };
}

export function musicHubMetadata(): Metadata {
  const base = getSiteUrl().replace(/\/$/, "");
  const url = `${base}${MUSIC_ARTISTS_PATH}`;
  const title = MUSIC_SEASON_HUB_TITLE;
  const description = MUSIC_SEASON_PASSAGE;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: fullSiteTitle(title),
      description,
      url,
      type: "website",
      images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullSiteTitle(title),
      description,
    },
  };
}
