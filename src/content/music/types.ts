export const MUSIC_ARTISTS_PATH = "/music/artist";
export const MUSIC_SABHAS_PATH = "/music/sabha";

export function musicSabhaPath(slug: string): string {
  return `${MUSIC_SABHAS_PATH}/${slug}`;
}

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
  /**
   * Finish printed on the sheet. When set, this is the close, not a calendar hold.
   * Null or omitted when the sheet does not print a finish.
   */
  printedEndHour?: number | null;
  printedEndMinute?: number | null;
  /** The printed finish is after midnight, on the next calendar day. */
  printedEndNextDay?: boolean;
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

/** One morning on a sabha’s printed programme. Not a separate concert. */
export type SabhaSession = {
  id: string;
  /** Date line as printed, including a year the sheet did not correct. */
  printedDate: string;
  session: string;
  time: string;
  speaker: string;
  topic: string;
};

/** A concert we already list, hosted by this sabha. */
export type SabhaConcertLink = {
  href: string;
  label: string;
  when: string;
};

export type MusicSabha = {
  slug: string;
  name: string;
  /** Hall or role the sheet prints. Not a history. */
  role: string;
  summary: string;
  poster: MusicPoster;
  sourceNote: string;
  /** Names that match an artist concert’s venue, title, or organiser. */
  matchNames: string[];
  hall: string;
  /** Null when the sheet does not print a street. */
  street: string | null;
  city: string;
  presidedBy: string | null;
  convenor: string | null;
  admission: string | null;
  sessions: SabhaSession[];
  /** Named concerts from other sheets. The sabha programme itself is `sessions`. */
  concertLinks: SabhaConcertLink[];
  related: MusicRelatedLink[];
};

export type MusicArtist = {
  slug: string;
  name: string;
  /** What the schedule sheet shows, not a biography. */
  role: string;
  summary: string;
  /** Null when the sheet does not print a ticket site. */
  ticketUrl: string | null;
  ticketLabel: string | null;
  poster: MusicPoster;
  /** Where the schedule facts came from. */
  sourceNote: string;
  concerts: MusicConcert[];
  related: MusicRelatedLink[];
};
