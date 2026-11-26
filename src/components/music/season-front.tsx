"use client";

import { Fraunces } from "next/font/google";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { MARGAZHI_DESK_PATH } from "@/content/compulsive/margazhi-desk";
import {
  MUSIC_ARTISTS_PATH,
  MUSIC_SABHAS_PATH,
  artistForEventSlug,
  listMusicArtists,
  listMusicSabhas,
  musicArtistPath,
} from "@/content/music";
import {
  SEASON_SCHEDULE_ANSWER,
  SEASON_SERIES,
  seasonConcertPath,
  type SeasonSeries,
  type SeasonSlot,
} from "@/content/music/season-concerts";

const display = Fraunces({
  subsets: ["latin"],
  weight: ["500", "700"],
  display: "swap",
});

/** Next sheet in the registry takes the next colour. The first three match the live halls. */
const PALETTE = [
  { accent: "#1f6b4a", ink: "#143528", paper: "#e7f2ea" },
  { accent: "#8d3b32", ink: "#3f1c18", paper: "#f8ebe6" },
  { accent: "#8a6232", ink: "#3d2a14", paper: "#f6edd9" },
  { accent: "#1e4d6b", ink: "#122838", paper: "#e6f0f6" },
  { accent: "#5c3d6e", ink: "#2c1c36", paper: "#f3eaf6" },
  { accent: "#3f5344", ink: "#1c2a20", paper: "#e7f0e8" },
] as const;

const NEXT_WINDOW = 4;
const NAME_SKIP = new Set(["dr", "smt", "sri", "vid", "the"]);

function istParts(date = new Date()): { iso: string; minutes: number } {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(date);
  const pick = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((part) => part.type === type)?.value ?? "00";
  return {
    iso: `${pick("year")}-${pick("month")}-${pick("day")}`,
    minutes: Number(pick("hour")) * 60 + Number(pick("minute")),
  };
}

function daysBetween(fromIso: string, toIso: string): number {
  const [fy, fm, fd] = fromIso.split("-").map(Number);
  const [ty, tm, td] = toIso.split("-").map(Number);
  return Math.round(
    (Date.UTC(ty, tm - 1, td) - Date.UTC(fy, fm - 1, fd)) / 86_400_000,
  );
}

function posterClock(hour: number, minute: number): string {
  const hour12 = hour % 12 || 12;
  const suffix = hour < 12 ? "am" : "pm";
  return `${hour12}.${String(minute).padStart(2, "0")} ${suffix}`;
}

function dayPart(hour: number): string {
  if (hour < 12) return "Morning";
  if (hour < 17) return "Afternoon";
  return "Evening";
}

function dayFace(iso: string): { day: number; weekday: string; month: string; weekend: boolean } {
  const [year, month, day] = iso.split("-").map(Number);
  const instant = new Date(Date.UTC(year, month - 1, day, 6, 30));
  const format = (options: Intl.DateTimeFormatOptions) =>
    new Intl.DateTimeFormat("en-IN", { ...options, timeZone: "Asia/Kolkata" }).format(instant);
  const weekday = format({ weekday: "short" });
  return {
    day,
    weekday,
    month: format({ month: "short" }),
    weekend: weekday === "Sat" || weekday === "Sun",
  };
}

function shortDate(iso: string): string {
  const [year, month, day] = iso.split("-").map(Number);
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "Asia/Kolkata",
  }).format(new Date(Date.UTC(year, month - 1, day, 6, 30)));
}

function monthTitle(year: number, month: number): string {
  return new Intl.DateTimeFormat("en-IN", {
    month: "long",
    year: "numeric",
    timeZone: "Asia/Kolkata",
  }).format(new Date(Date.UTC(year, month - 1, 1, 6, 30)));
}

function daysInMonth(year: number, month: number): number {
  return new Date(Date.UTC(year, month, 0)).getUTCDate();
}

function isRoleLine(programme: string): boolean {
  return /^(vocal|veena|flute|violin|mridangam|nagaswaram)$/i.test(programme.trim());
}

function upcoming(slot: SeasonSlot, iso: string, minutes: number): boolean {
  if (slot.iso > iso) return true;
  if (slot.iso < iso) return false;
  return slot.hour * 60 + slot.minute >= minutes;
}

