import type { Metadata } from "next";
import Link from "next/link";
import { SabhaDirectoryList } from "@/components/music/sabha-schedule";
import {
  InteriorCrossNav,
  PageBreadcrumbs,
  interiorMainClassName,
} from "@/components/site/interior-chrome";
import { listMusicSabhas } from "@/content/music";
import {
  SABHAS_HUB_TITLE,
  SABHAS_PASSAGE,
  musicSabhaHubMetadata,
} from "@/content/music/sabha-copy";
import { buildSabhaHubJsonLd } from "@/lib/seo/music-sabha-jsonld";

export const metadata: Metadata = musicSabhaHubMetadata();

export default function MusicSabhasPage() {
  const sabhas = listMusicSabhas();

  return (
    <div className={interiorMainClassName}>
      <PageBreadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Sabhas" },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildSabhaHubJsonLd()) }}
      />
      <p className="text-xs font-semibold uppercase tracking-wide text-[var(--accent-warm)]">
        Music
      </p>
      <h1 className="mt-2 max-w-3xl text-3xl font-semibold tracking-tight text-[var(--foreground)] sm:text-4xl">
        {SABHAS_HUB_TITLE}
      </h1>
      <p className="mt-4 max-w-3xl text-base leading-relaxed text-[var(--foreground)]">
        {SABHAS_PASSAGE}
      </p>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[var(--muted)]">
        A musician’s own dates stay on the{" "}
        <Link href="/music/artist" className="font-medium text-[var(--accent)] underline-offset-4 hover:underline">
          music season
        </Link>{" "}
        pages. A named concert stays on the events calendar.
      </p>
      <SabhaDirectoryList sabhas={sabhas} />
      <div className="mt-10">
        <InteriorCrossNav />
      </div>
    </div>
  );
}
