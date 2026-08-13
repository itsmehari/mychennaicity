import type { Metadata } from "next";
import Link from "next/link";
import { CopyShareButton } from "@/components/compulsive/copy-share-button";
import {
  GuideDisclaimer,
  GuideFinePrint,
} from "@/components/compulsive/guide-trust-blocks";
import {
  InteriorCrossNav,
  PageBreadcrumbs,
  interiorMainClassName,
} from "@/components/site/interior-chrome";
import { HubCommunityStrip } from "@/components/community/hub-community-strip";
import {
  CHENNAI_TODAY_FALLBACK_WEATHER,
  CHENNAI_TODAY_FAQ,
  CHENNAI_TODAY_METRO_NOTE,
  CHENNAI_TODAY_PATH,
} from "@/content/compulsive/chennai-today";
import { compulsivePath } from "@/content/compulsive/index";
import { listPublicEventsForChennaiHub } from "@/domains/events";
import { listPublishedArticlesForChennai } from "@/domains/news";
import { getSiteUrl } from "@/lib/env";
import { fullSiteTitle } from "@/lib/seo/site-titles";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const titleSegment = "Chennai today in 60 seconds";

export const metadata: Metadata = {
  title: titleSegment,
  description:
    "Chennai morning card — weather cue, Metro note, one news headline, one upcoming event. Built to forward on WhatsApp.",
  alternates: { canonical: `${getSiteUrl()}${CHENNAI_TODAY_PATH}` },
  openGraph: {
    title: fullSiteTitle(titleSegment),
    description: "Sixty seconds on Chennai — weather, Metro, news, and what’s on.",
    url: `${getSiteUrl()}${CHENNAI_TODAY_PATH}`,
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
};

async function fetchWeatherLine(): Promise<string> {
  try {
    const url =
      "https://api.open-meteo.com/v1/forecast?latitude=13.0827&longitude=80.2707&current=temperature_2m,relative_humidity_2m,weather_code&timezone=Asia%2FKolkata";
    const res = await fetch(url, { next: { revalidate: 1800 } });
    if (!res.ok) return CHENNAI_TODAY_FALLBACK_WEATHER;
    const data = (await res.json()) as {
      current?: { temperature_2m?: number; relative_humidity_2m?: number };
    };
    const t = data.current?.temperature_2m;
    const h = data.current?.relative_humidity_2m;
    if (t == null) return CHENNAI_TODAY_FALLBACK_WEATHER;
    return `About ${Math.round(t)}°C now${h != null ? `, humidity ~${Math.round(h)}%` : ""} (Open-Meteo). Carry water; check rain radar before beach or OMR runs.`;
  } catch {
    return CHENNAI_TODAY_FALLBACK_WEATHER;
  }
}

function formatIstStamp(d: Date) {
  return new Intl.DateTimeFormat("en-IN", {
    timeZone: "Asia/Kolkata",
    weekday: "short",
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(d);
}

export default async function ChennaiTodayPage() {
  const weather = await fetchWeatherLine();

  let newsTitle = "Browse the Chennai local news desk";
  let newsHref = "/chennai-local-news";
  let eventTitle = "See what’s on in Chennai";
  let eventHref = "/chennai-local-events";

  try {
    const articles = await listPublishedArticlesForChennai(1);
    if (articles[0]) {
      newsTitle = articles[0].title;
      newsHref = `/chennai-local-news/${articles[0].slug}`;
    }
  } catch {
    /* keep fallback */
  }

  try {
    const events = await listPublicEventsForChennaiHub(8);
    const next = events[0];
    if (next) {
      eventTitle = next.title;
      eventHref = `/chennai-local-events/${next.slug}`;
    }
  } catch {
    /* keep fallback */
  }

  const stamp = formatIstStamp(new Date());
  const site = getSiteUrl();
  const shareBody = `Chennai today (${stamp})\n• Weather: ${weather}\n• Metro: ${CHENNAI_TODAY_METRO_NOTE}\n• News: ${newsTitle}\n• Event: ${eventTitle}\n${site}${CHENNAI_TODAY_PATH}`;

  return (
    <div className={interiorMainClassName}>
      <PageBreadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Chennai today" },
        ]}
      />

      <header className="mt-6 max-w-3xl">
        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--accent)]">
          Daily desk · IST
        </p>
        <h1 className="type-display mt-2 text-3xl font-bold tracking-tight text-[var(--foreground)] sm:text-4xl">
          mychennaicity.in
        </h1>
        <p className="type-lede mt-3 text-base leading-relaxed text-[var(--muted)]">
          Chennai today in 60 seconds — one card for the morning WhatsApp forward.
        </p>
        <p className="mt-2 text-xs text-[var(--muted)]">Updated {stamp}</p>
      </header>

      <HubCommunityStrip businessVariant="default" className="mt-6" />

      <section className="mt-8 max-w-3xl rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 sm:p-6">
        <h2 className="text-lg font-bold text-[var(--foreground)]">60-second card</h2>
        <ul className="mt-4 space-y-4 text-sm leading-relaxed text-[var(--muted)]">
          <li>
            <strong className="text-[var(--foreground)]">Weather.</strong> {weather}
          </li>
          <li>
            <strong className="text-[var(--foreground)]">Metro.</strong> {CHENNAI_TODAY_METRO_NOTE}
          </li>
          <li>
            <strong className="text-[var(--foreground)]">News cue.</strong>{" "}
            <Link href={newsHref} className="font-semibold text-[var(--accent)] hover:underline">
              {newsTitle}
            </Link>
          </li>
          <li>
            <strong className="text-[var(--foreground)]">What’s on.</strong>{" "}
            <Link href={eventHref} className="font-semibold text-[var(--accent)] hover:underline">
              {eventTitle}
            </Link>
          </li>
        </ul>
        <div className="mt-5">
          <CopyShareButton hubId="chennai-today" buildText={() => shareBody} />
        </div>
      </section>

      <article className="prose prose-sm mt-10 max-w-3xl text-[var(--muted)] prose-p:leading-relaxed prose-headings:text-[var(--foreground)] prose-strong:text-[var(--foreground)] prose-a:text-[var(--accent)]">
        <GuideDisclaimer kind="civic" />

        <h2>FAQ</h2>
        {CHENNAI_TODAY_FAQ.map((item) => (
          <div key={item.q}>
            <h3>{item.q}</h3>
            <p>{item.a}</p>
          </div>
        ))}

        <h2>Related</h2>
        <ul>
          <li>
            <a href="/chennai-gold-rate">Chennai gold rate</a>
          </li>
          <li>
            <a href="/civic-tools">Civic tools</a>
          </li>
          <li>
            <a href={compulsivePath("petrol-vs-ev")}>Petrol vs EV cost calculator</a>
          </li>
          <li>
            <a href={compulsivePath("afford-area")}>Afford-this-area calculator</a>
          </li>
        </ul>

        <GuideFinePrint />
      </article>

      <InteriorCrossNav />
    </div>
  );
}
