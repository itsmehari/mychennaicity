import type { Metadata } from "next";
import Link from "next/link";
import {
  InteriorCrossNav,
  PageBreadcrumbs,
  interiorMainClassName,
} from "@/components/site/interior-chrome";
import { InteractiveChennaiMapExplorer } from "@/components/chennai-map-explorer/interactive-chennai-map-explorer";
import { getRichAreaHubContent } from "@/content/area-hubs";
import { chennaiZones } from "@/lib/chennai-zones";
import { getSiteUrl } from "@/lib/env";
import { CHENNAI_GEO_META } from "@/lib/seo/chennai-geo-meta";
import { fullSiteTitle } from "@/lib/seo/site-titles";

export const dynamic = "force-dynamic";

export function generateMetadata(): Metadata {
  const base = getSiteUrl();
  const title = "Chennai area hubs — neighbourhoods, news & civic guides";
  const description =
    "Browse all Greater Chennai area hubs on mychennaicity.in — neighbourhood context, local news, classifieds, and the interactive ward map for every macro zone.";
  return {
    title,
    description,
    alternates: { canonical: `${base}/areas` },
    openGraph: {
      title: fullSiteTitle(title),
      description,
      url: `${base}/areas`,
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

export default function AreasIndexPage() {
  return (
    <div className={interiorMainClassName}>
      <PageBreadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Areas" },
        ]}
      />

      <header className="mt-2">
        <p className="type-eyebrow text-[var(--accent)]">Chennai area hubs</p>
        <h1 className="type-display mt-2 max-w-3xl text-3xl text-[var(--foreground)] sm:text-4xl lg:text-[2.65rem] lg:leading-tight">
          Browse Chennai by area
        </h1>
        <p className="type-lede mt-4 max-w-2xl text-base leading-relaxed text-[var(--muted)]">
          Each hub groups nearby wards and localities so residents can follow civic, mobility, and
          neighbourhood stories without hunting across the whole city. Pick your area below or
          explore the interactive ward map.
        </p>
        <p className="mt-6">
          <Link
            href="/#areas"
            className="rounded-full bg-[var(--accent)] px-5 py-2 text-sm font-semibold text-[var(--accent-fg)] transition hover:bg-[var(--accent-hover)]"
          >
            Open city map
          </Link>
        </p>
      </header>

      {/* Area hub grid */}
      <section className="mt-12" aria-labelledby="all-hubs-heading">
        <h2
          id="all-hubs-heading"
          className="type-display text-xl text-[var(--foreground)]"
        >
          All area hubs
        </h2>
        <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {chennaiZones.map((zone) => {
            const rich = getRichAreaHubContent(zone.slug);
            const identityLine = rich?.identityLine ?? zone.blurb;
            return (
              <li key={zone.slug}>
                <Link
                  href={`/areas/${zone.slug}`}
                  className="group flex h-full flex-col rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 transition hover:border-[var(--accent)]"
                >
                  <h3 className="text-base font-semibold text-[var(--foreground)] group-hover:text-[var(--accent)]">
                    {zone.label}
                  </h3>
                  <p className="mt-1 text-xs font-medium uppercase tracking-[0.1em] text-[var(--accent-warm)]">
                    {identityLine}
                  </p>
                  <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-[var(--muted)]">
                    {zone.blurb}
                  </p>
                  <span className="mt-4 text-xs font-semibold text-[var(--accent)] underline-offset-2 group-hover:underline">
                    Open area guide →
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      {/* Interactive ward map */}
      <section className="mt-16" aria-labelledby="map-heading">
        <h2
          id="map-heading"
          className="type-display text-xl text-[var(--foreground)]"
        >
          Explore Chennai on the ward map
        </h2>
        <p className="type-lede mt-2 max-w-2xl text-sm leading-relaxed text-[var(--muted)]">
          Click any ward to jump to its area guide. Overlays show IT corridors, metro links, flood-sensitive zones, and more.
        </p>
        <div className="mt-6">
          <InteractiveChennaiMapExplorer forceLoad />
        </div>
      </section>

      <InteriorCrossNav />
    </div>
  );
}
