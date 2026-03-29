import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleProse } from "@/components/news/article-prose";
import {
  InteriorCrossNav,
  PageBreadcrumbs,
  interiorMainClassName,
} from "@/components/site/interior-chrome";
import { getOpenJobPostingWithEmployerBySlug } from "@/domains/jobs";
import { getSiteUrl } from "@/lib/env";
import {
  CHENNAI_JOBS_HUB_PATH,
  chennaiJobsDetailPath,
} from "@/lib/routes/chennai-jobs";
import {
  buildJobBreadcrumbJsonLd,
  buildJobPostingJsonLd,
} from "@/lib/seo/job-posting-jsonld";
import { fullSiteTitle } from "@/lib/seo/site-titles";

type Props = { params: Promise<{ slug: string }> };

export const dynamic = "force-dynamic";

function clipDesc(s: string, max = 155): string {
  const t = s.replace(/\*\*(.+?)\*\*/g, "$1").replace(/\s+/g, " ").trim();
  if (t.length <= max) return t;
  return `${t.slice(0, max - 1).trimEnd()}…`;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  let row: Awaited<ReturnType<typeof getOpenJobPostingWithEmployerBySlug>> =
    null;
  try {
    row = await getOpenJobPostingWithEmployerBySlug(slug);
  } catch {
    return { title: { absolute: fullSiteTitle("Job not found") } };
  }
  if (!row) return { title: { absolute: fullSiteTitle("Job not found") } };
  const base = getSiteUrl();
  const url = `${base}${chennaiJobsDetailPath(row.job.slug)}`;
  const desc = clipDesc(row.job.body) || row.job.title;
  const titleSegment = `${row.job.title} · ${row.employer.name}`;
  const docTitle = fullSiteTitle(titleSegment);
  return {
    title: titleSegment,
    description: desc,
    alternates: { canonical: url },
    openGraph: {
      title: docTitle,
      description: desc,
      url,
      type: "website",
      images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: docTitle,
      description: desc,
      images: ["/twitter-image"],
    },
  };
}

export default async function ChennaiJobDetailPage({ params }: Props) {
  const { slug } = await params;
  const row = await getOpenJobPostingWithEmployerBySlug(slug);
  if (!row) notFound();

  const jobLd = buildJobPostingJsonLd(row);
  const crumbLd = buildJobBreadcrumbJsonLd(row.job.slug, row.job.title);
  const applyHref = row.job.applicationUrl?.trim();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jobLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbLd) }}
      />
      <div className={interiorMainClassName}>
        <PageBreadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Jobs in Chennai", href: CHENNAI_JOBS_HUB_PATH },
            { label: row.job.title },
          ]}
        />
        <p className="type-eyebrow text-[var(--accent)]">Chennai job</p>
        <h1 className="type-display mt-2 text-3xl text-[var(--foreground)] sm:text-4xl">
          {row.job.title}
        </h1>
        <p className="type-lede mt-2 text-sm text-[var(--muted)]">
          {row.employer.name}
          {row.employer.verified ? (
            <span className="text-[var(--accent)]"> · Checked by us</span>
          ) : null}
          {row.job.locationLabel ? ` · ${row.job.locationLabel}` : " · Chennai"}
          {row.employer.websiteUrl ? (
            <>
              {" · "}
              <a
                href={row.employer.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-[var(--accent)] underline-offset-4 hover:underline"
              >
                Employer site
              </a>
            </>
          ) : null}
        </p>
        {applyHref ? (
          <p className="mt-4">
            <a
              href={applyHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-full bg-[var(--accent)] px-5 py-2.5 text-sm font-semibold text-[var(--accent-fg)] transition hover:opacity-90"
            >
              Apply on employer / ATS
            </a>
          </p>
        ) : null}
        <div className="mt-8">
          <ArticleProse content={row.job.body} />
        </div>
        <InteriorCrossNav />
      </div>
    </>
  );
}
