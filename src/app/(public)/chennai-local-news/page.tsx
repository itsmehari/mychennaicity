import type { Metadata } from "next";
import Link from "next/link";
import { NewspaperGrid, NewspaperMasthead } from "@/components/news/newspaper-layout";
import { listPublishedArticlesForChennai } from "@/domains/news";
import { getSiteUrl } from "@/lib/env";

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

export const revalidate = 120;

export default async function ChennaiLocalNewsPage() {
  let all: Awaited<ReturnType<typeof listPublishedArticlesForChennai>> = [];
  try {
    all = await listPublishedArticlesForChennai(60);
  } catch {
    /* DATABASE_URL unset or DB unreachable */
  }
  if (!all.length) {
    return (
      <div className="mx-auto max-w-[1280px] px-4 py-14">
        <NewspaperMasthead />
        <p className="mt-10 text-[var(--muted)]">
          No articles yet. Run{" "}
          <code className="rounded bg-[var(--surface)] px-1 ring-1 ring-[var(--border)]">
            npm run db:seed
          </code>{" "}
          with{" "}
          <code className="rounded bg-[var(--surface)] px-1 ring-1 ring-[var(--border)]">
            DATABASE_URL
          </code>{" "}
          set.
        </p>
        <Link href="/" className="mt-6 inline-block text-[var(--accent)]">
          Home
        </Link>
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
    <div className="mx-auto max-w-[1280px] px-4 py-10 sm:py-14">
      <NewspaperMasthead />
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
    </div>
  );
}
