import { Fraunces } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import {
  concertHoldEndLabel,
  concertStartLabel,
  formatConcertDate,
} from "@/content/music/format";
import {
  listMusicArtists,
  MUSIC_ARTISTS_PATH,
  musicArtistPath,
  type MusicArtist,
  type MusicConcert,
} from "@/content/music";
import {
  artistAnswer,
  artistFaq,
  artistPageTitle,
} from "@/content/music/search-copy";

const display = Fraunces({
  subsets: ["latin"],
  weight: ["500", "700"],
  display: "swap",
});

const panel =
  "rounded-3xl border border-[#d7c4a3]/40 bg-[#10241c] text-[#f4efe4]";

function isCeremonial(concert: MusicConcert): boolean {
  return concert.note?.includes("event label") ?? false;
}

function isMorning(concert: MusicConcert): boolean {
  return concert.startHour != null && concert.startHour < 12;
}

function programmeLine(concert: MusicConcert): string | null {
  if (concert.note?.includes("does not name a separate programme")) {
    return "The sheet gives the hall as the programme.";
  }
  if (concert.note?.includes("does not name a separate programme title")) {
    return "The sheet does not name a separate programme title.";
  }
  return null;
}

function dayParts(date: string): {
  day: number;
  weekday: string;
  month: string;
  year: number;
} {
  const [year, month, day] = date.split("-").map(Number);
  const instant = new Date(Date.UTC(year, month - 1, day, 6, 30));
  const format = (options: Intl.DateTimeFormatOptions) =>
    new Intl.DateTimeFormat("en-IN", {
      ...options,
      timeZone: "Asia/Kolkata",
    }).format(instant);
  return {
    day,
    weekday: format({ weekday: "short" }),
    month: format({ month: "short" }),
    year,
  };
}

function monthLabel(key: string): string {
  const [year, month] = key.split("-").map(Number);
  return new Intl.DateTimeFormat("en-IN", {
    month: "long",
    year: "numeric",
    timeZone: "Asia/Kolkata",
  }).format(new Date(Date.UTC(year, month - 1, 1, 6, 30)));
}

function featuredConcerts(concerts: MusicConcert[]): MusicConcert[] {
  const ceremonial = concerts.filter(isCeremonial);
  const named = concerts.filter(
    (concert) => concert.withLine && !ceremonial.includes(concert),
  );
  if (ceremonial.length > 0) {
    return named[0] ? [...ceremonial, named[0]] : ceremonial;
  }
  const picks: MusicConcert[] = concerts.filter((concert) => !concert.eventSlug);
  const first = concerts[0];
  const last = concerts[concerts.length - 1];
  if (first && !picks.includes(first)) picks.push(first);
  if (last && !picks.includes(last)) picks.push(last);
  return picks.slice(0, 3);
}

function groupBy<T>(
  items: T[],
  keyOf: (item: T) => string,
): [string, T[]][] {
  const map = new Map<string, T[]>();
  for (const item of items) {
    const key = keyOf(item);
    const list = map.get(key) ?? [];
    list.push(item);
    map.set(key, list);
  }
  return [...map.entries()];
}

function listingHref(concert: MusicConcert): string | null {
  return concert.eventSlug
    ? `/chennai-local-events/${concert.eventSlug}`
    : null;
}

function DateMark({ concert }: { concert: MusicConcert }) {
  const parts = dayParts(concert.date);
  return (
    <p className="leading-none">
      <span className={`${display.className} text-4xl font-medium`}>
        {parts.day}
      </span>
      <span className="mt-1 block text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">
        {parts.weekday} {parts.month}
      </span>
    </p>
  );
}

function ConcertFacts({
  concert,
  light = false,
}: {
  concert: MusicConcert;
  light?: boolean;
}) {
  const hold = concertHoldEndLabel(concert);
  const programme = programmeLine(concert);
  const muted = light ? "text-[#d9cbb6]" : "text-[var(--muted)]";
  return (
    <div className="mt-3 space-y-1.5 text-sm">
      <p className={light ? "text-[#f4efe4]" : "text-[var(--foreground)]"}>
        {concertStartLabel(concert)}
        {hold ? (
          <span className={muted}> · held to {hold}</span>
        ) : null}
      </p>
      <p className={muted}>{concert.venueAddress}</p>
      {concert.withLine ? (
        <p className={light ? "text-[#f0d7a4]" : "text-[var(--foreground)]"}>
          With {concert.withLine}
        </p>
      ) : null}
      {programme ? <p className={muted}>{programme}</p> : null}
      {!concert.eventSlug ? (
        <p className={muted}>On this page. Outside the Chennai calendar.</p>
      ) : null}
    </div>
  );
}

