import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/home/section";
import {
  InteriorCrossNav,
  PageBreadcrumbs,
  interiorMainClassName,
} from "@/components/site/interior-chrome";
import {
  countOpenJobPostingsForChennaiHub,
  listOpenJobPostingsForChennaiHub,
} from "@/domains/jobs";
import { getSiteUrl } from "@/lib/env";
import { homeStats, mockJobs } from "@/lib/home-mock";
import { CHENNAI_JOBS_HUB_PATH } from "@/lib/routes/chennai-jobs";
import { buildJobsHubJsonLd } from "@/lib/seo/jobs-hub-jsonld";
import { fullSiteTitle } from "@/lib/seo/site-titles";

const titleSegment = "Jobs in Chennai";

const PAGE_SIZE = 20;

type PageProps = { searchParams: Promise<{ page?: string }> };

export async function generateMetadata({
  searchParams,
}: PageProps): Promise<Metadata> {
  const base = getSiteUrl();
  const hubUrl = `${base}${CHENNAI_JOBS_HUB_PATH}`;
  const sp = await searchParams;
  const pageNum = Math.max(1, parseInt(sp.page ?? "1", 10) || 1);
  let total = 0;
  try {
    total = await countOpenJobPostingsForChennaiHub();
  } catch {
    total = 0;
  }
  const hasLive = total > 0;
  const description = hasLive
    ? `${total} open jobs in Chennai — tech, product, and newsroom roles on mychennaicity.in. Read the full post here; apply only on the employer’s own careers page or form.`
    : "Jobs in Chennai: a short list we put together by hand, with links to real company career pages. We are not a big job portal — always read the ad and apply on the employer’s site.";

  const canonical =
    pageNum <= 1 ? hubUrl : `${hubUrl}?page=${pageNum}`;

  return {
    title: titleSegment,
    description,
    alternates: { canonical },
    openGraph: {
      title: fullSiteTitle(titleSegment),
      description: hasLive
        ? `${total} open roles in Chennai — double-check every detail on the company’s site before you apply.`
        : "A small list of Chennai-area roles — always confirm on the employer’s careers page.",
      url: canonical,
      images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullSiteTitle(titleSegment),
      description: hasLive
        ? `${total} jobs in Chennai — confirm on the employer’s site before you apply.`
        : "Chennai job picks — confirm on the employer’s site.",
      images: ["/twitter-image"],
    },
  };
}

export const dynamic = "force-dynamic";

