"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  useCallback,
  useEffect,
  useId,
  useState,
} from "react";
import type { CSSProperties } from "react";
import { homeStats } from "@/lib/home-mock";

const AUTO_MS = 7000;
const TOPICS = [
  { slug: "chennai", label: "Civic & GCC" },
  { slug: "mobility", label: "Mobility & Metro" },
  { slug: "elections", label: "Elections desk" },
  { slug: "consumer", label: "Consumer" },
] as const;

type Slide = {
  key: string;
  eyebrow: string;
  lineBefore: string;
  lineBold: string;
  lineAfter: string;
  /** Second accent: brand name in headline (news slide). */
  brandInHeadline?: boolean;
  sub: string;
  searchPlaceholder: string;
  filterLabel: string;
  filterOptions: readonly { value: string; label: string }[];
  submitLabel: string;
  /** If set, form navigates here with optional `queryKey` from input */
  searchMode: "topic" | "link";
  hrefOnSubmit: string;
  primaryCta: { href: string; label: string };
  secondaryCta: { href: string; label: string };
  monogram: string;
  floatTags: readonly string[];
  statLabel: string;
  statValue: string;
  statHint: string;
};

const SLIDES: Slide[] = [
  {
    key: "news",
    eyebrow: "Chennai local news desk",
    lineBefore: "Cut through noise with",
    lineBold: "reported context",
    lineAfter: "for Greater Chennai on",
    brandInHeadline: true,
    sub: "Elections, GCC, Metro, and consumer signal — paraphrased from publishers, structured for scanning.",
    searchPlaceholder: "e.g. stormwater, nominations, fuel prices…",
    filterLabel: "Desk",
    filterOptions: TOPICS.map((t) => ({ value: t.slug, label: t.label })),
    submitLabel: "Go to desk",
    searchMode: "topic",
    hrefOnSubmit: "/chennai-local-news",
    primaryCta: { href: "/chennai-local-news", label: "Open news hub" },
    secondaryCta: { href: "/chennai-local-news/feed.xml", label: "RSS feed" },
    monogram: "N",
    floatTags: ["Model code", "GCC projects", "Ward watch"],
    statLabel: "Stories indexed",
    statValue: "Live",
    statHint: "Database-backed when connected",
  },
  {
    key: "events",
    eyebrow: "Chennai local events",
    lineBefore: "Temple utsavams, culture, and",
    lineBold: "civic dates",
    lineAfter: "in one calendar-shaped home.",
    sub: "From core city to OMR — festivals, meetups, and town-hall style listings as we wire data in.",
    searchPlaceholder: "Search listings (coming soon)",
    filterLabel: "Focus",
    filterOptions: [
      { value: "all", label: "All listings" },
      { value: "culture", label: "Culture & music" },
      { value: "civic", label: "Civic & campaigns" },
      { value: "food", label: "Food & walks" },
    ],
    submitLabel: "Browse events",
    searchMode: "link",
    hrefOnSubmit: "/chennai-local-events",
    primaryCta: { href: "/chennai-local-events", label: "Chennai local events" },
    secondaryCta: { href: "#areas", label: "Area map" },
    monogram: "E",
    floatTags: ["Panguni Uthiram", "Weekend", "Free entry"],
    statLabel: "Events this week",
    statValue: `${homeStats.eventsWeek}+`,
    statHint: "Representative count until live sync",
  },
  {
    key: "directory",
    eyebrow: "Places & services",
    lineBefore: "Schools, clinics, transit, dining —",
    lineBold: "directory-first",
    lineAfter: "discovery for Chennai.",
    sub: "Listings and verification workflows connect next; today this is your structured starting point.",
    searchPlaceholder: "Hospitals near me…",
    filterLabel: "Category",
    filterOptions: [
      { value: "all", label: "All categories" },
      { value: "health", label: "Health" },
      { value: "education", label: "Education" },
      { value: "transit", label: "Transit hubs" },
    ],
    submitLabel: "Open directory",
    searchMode: "link",
    hrefOnSubmit: "/directory",
    primaryCta: { href: "/directory", label: "Full directory" },
    secondaryCta: { href: "/directory", label: "List a business (soon)" },
    monogram: "D",
    floatTags: ["OMR", "Ambattur belt", "Adyar–T Nagar"],
    statLabel: "Macro hubs",
    statValue: "10",
    statHint: "Greater Chennai area pages",
  },
  {
    key: "jobs",
    eyebrow: "Work in Chennai",
    lineBefore: "Hiring signals and roles across",
    lineBold: "IT, ops, and civic-facing teams",
    lineAfter: "— free to browse.",
    sub: "Employer accounts and applications ship next; explore the board as listings grow.",
    searchPlaceholder: "Role or stack…",
    filterLabel: "Mode",
    filterOptions: [
      { value: "all", label: "All" },
      { value: "onsite", label: "On-site" },
      { value: "hybrid", label: "Hybrid" },
      { value: "remote", label: "Remote-friendly" },
    ],
    submitLabel: "Search jobs",
    searchMode: "link",
    hrefOnSubmit: "/jobs",
    primaryCta: { href: "/jobs", label: "Job board" },
    secondaryCta: { href: "/jobs", label: "Post a role (soon)" },
    monogram: "J",
    floatTags: ["OMR corridor", "GCC adjacency", "Startups"],
    statLabel: "Live job signals",
    statValue: `${homeStats.jobsLive}+`,
    statHint: "Mock scale until API lands",
  },
];

