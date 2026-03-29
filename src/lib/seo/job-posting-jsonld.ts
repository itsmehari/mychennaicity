import type { JobPostingWithEmployer } from "@/domains/jobs";
import { getSiteUrl } from "@/lib/env";
import { CHENNAI_JOBS_HUB_PATH, chennaiJobsDetailPath } from "@/lib/routes/chennai-jobs";

const EMPLOYMENT_MAP: Record<string, string> = {
  FULL_TIME: "https://schema.org/FULL_TIME",
  PART_TIME: "https://schema.org/PART_TIME",
  CONTRACTOR: "https://schema.org/CONTRACTOR",
  INTERN: "https://schema.org/INTERN",
};

function plainBody(body: string, max = 8000): string {
  return body
    .replace(/\*\*(.+?)\*\*/g, "$1")
    .replace(/^#+\s+/gm, "")
    .trim()
    .slice(0, max);
}

export function buildJobPostingJsonLd(data: JobPostingWithEmployer) {
  const base = getSiteUrl();
  const { job, employer } = data;
  const url = `${base}${chennaiJobsDetailPath(job.slug)}`;
  const posted = job.publishedAt ?? job.createdAt;

  const hiringOrganization: Record<string, unknown> = {
    "@type": "Organization",
    name: employer.name,
  };
  if (employer.websiteUrl?.trim()) {
    hiringOrganization.sameAs = employer.websiteUrl.trim();
  }

  const jp: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.title,
    description: plainBody(job.body),
    datePosted: posted.toISOString(),
    hiringOrganization,
    employmentType:
      job.employmentType?.trim() &&
      EMPLOYMENT_MAP[job.employmentType.trim().toUpperCase()]
        ? EMPLOYMENT_MAP[job.employmentType.trim().toUpperCase()]
        : "https://schema.org/FULL_TIME",
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: job.locationLabel?.trim() || "Chennai",
        addressRegion: "Tamil Nadu",
        addressCountry: "IN",
      },
    },
    url,
    /** Google: true only when apply is frictionless on this URL; we usually send candidates to ATS. */
    directApply: false,
  };

  const apply = job.applicationUrl?.trim();
  if (apply) {
    jp.potentialAction = {
      "@type": "ApplyAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: apply,
      },
    };
  }

  if (job.validThrough) {
    jp.validThrough = job.validThrough.toISOString();
  }

  if (
    job.salaryDisclosed &&
    job.salaryMin != null &&
    job.salaryMax != null
  ) {
    jp.baseSalary = {
      "@type": "MonetaryAmount",
      currency: "INR",
      value: {
        "@type": "QuantitativeValue",
        minValue: job.salaryMin,
        maxValue: job.salaryMax,
        unitText: "YEAR",
      },
    };
  }

  return jp;
}

export function buildJobBreadcrumbJsonLd(slug: string, title: string) {
  const base = getSiteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: base,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Jobs in Chennai",
        item: `${base}${CHENNAI_JOBS_HUB_PATH}`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: title,
        item: `${base}${chennaiJobsDetailPath(slug)}`,
      },
    ],
  };
}
