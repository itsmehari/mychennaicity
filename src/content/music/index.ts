import { charumathiRaghuraman } from "@/content/music/artists/charumathi-raghuraman";
import { jayanthiKumaresh } from "@/content/music/artists/jayanthi-kumaresh";
import {
  MUSIC_ARTISTS_PATH,
  musicArtistPath,
  type MusicArtist,
  type MusicPoster,
} from "@/content/music/types";

export const MUSIC_ARTISTS_LAUNCHED = "2026-11-21";

const ARTISTS: MusicArtist[] = [charumathiRaghuraman, jayanthiKumaresh];

export function listMusicArtists(): MusicArtist[] {
  return ARTISTS;
}

export function getMusicArtist(slug: string): MusicArtist | null {
  return ARTISTS.find((artist) => artist.slug === slug) ?? null;
}

export function artistForEventSlug(eventSlug: string): MusicArtist | null {
  const needle = eventSlug.trim();
  return (
    ARTISTS.find((artist) =>
      artist.concerts.some((concert) => concert.eventSlug === needle),
    ) ?? null
  );
}

export function posterForEventSlug(eventSlug: string): MusicPoster | null {
  return artistForEventSlug(eventSlug)?.poster ?? null;
}

export function musicSitemapEntries(): { path: string; priority: number }[] {
  return [
    { path: MUSIC_ARTISTS_PATH, priority: 0.64 },
    ...ARTISTS.map((artist) => ({
      path: musicArtistPath(artist.slug),
      priority: 0.66,
    })),
  ];
}

export { MUSIC_ARTISTS_PATH, musicArtistPath };