function SlideVisual({ slide }: { slide: Slide }) {
  return (
    <div
      className="relative flex min-h-[260px] items-center justify-center overflow-hidden rounded-3xl border border-[var(--border)] bg-[color-mix(in_srgb,var(--surface)_96%,var(--accent)_4%)] p-6 sm:min-h-[300px] lg:min-h-[340px]"
      aria-hidden
    >
      <div
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, color-mix(in srgb, var(--foreground) 12%, transparent) 1px, transparent 0)`,
          backgroundSize: "20px 20px",
        }}
      />
      <div className="home-hero-monogram pointer-events-none absolute -right-4 top-1/2 -translate-y-1/2 select-none text-[clamp(7rem,18vw,11rem)] font-bold leading-none text-[color-mix(in_srgb,var(--accent)_16%,transparent)]">
        {slide.monogram}
      </div>
      {slide.floatTags.map((tag, i) => (
        <span
          key={tag}
          className="home-hero-float-tag absolute rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1.5 text-[11px] font-semibold tracking-wide text-[var(--foreground)] shadow-md"
          style={{
            ...floatPosition(i),
            animationDelay: `${120 + i * 90}ms`,
          }}
        >
          {tag}
        </span>
      ))}
      <div className="home-hero-stat-card relative z-[1] w-full max-w-[220px] rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 shadow-[0_24px_50px_-28px_color-mix(in_srgb,var(--foreground)_45%,transparent)]">
        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--muted)]">
          {slide.statLabel}
        </p>
        <p className="mt-1 text-3xl font-bold tabular-nums tracking-tight text-[var(--foreground)]">
          {slide.statValue}
        </p>
        <p className="mt-2 text-xs font-light leading-snug text-[var(--muted)]">
          {slide.statHint}
        </p>
        <div className="mt-4 space-y-2" aria-hidden>
          {[0.72, 0.45, 0.58].map((w, j) => (
            <div
              key={j}
              className="h-1.5 rounded-full bg-[color-mix(in_srgb,var(--accent)_22%,var(--border))]"
              style={{ width: `${Math.round(w * 100)}%` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function floatPosition(i: number): CSSProperties {
  const positions: CSSProperties[] = [
    { top: "12%", left: "8%" },
    { top: "18%", right: "10%" },
    { bottom: "20%", left: "6%" },
  ];
  return positions[i % positions.length] ?? positions[0];
}

export function HomeHero() {
  const router = useRouter();
  const labelId = useId();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("");
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const onChange = () => setReduceMotion(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const first = SLIDES[index]?.filterOptions[0]?.value;
    if (first !== undefined) setFilter(first);
    setQuery("");
  }, [index]);

  useEffect(() => {
    if (paused || reduceMotion) return;
    const t = window.setInterval(() => {
      setIndex((i) => (i + 1) % SLIDES.length);
    }, AUTO_MS);
    return () => window.clearInterval(t);
  }, [paused, reduceMotion]);

  const slide = SLIDES[index];
  const go = useCallback((i: number) => {
    setIndex(((i % SLIDES.length) + SLIDES.length) % SLIDES.length);
  }, []);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!slide) return;
    if (slide.searchMode === "topic") {
      const q = query.trim();
      const base = `/chennai-local-news/topic/${filter}`;
      router.push(q ? `${base}?q=${encodeURIComponent(q)}` : base);
      return;
    }
    router.push(slide.hrefOnSubmit);
  };

  if (!slide) return null;

  return (
    <section
      className="home-hero-shell relative rounded-[2rem] border border-[color-mix(in_srgb,var(--accent)_22%,var(--border))] bg-[linear-gradient(165deg,color-mix(in_srgb,var(--accent)_14%,var(--background))_0%,var(--background)_45%,color-mix(in_srgb,var(--accent-warm)_8%,var(--background))_100%)] p-1 sm:p-1.5"
      aria-labelledby={labelId}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="overflow-hidden rounded-[1.65rem] border border-[var(--border)] bg-[var(--surface)] shadow-[0_32px_80px_-40px_color-mix(in_srgb,var(--foreground)_28%,transparent)]">
        <div className="relative grid gap-10 px-5 py-10 sm:px-8 sm:py-12 lg:grid-cols-[1fr_minmax(260px,380px)] lg:items-center lg:gap-12 lg:px-10 lg:py-12">
          <div key={slide.key} className="home-hero-copy-enter min-w-0">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
              {slide.eyebrow}
            </p>
            <h1
              id={labelId}
              className="mt-4 font-sans text-[clamp(1.65rem,4vw,2.75rem)] leading-[1.12] tracking-tight text-[var(--foreground)]"
            >
              <span className="font-light text-[var(--muted)]">
                {slide.lineBefore}{" "}
              </span>
              <span className="font-bold text-[var(--foreground)]">
                {slide.lineBold}
              </span>
              <span className="font-light text-[var(--muted)]">
                {" "}
                {slide.lineAfter}
              </span>
              {slide.brandInHeadline ? (
                <>
                  {" "}
                  <span className="font-bold text-[var(--accent)]">
                    mychennaicity.in
                  </span>
                </>
              ) : null}
            </h1>
            <p className="mt-4 max-w-xl text-base font-light leading-relaxed text-[var(--muted)] sm:text-[1.05rem]">
              {slide.sub}
            </p>

            <form
              onSubmit={onSubmit}
              className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-stretch"
            >
              <label className="sr-only" htmlFor="hero-q">
                Search
              </label>
              <input
                id="hero-q"
                name="q"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={slide.searchPlaceholder}
                className="min-h-12 min-w-0 flex-1 rounded-full border border-[var(--border)] bg-[var(--surface)] px-5 text-sm font-normal text-[var(--foreground)] shadow-sm outline-none ring-[var(--accent)] transition placeholder:text-[color-mix(in_srgb,var(--muted)_75%,transparent)] focus:border-[var(--accent)] focus:ring-2"
              />
              <div className="flex min-h-12 flex-1 gap-0 overflow-hidden rounded-full border border-[var(--border)] bg-[var(--surface)] shadow-sm sm:max-w-[200px]">
                <label className="sr-only" htmlFor="hero-filter">
                  {slide.filterLabel}
                </label>
                <select
                  id="hero-filter"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="min-w-0 flex-1 cursor-pointer border-0 bg-transparent px-4 text-sm font-medium text-[var(--foreground)] outline-none"
                >
                  {slide.filterOptions.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </div>
              <button
                type="submit"
                className="min-h-12 shrink-0 rounded-full bg-[var(--accent)] px-7 text-sm font-bold text-[var(--accent-fg)] shadow-md transition hover:bg-[var(--accent-hover)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
              >
                {slide.submitLabel}
              </button>
            </form>

            <div className="mt-5 flex flex-wrap items-center gap-3">
              <Link
                href={slide.primaryCta.href}
                className="text-sm font-semibold text-[var(--accent)] underline-offset-4 hover:underline"
              >
                {slide.primaryCta.label}
              </Link>
              <span className="hidden text-[var(--border)] sm:inline">|</span>
              <Link
                href={slide.secondaryCta.href}
                className="text-sm font-light text-[var(--muted)] underline-offset-4 hover:text-[var(--foreground)] hover:underline"
              >
                {slide.secondaryCta.label}
              </Link>
            </div>

            <div className="mt-8 border-t border-[var(--border)] pt-6">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--muted)]">
                Coverage
              </p>
              <p className="mt-2 text-sm font-light text-[var(--muted)]">
                <strong className="font-semibold text-[var(--foreground)]">
                  Tiruvottiyur → Sholinganallur
                </strong>
                , Ambattur → Adyar — hyperlocal hubs, not a single-corridor
                site.
              </p>
            </div>
          </div>

          <SlideVisual key={slide.key} slide={slide} />
        </div>

        <div
          className="flex items-center justify-between gap-4 border-t border-[var(--border)] bg-[color-mix(in_srgb,var(--surface)_88%,var(--background))] px-5 py-4 sm:px-8"
          role="tablist"
          aria-label="Hero highlights"
        >
          <div className="flex flex-wrap gap-2">
            {SLIDES.map((s, i) => (
              <button
                key={s.key}
                type="button"
                role="tab"
                aria-selected={i === index}
                className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] ${
                  i === index
                    ? "bg-[var(--foreground)] text-[var(--background)]"
                    : "bg-[var(--surface)] text-[var(--muted)] ring-1 ring-[var(--border)] hover:text-[var(--foreground)]"
                }`}
                onClick={() => go(i)}
              >
                {s.key === "news"
                  ? "News"
                  : s.key === "events"
                    ? "Events"
                    : s.key === "directory"
                      ? "Directory"
                      : "Jobs"}
              </button>
            ))}
          </div>
          <p className="hidden text-right text-[11px] font-medium text-[var(--muted)] sm:block">
            {paused ? "Paused" : "Auto-advance"} · slide {index + 1}/
            {SLIDES.length}
          </p>
        </div>
      </div>
    </section>
  );
}
