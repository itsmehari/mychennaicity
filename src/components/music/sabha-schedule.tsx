import { Fraunces } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { concertsAtSabha, listMusicSabhas, musicSabhaPath } from "@/content/music";
import { concertStartLabel, formatConcertDate } from "@/content/music/format";
import { sabhaAnswer, sabhaFaq } from "@/content/music/sabha-copy";
import {
  MUSIC_ARTISTS_PATH,
  musicArtistPath,
  type MusicSabha,
  type SabhaSession,
} from "@/content/music/types";

const display = Fraunces({
  subsets: ["latin"],
  weight: ["500", "700"],
  display: "swap",
});

function groupDays(sessions: SabhaSession[]): { printedDate: string; sessions: SabhaSession[] }[] {
  const days: { printedDate: string; sessions: SabhaSession[] }[] = [];
  for (const item of sessions) {
    const current = days[days.length - 1];
    if (current && current.printedDate === item.printedDate) current.sessions.push(item);
    else days.push({ printedDate: item.printedDate, sessions: [item] });
  }
  return days;
}

export function SabhaStage({ sabha }: { sabha: MusicSabha }) {
  const days = groupDays(sabha.sessions);
  const hosted = concertsAtSabha(sabha);
  const faq = sabhaFaq(sabha);
  const siblings = listMusicSabhas().filter((item) => item.slug !== sabha.slug);

  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--accent-warm)]">
        Sabha
      </p>
      <h1 className={`${display.className} mt-2 max-w-3xl text-4xl font-medium tracking-tight text-[var(--foreground)] sm:text-5xl`}>
        {sabha.name} — sabha programme, {sabha.city}
      </h1>
      <p className="mt-4 max-w-3xl text-base leading-relaxed text-[var(--foreground)]">
        {sabhaAnswer(sabha)}
      </p>

      <div className="mt-8 grid items-start gap-6 lg:grid-cols-[minmax(0,18rem)_1fr]">
        <figure className="overflow-hidden rounded-3xl border border-[var(--border)] bg-[#10233f]">
          <Image
            src={sabha.poster.src}
            alt={sabha.poster.alt}
            width={960}
            height={1200}
            className="h-auto w-full"
            priority
          />
        </figure>
        <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-5">
          <p className={`${display.className} text-3xl font-medium text-[var(--foreground)]`}>
            {sabha.hall}
          </p>
          <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
            {sabha.city}. The sheet does not print a street.
          </p>
          {sabha.presidedBy ? (
            <p className="mt-4 text-sm text-[var(--foreground)]">
              Presided by {sabha.presidedBy}
            </p>
          ) : null}
          {sabha.convenor ? (
            <p className="mt-1 text-sm text-[var(--foreground)]">Convenor {sabha.convenor}</p>
          ) : null}
          {sabha.admission ? (
            <p className="mt-4 text-sm leading-relaxed text-[var(--muted)]">{sabha.admission}</p>
          ) : null}
          <p className="mt-4 text-sm text-[var(--foreground)]">
            {sabha.sessions.length} sessions · {days.length} mornings
          </p>
        </div>
      </div>

      <section className="mt-10" aria-labelledby="sabha-mornings">
        <h2 id="sabha-mornings" className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--accent-warm)]">
          Mornings on the sheet
        </h2>
        <div className="mt-4 columns-1 gap-4 sm:columns-2">
          {days.map((day) => (
            <section
              key={day.printedDate}
              className="mb-4 break-inside-avoid rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-4"
            >
              <h3 className={`${display.className} text-2xl font-medium text-[var(--foreground)]`}>
                {day.printedDate}
              </h3>
              <ul className="mt-3 space-y-3">
                {day.sessions.map((item) => (
                  <li id={item.id} key={item.id} className="rounded-2xl bg-[var(--background)] px-3 py-3">
                    <p className="text-xs uppercase tracking-[0.14em] text-[var(--muted)]">
                      {item.time}
                      {item.session !== "—" ? ` · ${item.session}` : ""}
                    </p>
                    <p className="mt-1 text-sm font-medium text-[var(--foreground)]">{item.speaker}</p>
                    {item.topic !== "—" ? (
                      <p className="mt-1 text-sm leading-relaxed text-[var(--muted)]">{item.topic}</p>
                    ) : null}
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </section>

      <section className="mt-10" aria-labelledby="sabha-concerts">
        <h2 id="sabha-concerts" className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--accent-warm)]">
          Concerts already listed here
        </h2>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {hosted.map(({ artist, concert }) => (
            <li key={`${artist.slug}-${concert.id}`}>
              <Link
                href={musicArtistPath(artist.slug)}
                className="block rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-4 py-4 hover:border-[#b9924e]"
              >
                <span className="block text-sm font-medium text-[var(--foreground)]">
                  {artist.name}
                </span>
                <span className="mt-1 block text-sm text-[var(--muted)]">
                  {formatConcertDate(concert.date)}
                  {concert.startHour != null ? `, ${concertStartLabel(concert)}` : ""}
                  {concert.withLine ? ` · ${concert.withLine}` : ""}
                </span>
              </Link>
            </li>
          ))}
          {sabha.concertLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="block rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-4 py-4 hover:border-[#b9924e]"
              >
                <span className="block text-sm font-medium text-[var(--foreground)]">{link.label}</span>
                <span className="mt-1 block text-sm text-[var(--muted)]">{link.when}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <p className="mt-10 max-w-3xl text-sm leading-relaxed text-[var(--muted)]">{sabha.sourceNote}</p>

      <section className="mt-10" aria-labelledby="sabha-faq">
        <h2 id="sabha-faq" className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--accent-warm)]">
          Questions
        </h2>
        <dl className="mt-4 grid gap-4 lg:grid-cols-3">
          {faq.map((item) => (
            <div key={item.question} className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-5">
              <dt className="text-base font-semibold text-[var(--foreground)]">{item.question}</dt>
              <dd className="mt-2 text-sm leading-relaxed text-[var(--muted)]">{item.answer}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mt-10" aria-labelledby="sabha-related">
        <h2 id="sabha-related" className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--accent-warm)]">
          Related pages
        </h2>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          <li>
            <Link href={MUSIC_ARTISTS_PATH} className="block rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-4 py-4 text-sm font-medium">
              Music season
            </Link>
          </li>
          {siblings.map((item) => (
            <li key={item.slug}>
              <Link href={musicSabhaPath(item.slug)} className="block rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-4 py-4 text-sm font-medium">
                {item.name}
              </Link>
            </li>
          ))}
          {sabha.related.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="block rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-4 py-4 text-sm font-medium">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export function SabhaDirectoryList({ sabhas }: { sabhas: MusicSabha[] }) {
  return (
    <ul className="mt-8 grid gap-4">
      {sabhas.map((sabha) => (
        <li key={sabha.slug}>
          <Link
            href={musicSabhaPath(sabha.slug)}
            className="grid overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--surface)] hover:border-[#b9924e] sm:grid-cols-5"
          >
            <div className="relative min-h-48 sm:col-span-2">
              <Image src={sabha.poster.src} alt="" fill className="object-cover object-top" sizes="20rem" />
            </div>
            <div className="p-5 sm:col-span-3">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--accent-warm)]">
                {sabha.role}
              </p>
              <h2 className={`${display.className} mt-2 text-3xl font-medium`}>{sabha.name}</h2>
              <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
                {sabha.sessions.length} academic sessions at {sabha.hall}.
              </p>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
