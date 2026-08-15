import type { JobPostingWithEmployer } from "@/domains/jobs";
import { formatJobCompensation } from "@/lib/jobs/format-compensation";
import { buildChennaiJobsHubCard } from "@/lib/jobs/chennai-jobs-hub-helpers";
import { JobPostingProse } from "@/components/jobs/job-posting-prose";
import { PageAdSlot } from "@/components/ads/page-ad-slot";
import {
  JobsDetailActionCta,
  JobsDetailApplyBand,
  JobsDetailBody,
  JobsDetailGlance,
  JobsDetailHero,
  JobsDetailLayout,
} from "@/components/jobs/chennai-jobs-detail-parts";

function employmentTypeLabel(raw: string | null): string | null {
  if (!raw?.trim()) return null;
  const u = raw.trim().toUpperCase();
  const map: Record<string, string> = {
    FULL_TIME: "Full-time",
    PART_TIME: "Part-time",
    CONTRACTOR: "Contract",
    INTERN: "Internship",
  };
  return map[u] ?? null;
}

function workModeLabel(raw: string | null): string | null {
  if (!raw?.trim()) return null;
  const map: Record<string, string> = {
    onsite: "Office",
    remote: "Work from home",
    hybrid: "Hybrid",
    field: "Field",
  };
  return map[raw.trim().toLowerCase()] ?? null;
}

function buildGlanceRows(row: JobPostingWithEmployer): { label: string; value: string }[] {
  const { job } = row;
  const rows: { label: string; value: string }[] = [];
  const et = employmentTypeLabel(job.employmentType);
  if (et) rows.push({ label: "Role type", value: et });
  const wm = workModeLabel(job.remotePolicy);
  if (wm) rows.push({ label: "Work mode", value: wm });
  const loc = job.locationLabel?.trim();
  if (loc) rows.push({ label: "Location", value: loc });
  if (job.salaryDisclosed && job.salaryMin != null && job.salaryMax != null) {
    rows.push({
      label: "Pay band",
      value: formatJobCompensation(job.salaryMin, job.salaryMax),
    });
  }
  if (job.openingsCount > 1) {
    rows.push({ label: "Openings", value: String(job.openingsCount) });
  }
  if (job.validThrough) {
    rows.push({
      label: "Apply by",
      value: job.validThrough.toLocaleString("en-IN", {
        dateStyle: "medium",
        timeZone: "Asia/Kolkata",
      }),
    });
  }
  if (job.publishedAt) {
    rows.push({
      label: "Listed",
      value: job.publishedAt.toLocaleString("en-IN", {
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
}: {
  row: JobPostingWithEmployer;
  applyHref: string | null;
  applyLabel: string;
  applyLinkProps: { target?: string; rel?: string };
  isWhatsApp: boolean;
}) {
  const { job, employer } = row;
  const hubCard = buildChennaiJobsHubCard(row);
  const glanceRows = buildGlanceRows(row);
  const showPay =
    job.salaryDisclosed && job.salaryMin != null && job.salaryMax != null;

  const ctaHint = isWhatsApp
    ? "Opens WhatsApp in a new tab."
    : applyHref?.startsWith("tel:")
      ? "Tap to call the employer directly."
      : applyHref && /^https?:\/\/([a-z0-9-]+\.)?facebook\.com\//i.test(applyHref)
        ? "Opens the poster’s Facebook profile so you can message them."
        : "Opens the employer careers page in a new tab.";

  return (
    <article className="mcc-jobs-hub mx-auto w-full max-w-[1180px]">
      <JobsDetailHero
        eyebrow="Chennai job"
        title={job.title}
        badge={hubCard.initials}
        meta={
          <>
            <span className="font-semibold text-[var(--foreground)]">{employer.name}</span>
            {employer.verified ? (
              <span className="font-medium text-[var(--accent)]"> · Checked by us</span>
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
                  Employer site
                </a>
              </>
            ) : null}
          </>
        }
      >
        {showPay ? (
          <p className="mcc-jobs-detail__pay">
            <span className="mcc-jobs-detail__pay-badge">Pay disclosed</span>
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
            <JobsDetailBody title="Role details" id="job-full-desc-heading">
              <JobPostingProse content={job.body} />
            </JobsDetailBody>

            {applyHref ? (
              <JobsDetailApplyBand
                title="Ready to apply?"
                description={
                  isWhatsApp
                    ? "This listing uses WhatsApp — message the poster; we do not process CVs."
                    : applyHref?.startsWith("tel:")
                      ? "This listing uses a phone number — call; we do not process CVs."
                      : applyHref && /^https?:\/\/([a-z0-9-]+\.)?facebook\.com\//i.test(applyHref)
                        ? "This listing uses Facebook message — not a careers portal. Confirm the role before sharing documents."
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
            <JobsDetailGlance rows={glanceRows} />
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
            <PageAdSlot shape="square" placement="job_detail_square" />
          </>
        }
      />
    </article>
  );
}
