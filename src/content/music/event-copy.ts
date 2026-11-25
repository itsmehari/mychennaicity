import {
  concertHoldEndLabel,
  concertStartLabel,
  formatConcertDate,
} from "@/content/music/format";
import { musicArtistPath, type MusicArtist, type MusicConcert } from "@/content/music/types";

export function concertEventTitle(
  artist: MusicArtist,
  concert: MusicConcert,
): string {
  const [year, month, day] = concert.date.split("-").map(Number);
  const short = new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "Asia/Kolkata",
  }).format(new Date(Date.UTC(year, month - 1, day, 6, 30)));
  return `${artist.name} — ${concert.title} (${short})`;
}

/** Markdown for a Chennai events row. Call only when `eventSlug` is set. */
export function concertEventDescription(
  artist: MusicArtist,
  concert: MusicConcert,
): string {
  const when = formatConcertDate(concert.date);
  const start = concertStartLabel(concert);
  const hold = concertHoldEndLabel(concert);
  const organiser = concert.organiser
    ? `**Organiser:** ${concert.organiser}\n\n`
    : "";
  const note = concert.note ? `\n\n${concert.note}` : "";
  const withLine = concert.withLine ? `\n\n**With:** ${concert.withLine}` : "";

  return `${artist.name} is on the bill for **${concert.title}**.

${organiser}**When:** ${when}, **${start} IST**. The schedule sheet does not print a closing time. This listing keeps the calendar open until **${hold}** so a listener can block the slot. That finish is a hold on this page, not a time the sheet printed.

**Where:** ${concert.venueAddress}${withLine}

**Booking:** [${artist.ticketLabel}](${artist.ticketUrl}) — the sheet says to visit that site for tickets. It does not print a fare.

**Artist schedule:** [${artist.name}](${musicArtistPath(artist.slug)})

${artist.sourceNote}${note}`.trim();
}
