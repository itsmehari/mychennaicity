import type { Metadata } from "next";
import Link from "next/link";
import { ArtistDirectoryList } from "@/components/music/artist-schedule";
import {
  InteriorCrossNav,
  PageBreadcrumbs,
  interiorMainClassName,
} from "@/components/site/interior-chrome";
import { MUSIC_SEASON_PASSAGE } from "@/content/aeo/jobs-events-passages";
import { listMusicArtists } from "@/content/music";
import {
  MUSIC_SEASON_HUB_TITLE,
  musicHubMetadata,
} from "@/content/music/search-copy";
import { buildMusicHubJsonLd } from "@/lib/seo/music-artist-jsonld";

export const metadata: Metadata = musicHubMetadata();

export default function MusicArtistsPage() {
  const artists = listMusicArtists();

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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildMusicHubJsonLd()) }}
      />
      <p className="text-xs font-semibold uppercase tracking-wide text-[var(--accent-warm)]">
        Music
      </p>
      <h1 className="mt-2 max-w-3xl text-3xl font-semibold tracking-tight text-[var(--foreground)] sm:text-4xl">
        {MUSIC_SEASON_HUB_TITLE}
      </h1>
      <p className="mt-4 max-w-3xl text-base leading-relaxed text-[var(--foreground)]">
        {MUSIC_SEASON_PASSAGE}
      </p>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[var(--muted)]">
        Open an artist for the dates on that sheet. City concerts also sit on the{" "}
        <Link
          href="/chennai-local-events"
          className="font-medium text-[var(--accent)] underline-offset-4 hover:underline"
        >
          Chennai local events
        </Link>{" "}
        calendar.
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
