"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  useCallback,
  useEffect,
  useId,
  useState,
} from "react";
import { homeStats } from "@/lib/home-mock";
import { CHENNAI_JOBS_HUB_PATH } from "@/lib/routes/chennai-jobs";

const AUTO_MS = 7000;

const HERO_IMAGES = {
  metro:
    "https://metrorailnews.in/wp-content/uploads/2022/07/Chennai-metrojpg-e1658991640382.jpg",
  amazonJobs:
    "https://static.amazon.jobs/locations/94/images/chennai-banner.jpg",
  valluvarKottam:
    "https://thumbs.dreamstime.com/b/valluvar-kottam-auditorium-monument-chennai-tamil-nadu-india-madras-194543886.jpg",
} as const;

const TOPICS = [
  { slug: "chennai", label: "City & GCC" },
  { slug: "mobility", label: "Travel & Metro" },
  { slug: "elections", label: "Elections" },
  { slug: "consumer", label: "Shops & prices" },
] as const;

type Slide = {
  key: string;
  cardTitle: string;
  heroImageSrc: string;
  heroImageAlt: string;
  eyebrow: string;
  lineBefore: string;
  lineBold: string;
  lineAfter: string;
  brandInHeadline?: boolean;
  sub: string;
  footerNote: string;
  searchPlaceholder: string;
  filterLabel: string;
  filterOptions: readonly { value: string; label: string }[];
  submitLabel: string;
  searchMode: "topic" | "link";
  hrefOnSubmit: string;
  primaryCta: { href: string; label: string };
  secondaryCta: { href: string; label: string };
  statLabel: string;
  statValue: string;
  statHint: string;
};

