import type { Metadata } from "next";
import Link from "next/link";
import { NewspaperGrid, NewspaperMasthead } from "@/components/news/newspaper-layout";
import {
  InteriorCrossNav,
  PageBreadcrumbs,
  TopicDeskNav,
  interiorMainClassName,
} from "@/components/site/interior-chrome";
import { listPublishedArticlesForChennai } from "@/domains/news";
import { getSiteUrl } from "@/lib/env";
import { mockArticles } from "@/lib/home-mock";

export const metadata: Metadata = {
  title: "Chennai local news",
  description:
    "Greater Chennai news with editorial analysis — newspaper-style front page from mychennaicity.in.",
  alternates: {
    canonical: `${getSiteUrl()}/chennai-local-news`,
    types: {
      "application/rss+xml": `${getSiteUrl()}/chennai-local-news/feed.xml`,
    },
  },
  openGraph: {
    title: "Chennai local news · mychennaicity.in",
    url: `${getSiteUrl()}/chennai-local-news`,
    type: "website",
  },
};

/** Same as home: avoid shipping HTML baked at build without DATABASE_URL. */
export const dynamic = "force-dynamic";

export default async function ChennaiLocalNewsPage() {
  let all: Awaited<ReturnType<typeof listPublishedArticlesForChennai>> = [];
  try {
    all = await listPublishedArticlesForChennai(60);
  } catch {
    /* DATABASE_URL unset or DB unreachable */
  }

  if (!all.length) {
    const wire = mockArticles.slice(0, 8);
    return (
      <div className={interiorMainClassName}>
        <PageBreadcrumbs
          items={[{ label: "Home", href: "/" }, { label: "Chennai local news" }]}
        />
        <NewspaperMasthead />
        <TopicDeskNav />

        <p className="type-eyebrow mt-8 text-[var(--accent)]">Publisher wire</p>
        <h1 className="type-display mt-2 text-3xl text-[var(--foreground)] sm:text-4xl">
          Chennai headlines while the edition syncs
        </h1>
        <p className="type-lede mt-4 max-w-2xl text-sm leading-relaxed">
          Our on-site analysis pages live in the database below this template.
          Until that connection is live, here is a curated wire from trusted
          publishers covering Greater Chennai — same themes we unpack with
          local context, timelines, and small interactives once articles are
          seeded.
        </p>

        <ul className="mt-10 space-y-4">
          {wire.map((a) => (
            <li
              key={a.href}
              className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-5 py-4 shadow-sm"
            >
              <a
                href={a.href}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-[var(--foreground)] transition hover:text-[var(--accent)]"
              >
                <span className="text-xs font-bold uppercase tracking-[0.12em] text-[var(--muted)]">
                  {a.category}
                  {a.source ? ` · ${a.source}` : ""}
                </span>
                <span className="mt-1 block text-sm font-semibold">{a.title}</span>
                {a.excerpt ? (
                  <span className="mt-2 block text-xs leading-relaxed text-[var(--muted)]">
                    {a.excerpt}
                  </span>
                ) : null}
                <span className="mt-2 block text-xs text-[var(--muted)]">
                  {a.date} · opens in new tab
                </span>
              </a>
            </li>
          ))}
        </ul>

        <div className="mt-10 rounded-2xl border border-dashed border-[var(--border)] bg-[color-mix(in_srgb,var(--surface)_96%,var(--accent))] px-5 py-5 text-sm text-[var(--muted)]">
          <p className="font-medium text-[var(--foreground)]">Editors &amp; deploy</p>
          <p className="mt-2">
            Connect <code className="rounded bg-[var(--surface)] px-1 ring-1 ring-[var(--border)]">DATABASE_URL</code>{" "}
            and run{" "}
            <code className="rounded bg-[var(--surface)] px-1 ring-1 ring-[var(--border)]">
              npm run db:seed
            </code>{" "}
            to publish the full Chennai local news edition on this URL.
          </p>
        </div>

        <InteriorCrossNav />
      </div>
    );
  }

  const [lead, ...rest] = all;
  const featuredOnly = all.filter((a) => a.featured);
  const featuredSide = (featuredOnly.length > 0 ? featuredOnly : rest).slice(
    0,
    5,
  );

  return (
    <div className={interiorMainClassName}>
      <PageBreadcrumbs
        items={[{ label: "Home", href: "/" }, { label: "Chennai local news" }]}
      />
      <NewspaperMasthead />
      <TopicDeskNav />
      <NewspaperGrid
        lead={lead}
        rest={rest}
        sidebar={
          <>
            <h2 className="type-display text-lg text-[var(--foreground)]">
              Editor&apos;s notebook
            </h2>
            <p className="type-lede mt-2 text-xs">
              Quick links to featured pieces. Full list in the main columns.
            </p>
            <ul className="mt-4 space-y-3">
              {featuredSide.map((a) => (
                <li key={a.id}>
                  <Link
                    href={`/chennai-local-news/${a.slug}`}
                    className="text-sm font-medium text-[var(--accent)] hover:underline"
                  >
                    {a.title}
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href="/"
              className="mt-6 inline-block text-xs font-semibold text-[var(--muted)] hover:text-[var(--accent)]"
            >
              Back to home
            </Link>
          </>
        }
      />
      <InteriorCrossNav />
    </div>
  );
}
