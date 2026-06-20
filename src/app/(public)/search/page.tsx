import type { Metadata } from "next";
import Link from "next/link";
import {
  InteriorCrossNav,
  PageBreadcrumbs,
  interiorMainClassName,
} from "@/components/site/interior-chrome";
import { SiteSearchForm } from "@/components/site/site-search-form";
import { getSiteUrl } from "@/lib/env";
import { searchSite, type SiteSearchHit } from "@/lib/site-search";
import { fullSiteTitle } from "@/lib/seo/site-titles";

const path = "/search";

export const metadata: Metadata = {
  title: "Search — Chennai news, jobs & events",
  description:
    "Search mychennaicity.in for Chennai local news, jobs, events, and directory listings.",
  alternates: { canonical: `${getSiteUrl()}${path}` },
  robots: { index: false, follow: true },
  openGraph: {
    title: fullSiteTitle("Search mychennaicity.in"),
    url: `${getSiteUrl()}${path}`,
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
};

export const dynamic = "force-dynamic";

type PageProps = { searchParams: Promise<{ q?: string }> };

const KIND_LABEL: Record<SiteSearchHit["kind"], string> = {
  news: "News",
  job: "Job",
  event: "Event",
  directory: "Directory",
};

function groupHits(hits: SiteSearchHit[]) {
  const groups: Record<SiteSearchHit["kind"], SiteSearchHit[]> = {
    news: [],
    job: [],
    event: [],
    directory: [],
  };
  for (const h of hits) groups[h.kind].push(h);
  return groups;
}

export default async function SearchPage({ searchParams }: PageProps) {
  const q = (await searchParams).q?.trim() ?? "";
  const hits = q.length >= 2 ? await searchSite(q) : [];
  const groups = groupHits(hits);

  return (
    <div className={interiorMainClassName}>
      <PageBreadcrumbs
        items={[{ label: "Home", href: "/" }, { label: "Search" }]}
      />
      <p className="type-eyebrow text-[var(--accent)]">Search</p>
      <h1 className="type-display mt-2 text-3xl text-[var(--foreground)] sm:text-4xl">
        Find Chennai news, jobs, and events
      </h1>
      <p className="type-lede mt-4 max-w-2xl text-sm leading-relaxed text-[var(--muted)]">
        Search published stories, open jobs, upcoming events, and directory
        listings on mychennaicity.in.
      </p>

      <div className="mt-8 max-w-xl">
        <SiteSearchForm
          className="!flex w-full flex-col sm:!flex-row"
          initialQuery={q}
        />
      </div>

      {q.length > 0 && q.length < 2 ? (
        <p className="mt-8 text-sm text-[var(--muted)]">
          Enter at least two characters to search.
        </p>
      ) : null}

      {q.length >= 2 && hits.length === 0 ? (
        <p className="mt-8 text-sm text-[var(--muted)]">
          No results for &ldquo;{q}&rdquo;. Try a shorter phrase or browse{" "}
          <Link
            href="/chennai-local-news"
            className="font-semibold text-[var(--accent)] underline-offset-4 hover:underline"
          >
            local news
          </Link>
          .
        </p>
      ) : null}

      {hits.length > 0 ? (
        <div className="mt-10 space-y-10">
          {(["news", "job", "event", "directory"] as const).map((kind) => {
            const items = groups[kind];
            if (items.length === 0) return null;
            return (
              <section key={kind} aria-labelledby={`search-${kind}`}>
                <h2
                  id={`search-${kind}`}
                  className="text-sm font-bold uppercase tracking-[0.14em] text-[var(--muted)]"
                >
                  {KIND_LABEL[kind]} ({items.length})
                </h2>
                <ul className="mt-4 divide-y divide-[var(--border)] rounded-2xl border border-[var(--border)] bg-[var(--surface)]">
                  {items.map((hit) => (
                    <li key={hit.href + hit.title}>
                      <Link
                        href={hit.href}
                        className="block px-5 py-4 transition hover:bg-[color-mix(in_srgb,var(--accent)_6%,var(--background))]"
                      >
                        <span className="text-sm font-semibold text-[var(--foreground)]">
                          {hit.title}
                        </span>
                        <span className="mt-1 block text-xs text-[var(--muted)]">
                          {hit.meta}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}
        </div>
      ) : null}

      <InteriorCrossNav />
    </div>
  );
}