function ConcertCard({
  concert,
  className,
  featured = false,
  anchor = false,
}: {
  concert: MusicConcert;
  className?: string;
  featured?: boolean;
  anchor?: boolean;
}) {
  const href = listingHref(concert);
  const body = (
    <>
      <div className="flex items-start justify-between gap-3">
        <DateMark concert={concert} />
        {isCeremonial(concert) ? (
          <span className="rounded-full bg-[#e7c98a] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#10241c]">
            Event on the sheet
          </span>
        ) : isMorning(concert) ? (
          <span className="rounded-full border border-[var(--border)] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--muted)]">
            Morning
          </span>
        ) : null}
      </div>
      <h3
        className={`${display.className} mt-4 text-2xl font-medium leading-tight text-[var(--foreground)]`}
      >
        {concert.title}
      </h3>
      <ConcertFacts concert={concert} />
      {href ? (
        <p className="mt-4 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--accent)]">
          Chennai listing
        </p>
      ) : null}
    </>
  );
  const classes = `block h-full scroll-mt-24 rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-5 ${
    featured ? "shadow-[0_18px_50px_-28px_rgba(16,36,28,0.7)]" : ""
  } ${className ?? ""}`;
  const anchorId = anchor ? `date-${concert.id}` : undefined;
  if (!href) {
    return (
      <article id={anchorId} className={classes}>
        {body}
      </article>
    );
  }
  return (
    <Link id={anchorId} href={href} className={`${classes} hover:border-[#b9924e]`}>
      {body}
    </Link>
  );
}