const SLIDES: Slide[] = [
  {
    key: "news",
    cardTitle: "Local news",
    heroImageSrc: HERO_IMAGES.metro,
    heroImageAlt: "Chennai Metro train and station",
    eyebrow: "News you can use",
    lineBefore: "See what’s happening in",
    lineBold: "your part of Chennai",
    lineAfter: "— in clear language, on",
    brandInHeadline: true,
    sub: "Traffic, Metro, elections, GCC updates, and everyday costs (fuel, essentials). Pick a topic and open the news hub.",
    footerNote:
      "We cover the whole city: beaches to OMR, Ambattur to Adyar — not just one corridor.",
    searchPlaceholder: "Type a topic (optional)",
    filterLabel: "Topic",
    filterOptions: TOPICS.map((t) => ({ value: t.slug, label: t.label })),
    submitLabel: "Open news",
    searchMode: "topic",
    hrefOnSubmit: "/chennai-local-news",
    primaryCta: { href: "/chennai-local-news", label: "Browse all local news" },
    secondaryCta: { href: "/chennai-local-news/feed.xml", label: "RSS feed" },
    statLabel: "How often we refresh",
    statValue: "Daily",
    statHint: "Updated when new stories go live",
  },
  {
    key: "events",
    cardTitle: "Things to do",
    heroImageSrc: HERO_IMAGES.valluvarKottam,
    heroImageAlt: "Valluvar Kottam monument and auditorium, Chennai",
    eyebrow: "Things to do",
    lineBefore: "Find",
    lineBold: "festivals, concerts, and local meets",
    lineAfter: "happening near you.",
    sub: "Temple utsavams, weekend markets, talks, and community gatherings — start with the calendar and explore by area on the map below.",
    footerNote:
      "Planning a day out? Check events first, then jump to your neighbourhood on the home map.",
    searchPlaceholder: "What are you in the mood for?",
    filterLabel: "Type",
    filterOptions: [
      { value: "all", label: "Everything" },
      { value: "culture", label: "Culture & music" },
      { value: "civic", label: "Talks & civic" },
      { value: "food", label: "Food & walks" },
    ],
    submitLabel: "See events",
    searchMode: "link",
    hrefOnSubmit: "/chennai-local-events",
    primaryCta: { href: "/chennai-local-events", label: "Chennai local events" },
    secondaryCta: { href: "#areas", label: "Pick your area on the map" },
    statLabel: "Sample listings",
    statValue: `${homeStats.eventsWeek}+`,
    statHint: "Illustrative count on the homepage",
  },
  {
    key: "directory",
    cardTitle: "Places & services",
    heroImageSrc: HERO_IMAGES.metro,
    heroImageAlt: "Chennai Metro — city connectivity",
    eyebrow: "Places & services",
    lineBefore: "Look up",
    lineBold: "schools, hospitals, food, and transit",
    lineAfter: "across Chennai and nearby.",
    sub: "Use the directory when you need a number, a location, or a starting point — we’re growing verified listings over time.",
    footerNote:
      "Ten big neighbourhood zones: tap your side of the city on the map for a shorter list.",
    searchPlaceholder: "What do you need? (optional)",
    filterLabel: "Start with",
    filterOptions: [
      { value: "all", label: "Everything" },
      { value: "health", label: "Health" },
      { value: "education", label: "Schools & colleges" },
      { value: "transit", label: "Transit & hubs" },
    ],
    submitLabel: "Open directory",
    searchMode: "link",
    hrefOnSubmit: "/directory",
    primaryCta: { href: "/directory", label: "Search the directory" },
    secondaryCta: { href: "/directory", label: "List your business (soon)" },
    statLabel: "Area hubs",
    statValue: "10",
    statHint: "Macro zones you can open in one tap",
  },
  {
    key: "jobs",
    cardTitle: "Chennai jobs",
    heroImageSrc: HERO_IMAGES.amazonJobs,
    heroImageAlt: "Chennai city skyline",
    eyebrow: "Work here",
    lineBefore: "Browse",
    lineBold: "open roles",
    lineAfter: "in IT, offices, retail, and more — free to read.",
    sub: "See who’s hiring in Chennai and nearby. You still apply on the employer’s own site — we help you find the opening.",
    footerNote:
      "Good for freshers and switches alike — filter by how you prefer to work.",
    searchPlaceholder: "Job title or skill (optional)",
    filterLabel: "Work style",
    filterOptions: [
      { value: "all", label: "All jobs" },
      { value: "onsite", label: "Mostly office" },
      { value: "hybrid", label: "Hybrid" },
      { value: "remote", label: "Remote-friendly" },
    ],
    submitLabel: "View jobs",
    searchMode: "link",
    hrefOnSubmit: CHENNAI_JOBS_HUB_PATH,
    primaryCta: { href: CHENNAI_JOBS_HUB_PATH, label: "Go to Chennai jobs" },
    secondaryCta: {
      href: CHENNAI_JOBS_HUB_PATH,
      label: "Post a job (soon)",
    },
    statLabel: "Sample roles shown",
    statValue: `${homeStats.jobsLive}+`,
    statHint: "Example count on the home page",
  },
];

function IconNews({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width={28}
      height={28}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      aria-hidden
    >
      <path d="M4 22h16a2 2 0 002-2V4a2 2 0 00-2-2H8a2 2 0 00-2 2v16a2 2 0 01-2 2zm0 0a2 2 0 002-2v-4a2 2 0 012-2h8" />
      <path d="M10 6h4M10 10h4M10 14h4" />
    </svg>
  );
}

function IconEvents({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width={28}
      height={28}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      aria-hidden
    >
      <rect x={3} y={4} width={18} height={18} rx={2} />
      <path d="M16 2v4M8 2v4M3 10h18" />
    </svg>
  );
}

function IconPlaces({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width={28}
      height={28}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      aria-hidden
    >
      <path d="M12 21s7-4.35 7-10a7 7 0 10-14 0c0 5.65 7 10 7 10z" />
      <circle cx={12} cy={11} r={2.5} />
    </svg>
  );
}

function IconJobs({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width={28}
      height={28}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      aria-hidden
    >
      <rect x={2} y={7} width={20} height={14} rx={2} />
      <path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" />
    </svg>
  );
}

