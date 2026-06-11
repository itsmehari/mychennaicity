import type { JobPostingWithEmployer } from "@/domains/jobs";
import { formatJobCompensation } from "@/lib/jobs/format-compensation";
import { JobPostingProse } from "@/components/jobs/job-posting-prose";
import { ChennaiJobsPartnerBanner } from "@/components/ads/chennai-jobs-partner-banner";

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

function ApplyCta({
  href,
  label,
  isWhatsApp,
  linkProps,
  className = "",
}: {
  href: string;
  label: string;
  isWhatsApp: boolean;
  linkProps: { target?: string; rel?: string };
  className?: string;
}) {
  const style = isWhatsApp
    ? "bg-[#25D366] text-white shadow-sm hover:brightness-[0.97] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#128C7E]"
    : "bg-[var(--accent)] text-[var(--accent-fg)] shadow-sm hover:opacity-92 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]";
  return (
    <a
      href={href}
      {...linkProps}
      className={`inline-flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-sm font-semibold transition ${style} ${className}`.trim()}
    >
      {label}
    </a>
  );
}

function GlanceRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex gap-3 border-b border-[color-mix(in_srgb,var(--border)_70%,transparent)] py-3.5 last:border-0 last:pb-0 first:pt-0">
      <dt className="w-[7.5rem] shrink-0 text-xs font-medium leading-snug text-[var(--muted)]">
        {label}
      </dt>
      <dd className="min-w-0 flex-1 text-sm font-semibold leading-snug text-[var(--foreground)]">
        {value}
      </dd>
    </div>
  );
}

function AtAGlance({ row }: { row: JobPostingWithEmployer }) {
  const { job } = row;

  const rows: { label: string; value: string }[] = [];

  const et = employmentTypeLabel(job.employmentType);
  if (et) rows.push({ label: "Role type", value: et });

  const loc = job.locationLabel?.trim();
  if (loc) rows.push({ label: "Location", value: loc });

  if (
    job.salaryDisclosed &&
    job.salaryMin != null &&
    job.salaryMax != null
  ) {
    rows.push({
      label: "Pay band",
      value: formatJobCompensation(job.salaryMin, job.salaryMax),
    });
  }

  if (job.openingsCount > 1) {
    rows.push({
      label: "Openings",
      value: String(job.openingsCount),
    });
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

  if (rows.length === 0) return null;

  return (
    <div
      className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-sm ring-1 ring-[color-mix(in_srgb,var(--foreground)_4%,transparent)]"
      aria-label="Job summary"
    >
      <div className="border-b border-[var(--border)] bg-[color-mix(in_srgb,var(--accent)_6%,var(--surface))] px-5 py-3.5">
        <h2 className="text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--accent)]">
          At a glance
        </h2>
      </div>
      <dl className="px-5 py-1">
        {rows.map((r) => (
          <GlanceRow key={`${r.label}-${r.value}`} label={r.label} value={r.value} />
        ))}
      </dl>
    </div>
  );
}

function CompensationHighlight({ row }: { row: JobPostingWithEmployer }) {
  const { job } = row;
  if (
    !job.salaryDisclosed ||
    job.salaryMin == null ||
    job.salaryMax == null
  ) {
    return null;
  }

  return (
    <p className="mt-4 inline-flex flex-wrap items-center gap-2 text-sm">
      <span className="rounded-full bg-[color-mix(in_srgb,var(--accent)_12%,var(--surface))] px-3 py-1 text-xs font-bold uppercase tracking-[0.1em] text-[var(--accent)]">
        Pay disclosed
      </span>
      <span className="font-semibold text-[var(--foreground)]">
        {formatJobCompensation(job.salaryMin, job.salaryMax)}
      </span>
    </p>
  );
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

  return (
    <article className="mx-auto w-full max-w-[1100px]">
      <header className="rounded-2xl border border-[var(--border)] bg-[color-mix(in_srgb,var(--surface)_96%,var(--accent)_2%)] px-5 py-6 sm:px-7 sm:py-8">
        <p className="type-eyebrow text-[var(--accent)]">Chennai job</p>
        <h1 className="type-display mt-2 text-[1.65rem] leading-tight text-[var(--foreground)] sm:text-[2rem]">
          {job.title}
        </h1>
        <p className="type-lede mt-3 text-sm leading-relaxed text-[var(--muted)]">
          <span className="font-medium text-[var(--foreground)]">{employer.name}</span>
          {employer.verified ? (
            <span className="text-[var(--accent)]"> · Checked by us</span>
          ) : null}
          {job.locationLabel ? (
            <>
              {" · "}
              <span>{job.locationLabel}</span>
            </>
          ) : (
            " · Chennai"
          )}
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
        </p>
        <CompensationHighlight row={row} />
      </header>

      {applyHref ? (
        <div className="mt-5 lg:hidden">
          <ApplyCta
            href={applyHref}
            label={applyLabel}
            isWhatsApp={isWhatsApp}
            linkProps={applyLinkProps}
          />
        </div>
      ) : null}

      <div className="mt-8 flex flex-col gap-8 lg:mt-10 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(260px,300px)] lg:items-start lg:gap-10 xl:gap-12">
        <div className="min-w-0 lg:order-1">
          <section
            className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-5 py-6 shadow-sm sm:px-7 sm:py-8"
            aria-labelledby="job-full-desc-heading"
          >
            <h2
              id="job-full-desc-heading"
              className="text-lg font-semibold tracking-tight text-[var(--foreground)]"
            >
              Role details
            </h2>
            <div className="mt-6">
              <JobPostingProse content={job.body} />
            </div>
          </section>

          {applyHref ? (
            <div className="mt-8 rounded-2xl border border-[color-mix(in_srgb,var(--accent)_22%,var(--border))] bg-[color-mix(in_srgb,var(--accent)_5%,var(--surface))] p-6 sm:p-7">
              <p className="text-base font-semibold text-[var(--foreground)]">
                Ready to apply?
              </p>
              <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                Use the channel the employer asked for. Confirm role, pay, and
                location before you share personal details.
              </p>
              <div className="mt-5 max-w-md">
                <ApplyCta
                  href={applyHref}
                  label={applyLabel}
                  isWhatsApp={isWhatsApp}
                  linkProps={applyLinkProps}
                />
              </div>
            </div>
          ) : null}

          <ChennaiJobsPartnerBanner
            slotId="jobs-detail-mid"
            className="mt-10"
          />
        </div>

        <aside className="min-w-0 lg:order-2 lg:sticky lg:top-24 lg:self-start">
          <div className="flex flex-col gap-4">
            <AtAGlance row={row} />
            {applyHref ? (
              <div className="hidden lg:block">
                <ApplyCta
                  href={applyHref}
                  label={applyLabel}
                  isWhatsApp={isWhatsApp}
                  linkProps={applyLinkProps}
                />
                <p className="mt-3 text-xs leading-relaxed text-[var(--muted)]">
                  {isWhatsApp
                    ? "Opens WhatsApp in a new tab."
                    : "Tap to call the employer directly."}
                </p>
              </div>
            ) : null}
          </div>
        </aside>
      </div>
    </article>
  );
}
