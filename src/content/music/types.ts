export const MUSIC_ARTISTS_PATH = "/music/artist";

export function musicArtistPath(slug: string): string {
  return `${MUSIC_ARTISTS_PATH}/${slug}`;
}

export type MusicPoster = {
  src: string;
  alt: string;
};

export type MusicRelatedLink = {
  href: string;
  label: string;
};

/** One dated appearance on an artist schedule sheet. */
export type MusicConcert = {
  id: string;
  /** Festival or sabha line from the sheet. */
  title: string;
  /** Calendar date, YYYY-MM-DD. */
  date: string;
  /** IST start. Null when the sheet prints TBD. */
  startHour: number | null;
  startMinute: number | null;
  /**
   * Hours added after the printed start so the Chennai calendar can close.
   * The sheet does not print this finish.
   */
  holdHours: number;
  venueName: string;
  venueAddress: string;
  localityLabel: string;
  city: string;
  /**
   * Chennai local-events slug. Null when the date is outside the Chennai calendar.
   */
  eventSlug: string | null;
  /** Accompanists as printed. Null when the sheet names none. */
  withLine: string | null;
  /** Named festival or sabha. Null when the sheet only names a hall. */
  organiser: string | null;
  note?: string;
};

export type MusicArtist = {
  slug: string;
  name: string;
  /** What the schedule sheet shows, not a biography. */
  role: string;
  summary: string;
  ticketUrl: string;
  ticketLabel: string;
  poster: MusicPoster;
  /** Where the schedule facts came from. */
  sourceNote: string;
  concerts: MusicConcert[];
  related: MusicRelatedLink[];
};