function CardIcon({ slideKey }: { slideKey: string }) {
  const cls = "text-[var(--hero-mustard)]";
  if (slideKey === "news") return <IconNews className={cls} />;
  if (slideKey === "events") return <IconEvents className={cls} />;
  if (slideKey === "directory") return <IconPlaces className={cls} />;
  return <IconJobs className={cls} />;
}

function BadgeArrow({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width={20}
      height={20}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden
    >
      <path d="M7 17L17 7M17 7H9M17 7v8" />
    </svg>
  );
}

function HeroImageBlock({ slide }: { slide: Slide }) {
  return (
    <div className="relative mx-auto mt-10 w-full max-w-[min(100%,720px)]">
      <div
        className="relative aspect-[16/10] w-full overflow-hidden shadow-[0_40px_80px_-32px_rgba(0,0,0,0.55)]"
        style={{
          borderRadius:
            "clamp(2rem, 7vw, 4.5rem) 0 clamp(2rem, 7vw, 4.5rem) 0",
        }}
      >
        <Image
          key={slide.key}
          src={slide.heroImageSrc}
          alt={slide.heroImageAlt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 720px"
          priority={slide.key === "news"}
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[color-mix(in_srgb,var(--hero-bg)_55%,transparent)] via-transparent to-transparent"
          aria-hidden
        />
      </div>

      <div
        className="absolute bottom-[12%] left-0 z-[2] max-w-[11.5rem] -translate-x-2 translate-y-1/4 sm:bottom-[18%] sm:left-2 sm:max-w-[13rem] sm:translate-x-0 sm:translate-y-0 md:-left-4 md:bottom-1/2 md:translate-y-1/2"
        style={{ borderRadius: "0 clamp(1rem,3vw,1.5rem) 0 0" }}
      >
        <div
          className="relative bg-[var(--hero-mustard)] px-4 py-4 pr-10 text-white shadow-lg"
          style={{ borderRadius: "0 clamp(1rem,3vw,1.5rem) 0 0" }}
        >
          <BadgeArrow className="absolute right-3 top-3 opacity-90" />
          <p className="text-[10px] font-bold uppercase leading-tight tracking-[0.14em]">
            {slide.statLabel}
          </p>
          <p className="mt-1.5 text-2xl font-bold tabular-nums tracking-tight sm:text-3xl">
            {slide.statValue}
          </p>
          <p className="mt-2 text-[11px] font-medium leading-snug text-white/90">
            {slide.statHint}
          </p>
        </div>
      </div>
    </div>
  );
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
      className="home-hero-shell relative overflow-hidden rounded-[2rem] border border-[color-mix(in_srgb,var(--hero-mustard)_35%,transparent)] shadow-[0_28px_60px_-28px_rgba(0,0,0,0.35)]"
      style={
        {
          "--hero-bg": "#153529",
          "--hero-mustard": "#c9a227",
          "--hero-mustard-dim": "#a6841c",
          backgroundColor: "var(--hero-bg)",
        } as React.CSSProperties
      }
      aria-labelledby={labelId}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        key={slide.key}
        className="relative px-5 pb-8 pt-10 sm:px-8 sm:pb-10 sm:pt-12 lg:px-12 lg:pb-12 lg:pt-14"
      >
        <div
          className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full opacity-[0.12]"
          style={{
            background:
              "radial-gradient(circle, var(--hero-mustard) 0%, transparent 70%)",
          }}
          aria-hidden
        />

        <div className="relative mx-auto max-w-3xl text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/55">
            {slide.eyebrow}
          </p>
          <h1
            id={labelId}
            className="mt-4 font-sans text-[clamp(1.6rem,4.2vw,2.85rem)] font-bold leading-[1.12] tracking-tight text-white"
          >
            <span className="font-light text-white/75">{slide.lineBefore} </span>
            <span className="text-white">{slide.lineBold}</span>
            <span className="font-light text-white/75">
              {" "}
              {slide.lineAfter}
            </span>
            {slide.brandInHeadline ? (
              <>
                {" "}
                <span className="text-[var(--hero-mustard)]">mychennaicity.in</span>
              </>
            ) : null}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base font-light leading-relaxed text-white/70 sm:text-[1.05rem]">
            {slide.sub}
          </p>
        </div>

        <form
          onSubmit={onSubmit}
          className="relative mx-auto mt-8 flex max-w-3xl flex-col gap-3 sm:flex-row sm:items-stretch sm:justify-center"
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
            className="min-h-12 min-w-0 flex-1 rounded-full border border-white/20 bg-white/10 px-5 text-sm font-normal text-white shadow-inner outline-none ring-[var(--hero-mustard)] backdrop-blur-sm transition placeholder:text-white/45 focus:border-[var(--hero-mustard)] focus:ring-2 sm:max-w-md"
          />
          <div className="flex min-h-12 flex-1 gap-0 overflow-hidden rounded-full border border-white/20 bg-white/10 shadow-inner backdrop-blur-sm sm:max-w-[200px]">
            <label className="sr-only" htmlFor="hero-filter">
              {slide.filterLabel}
            </label>
            <select
              id="hero-filter"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="min-w-0 flex-1 cursor-pointer border-0 bg-transparent px-4 text-sm font-medium text-white outline-none [&>option]:bg-[var(--hero-bg)] [&>option]:text-white"
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
            className="min-h-12 shrink-0 rounded-full bg-[var(--hero-mustard)] px-7 text-sm font-bold text-[#1a1a1a] shadow-md transition hover:bg-[color-mix(in_srgb,var(--hero-mustard)_88%,white)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--hero-mustard)]"
          >
            {slide.submitLabel}
          </button>
        </form>

        <div className="relative mt-5 flex flex-wrap items-center justify-center gap-3">
          <Link
            href={slide.primaryCta.href}
            className="text-sm font-semibold text-[var(--hero-mustard)] underline-offset-4 hover:underline"
          >
            {slide.primaryCta.label}
          </Link>
          <span className="hidden text-white/25 sm:inline">|</span>
          <Link
            href={slide.secondaryCta.href}
            className="text-sm font-light text-white/60 underline-offset-4 hover:text-white hover:underline"
          >
            {slide.secondaryCta.label}
          </Link>
        </div>

        <p className="relative mx-auto mt-6 max-w-2xl text-center text-sm font-light leading-relaxed text-white/55">
          <strong className="font-semibold text-white/80">Tip:</strong>{" "}
          {slide.footerNote}
        </p>

        <HeroImageBlock slide={slide} />
      </div>

      <div
        className="border-t border-white/10 bg-[color-mix(in_srgb,var(--hero-bg)_92%,black)] px-4 pb-8 pt-6 sm:px-6 lg:px-10"
        role="tablist"
        aria-label="What do you want to explore?"
      >
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SLIDES.map((s, i) => {
            const selected = i === index;
            return (
              <button
                key={s.key}
                type="button"
                role="tab"
                aria-selected={selected}
                className={`flex flex-col gap-3 rounded-bl-[1.35rem] rounded-tr-[1.35rem] border px-5 py-5 text-left transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--hero-mustard)] ${
                  selected
                    ? "border-[var(--hero-mustard)] bg-white shadow-[0_20px_40px_-24px_rgba(0,0,0,0.35)] ring-1 ring-[var(--hero-mustard-dim)]"
                    : "border-white/12 bg-white/95 hover:border-[var(--hero-mustard-dim)]/50"
                }`}
                onClick={() => go(i)}
              >
                <CardIcon slideKey={s.key} />
                <p
                  className={`text-base font-bold leading-snug ${
                    selected ? "text-[#111]" : "text-[#111]"
                  }`}
                >
                  {s.cardTitle}
                </p>
                <p className="line-clamp-2 text-sm leading-relaxed text-neutral-600">
                  {s.sub}
                </p>
                <span className="mt-auto inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-[#111]">
                  <span className="border-b-2 border-[var(--hero-mustard)] pb-0.5">
                    More
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        {reduceMotion ? null : (
          <p className="mt-4 text-center text-[11px] font-medium text-white/40">
            {paused ? "Rotation paused while you hover" : "Highlights rotate every few seconds"}
          </p>
        )}
      </div>
    </section>
  );
}
