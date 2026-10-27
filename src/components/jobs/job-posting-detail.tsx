import type { JobPostingWithEmployer } from "@/domains/jobs";
import { formatJobCompensation } from "@/lib/jobs/format-compensation";
import { buildChennaiJobsHubCard } from "@/lib/jobs/chennai-jobs-hub-helpers";
import { JobPostingProse } from "@/components/jobs/job-posting-prose";
import Link from "next/link";
import { PageAdSlot } from "@/components/ads/page-ad-slot";
import { JobReaderViews } from "@/components/jobs/job-reader-views";
import { isTamilJobSlug } from "@/lib/jobs/job-language";
import {
  JobsDetailActionCta,
  JobsDetailApplyBand,
  JobsDetailBody,
  JobsDetailGlance,
  JobsDetailHero,
  JobsDetailLayout,
} from "@/components/jobs/chennai-jobs-detail-parts";
import { ShakzOdcCallSheet } from "@/components/jobs/shakz-odc-call-sheet";
import { SHAKZ_ODC_SLUG } from "@/content/jobs/shakz-events-odc-boys";

function employmentTypeLabel(raw: string | null, tamil: boolean): string | null {
  if (!raw?.trim()) return null;
  const u = raw.trim().toUpperCase();
  const map: Record<string, string> = tamil
    ? {
        FULL_TIME: "முழு நேரம்",
        PART_TIME: "பகுதி நேரம்",
        CONTRACTOR: "ஒப்பந்தம்",
        INTERN: "பயிற்சி",
      }
    : {
        FULL_TIME: "Full-time",
        PART_TIME: "Part-time",
        CONTRACTOR: "Contract",
        INTERN: "Internship",
      };
  return map[u] ?? null;
}

function workModeLabel(raw: string | null, tamil: boolean): string | null {
  if (!raw?.trim()) return null;
  const map: Record<string, string> = tamil
    ? {
        onsite: "அலுவலகம்",
        remote: "வீட்டிலிருந்து",
        hybrid: "கலப்பு",
        field: "கள வேலை",
      }
    : {
        onsite: "Office",
        remote: "Work from home",
        hybrid: "Hybrid",
        field: "Field",
      };
  return map[raw.trim().toLowerCase()] ?? null;
}

function buildGlanceRows(
  row: JobPostingWithEmployer,
  tamil: boolean,
): { label: string; value: string }[] {
  const { job } = row;
  const rows: { label: string; value: string }[] = [];
  const dateLocale = tamil ? "ta-IN" : "en-IN";
  const et = employmentTypeLabel(job.employmentType, tamil);
  if (et) rows.push({ label: tamil ? "வேலை வகை" : "Role type", value: et });
  const wm = workModeLabel(job.remotePolicy, tamil);
  if (wm) rows.push({ label: tamil ? "பணி முறை" : "Work mode", value: wm });
  const loc = job.locationLabel?.trim();
  if (loc) rows.push({ label: tamil ? "இடம்" : "Location", value: loc });
  if (job.salaryDisclosed && job.salaryMin != null && job.salaryMax != null) {
    rows.push({
      label: tamil ? "சம்பளம்" : "Pay band",
      value: formatJobCompensation(job.salaryMin, job.salaryMax),
    });
  }
  if (job.openingsCount > 1) {
    rows.push({
      label: tamil ? "காலியிடம்" : "Openings",
      value: String(job.openingsCount),
    });
  }
  if (job.validThrough) {
    rows.push({
      label: tamil ? "கடைசி நாள்" : "Apply by",
      value: job.validThrough.toLocaleString(dateLocale, {
        dateStyle: "medium",
        timeZone: "Asia/Kolkata",
      }),
    });
  }
  if (job.publishedAt) {
    rows.push({
      label: tamil ? "வெளியிட்ட நாள்" : "Listed",
      value: job.publishedAt.toLocaleString(dateLocale, {
        dateStyle: "medium",
        timeZone: "Asia/Kolkata",
      }),
    });
  }
  return rows;
}

