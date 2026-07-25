import type { Metadata } from "next";
import Link from "next/link";
import {
  InteriorCrossNav,
  PageBreadcrumbs,
  interiorMainClassName,
} from "@/components/site/interior-chrome";
import { InteractiveChennaiMapExplorer } from "@/components/chennai-map-explorer/interactive-chennai-map-explorer";
import { getSiteUrl } from "@/lib/env";
import { CHENNAI_GEO_META } from "@/lib/seo/chennai-geo-meta";
import { fullSiteTitle } from "@/lib/seo/site-titles";

export const dynamic = "force-dynamic";

export function generateMetadata(): Metadata {
  const base = getSiteUrl();
  const title = "Interactive Chennai map explorer — wards, zones & overlays";
  const description =
    "Explore Greater Chennai on an interactive ward-level map. Hover areas, toggle IT corridor, metro, industrial, flood-sensitive and growth overlays, search for a locality, and jump to area guides.";
  return {
    title,
    description,
    alternates: { canonical: `${base}/chennai-map` },
    openGraph: {
      title: fullSiteTitle(title),
      description,
      url: `${base}/chennai-map`,
      images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullSiteTitle(title),
      images: ["/twitter-image"],
    },
    other: { ...CHENNAI_GEO_META },
  };
}

export default function ChennaiMapPage() {
  return (
    <div className={interiorMainClassName}>
      <PageBreadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Chennai map" },
        ]}
      />

      <header className="mt-2">
        <p className="type-eyebrow text-[var(--accent)]">Explore</p>
        <h1 className="type-display mt-2 max-w-3xl text-3xl text-[var(--foreground)] sm:text-4xl lg:text-[2.65rem] lg:leading-tight">
          Interactive Chennai Map Explorer
        </h1>
        <p className="type-lede mt-4 max-w-2xl text-base leading-relaxed text-[var(--muted)]">
          Ward-level map from open civic datasets — hover areas, toggle overlays, and jump to macro
          hubs. Boundaries are editorial; confirm on official Greater Chennai Corporation materials
          for planning or legal use.
        </p>
        <p className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/areas"
            className="rounded-full bg-[var(--accent)] px-5 py-2 text-sm font-semibold text-[var(--accent-fg)] transition hover:bg-[var(--accent-hover)]"
          >
            Browse area hubs
          </Link>
          <Link
            href="/directory"
            className="rounded-full border border-[var(--border)] px-5 py-2 text-sm font-semibold text-[var(--foreground)] transition hover:border-[var(--accent)]"
          >
            Browse all listings
          </Link>
        </p>
      </header>

      <section className="mt-10" aria-labelledby="map-heading">
        <h2 id="map-heading" className="sr-only">
          Interactive ward map
        </h2>
        <InteractiveChennaiMapExplorer forceLoad />
      </section>

      <InteriorCrossNav />
    </div>
  );
}