function nameTokens(name: string): string[] {
  return name
    .toLowerCase()
    .replace(/[^a-z\s]/g, " ")
    .split(/\s+/)
    .filter((token) => token.length > 3 && !NAME_SKIP.has(token));
}

function tokenIn(haystack: string, token: string): boolean {
  if (haystack.includes(token)) return true;
  const stem = token.slice(0, 8);
  return stem.length >= 8 && haystack.includes(stem);
}

function publishedSheet(slot: SeasonSlot): { href: string; name: string } | null {
  const byEvent = artistForEventSlug(slot.slug);
  if (byEvent) return { href: musicArtistPath(byEvent.slug), name: byEvent.name };
  const haystack = slot.artist.toLowerCase();
  const hits = listMusicArtists().filter((artist) => {
    const tokens = nameTokens(artist.name);
    return tokens.length >= 2 && tokens.every((token) => tokenIn(haystack, token));
  });
  if (hits.length !== 1) return null;
  return { href: musicArtistPath(hits[0].slug), name: hits[0].name };
}

function hallTone(seriesId: string) {
  const index = Math.max(0, SEASON_SERIES.findIndex((series) => series.id === seriesId));
  return PALETTE[index % PALETTE.length];
}

function switcherLabel(series: SeasonSeries): string {
  const shared =
    SEASON_SERIES.filter((item) => item.localityLabel === series.localityLabel).length > 1;
  const label = shared ? series.venueName : series.localityLabel;
  return label.length > 28 ? `${label.slice(0, 26)}…` : label;
}

function seriesForAnchor(anchor: string): SeasonSeries | null {
  return (
    SEASON_SERIES.find((series) => anchor === series.id || anchor.startsWith(`${series.id}-`)) ??
    null
  );
}

function earliestOpenId(iso: string, minutes: number): string {
  const next = SEASON_SERIES.flatMap((series) => series.slots.map((slot) => ({ series, slot })))
    .filter((item) => upcoming(item.slot, iso, minutes))
    .sort((a, b) =>
      a.slot.iso === b.slot.iso
        ? a.slot.hour * 60 + a.slot.minute - (b.slot.hour * 60 + b.slot.minute)
        : a.slot.iso.localeCompare(b.slot.iso),
    )[0];
  return next?.series.id ?? SEASON_SERIES[0]?.id ?? "";
}

function countHint(count: number, one: string, many: string): string {
  return `${count} ${count === 1 ? one : many}`;
}

function dayTitle(hits: { series: SeasonSeries; slot: SeasonSlot }[]): string {
  if (hits.length <= 3) {
    return hits.map((hit) => `${hit.series.venueName}: ${hit.slot.artist}`).join("; ");
  }
  const halls = new Set(hits.map((hit) => hit.series.venueName)).size;
  return `${hits.length} concerts across ${halls} ${halls === 1 ? "hall" : "halls"}`;
}

function matchesQuery(series: SeasonSeries, slot: SeasonSlot, query: string): boolean {
  if (!query) return true;
  const haystack = [
    slot.artist,
    slot.programme,
    slot.withLine,
    slot.printedDate,
    slot.note,
    series.title,
    series.venueName,
    series.localityLabel,
  ].join(" ");
  return query.split(/\s+/).filter(Boolean).every((word) => {
    if (/[^\u0000-\u007f]/.test(word)) return haystack.toLowerCase().includes(word.toLowerCase());
    const escaped = word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    return new RegExp(`\\b${escaped}`, "i").test(haystack);
  });
}

function weekdayIndex(iso: string): number {
  const [year, month, day] = iso.split("-").map(Number);
  const label = new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    timeZone: "Asia/Kolkata",
  }).format(new Date(Date.UTC(year, month - 1, day, 6, 30)));
  return ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(label);
}

