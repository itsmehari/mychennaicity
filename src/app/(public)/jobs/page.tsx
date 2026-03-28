import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/home/section";
import {
  InteriorCrossNav,
  PageBreadcrumbs,
  interiorMainClassName,
} from "@/components/site/interior-chrome";
import { listOpenJobPostingsForChennaiHub } from "@/domains/jobs";
import { getSiteUrl } from "@/lib/env";
import { homeStats, mockJobs } from "@/lib/home-mock";
import { buildJobsHubJsonLd } from "@/lib/seo/jobs-hub-jsonld";

export const metadata: Metadata = {
  title: "Jobs",
  description:
    "Chennai jobs: curated tech and editorial picks with links to employer career sites. Greater Chennai hiring context on mychennaicity.in.",
  alternates: { canonical: `${getSiteUrl()}/jobs` },
  openGraph: {
    title: "Chennai jobs | mychennaicity.in",
    description:
      "Hand-picked roles — open employer sites for full job descriptions.",
    url: `${getSiteUrl()}/jobs`,
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Chennai jobs | mychennaicity.in",
    description:
      "Hand-picked Greater Chennai roles — verify on employer career sites.",
    images: ["/twitter-image"],
  },
};

export const dynamic = "force-dynamic";

export default async function JobsPage() {
  let dbJobs: Awaited<ReturnType<typeof listOpenJobPostingsForChennaiHub>> = [];
  try {
    dbJobs = await listOpenJobPostingsForChennaiHub(40);
  } catch {
    dbJobs = [];
  }
  const useDb = dbJobs.length > 0;
  const hubLd = useDb ? buildJobsHubJsonLd(dbJobs) : null;

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
      <PageBreadcrumbs items={[{ label: "Home", href: "/" }, { label: "Jobs" }]} />
      <p className="type-eyebrow text-[var(--accent)]">Jobs</p>
      <h1 className="type-display mt-2 text-3xl text-[var(--foreground)] sm:text-4xl">
        Work in Greater Chennai
      </h1>
      <p className="type-lede mt-4 max-w-2xl text-sm leading-relaxed">
        This page highlights roles that anchor in Chennai or the wider metro —
        especially tech product, platform, and editorial work we watch for the
        city.
        {useDb ? (
          <>
            {" "}
            Open roles below link to <strong className="font-medium text-[var(--foreground)]">full listings on this site</strong>; confirm details before you apply.
          </>
        ) : (
          <>
            {" "}
            Each external row opens the employer&apos;s careers site; always read
            the full JD and confirm location before you apply. Snapshot refreshed{" "}
            <strong className="font-medium text-[var(--foreground)]">
              25 Mar 2026
            </strong>
            .
          </>
        )}
      </p>

      <div className="mt-8 grid gap-3 sm:grid-cols-3">
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-4 py-4 text-center shadow-sm sm:text-left">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--accent)]">
            Pulse
          </p>
          <p className="mt-2 text-2xl font-semibold text-[var(--foreground)]">
            {homeStats.jobsLive}+
          </p>
          <p className="text-xs text-[var(--muted)]">
            Roles we track across boards (home ribbon stat)
          </p>
        </div>
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-4 py-4 text-center shadow-sm sm:text-left">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--accent)]">
            Focus
          </p>
          <p className="mt-2 text-sm font-semibold text-[var(--foreground)]">
            Tech &amp; product
          </p>
          <p className="text-xs text-[var(--muted)]">
            OMR, Guindy, and city HQs with Chennai engineering hubs
          </p>
        </div>
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-4 py-4 text-center shadow-sm sm:text-left">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--accent)]">
            Editorial
          </p>
          <p className="mt-2 text-sm font-semibold text-[var(--foreground)]">
            Tamil &amp; English
          </p>
          <p className="text-xs text-[var(--muted)]">
            Desk roles supporting Chennai local news
          </p>
        </div>
      </div>

      <ul className="mt-10 space-y-4">
        {useDb
          ? dbJobs.map(({ job, employer }) => (
              <li
                key={job.id}
                className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-5 py-4 shadow-sm"
              >
                <Link
                  href={`/jobs/${job.slug}`}
                  className="block text-[var(--foreground)] transition hover:text-[var(--accent)]"
                >
                  <span className="text-sm font-semibold">{job.title}</span>
                  <span className="mt-1 block text-xs text-[var(--muted)]">
                    {employer.name} · {job.locationLabel ?? "Chennai"} · full
                    listing on site
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

      <Section
        className="mt-14"
        eyebrow="How we pick"
        title="Practical notes for applicants"
        subtitle="We are not a job board yet — think of this as an editor’s shortlist plus context."
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
            once listings are authenticated in our database.
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
