import { charumathiRaghuraman } from "@/content/music/artists/charumathi-raghuraman";
import { jayanthiKumaresh } from "@/content/music/artists/jayanthi-kumaresh";
import { ramanaBalachandran } from "@/content/music/artists/ramana-balachandran";
import { sreeranjaneKaushik } from "@/content/music/artists/sreeranjane-kaushik";
import { musicAcademy } from "@/content/music/sabhas/music-academy";
import {
  MUSIC_ARTISTS_PATH,
  MUSIC_SABHAS_PATH,
  musicArtistPath,
  musicSabhaPath,
  type MusicArtist,
  type MusicConcert,
  type MusicPoster,
  type MusicSabha,
} from "@/content/music/types";

export const MUSIC_ARTISTS_LAUNCHED = "2026-11-21";

const ARTISTS: MusicArtist[] = [
  charumathiRaghuraman,
  ramanaBalachandran,
  jayanthiKumaresh,
  sreeranjaneKaushik,
];

const SABHAS: MusicSabha[] = [musicAcademy];

function placeMatchesSabha(sabha: MusicSabha, value: string | null): boolean {
  if (!value) return false;
  const hay = value.toLowerCase();
  return sabha.matchNames.some((name) => hay === name.toLowerCase());
}

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

export function listMusicSabhas(): MusicSabha[] {
  return SABHAS;
}

export function getMusicSabha(slug: string): MusicSabha | null {
  return SABHAS.find((sabha) => sabha.slug === slug) ?? null;
}

export function concertMatchesSabha(sabha: MusicSabha, concert: MusicConcert): boolean {
  return (
    placeMatchesSabha(sabha, concert.venueName) ||
    placeMatchesSabha(sabha, concert.organiser) ||
    placeMatchesSabha(sabha, concert.title)
  );
}

export function sabhasMatchingArtist(artist: MusicArtist): MusicSabha[] {
  return SABHAS.filter((sabha) =>
    artist.concerts.some((concert) => concertMatchesSabha(sabha, concert)),
  );
}

export function concertsAtSabha(
  sabha: MusicSabha,
): { artist: MusicArtist; concert: MusicConcert }[] {
  return ARTISTS.flatMap((artist) =>
    artist.concerts
      .filter((concert) => concertMatchesSabha(sabha, concert))
      .map((concert) => ({ artist, concert })),
  );
}

export function musicSitemapEntries(): { path: string; priority: number }[] {
  return [
    { path: "/music", priority: 0.7 },
    { path: "/music/llms.txt", priority: 0.4 },
    { path: MUSIC_ARTISTS_PATH, priority: 0.64 },
    ...ARTISTS.map((artist) => ({
      path: musicArtistPath(artist.slug),
      priority: 0.66,
    })),
    { path: MUSIC_SABHAS_PATH, priority: 0.64 },
    ...SABHAS.map((sabha) => ({
      path: musicSabhaPath(sabha.slug),
      priority: 0.66,
    })),
  ];
}

export { MUSIC_ARTISTS_PATH, MUSIC_SABHAS_PATH, musicArtistPath, musicSabhaPath };
export type {
  MusicArtist,
  MusicConcert,
  MusicPoster,
  MusicSabha,
  SabhaSession,
} from "@/content/music/types";