export default async function ChennaiJobsHubPage({ searchParams }: PageProps) {
  const sp = await searchParams;
  const pageNum = Math.max(1, parseInt(sp.page ?? "1", 10) || 1);
  const offset = (pageNum - 1) * PAGE_SIZE;

  let total = 0;
  let dbJobs: Awaited<ReturnType<typeof listOpenJobPostingsForChennaiHub>> =
    [];
  try {
    total = await countOpenJobPostingsForChennaiHub();
    dbJobs = await listOpenJobPostingsForChennaiHub(PAGE_SIZE, offset);
  } catch {
    dbJobs = [];
    total = 0;
  }

  const useDb = total > 0;
  const hubLd = useDb ? buildJobsHubJsonLd(dbJobs) : null;
  const totalPages = useDb ? Math.max(1, Math.ceil(total / PAGE_SIZE)) : 1;
  const hasPrev = pageNum > 1;
  const hasNext = useDb && pageNum < totalPages;

  return (
    <div className={interiorMainClassName}>
      {hubLd ? (
        <>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(hubLd.collectionPage),
            }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(hubLd.itemList) }}
          />
        </>
      ) : null}
      <PageBreadcrumbs
        items={[{ label: "Home", href: "/" }, { label: "Jobs in Chennai" }]}
      />
      <p className="type-eyebrow text-[var(--accent)]">Work</p>
      <h1 className="type-display mt-2 text-3xl text-[var(--foreground)] sm:text-4xl">
        Jobs in Chennai
      </h1>
      <p className="type-lede mt-4 max-w-2xl text-sm leading-relaxed">
        Real openings in Chennai and nearby tech areas (OMR, Guindy, city
        offices). Where we can, we check the company before we show the ad —
        this isn’t a feed of thousands of copied posts.
        {useDb ? (
          <>
            {" "}
            <strong className="font-medium text-[var(--foreground)]">
              {total} open {total === 1 ? "role" : "roles"}
            </strong>{" "}
            below link to full listings on this site; confirm every detail
            before you apply.
          </>
        ) : (
          <>
            {" "}
            Each sample row opens the employer&apos;s careers site; always read
            the full JD and confirm location. Snapshot refreshed{" "}
            <strong className="font-medium text-[var(--foreground)]">
              29 Mar 2026
            </strong>
            . Seed{" "}
            <code className="rounded bg-[var(--surface)] px-1 text-xs">
              npm run db:seed:chennai-jobs
            </code>{" "}
            in staging to preview DB-backed listings.
          </>
        )}
      </p>

      <div className="mt-8 grid gap-3 sm:grid-cols-3">
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-4 py-4 text-center shadow-sm sm:text-left">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--accent)]">
            Open now
          </p>
          <p className="mt-2 text-2xl font-semibold text-[var(--foreground)]">
            {useDb ? total : `${homeStats.jobsLive}+`}
          </p>
          <p className="text-xs text-[var(--muted)]">
            {useDb
              ? "Jobs listed on this page"
              : "Rough count we show on the home page too"}
          </p>
        </div>
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-4 py-4 text-center shadow-sm sm:text-left">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--accent)]">
            Often
          </p>
          <p className="mt-2 text-sm font-semibold text-[var(--foreground)]">
            Tech &amp; product
          </p>
          <p className="text-xs text-[var(--muted)]">
            Tech and product roles around OMR, Guindy, and the city
          </p>
        </div>
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-4 py-4 text-center shadow-sm sm:text-left">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--accent)]">
            Newsroom
          </p>
          <p className="mt-2 text-sm font-semibold text-[var(--foreground)]">
            Tamil &amp; English
          </p>
          <p className="text-xs text-[var(--muted)]">
            Tamil and English roles for our Chennai news work
          </p>
        </div>
      </div>

      <p className="mt-6 text-sm text-[var(--muted)]">
        <Link
          href="/guides/chennai-tech-careers"
          className="font-medium text-[var(--accent)] underline-offset-4 hover:underline"
        >
          How to read Chennai job ads
        </Link>{" "}
        — plain tips on hybrid wording, pay talk, and safe applying.
      </p>

      <ul className="mt-10 space-y-4">
        {useDb
          ? dbJobs.map(({ job, employer }) => (
              <li
                key={job.id}
                className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-5 py-4 shadow-sm"
              >
                <Link
                  href={`${CHENNAI_JOBS_HUB_PATH}/${job.slug}`}
                  className="block text-[var(--foreground)] transition hover:text-[var(--accent)]"
                >
                  <span className="text-sm font-semibold">{job.title}</span>
                  <span className="mt-1 block text-xs text-[var(--muted)]">
                    {employer.name}
                    {employer.verified ? (
                      <span className="text-[var(--accent)]"> · Checked by us</span>
                    ) : null}
                    {" · "}
                    {job.locationLabel ?? "Chennai"} · read more here
                  </span>
                </Link>
              </li>
            ))
          : mockJobs.map((j) => (
              <li
                key={`${j.href}-${j.title}`}
                className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-5 py-4 shadow-sm"
              >
                {j.external ? (
                  <a
                    href={j.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-[var(--foreground)] transition hover:text-[var(--accent)]"
                  >
                    <span className="text-sm font-semibold">{j.title}</span>
                    <span className="mt-1 block text-xs text-[var(--muted)]">
                      {j.company} · {j.location} · opens in new tab
                    </span>
                  </a>
                ) : (
                  <div className="text-[var(--foreground)]">
                    <span className="text-sm font-semibold">{j.title}</span>
                    <span className="mt-1 block text-xs text-[var(--muted)]">
                      {j.company} · {j.location} · apply on site (soon)
                    </span>
                  </div>
                )}
              </li>
            ))}
      </ul>

      {useDb && totalPages > 1 ? (
        <nav
          className="mt-8 flex flex-wrap items-center gap-3 text-sm"
          aria-label="Chennai jobs pages"
        >
          {hasPrev ? (
            <Link
              href={
                pageNum === 2
                  ? CHENNAI_JOBS_HUB_PATH
                  : `${CHENNAI_JOBS_HUB_PATH}?page=${pageNum - 1}`
              }
              className="font-medium text-[var(--accent)] underline-offset-4 hover:underline"
            >
              Previous
            </Link>
          ) : (
            <span className="text-[var(--muted)]">Previous</span>
          )}
          <span className="text-[var(--muted)]">
            Page {pageNum} of {totalPages}
          </span>
          {hasNext ? (
            <Link
              href={`${CHENNAI_JOBS_HUB_PATH}?page=${pageNum + 1}`}
              className="font-medium text-[var(--accent)] underline-offset-4 hover:underline"
            >
              Next
            </Link>
          ) : (
            <span className="text-[var(--muted)]">Next</span>
          )}
        </nav>
      ) : null}

      <Section
        className="mt-14"
        eyebrow="Before you apply"
        title="A few things worth knowing"
        subtitle="We list a small number of jobs and write a short note on each — not an endless scroll of ads pulled from other sites."
      >
        <ul className="max-w-2xl space-y-3 text-sm leading-relaxed text-[var(--muted)]">
          <li>
            <strong className="text-[var(--foreground)]">Verify the URL.</strong>{" "}
            Only apply through the employer’s official careers domain or trusted
            ATS links.
          </li>
          <li>
            <strong className="text-[var(--foreground)]">Location clauses.</strong>{" "}
            Many Chennai postings allow hybrid or Bengaluru rotation — read the
            fine print on base office and tax state.
          </li>
          <li>
            <strong className="text-[var(--foreground)]">Coming next.</strong>{" "}
            Saved searches, email alerts, and on-site applications will follow
            once listings stay authenticated in our database.
          </li>
        </ul>
      </Section>

      <p className="mt-10 text-sm text-[var(--muted)]">
        Hiring in Chennai and want a mention? Watch{" "}
        <Link
          href="/chennai-local-news/topic/economy"
          className="font-medium text-[var(--accent)] underline-offset-4 hover:underline"
        >
          Economy
        </Link>{" "}
        and{" "}
        <Link
          href="/chennai-local-news"
          className="font-medium text-[var(--accent)] underline-offset-4 hover:underline"
        >
          Chennai local news
        </Link>{" "}
        for submission openings.
      </p>

      <InteriorCrossNav />
    </div>
  );
}
