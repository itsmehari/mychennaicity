import type { Metadata } from "next";
import Link from "next/link";
import {
  InteriorCrossNav,
  PageBreadcrumbs,
  interiorMainClassName,
} from "@/components/site/interior-chrome";
import { MUSIC_ARTISTS_PATH, MUSIC_SABHAS_PATH } from "@/content/music";
import {
  SEASON_SCHEDULE_ANSWER,
  SEASON_SERIES,
  seasonConcertPath,
} from "@/content/music/season-concerts";
import { getSiteUrl } from "@/lib/env";
import { fullSiteTitle } from "@/lib/seo/site-titles";

const title = "Chennai music season schedule";

export const metadata: Metadata = {
  title: fullSiteTitle(title),
  description: SEASON_SCHEDULE_ANSWER,
  alternates: { canonical: "/music" },
};

export default function MusicSchedulePage() {
  const base = getSiteUrl().replace(/\/$/, "");
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: title,
    description: SEASON_SCHEDULE_ANSWER,
    url: `${base}/music`,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: SEASON_SERIES.map((series, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: series.title,
        url: `${base}/music#${series.id}`,
      })),
    },
  };

  return (
    <div className={interiorMainClassName}>
      <PageBreadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Music season" },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <p className="text-xs font-semibold uppercase tracking-wide text-[var(--accent-warm)]">
        Music
      </p>
      <h1 className="mt-2 max-w-3xl text-3xl font-semibold tracking-tight text-[var(--foreground)] sm:text-4xl">
        {title}
      </h1>
      <p className="mt-4 max-w-3xl text-base leading-relaxed text-[var(--foreground)]">
        {SEASON_SCHEDULE_ANSWER}
      </p>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[var(--muted)]">
        Artist sheets stay at{" "}
        <Link href={MUSIC_ARTISTS_PATH} className="font-medium text-[var(--accent)] underline-offset-4 hover:underline">
          Music season artists
        </Link>
        . Sabha programmes stay at{" "}
        <Link href={MUSIC_SABHAS_PATH} className="font-medium text-[var(--accent)] underline-offset-4 hover:underline">
          Sabhas
        </Link>
        . The full calendar is{" "}
        <Link href="/chennai-local-events" className="font-medium text-[var(--accent)] underline-offset-4 hover:underline">
          Chennai local events
        </Link>
        .
      </p>
      {SEASON_SERIES.map((series) => (
        <section key={series.id} id={series.id} className="mt-10">
          <h2 className="text-xl font-semibold tracking-tight text-[var(--foreground)]">
            {series.title}
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-[var(--muted)]">
            {series.venueAddress} {series.ticketNote}
          </p>
          <ul className="mt-4 divide-y divide-[var(--border)] border-y border-[var(--border)]">
            {series.slots.map((item) => (
              <li key={item.slug} className="py-3">
                <Link
                  href={seasonConcertPath(item.slug)}
                  className="font-medium text-[var(--foreground)] underline-offset-4 hover:underline"
                >
                  {item.printedDate} · {item.artist}
                </Link>
                <p className="mt-1 text-sm text-[var(--muted)]">
                  {item.programme}
                  {item.withLine ? ` · ${item.withLine}` : ""}
                </p>
              </li>
            ))}
          </ul>
        </section>
      ))}
      <div className="mt-10">
        <InteriorCrossNav />
      </div>
    </div>
  );
}