export function SeasonFront() {
  const clock = useMemo(() => istParts(), []);
  const defaultOpenId = useMemo(
    () => earliestOpenId(clock.iso, clock.minutes),
    [clock.iso, clock.minutes],
  );
  const [query, setQuery] = useState("");
  const [openIds, setOpenIds] = useState<Set<string>>(() => new Set([defaultOpenId]));
  const [pendingAnchor, setPendingAnchor] = useState<string | null>(null);
  const needle = query.trim().toLowerCase();
  const doors = [
    {
      href: MUSIC_ARTISTS_PATH,
      label: "Artist sheets",
      hint: countHint(listMusicArtists().length, "musician", "musicians"),
    },
    {
      href: MUSIC_SABHAS_PATH,
      label: "Sabhas",
      hint: countHint(listMusicSabhas().length, "sabha", "sabhas"),
    },
    { href: "/chennai-local-events", label: "Events calendar", hint: "Every listing" },
    { href: MARGAZHI_DESK_PATH, label: "Margazhi desk", hint: "This week" },
  ];

  function openSeries(seriesId: string, anchor = seriesId) {
    setOpenIds((current) => {
      const next = new Set(needle ? current : []);
      next.add(seriesId);
      return next;
    });
    setPendingAnchor(anchor);
    window.history.replaceState(null, "", `#${anchor}`);
  }

  function applyQuery(value: string) {
    setQuery(value);
    const nextNeedle = value.trim().toLowerCase();
    if (!nextNeedle) {
      setOpenIds(new Set([defaultOpenId]));
      return;
    }
    const ids = SEASON_SERIES.filter((series) =>
      series.slots.some((slot) => matchesQuery(series, slot, nextNeedle)),
    ).map((series) => series.id);
    setOpenIds(new Set(ids.slice(0, 1)));
  }

  const allSlots = useMemo(
    () =>
      SEASON_SERIES.flatMap((series) =>
        series.slots.map((slot) => ({ series, slot })),
      ),
    [],
  );
  const span = useMemo(() => {
    const isos = allSlots.map((item) => item.slot.iso).sort();
    return { first: isos[0] ?? "", last: isos[isos.length - 1] ?? "" };
  }, [allSlots]);

  const filtered = useMemo(
    () =>
      allSlots.filter((item) => matchesQuery(item.series, item.slot, needle)),
    [allSlots, needle],
  );

  const nextSlots = useMemo(
    () =>
      filtered
        .filter((item) => upcoming(item.slot, clock.iso, clock.minutes))
        .sort((a, b) =>
          a.slot.iso === b.slot.iso
            ? a.slot.hour * 60 + a.slot.minute - (b.slot.hour * 60 + b.slot.minute)
            : a.slot.iso.localeCompare(b.slot.iso),
        )
        .slice(0, NEXT_WINDOW),
    [filtered, clock.iso, clock.minutes],
  );

  const months = useMemo(() => {
    const keys = new Set(allSlots.map((item) => item.slot.iso.slice(0, 7)));
    return [...keys].sort().map((key) => {
      const [year, month] = key.split("-").map(Number);
      return { key, year, month, days: daysInMonth(year, month) };
    });
  }, [allSlots]);

  const byDay = useMemo(() => {
    const map = new Map<string, { series: SeasonSeries; slot: SeasonSlot }[]>();
    for (const item of filtered) {
      const list = map.get(item.slot.iso) ?? [];
      list.push(item);
      map.set(item.slot.iso, list);
    }
    return map;
  }, [filtered]);

  useEffect(() => {
    const hash = window.location.hash.replace(/^#/, "");
    const series = hash ? seriesForAnchor(hash) : null;
    if (!series) return;
    setOpenIds(new Set([series.id]));
    setPendingAnchor(hash);
  }, []);

  useEffect(() => {
    if (!pendingAnchor) return;
    const node = document.getElementById(pendingAnchor);
    if (!node) return;
    node.scrollIntoView({ behavior: "smooth", block: "start" });
    setPendingAnchor(null);
  }, [pendingAnchor, openIds]);

  const daysUntilOpen = span.first ? daysBetween(clock.iso, span.first) : 0;
  const daysSinceClose = span.last ? daysBetween(span.last, clock.iso) : 0;
  const beforeOpen = daysUntilOpen > 0;
  const afterClose = daysSinceClose > 0;

  return (
    <div className="text-[#1a1714]">
      <section className="relative overflow-hidden rounded-[2rem] bg-[#10241c] px-5 py-8 text-[#f4efe4] sm:px-8 sm:py-10 lg:px-10">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 8% 0%, rgba(196,165,116,0.38), transparent 32%), radial-gradient(circle at 100% 100%, rgba(31,107,74,0.45), transparent 36%)",
          }}
        />
        <div className="relative grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-[#e4c98a]">
              Margazhi 2026–27
            </p>
            <h1
              className={`${display.className} mt-3 max-w-xl text-4xl font-medium leading-[1.05] tracking-tight sm:text-5xl`}
            >
              Chennai music season schedule
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[#f4efe4]/80 sm:text-base">
              {SEASON_SCHEDULE_ANSWER}
            </p>
            <dl className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-sm">
              <div>
                <dt className="text-[0.65rem] uppercase tracking-[0.16em] text-[#e4c98a]">Halls</dt>
                <dd className={`${display.className} text-2xl`}>{SEASON_SERIES.length}</dd>
              </div>
              <div>
                <dt className="text-[0.65rem] uppercase tracking-[0.16em] text-[#e4c98a]">Concerts</dt>
                <dd className={`${display.className} text-2xl`}>{allSlots.length}</dd>
              </div>
              <div>
                <dt className="text-[0.65rem] uppercase tracking-[0.16em] text-[#e4c98a]">On these sheets</dt>
                <dd className="mt-1 text-sm text-[#f4efe4]/90">
                  {span.first ? shortDate(span.first) : ""} – {span.last ? shortDate(span.last) : ""}
                </dd>
              </div>
            </dl>
          </div>
          <div className="lg:col-span-4">
            <div className="rounded-3xl border border-[#e4c98a]/30 bg-[#0c1c16]/70 px-5 py-5">
              {beforeOpen ? (
                <>
                  <p className="text-[0.65rem] uppercase tracking-[0.18em] text-[#e4c98a]">
                    Until the first concert
                  </p>
                  <p className={`${display.className} mt-1 text-6xl leading-none`}>
                    {daysUntilOpen}
                  </p>
                  <p className="mt-2 text-sm text-[#f4efe4]/80">
                    {daysUntilOpen === 1 ? "day" : "days"} · opens {shortDate(span.first)}
                  </p>
                </>
              ) : afterClose ? (
                <>
                  <p className="text-[0.65rem] uppercase tracking-[0.18em] text-[#e4c98a]">
                    These sheets have finished
                  </p>
                  <p className={`${display.className} mt-2 text-3xl leading-tight`}>
                    Closed {shortDate(span.last)}
                  </p>
                </>
              ) : (
                <>
                  <p className="text-[0.65rem] uppercase tracking-[0.18em] text-[#e4c98a]">
                    Next on these sheets
                  </p>
                  <p className={`${display.className} mt-2 text-3xl leading-tight`}>
                    {nextSlots[0]
                      ? `${dayFace(nextSlots[0].slot.iso).day} ${dayFace(nextSlots[0].slot.iso).month}`
                      : "Tonight is clear"}
                  </p>
                  {nextSlots[0] ? (
                    <p className="mt-2 text-sm text-[#f4efe4]/80">
                      {posterClock(nextSlots[0].slot.hour, nextSlots[0].slot.minute)} ·{" "}
                      {nextSlots[0].slot.artist}
                    </p>
                  ) : null}
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      <ul className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
        {doors.map((door) => (
          <li key={door.href}>
            <Link
              href={door.href}
              className="flex h-full items-baseline justify-between gap-3 rounded-2xl border border-[#d7c4a3] bg-[#f7f1e6] px-4 py-3 text-[#1a1714] transition hover:-translate-y-0.5 hover:border-[#10241c] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1f6b4a]"
            >
              <span className="font-medium">{door.label}</span>
              <span className="text-xs text-[#6d6458]">{door.hint}</span>
            </Link>
          </li>
        ))}
      </ul>

      <section className="mt-8" aria-labelledby="next-on-sheets">
        <div className="flex items-baseline justify-between gap-3">
          <h2
            id="next-on-sheets"
            className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-[#8a6232]"
          >
            Next up
          </h2>
          <p className="text-xs text-[#6d6458]">Times as printed. No closing time is printed.</p>
        </div>
        {nextSlots.length === 0 ? (
          <p className="mt-3 rounded-2xl border border-dashed border-[#d7c4a3] px-4 py-6 text-sm text-[#6d6458]">
            {needle
              ? "No upcoming concert on these sheets matches that name."
              : "No upcoming concert remains on these sheets."}
          </p>
        ) : (
          <ul className="mt-3 flex gap-3 overflow-x-auto pb-2 snap-x snap-mandatory">
            {nextSlots.map(({ series, slot }) => {
              const tone = hallTone(series.id);
              const face = dayFace(slot.iso);
              return (
                <li key={slot.slug} className="min-w-[16.5rem] flex-1 snap-start">
                  <Link
                    href={seasonConcertPath(slot.slug)}
                    className="flex h-full gap-3 rounded-2xl border border-[#e4d7c4] bg-white p-3 transition hover:-translate-y-0.5 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1f6b4a]"
                  >
                    <span
                      className="flex w-14 shrink-0 flex-col items-center justify-center rounded-xl text-[#f4efe4]"
                      style={{ background: tone.accent }}
                    >
                      <span className={`${display.className} text-2xl leading-none`}>{face.day}</span>
                      <span className="text-[0.65rem] uppercase">{face.month}</span>
                    </span>
                    <span className="min-w-0">
                      <span className="block text-xs font-semibold" style={{ color: tone.accent }}>
                        {posterClock(slot.hour, slot.minute)} · {dayPart(slot.hour)}
                      </span>
                      <span className="mt-1 block font-medium leading-snug text-[#1a1714]">
                        {slot.artist}
                      </span>
                      <span className="mt-1 block text-xs text-[#6d6458]">
                        {series.venueName} · {series.localityLabel}
                      </span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </section>

      <section className="mt-8" aria-labelledby="season-dates">
        <h2
          id="season-dates"
          className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-[#8a6232]"
        >
          Dates on these sheets
        </h2>
        <div className="mt-3 space-y-4">
          {months.map((month) => (
            <div key={month.key}>
              <p className={`${display.className} text-lg text-[#1a1714]`}>{monthTitle(month.year, month.month)}</p>
              <div className="mt-2 grid max-w-xl grid-cols-7 gap-1 text-center text-[0.65rem] uppercase tracking-wide text-[#6d6458]">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((label) => (
                  <span key={label}>{label}</span>
                ))}
              </div>
              <ol className="mt-1 grid max-w-xl grid-cols-7 gap-1">
                {Array.from({ length: weekdayIndex(`${month.key}-01`) }, (_, index) => (
                  <li key={`pad-${month.key}-${index}`} aria-hidden />
                ))}
                {Array.from({ length: month.days }, (_, index) => {
                  const iso = `${month.key}-${String(index + 1).padStart(2, "0")}`;
                  const hits = byDay.get(iso) ?? [];
                  const face = dayFace(iso);
                  if (hits.length === 0) {
                    return (
                      <li key={iso}>
                        <span
                          className={`flex h-11 flex-col items-center justify-center rounded-lg text-xs ${
                            face.weekend ? "text-[#8d3b32]/35" : "text-[#1a1714]/25"
                          }`}
                        >
                          {face.day}
                        </span>
                      </li>
                    );
                  }
                  const first = hits[0];
                  const halls = [...new Set(hits.map((hit) => hit.series.id))];
                  return (
                    <li key={iso}>
                      <button
                        type="button"
                        title={dayTitle(hits)}
                        onClick={() => openSeries(first.series.id, `${first.series.id}-${iso}`)}
                        className={`flex h-11 w-full flex-col items-center justify-center rounded-lg border text-xs font-medium focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1f6b4a] ${
                          face.weekend ? "border-[#8d3b32]/40" : "border-[#e4d7c4]"
                        }`}
                        style={{ background: hallTone(first.series.id).paper, color: hallTone(first.series.id).ink }}
                      >
                        {face.day}
                        <span className="mt-0.5 flex items-center gap-0.5" aria-hidden>
                          {halls.slice(0, 3).map((id) => (
                            <i
                              key={id}
                              className="h-1 w-1 rounded-full"
                              style={{ background: hallTone(id).accent }}
                            />
                          ))}
                          {hits.length > 1 ? (
                            <span className="text-[0.6rem] leading-none">{hits.length}</span>
                          ) : null}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ol>
            </div>
          ))}
        </div>
      </section>

      <div className="sticky top-[4.25rem] z-30 -mx-4 mt-8 border-y border-[#d7c4a3] bg-[#f7f1e6]/95 px-4 py-3 backdrop-blur">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <nav aria-label="Halls on this page" className="flex gap-2 overflow-x-auto">
            {SEASON_SERIES.map((series) => {
              const tone = hallTone(series.id);
              const open = openIds.has(series.id);
              return (
                <button
                  key={series.id}
                  type="button"
                  aria-current={open ? "true" : undefined}
                  aria-expanded={open}
                  onClick={() => openSeries(series.id)}
                  title={series.title}
                  className="shrink-0 rounded-full border px-3 py-1.5 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1f6b4a]"
                  style={{
                    borderColor: tone.accent,
                    background: open ? tone.accent : "transparent",
                    color: open ? "#f4efe4" : tone.ink,
                  }}
                >
                  {switcherLabel(series)}
                  <span className="ml-1.5 text-xs opacity-80">{series.slots.length}</span>
                </button>
              );
            })}
          </nav>
          <label className="flex min-w-0 items-center gap-2 lg:w-72">
            <span className="sr-only">Find an artist or programme</span>
            <input
              type="search"
              value={query}
              onChange={(event) => applyQuery(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Escape") applyQuery("");
              }}
              placeholder="Find a name or programme"
              className="w-full rounded-full border border-[#d7c4a3] bg-white px-4 py-2 text-sm text-[#1a1714] placeholder:text-[#6d6458] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1f6b4a]"
            />
          </label>
        </div>
        {needle ? (
          <p className="mt-2 text-xs text-[#6d6458]">
            {filtered.length === 0
              ? "No concert on these sheets matches that name."
              : `${filtered.length} concert${filtered.length === 1 ? "" : "s"} on these sheets.`}
          </p>
        ) : null}
      </div>

      {SEASON_SERIES.map((series) => {
        const tone = hallTone(series.id);
        const visible = series.slots.filter((slot) => matchesQuery(series, slot, needle));
        if (needle && visible.length === 0) return null;
        const open = openIds.has(series.id);
        const isos = [...series.slots.map((slot) => slot.iso)].sort();
        const opens = isos[0];
        const closes = isos[isos.length - 1];
        const singleDay = opens === closes;
        const preview =
          visible.find((slot) => upcoming(slot, clock.iso, clock.minutes)) ?? visible[0];
        const groups = new Map<string, SeasonSlot[]>();
        if (open) {
          for (const slot of visible) {
            const list = groups.get(slot.iso) ?? [];
            list.push(slot);
            groups.set(slot.iso, list);
          }
        }
        const dates = [...groups.entries()].sort(([a], [b]) => a.localeCompare(b));

        return (
          <section
            key={series.id}
            id={series.id}
            className="mt-6 scroll-mt-40"
            aria-labelledby={`${series.id}-title`}
          >
            <header
              className="rounded-[1.75rem] border px-5 py-5 sm:px-6"
              style={{ background: tone.paper, borderColor: `${tone.accent}55` }}
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <p className="text-[0.65rem] font-semibold uppercase tracking-[0.18em]" style={{ color: tone.accent }}>
                  {series.localityLabel} ·{" "}
                  {needle
                    ? `${visible.length} of ${series.slots.length} concerts`
                    : `${series.slots.length} concerts`}
                </p>
                <button
                  type="button"
                  aria-expanded={open}
                  aria-controls={`${series.id}-concerts`}
                  onClick={() =>
                    setOpenIds((current) => {
                      if (current.has(series.id)) {
                        const next = new Set(current);
                        next.delete(series.id);
                        return next;
                      }
                      return needle ? new Set([...current, series.id]) : new Set([series.id]);
                    })
                  }
                  className="rounded-full border px-3 py-1 text-xs font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1f6b4a]"
                  style={{ borderColor: tone.accent, color: tone.ink }}
                >
                  {open ? "Hide concerts" : "Show concerts"}
                </button>
              </div>
              <h2
                id={`${series.id}-title`}
                className={`${display.className} mt-1 text-3xl font-medium leading-tight`}
                style={{ color: tone.ink }}
              >
                {series.title}
              </h2>
              {open ? (
                <p className="mt-2 max-w-3xl text-sm leading-relaxed text-[#3d3832]">
                  {series.venueAddress} {series.ticketNote}
                </p>
              ) : preview ? (
                <p className="mt-2 text-sm text-[#3d3832]">
                  {upcoming(preview, clock.iso, clock.minutes) ? "Next" : "First"} on this sheet:{" "}
                  {shortDate(preview.iso)}, {posterClock(preview.hour, preview.minute)}, {preview.artist}
                </p>
              ) : null}
              <p className="mt-3 flex flex-wrap gap-2 text-xs font-semibold">
                <span
                  className="rounded-full px-2.5 py-1 text-[#f4efe4]"
                  style={{ background: tone.accent }}
                >
                  {series.freeEntry ? "ENTRY FREE" : "TICKETS ON MDnD"}
                </span>
                <span className="rounded-full border px-2.5 py-1" style={{ borderColor: tone.accent, color: tone.ink }}>
                  {shortDate(opens)} – {shortDate(closes)}
                </span>
              </p>
            </header>

            {open ? (
              <div id={`${series.id}-concerts`} className="mt-4 space-y-5">
                {dates.map(([iso, slots]) => {
                  const face = dayFace(iso);
                  const ordered = [...slots].sort(
                    (a, b) => a.hour * 60 + a.minute - (b.hour * 60 + b.minute),
                  );
                  const gridClass =
                    ordered.length > 4
                      ? "md:grid-cols-2 xl:grid-cols-3"
                      : ordered.length > 1
                        ? "md:grid-cols-2"
                        : "";
                  return (
                    <div key={iso} id={`${series.id}-${iso}`} className="scroll-mt-40">
                      <div className="flex items-end gap-3">
                        <p className={`${display.className} text-4xl leading-none`} style={{ color: tone.ink }}>
                          {face.day}
                        </p>
                        <p className="pb-1 text-sm text-[#6d6458]">
                          {face.weekday} {face.month}
                          {face.weekend ? " · weekend" : ""}
                        </p>
                        {singleDay ? (
                          <p className="pb-1 text-xs font-semibold uppercase tracking-wide" style={{ color: tone.accent }}>
                            Only date on this sheet
                          </p>
                        ) : iso === opens ? (
                          <p className="pb-1 text-xs font-semibold uppercase tracking-wide" style={{ color: tone.accent }}>
                            Opens this sheet
                          </p>
                        ) : iso === closes ? (
                          <p className="pb-1 text-xs font-semibold uppercase tracking-wide" style={{ color: tone.accent }}>
                            Closes this sheet
                          </p>
                        ) : null}
                      </div>
                      <ul className={`mt-2 grid gap-3 ${gridClass}`}>
                        {ordered.map((slot) => {
                          const sheet = publishedSheet(slot);
                          const role = isRoleLine(slot.programme);
                          return (
                            <li
                              key={slot.slug}
                              className="rounded-2xl border border-[#e4d7c4] bg-white p-4 transition hover:-translate-y-0.5 hover:shadow-md"
                              style={{ borderLeftWidth: 4, borderLeftColor: tone.accent }}
                            >
                              <p className="flex items-baseline justify-between gap-3 text-xs font-semibold" style={{ color: tone.accent }}>
                                <span>{posterClock(slot.hour, slot.minute)}</span>
                                <span>{dayPart(slot.hour)}</span>
                              </p>
                              <Link
                                href={seasonConcertPath(slot.slug)}
                                className="mt-1 block font-medium leading-snug text-[#1a1714] underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1f6b4a]"
                              >
                                {slot.artist}
                              </Link>
                              {role ? (
                                <p className="mt-2">
                                  <span
                                    className="rounded-full px-2 py-0.5 text-xs font-semibold"
                                    style={{ background: tone.paper, color: tone.ink }}
                                  >
                                    {slot.programme}
                                  </span>
                                </p>
                              ) : (
                                <p className={`${display.className} mt-1 text-lg leading-snug text-[#1a1714]`}>
                                  {slot.programme}
                                </p>
                              )}
                              {slot.withLine ? (
                                <p className="mt-2 text-sm text-[#3d3832]">with {slot.withLine}</p>
                              ) : null}
                              {sheet ? (
                                <p className="mt-2 text-sm">
                                  <Link
                                    href={sheet.href}
                                    className="font-medium underline-offset-4 hover:underline"
                                    style={{ color: tone.ink }}
                                  >
                                    {sheet.name} sheet
                                  </Link>
                                </p>
                              ) : null}
                              {slot.note ? (
                                <p className="mt-2 text-xs leading-relaxed text-[#6d6458]">{slot.note}</p>
                              ) : null}
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  );
                })}
              </div>
            ) : null}
          </section>
        );
      })}

      <p className="mt-10 max-w-3xl border-t border-[#d7c4a3] pt-4 text-sm leading-relaxed text-[#6d6458]">
        Rows on this page are read from the printed sheets named above. Spellings stay as printed.
        A new sheet joins this page as another hall. mychennaicity.in does not sell these tickets.
      </p>
    </div>
  );
}
