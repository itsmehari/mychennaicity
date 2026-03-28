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
  buildJobBreadcrumbJsonLd,
  buildJobPostingJsonLd,
} from "@/lib/seo/job-posting-jsonld";

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
    return { title: "Job" };
  }
  if (!row) return { title: "Job" };
  const base = getSiteUrl();
  const url = `${base}/jobs/${row.job.slug}`;
  const desc = clipDesc(row.job.body) || row.job.title;
  return {
    title: `${row.job.title} · ${row.employer.name}`,
    description: desc,
    alternates: { canonical: url },
    openGraph: {
      title: `${row.job.title} | Jobs`,
      description: desc,
      url,
      type: "website",
      images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${row.job.title} | Jobs`,
      description: desc,
      images: ["/twitter-image"],
    },
  };
}

export default async function JobDetailPage({ params }: Props) {
  const { slug } = await params;
  const row = await getOpenJobPostingWithEmployerBySlug(slug);
  if (!row) notFound();

  const jobLd = buildJobPostingJsonLd(row);
  const crumbLd = buildJobBreadcrumbJsonLd(row.job.slug, row.job.title);

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
            { label: "Jobs", href: "/jobs" },
            { label: row.job.title },
          ]}
        />
        <p className="type-eyebrow text-[var(--accent)]">Job</p>
        <h1 className="type-display mt-2 text-3xl text-[var(--foreground)] sm:text-4xl">
          {row.job.title}
        </h1>
        <p className="type-lede mt-2 text-sm text-[var(--muted)]">
          {row.employer.name}
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
        <div className="mt-8">
          <ArticleProse content={row.job.body} />
        </div>
        <InteriorCrossNav />
      </div>
    </>
  );
}
