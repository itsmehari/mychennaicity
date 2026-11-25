import Image from "next/image";
import Link from "next/link";
import {
  concertHoldEndLabel,
  concertStartLabel,
  formatConcertDate,
} from "@/content/music/format";
import { musicArtistPath, type MusicArtist } from "@/content/music/types";

export function ArtistSchedule({ artist }: { artist: MusicArtist }) {
  return (
    <ol className="mt-8 divide-y divide-[var(--border)] border-y border-[var(--border)]">
      {artist.concerts.map((concert) => {
        const hold = concertHoldEndLabel(concert);
        return (
          <li key={concert.id} className="py-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-[var(--accent)]">
              {formatConcertDate(concert.date)}
              <span className="text-[var(--muted)]"> · {concert.city}</span>
            </p>
            <h2 className="mt-1 text-lg font-semibold text-[var(--foreground)]">
              {concert.title}
            </h2>
            <p className="mt-1 text-sm text-[var(--foreground)]">
              {concertStartLabel(concert)}
              {hold ? (
                <span className="text-[var(--muted)]">
                  {" "}
                  · calendar held to {hold}
                </span>
              ) : null}
            </p>
            <p className="mt-1 text-sm text-[var(--muted)]">
              {concert.venueAddress}
            </p>
            {concert.withLine ? (
              <p className="mt-1 text-sm text-[var(--muted)]">
                With {concert.withLine}
              </p>
            ) : null}
            {concert.note ? (
              <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                {concert.note}
              </p>
            ) : null}
            {concert.eventSlug ? (
              <p className="mt-3 text-sm">
                <Link
                  href={`/chennai-local-events/${concert.eventSlug}`}
                  className="font-medium text-[var(--accent)] underline-offset-4 hover:underline"
                >
                  Open the Chennai event listing
                </Link>
              </p>
            ) : (
              <p className="mt-3 text-sm text-[var(--muted)]">
                Listed on this page. The Chennai events calendar covers the city
                dates.
              </p>
            )}
          </li>
        );
      })}
    </ol>
  );
}

export function ArtistPoster({ artist }: { artist: MusicArtist }) {
  return (
    <figure className="mt-8 max-w-md">
      <div className="relative aspect-[3/4] overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)]">
        <Image
          src={artist.poster.src}
          alt={artist.poster.alt}
          fill
          className="object-contain"
          sizes="(max-width: 768px) 100vw, 28rem"
          priority
        />
      </div>
      <figcaption className="mt-2 text-xs text-[var(--muted)]">
        Schedule sheet published for {artist.name}. Ticket link on the sheet:{" "}
        <a
          href={artist.ticketUrl}
          className="font-medium text-[var(--accent)] underline-offset-4 hover:underline"
          rel="noopener noreferrer"
        >
          {artist.ticketLabel}
        </a>
        .
      </figcaption>
    </figure>
  );
}

export function ArtistDirectoryList({ artists }: { artists: MusicArtist[] }) {
  return (
    <ul className="mt-8 grid gap-4 sm:grid-cols-2">
      {artists.map((artist) => {
        const next = artist.concerts[0];
        return (
          <li key={artist.slug}>
            <Link
              href={musicArtistPath(artist.slug)}
              className="block h-full rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 hover:border-[var(--accent)]"
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-[var(--accent)]">
                {artist.role}
              </p>
              <h2 className="mt-1 text-xl font-semibold text-[var(--foreground)]">
                {artist.name}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                {artist.concerts.length} dates on file
                {next
                  ? `, from ${formatConcertDate(next.date)}`
                  : ""}
                .
              </p>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
