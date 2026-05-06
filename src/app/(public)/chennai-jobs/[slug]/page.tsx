import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  InteriorCrossNav,
  PageBreadcrumbs,
  interiorMainClassName,
} from "@/components/site/interior-chrome";
import { JobPostingDetail } from "@/components/jobs/job-posting-detail";
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
import {
  buildClippedTitleSegment,
  fullSiteTitle,
} from "@/lib/seo/site-titles";

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
  const titleSegment = buildClippedTitleSegment(
    row.job.title,
    ` · ${row.employer.name}`,
  );
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
  const isWhatsApp =
    !!applyHref &&
    (/^https?:\/\/(wa\.me|api\.whatsapp\.com)\//i.test(applyHref) ||
      applyHref.includes("whatsapp"));
  const isTel = !!applyHref && /^tel:/i.test(applyHref);
  const applyLabel = isWhatsApp
    ? "Apply via WhatsApp"
    : isTel
      ? "Call to apply"
      : "Apply on employer / ATS";
  const applyLinkProps = isTel
    ? ({} as const)
    : ({ target: "_blank", rel: "noopener noreferrer" } as const);

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
        <JobPostingDetail
          row={row}
          applyHref={applyHref ?? null}
          applyLabel={applyLabel}
          applyLinkProps={applyLinkProps}
          isWhatsApp={isWhatsApp}
        />
        <InteriorCrossNav />
      </div>
    </>
  );
}