export function ArtistStage({ artist }: { artist: MusicArtist }) {
  const halls = groupBy(artist.concerts, (concert) => concert.venueName);
  const months = groupBy(artist.concerts, (concert) => concert.date.slice(0, 7));
  const featured = featuredConcerts(artist.concerts);
  const first = artist.concerts[0];
  const last = artist.concerts[artist.concerts.length - 1];
  const morningCount = artist.concerts.filter(isMorning).length;

  const siblings = listMusicArtists().filter((item) => item.slug !== artist.slug);
  const related = [
    { href: MUSIC_ARTISTS_PATH, label: "Music season" },
    ...siblings.map((item) => ({
      href: musicArtistPath(item.slug),
      label: `${item.name} concert schedule`,
    })),
    ...artist.related.filter(
      (link) =>
        link.href !== MUSIC_ARTISTS_PATH &&
        !siblings.some((item) => musicArtistPath(item.slug) === link.href),
    ),
  ];
  const faq = artistFaq(artist);

  return (
    <div className="mt-6">
      <header>
        <h1
          className={`${display.className} max-w-3xl text-4xl font-medium leading-[1.05] text-[var(--foreground)] sm:text-5xl`}
        >
          {artistPageTitle(artist)}
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-[var(--foreground)]">
          {artistAnswer(artist)}
        </p>
      </header>
      <section className={`${panel} mt-8 grid gap-6 p-4 sm:p-6 lg:grid-cols-12 lg:items-end lg:p-8`}>
        <figure className="lg:col-span-5 lg:-mb-10 lg:translate-y-2">
          <div className="relative aspect-[3/4] overflow-hidden rounded-[1.6rem] border border-[#e7c98a]/50 bg-[#0b1914] shadow-[0_30px_70px_-36px_rgba(0,0,0,0.8)]">
            <Image
              src={artist.poster.src}
              alt={artist.poster.alt}
              fill
              className={
                artist.poster.src.startsWith("http")
                  ? "object-cover object-[center_30%]"
                  : "object-contain"
              }
              sizes="(max-width: 1024px) 100vw, 28rem"
              priority
            />
          </div>
          <figcaption className="mt-3 text-xs leading-relaxed text-[#d9cbb6]">
            {artist.poster.src.startsWith("http")
              ? `Photo of ${artist.name} from ${artist.ticketLabel}.`
              : `Sheet published for ${artist.name}.`}{" "}
            Tickets: {artist.ticketLabel}.
          </figcaption>
        </figure>
        <div className="lg:col-span-7 lg:pb-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#e7c98a]">
            {artist.role}
          </p>
          <p
            className={`${display.className} mt-3 max-w-xl text-4xl font-medium leading-[1.05] text-[#f7f1e6] sm:text-5xl`}
          >
            {artist.name}
          </p>
          <p className="mt-5 max-w-xl text-sm leading-relaxed text-[#d9cbb6] sm:text-base">
            {artist.summary}
          </p>
          <a
            href={artist.ticketUrl}
            className="mt-6 inline-flex rounded-full bg-[#e7c98a] px-4 py-2 text-sm font-semibold text-[#10241c]"
            rel="noopener noreferrer"
          >
            Tickets on {artist.ticketLabel}
          </a>
          <dl className="mt-8 grid grid-cols-3 gap-3 text-[#f4efe4]">
            <div>
              <dt className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#e7c98a]">
                Dates
              </dt>
              <dd className={`${display.className} mt-1 text-3xl`}>
                {artist.concerts.length}
              </dd>
            </div>
            <div>
              <dt className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#e7c98a]">
                Halls
              </dt>
              <dd className={`${display.className} mt-1 text-3xl`}>{halls.length}</dd>
            </div>
            <div>
              <dt className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#e7c98a]">
                Mornings
              </dt>
              <dd className={`${display.className} mt-1 text-3xl`}>{morningCount}</dd>
            </div>
          </dl>
          {first && last ? (
            <p className="mt-4 text-xs text-[#d9cbb6]">
              {formatConcertDate(first.date)} to {formatConcertDate(last.date)}
            </p>
          ) : null}
        </div>
      </section>

      <section className="mt-16" aria-labelledby="season-path">
        <h2 id="season-path" className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--accent-warm)]">
          Path through the season
        </h2>
        <ol className="mt-4 flex gap-3 overflow-x-auto pb-8 pt-2">
          {artist.concerts.map((concert, index) => {
            const parts = dayParts(concert.date);
            return (
              <li
                key={concert.id}
                className="shrink-0"
                style={{ transform: index % 2 === 0 ? "translateY(0)" : "translateY(1.35rem)" }}
              >
                <a
                  href={`#date-${concert.id}`}
                  className={`block w-36 rounded-2xl border px-3 py-3 ${
                    isCeremonial(concert)
                      ? "border-[#e7c98a] bg-[#10241c] text-[#f4efe4]"
                      : "border-[var(--border)] bg-[var(--surface)] text-[var(--foreground)]"
                  }`}
                >
                  <span className={`${display.className} text-2xl`}>
                    {parts.day} {parts.month}
                  </span>
                  <span className="mt-1 block text-xs leading-snug opacity-80">
                    {concert.title}
                  </span>
                </a>
              </li>
            );
          })}
        </ol>
      </section>

      {featured.length > 0 ? (
        <section className="mt-6" aria-labelledby="featured-dates">
          <h2 id="featured-dates" className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--accent-warm)]">
            {featured.some(isCeremonial)
              ? "Dates the sheet marks out"
              : "Dates that sit apart on the sheet"}
          </h2>
          <div className="mt-4 grid gap-4 lg:grid-cols-6">
            {featured.map((concert, index) => (
              <div
                key={concert.id}
                className={
                  index === 0
                    ? "lg:col-span-4 lg:row-span-2"
                    : featured.length === 4 && index === 3
                      ? "lg:col-span-6"
                      : "lg:col-span-2"
                }
              >
                <ConcertCard concert={concert} featured={index === 0} />
              </div>
            ))}
          </div>
        </section>
      ) : null}

      <section className="mt-14" aria-labelledby="season-boards">
        <h2 id="season-boards" className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--accent-warm)]">
          Season boards
        </h2>
        <div className={`mt-4 grid gap-4 ${months.length > 1 ? "lg:grid-cols-2" : ""}`}>
          {months.map(([key, concerts]) => (
            <div
              key={key}
              className="rounded-[1.7rem] border border-[var(--border)] bg-[color-mix(in_srgb,var(--foreground)_3%,var(--surface))] p-4 sm:p-5"
            >
              <h3 className={`${display.className} text-3xl font-medium text-[var(--foreground)]`}>
                {monthLabel(key)}
              </h3>
              <div className="mt-4 grid grid-cols-2 gap-3">
                {concerts.map((concert, index) => (
                  <div
                    key={concert.id}
                    className={`${isCeremonial(concert) ? "col-span-2" : ""} ${
                      isMorning(concert) ? "mt-5" : index % 2 === 1 ? "mt-3" : ""
                    }`}
                  >
                    <ConcertCard concert={concert} anchor />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-14" aria-labelledby="hall-stacks">
        <h2 id="hall-stacks" className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--accent-warm)]">
          Same facts, grouped by hall
        </h2>
        <div className="mt-4 columns-1 gap-4 sm:columns-2 lg:columns-3">
          {halls.map(([venue, concerts]) => (
            <section
              key={venue}
              className="mb-4 break-inside-avoid rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-4"
            >
              <h3 className={`${display.className} text-2xl font-medium text-[var(--foreground)]`}>
                {venue}
              </h3>
              <p className="mt-1 text-xs uppercase tracking-[0.14em] text-[var(--muted)]">
                {concerts.length} {concerts.length === 1 ? "date" : "dates"} · {concerts[0]?.city}
              </p>
              <ul className="mt-4 space-y-3">
                {concerts.map((concert) => {
                  const href = listingHref(concert);
                  const parts = dayParts(concert.date);
                  const row = (
                    <>
                      <span className={`${display.className} text-xl`}>
                        {parts.day} {parts.month}
                      </span>
                      <span className="mt-0.5 block text-sm text-[var(--foreground)]">
                        {concert.title}
                      </span>
                      <span className="mt-0.5 block text-xs text-[var(--muted)]">
                        {concertStartLabel(concert)}
                        {concert.withLine ? ` · with ${concert.withLine}` : ""}
                      </span>
                    </>
                  );
                  return (
                    <li key={concert.id}>
                      {href ? (
                        <Link href={href} className="block rounded-2xl bg-[var(--background)] px-3 py-3 hover:bg-[color-mix(in_srgb,#e7c98a_22%,var(--background))]">
                          {row}
                        </Link>
                      ) : (
                        <div className="rounded-2xl bg-[var(--background)] px-3 py-3">{row}</div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </section>
          ))}
        </div>
      </section>

      <p className="mt-10 max-w-3xl text-sm leading-relaxed text-[var(--muted)]">
        {artist.sourceNote} Closing times on the Chennai listings are calendar
        holds of three hours after the printed start.
      </p>

      <section className="mt-10" aria-labelledby="artist-faq">
        <h2 id="artist-faq" className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--accent-warm)]">
          Questions
        </h2>
        <dl className="mt-4 grid gap-4 lg:grid-cols-3">
          {faq.map((item) => (
            <div
              key={item.question}
              className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-5"
            >
              <dt className="text-base font-semibold text-[var(--foreground)]">
                {item.question}
              </dt>
              <dd className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                {item.answer}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mt-10" aria-labelledby="related-sheets">
        <h2 id="related-sheets" className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--accent-warm)]">
          Related pages
        </h2>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {related.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="block rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-4 py-4 text-sm font-medium text-[var(--foreground)] hover:border-[#b9924e]"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export function ArtistDirectoryList({ artists }: { artists: MusicArtist[] }) {
  return (
    <ul className="mt-8 grid gap-4 lg:grid-cols-5">
      {artists.map((artist, index) => {
        const next = artist.concerts[0];
        const halls = new Set(artist.concerts.map((concert) => concert.venueName));
        return (
          <li key={artist.slug} className={index === 0 ? "lg:col-span-3" : "lg:col-span-2"}>
            <Link
              href={musicArtistPath(artist.slug)}
              className="grid h-full overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--surface)] hover:border-[#b9924e] sm:grid-cols-5"
            >
              <div className="relative min-h-48 sm:col-span-2">
                <Image
                  src={artist.poster.src}
                  alt=""
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 640px) 100vw, 16rem"
                />
              </div>
              <div className="p-5 sm:col-span-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--accent-warm)]">
                  {artist.role}
                </p>
                <h2 className={`${display.className} mt-2 text-3xl font-medium text-[var(--foreground)]`}>
                  {artist.name}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
                  {artist.concerts.length} dates · {halls.size} halls
                  {next ? `, from ${formatConcertDate(next.date)}` : ""}.
                </p>
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