export function JobPostingDetail({
  row,
  applyHref,
  applyLabel,
  applyLinkProps,
  isWhatsApp,
  uniqueViews,
  languageAlternate,
}: {
  row: JobPostingWithEmployer;
  applyHref: string | null;
  applyLabel: string;
  applyLinkProps: { target?: string; rel?: string };
  isWhatsApp: boolean;
  uniqueViews: number;
  languageAlternate?: { href: string; label: string } | null;
}) {
  const { job, employer } = row;
  const tamil = isTamilJobSlug(job.slug);
  const hubCard = buildChennaiJobsHubCard(row);
  const glanceRows = buildGlanceRows(row, tamil);
  const showPay =
    job.salaryDisclosed && job.salaryMin != null && job.salaryMax != null;

  const isContactForm = !!applyHref && /\/contact#jobs/i.test(applyHref);
  const ctaHint = tamil
    ? isWhatsApp
      ? "WhatsApp புதிய தாவலில் திறக்கும்."
      : applyHref?.startsWith("tel:")
        ? "அழைக்க இந்த எண்ணைத் தட்டவும்."
        : "விண்ணப்பப் பக்கம் புதிய தாவலில் திறக்கும்."
    : isWhatsApp
      ? "Opens WhatsApp in a new tab."
      : applyHref?.startsWith("tel:")
        ? "Tap to call the employer directly."
        : applyHref && /^https?:\/\/([a-z0-9-]+\.)?facebook\.com\//i.test(applyHref)
          ? "Opens the poster’s Facebook profile so you can message them."
          : isContactForm
            ? "Opens our jobs contact form — this listing has no public employer phone yet."
            : "Opens the employer careers page in a new tab.";

  return (
    <article className="mcc-jobs-hub mx-auto w-full max-w-[1180px]">
      <JobsDetailHero
        eyebrow={tamil ? "சென்னை வேலை" : "Chennai job"}
        title={job.title}
        badge={hubCard.initials}
        meta={
          <>
            <span className="font-semibold text-[var(--foreground)]">{employer.name}</span>
            {employer.verified ? (
              <span className="font-medium text-[var(--accent)]">
                {tamil ? " · எங்களால் சரிபார்க்கப்பட்டது" : " · Checked by us"}
              </span>
            ) : null}
            {" · "}
            {job.locationLabel ?? "Chennai"}
            {employer.websiteUrl ? (
              <>
                {" · "}
                <a
                  href={employer.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-[var(--accent)] underline-offset-4 hover:underline"
                >
                  {tamil ? "நிறுவன தளம்" : "Employer site"}
                </a>
              </>
            ) : null}
          </>
        }
      >
        <JobReaderViews slug={job.slug} initialCount={uniqueViews} className="mt-2" />
        {languageAlternate ? (
          <p className="mt-2 text-sm">
            <Link
              href={languageAlternate.href}
              hrefLang={tamil ? "en" : "ta"}
              className="font-semibold text-[var(--accent)] underline-offset-4 hover:underline"
            >
              {languageAlternate.label}
            </Link>
          </p>
        ) : null}
        {showPay ? (
          <p className="mcc-jobs-detail__pay">
            <span className="mcc-jobs-detail__pay-badge">
              {tamil ? "சம்பளம்" : "Pay disclosed"}
            </span>
            <span className="font-semibold text-[var(--foreground)]">
              {formatJobCompensation(job.salaryMin!, job.salaryMax!)}
            </span>
          </p>
        ) : null}
      </JobsDetailHero>

      {applyHref ? (
        <div className="mcc-jobs-detail__mobile-cta">
          <JobsDetailActionCta
            href={applyHref}
            label={applyLabel}
            isWhatsApp={isWhatsApp}
            linkProps={applyLinkProps}
            hint={ctaHint}
          />
        </div>
      ) : null}

      <JobsDetailLayout
        main={
          <>
            <JobsDetailBody
              title={
                job.slug === SHAKZ_ODC_SLUG
                  ? "Sunday shift"
                  : tamil
                    ? "வேலை விவரம்"
                    : "Role details"
              }
              id="job-full-desc-heading"
            >
              {job.slug === SHAKZ_ODC_SLUG ? (
                <ShakzOdcCallSheet />
              ) : (
                <JobPostingProse content={job.body} />
              )}
            </JobsDetailBody>

            {applyHref ? (
              <JobsDetailApplyBand
                title={tamil ? "விண்ணப்பிக்க தயாரா?" : "Ready to apply?"}
                description={
                  tamil
                    ? isWhatsApp
                      ? "இந்த அறிவிப்பு WhatsApp வழியாக. எங்களிடம் சுயவிவரம் அனுப்ப வேண்டாம். நேரடியாக செய்தி அனுப்புங்கள்."
                      : "பதவி, சம்பளம், இடம் ஆகியவற்றை உறுதி செய்த பிறகு விண்ணப்பியுங்கள்."
                    : isWhatsApp
                      ? "This listing uses WhatsApp — message the poster; we do not process CVs."
                      : applyHref?.startsWith("tel:")
                        ? "This listing uses a phone number — call; we do not process CVs."
                        : applyHref && /^https?:\/\/([a-z0-9-]+\.)?facebook\.com\//i.test(applyHref)
                          ? "This listing uses Facebook message — not a careers portal. Confirm the role before sharing documents."
                          : isContactForm
                            ? "The source ad did not include a public phone. Use the form so we can pass on a hiring contact if we get one."
                            : "Use the channel the employer asked for. Confirm role, pay, and location before you share personal details."
                }
                href={applyHref}
                label={applyLabel}
                isWhatsApp={isWhatsApp}
                linkProps={applyLinkProps}
              />
            ) : null}
          </>
        }
        aside={
          <>
            <PageAdSlot shape="square" placement="job_detail_square" />
            <JobsDetailGlance
              title={tamil ? "சுருக்கம்" : "At a glance"}
              rows={glanceRows}
            />
            {hubCard.tags.length > 0 ? (
              <div className="mcc-jobs-hub__job-tags">
                {hubCard.tags.map((tag) => (
                  <span key={tag} className="mcc-jobs-hub__job-tag">
                    {tag}
                  </span>
                ))}
              </div>
            ) : null}
            {applyHref ? (
              <div className="mcc-jobs-detail__desktop-cta">
                <JobsDetailActionCta
                  href={applyHref}
                  label={applyLabel}
                  isWhatsApp={isWhatsApp}
                  linkProps={applyLinkProps}
                  hint={ctaHint}
                />
              </div>
            ) : null}
          </>
        }
      />
    </article>
  );
}
