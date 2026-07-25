import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import {
  InteriorCrossNav,
  PageBreadcrumbs,
  interiorMainClassName,
} from "@/components/site/interior-chrome";
import { InteractiveChennaiMapExplorer } from "@/components/chennai-map-explorer/interactive-chennai-map-explorer";
import {
  ChennaiMapViewTabs,
  parseChennaiMapView,
} from "@/components/chennai-map-explorer/chennai-map-view-tabs";
import { InteractiveZoneMap } from "@/components/civic-tools/zone-map/interactive-zone-map";
import { getSiteUrl } from "@/lib/env";
import { CIVIC_TOOL_PATHS } from "@/lib/routes/civic-tools";
import { CHENNAI_GEO_META } from "@/lib/seo/chennai-geo-meta";
import { fullSiteTitle } from "@/lib/seo/site-titles";

export const dynamic = "force-dynamic";

type PageProps = {
  searchParams: Promise<{ view?: string }>;
};

export async function generateMetadata({
  searchParams,
}: PageProps): Promise<Metadata> {
  const base = getSiteUrl();
  const view = parseChennaiMapView((await searchParams).view);
  const isZones = view === "zones";
  const title = isZones
    ? "Chennai Corporation zone map — GCC 15-zone explorer"
    : "Interactive Chennai map explorer — wards, zones & overlays";
  const description = isZones
    ? "Explore Greater Chennai Corporation operational zones on an interactive map. Switch layers, search wards and localities, and compare proposed boundary sets when geometry is verified."
    : "Explore Greater Chennai on an interactive ward-level map. Hover areas, toggle IT corridor, metro, industrial, flood-sensitive and growth overlays, search for a locality, and jump to area guides. Also open the Corporation zone map.";
  const canonical = isZones
    ? `${base}/chennai-map?view=zones`
    : `${base}/chennai-map`;
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title: fullSiteTitle(title),
      description,
      url: canonical,
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

export default async function ChennaiMapPage({ searchParams }: PageProps) {
  const view = parseChennaiMapView((await searchParams).view);
  const isZones = view === "zones";

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
          {isZones
            ? "Chennai Corporation zone map"
            : "Interactive Chennai Map Explorer"}
        </h1>
        <p className="type-lede mt-4 max-w-2xl text-base leading-relaxed text-[var(--muted)]">
          {isZones ? (
            <>
              Operational GCC 15-zone layer with ward and locality search. Proposed 20-zone and
              historical 23-zone layers stay off until official geometry is verified. Boundaries are
              editorial — confirm on Greater Chennai Corporation materials for planning or legal use.
            </>
          ) : (
            <>
              Ward-level map from open civic datasets — hover areas, toggle overlays, and jump to
              macro hubs. Boundaries are editorial; confirm on official Greater Chennai Corporation
              materials for planning or legal use.
            </>
          )}
        </p>
        <ChennaiMapViewTabs active={view} />
        <p className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/areas"
            className="rounded-full bg-[var(--accent)] px-5 py-2 text-sm font-semibold text-[var(--accent-fg)] transition hover:bg-[var(--accent-hover)]"
          >
            Browse area hubs
          </Link>
          {isZones ? (
            <Link
              href={CIVIC_TOOL_PATHS.zoneMap}
              className="rounded-full border border-[var(--border)] px-5 py-2 text-sm font-semibold text-[var(--foreground)] transition hover:border-[var(--accent)]"
            >
              Open in civic tools
            </Link>
          ) : (
            <Link
              href="/directory"
              className="rounded-full border border-[var(--border)] px-5 py-2 text-sm font-semibold text-[var(--foreground)] transition hover:border-[var(--accent)]"
            >
              Browse all listings
            </Link>
          )}
        </p>
      </header>

      <section className="mt-10" aria-labelledby="map-heading">
        <h2 id="map-heading" className="sr-only">
          {isZones ? "Corporation zone map" : "Interactive ward map"}
        </h2>
        {isZones ? (
          <Suspense
            fallback={<p className="text-sm text-[var(--muted)]">Loading zone map…</p>}
          >
            <InteractiveZoneMap />
          </Suspense>
        ) : (
          <InteractiveChennaiMapExplorer forceLoad />
        )}
      </section>

      <InteriorCrossNav />
    </div>
  );
}
