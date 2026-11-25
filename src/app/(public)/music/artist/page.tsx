import type { Metadata } from "next";
import Link from "next/link";
import { ArtistDirectoryList } from "@/components/music/artist-schedule";
import {
  InteriorCrossNav,
  PageBreadcrumbs,
  interiorMainClassName,
} from "@/components/site/interior-chrome";
import { listMusicArtists, MUSIC_ARTISTS_PATH } from "@/content/music";
import { getSiteUrl } from "@/lib/env";
import { fullSiteTitle } from "@/lib/seo/site-titles";

const titleSegment = "Music artists";
const description =
  "Musician schedule pages for Chennai concerts. Each artist page lists the dates we have on file and links the Chennai ones to the local events calendar.";

export const metadata: Metadata = {
  title: titleSegment,
  description,
  alternates: { canonical: `${getSiteUrl()}${MUSIC_ARTISTS_PATH}` },
  openGraph: {
    title: fullSiteTitle(titleSegment),
    description,
    url: `${getSiteUrl()}${MUSIC_ARTISTS_PATH}`,
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
};

export default function MusicArtistsPage() {
  const artists = listMusicArtists();

  return (
    <div className={interiorMainClassName}>
      <PageBreadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Music artists" },
        ]}
      />
      <p className="text-xs font-semibold uppercase tracking-wide text-[var(--accent-warm)]">
        Music
      </p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight text-[var(--foreground)] sm:text-4xl">
        Music artists
      </h1>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-[var(--muted)]">
        Season sheets for musicians playing in Chennai. Open an artist for the
        full list of dates. City concerts also sit on the{" "}
        <Link
          href="/chennai-local-events"
          className="font-medium text-[var(--accent)] underline-offset-4 hover:underline"
        >
          Chennai local events
        </Link>{" "}
        calendar. Tickets stay with the artist or the sabha.
      </p>
      <ArtistDirectoryList artists={artists} />
      <p className="mt-8 text-sm text-[var(--muted)]">
        A new artist is another file in the music registry, then a seed for the
        Chennai dates. The address stays{" "}
        <span className="text-[var(--foreground)]">/music/artist/name</span>.
      </p>
      <div className="mt-10">
        <InteriorCrossNav />
      </div>
    </div>
  );
}
