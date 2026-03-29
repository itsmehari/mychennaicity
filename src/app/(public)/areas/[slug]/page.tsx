import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  InteriorCrossNav,
  PageBreadcrumbs,
  interiorMainClassName,
} from "@/components/site/interior-chrome";
import { CHENNAI_GEO_VERSION, chennaiZones } from "@/lib/chennai-zones";
import { getSiteUrl } from "@/lib/env";
import { buildAreaHubJsonLd } from "@/lib/seo/area-hub-jsonld";
import { fullSiteTitle } from "@/lib/seo/site-titles";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return chennaiZones.map((z) => ({ slug: z.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const zone = chennaiZones.find((z) => z.slug === slug);
  if (!zone) {
    return { title: { absolute: fullSiteTitle("Chennai area not found") } };
  }
  const base = getSiteUrl();
  const titleSegment = `${zone.label} — Chennai area`;
  const docTitle = fullSiteTitle(titleSegment);
  return {
    title: titleSegment,
    description: `${zone.blurb} News, events, jobs, and directory links for this part of Chennai.`,
    alternates: { canonical: `${base}/areas/${zone.slug}` },
    openGraph: {
      title: docTitle,
      description: zone.blurb,
      url: `${base}/areas/${zone.slug}`,
      images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: docTitle,
      images: ["/twitter-image"],
    },
  };
}

export default async function AreaPage({ params }: Props) {
  const { slug } = await params;
  const zone = chennaiZones.find((z) => z.slug === slug);
  if (!zone) notFound();

  const { webPage, breadcrumbs, itemList } = buildAreaHubJsonLd(zone);

  const quickLinks: {
    href: string;
    label: string;
    hint: string;
  }[] = [
    {
      href: "/chennai-local-news",
      label: "Chennai local news",
      hint: "City-wide news and topics",
    },
    {
      href: "/chennai-local-events",
      label: "Chennai local events",
      hint: "Concerts, utsavams, and civic dates",
    },
    {
      href: "/chennai-jobs",
      label: "Jobs nearby",
      hint: "Jobs in Chennai and nearby",
    },
    {
      href: "/directory",
      label: "Directory",
      hint: "Places and services by category",
    },
  ];

  return (
    <div className={interiorMainClassName}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPage) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList) }}
      />
      <PageBreadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Areas", href: "/#areas" },
          { label: zone.label },
        ]}
      />
      <p className="type-eyebrow text-[var(--accent)]">Area hub</p>
      <h1 className="type-display mt-2 text-3xl text-[var(--foreground)] sm:text-4xl">
        {zone.label}
      </h1>
      {zone.gccZoneNumber ? (
        <p className="type-lede mt-2 text-sm text-[var(--muted)]">
          Reference GCC zone index {zone.gccZoneNumber} — verify against official
          notifications before relying on it for complaints or maps.
        </p>
      ) : null}
      <p className="type-lede mt-4 max-w-2xl text-sm leading-relaxed">
        {zone.blurb}
      </p>

      <section
        className="mt-10"
        aria-labelledby="highlights-heading"
      >
        <h2
          id="highlights-heading"
          className="type-display text-xl text-[var(--foreground)]"
        >
          Why this hub exists
        </h2>
        <ul className="mt-4 max-w-2xl space-y-3 text-sm leading-relaxed text-[var(--muted)]">
          {zone.highlights.map((h, i) => (
            <li key={i} className="flex gap-2">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" aria-hidden />
              <span>{h}</span>
            </li>
          ))}
        </ul>
      </section>

      <p className="mt-8 text-xs text-[var(--muted)]">
        Geo version:{" "}
        <code className="rounded bg-[var(--surface)] px-1.5 py-0.5 ring-1 ring-[var(--border)]">
          {CHENNAI_GEO_VERSION}
        </code>
      </p>

      <section className="mt-10" aria-labelledby="shortcuts-heading">
        <h2
          id="shortcuts-heading"
          className="type-display text-xl text-[var(--foreground)]"
        >
          Shortcuts
        </h2>
        <p className="type-lede mt-2 max-w-2xl text-sm">
          Area-scoped filters on these routes will arrive with the listings API.
          For now, use the city-wide pages — your hub bookmark stays the same.
        </p>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {quickLinks.map((c) => (
            <li key={c.href}>
              <Link
                href={c.href}
                className="block rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-4 py-4 text-sm font-medium text-[var(--foreground)] transition hover:border-[var(--accent)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
              >
                {c.label}
                <span className="mt-2 block text-xs font-normal text-[var(--muted)]">
                  {c.hint}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <p className="mt-10">
        <Link
          href="/#areas"
          className="text-sm font-semibold text-[var(--accent)] underline-offset-4 hover:underline"
        >
          ← All areas on the map
        </Link>
      </p>

      <InteriorCrossNav />
    </div>
  );
}
