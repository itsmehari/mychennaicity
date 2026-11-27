import type { JobPostingWithEmployer } from "@/domains/jobs";
import { getSiteUrl } from "@/lib/env";
import { extractJobBenefits } from "@/lib/jobs/job-faq";
import { salaryUnitText } from "@/lib/jobs/format-compensation";
import { jobPostingSchemaEligible } from "@/lib/jobs/job-schema-eligibility";
import { jobInLanguage } from "@/lib/jobs/job-language";
import { CHENNAI_JOBS_HUB_PATH, chennaiJobsDetailPath } from "@/lib/routes/chennai-jobs";

const EMPLOYMENT_MAP: Record<string, string> = {
  FULL_TIME: "https://schema.org/FULL_TIME",
  PART_TIME: "https://schema.org/PART_TIME",
  CONTRACTOR: "https://schema.org/CONTRACTOR",
  INTERN: "https://schema.org/INTERN",
};

/** City for Google JobPosting. Neighbourhood stays in streetAddress. A 6-digit PIN becomes postalCode. */
export function jobPostalAddress(locationLabel: string | null): {
  "@type": "PostalAddress";
  streetAddress?: string;
  postalCode?: string;
  addressLocality: string;
  addressRegion: string;
  addressCountry: string;
} {
  const label = locationLabel?.trim() || "";
  const parts = label
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean);
  const last = parts[parts.length - 1] ?? "";
  const lastIsChennai = /chennai/i.test(last) || last === "சென்னை";
  const street =
    parts.length >= 2 && lastIsChennai
      ? parts.slice(0, -1).join(", ")
      : undefined;
  const pin = street?.match(/\b(\d{6})\b/);
  const streetAddress = pin
    ? street!
        .replace(pin[0], "")
        .replace(/\s+,/g, ",")
        .replace(/,\s*,/g, ", ")
        .replace(/,\s*$/g, "")
        .replace(/^\s*,\s*/g, "")
        .replace(/\s{2,}/g, " ")
        .trim()
    : street;
  return {
    "@type": "PostalAddress",
    ...(streetAddress ? { streetAddress } : {}),
    ...(pin ? { postalCode: pin[1] } : {}),
    addressLocality: "Chennai",
    addressRegion: "Tamil Nadu",
    addressCountry: "IN",
  };
}

function plainBody(body: string, max = 8000): string {
  return body
    .replace(/\*\*(.+?)\*\*/g, "$1")
    .replace(/^#+\s+/gm, "")
    .trim()
    .slice(0, max);
}

export function buildJobPostingJsonLd(
  data: JobPostingWithEmployer,
): Record<string, unknown> | null {
  if (!jobPostingSchemaEligible(data.job)) return null;
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
    jobLocation: {
      "@type": "Place",
      address: jobPostalAddress(job.locationLabel),
    },
    url,
    inLanguage: jobInLanguage(job.slug),
    identifier: {
      "@type": "PropertyValue",
      name: "MyChennaiCity",
      value: job.slug,
    },
    /** Google: true only when apply is frictionless on this URL; we usually send candidates to ATS. */
    directApply: false,
  };

  const benefits = extractJobBenefits(job.body);
  if (benefits) jp.jobBenefits = benefits;

  const employmentKey = job.employmentType?.trim().toUpperCase();
  if (employmentKey && EMPLOYMENT_MAP[employmentKey]) {
    jp.employmentType = EMPLOYMENT_MAP[employmentKey];
  }

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

  if (job.remotePolicy === "remote") {
    jp.jobLocationType = "TELECOMMUTE";
    jp.applicantLocationRequirements = {
      "@type": "Country",
      name: "India",
    };
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
        unitText: salaryUnitText(job.salaryMin, job.salaryMax, job.salaryUnit),
      },
    };
  }

  return jp;
}

export function buildJobBreadcrumbJsonLd(slug: string, title: string) {
  const base = getSiteUrl();
  const tamil = jobInLanguage(slug) === "ta-IN";
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: tamil ? "முகப்பு" : "Home",
        item: base,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: tamil ? "சென்னை வேலைகள்" : "Jobs in Chennai",
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
