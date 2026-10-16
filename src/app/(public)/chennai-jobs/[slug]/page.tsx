import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AdvertisePanel } from "@/components/ads/advertise-panel";
import { BusinessWhatsAppCta } from "@/components/community/business-whatsapp-cta";
import {
  InteriorCrossNav,
  PageBreadcrumbs,
  interiorMainClassName,
} from "@/components/site/interior-chrome";
import { JobDetailResumeDoctorStrip } from "@/components/jobs/job-detail-resumedoctor-strip";
import { JobDetailWhatsAppCommunityStrip } from "@/components/jobs/job-detail-whatsapp-community-strip";
import { JobPostingDetail } from "@/components/jobs/job-posting-detail";
import { ChennaiJobsHubSafety } from "@/components/jobs/chennai-jobs-hub-sections";
import { JobsDetailBackLink } from "@/components/jobs/chennai-jobs-detail-parts";
import { getOpenJobPostingWithEmployerBySlug } from "@/domains/jobs";
import { getJobUniqueViewCount } from "@/domains/jobs/view-tracking";
import { getSiteUrl } from "@/lib/env";
import { extractJobFaqs } from "@/lib/jobs/job-faq";
import {
  isTamilJobSlug,
  jobEnglishSlug,
  jobTamilSlug,
} from "@/lib/jobs/job-language";
import { buildFaqPageJsonLdFromItems } from "@/lib/seo/faq-jsonld";
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
  const enSlug = jobEnglishSlug(row.job.slug);
  const taSlug = jobTamilSlug(row.job.slug);
  const twinSlug = isTamilJobSlug(row.job.slug) ? enSlug : taSlug;
  let twinExists = false;
  try {
    twinExists = !!(await getOpenJobPostingWithEmployerBySlug(twinSlug));
  } catch {
    twinExists = false;
  }
  const languages = twinExists
    ? {
        en: `${base}${chennaiJobsDetailPath(enSlug)}`,
        ta: `${base}${chennaiJobsDetailPath(taSlug)}`,
        "x-default": `${base}${chennaiJobsDetailPath(enSlug)}`,
      }
    : undefined;
  const titleSegment = buildClippedTitleSegment(
    row.job.title,
    ` · ${row.employer.name}`,
  );
  const docTitle = fullSiteTitle(titleSegment);
  return {
    title: titleSegment,
    description: desc,
    alternates: { canonical: url, ...(languages ? { languages } : {}) },
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
  const faqItems = extractJobFaqs(row.job.body);
  const faqLd = buildFaqPageJsonLdFromItems(faqItems, {
    pageUrl: `${getSiteUrl()}${chennaiJobsDetailPath(row.job.slug)}`,
  });
  const tamil = isTamilJobSlug(row.job.slug);
  const twinSlug = tamil ? jobEnglishSlug(row.job.slug) : jobTamilSlug(row.job.slug);
  const twin = await getOpenJobPostingWithEmployerBySlug(twinSlug);
  let uniqueViews = 0;
  try {
    uniqueViews = await getJobUniqueViewCount(row.job.id);
  } catch {
    uniqueViews = 0;
  }
  const applyHref = row.job.applicationUrl?.trim();
  const isWhatsApp =
    !!applyHref &&
    (/^https?:\/\/(wa\.me|api\.whatsapp\.com)\//i.test(applyHref) ||
      applyHref.includes("whatsapp"));
  const isTel = !!applyHref && /^tel:/i.test(applyHref);
  const isFacebook =
    !!applyHref &&
    /^https?:\/\/([a-z0-9-]+\.)?facebook\.com\//i.test(applyHref);
  const isContactForm =
    !!applyHref && /\/contact#jobs/i.test(applyHref);
  const applyLabel = isWhatsApp
    ? "Apply via WhatsApp"
    : isTel
      ? "Call to apply"
      : isFacebook
        ? "Message on Facebook"
        : isContactForm
          ? "Ask us for the hiring contact"
          : "Apply on employer / ATS";
  const applyLinkProps =
    isTel || isContactForm
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
      {faqLd ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
        />
      ) : null}
      <div className={interiorMainClassName}>
        <PageBreadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Jobs in Chennai", href: CHENNAI_JOBS_HUB_PATH },
            { label: row.job.title },
          ]}
        />
        <JobDetailWhatsAppCommunityStrip />
        <JobDetailResumeDoctorStrip
          audience="employer-job"
          isWhatsAppApply={isWhatsApp}
        />
        <JobPostingDetail
          row={row}
          applyHref={applyHref ?? null}
          applyLabel={applyLabel}
          applyLinkProps={applyLinkProps}
          isWhatsApp={isWhatsApp}
          uniqueViews={uniqueViews}
          languageAlternate={
            twin
              ? {
                  href: chennaiJobsDetailPath(twin.job.slug),
                  label: tamil ? "Read in English" : "தமிழில் படிக்க",
                }
              : null
          }
        />
        <ChennaiJobsHubSafety />
        <JobsDetailBackLink href={CHENNAI_JOBS_HUB_PATH} label="All jobs in Chennai" />
        <div className="mt-8 max-w-2xl space-y-6">
          <AdvertisePanel variant="jobs" layout="strip" />
          <BusinessWhatsAppCta variant="jobs" />
        </div>
        <InteriorCrossNav />
      </div>
    </>
  );
}
