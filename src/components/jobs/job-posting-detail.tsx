import type { JobPostingWithEmployer } from "@/domains/jobs";
import { ArticleProse } from "@/components/news/article-prose";
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

function formatSalaryBandInr(min: number, max: number): string {
  const lakhs = (n: number) => {
    const L = n / 100_000;
    const r = Math.round(L * 10) / 10;
    return Number.isInteger(r) ? String(r) : r.toFixed(1);
  };
  if (min === max) return `₹${lakhs(min)} LPA`;
  return `₹${lakhs(min)} – ₹${lakhs(max)} LPA`;
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
    : "bg-[var(--accent)] text-[var(--accent-fg)] hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]";
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
      label: "Compensation",
      value: formatSalaryBandInr(job.salaryMin, job.salaryMax),
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
      label: "Listed on site",
      value: job.publishedAt.toLocaleString("en-IN", {
        dateStyle: "medium",
        timeZone: "Asia/Kolkata",
      }),
    });
  }

  if (rows.length === 0) return null;

  return (
    <div
      className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 ring-1 ring-[color-mix(in_srgb,var(--foreground)_5%,transparent)]"
      aria-label="Job summary"
    >
      <h2 className="text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--accent)]">
        At a glance
      </h2>
      <dl className="mt-4 space-y-3.5">
        {rows.map((r) => (
          <div key={`${r.label}-${r.value}`} className="min-w-0">
            <dt className="text-xs font-medium text-[var(--muted)]">
              {r.label}
            </dt>
            <dd className="mt-0.5 text-sm font-semibold leading-snug text-[var(--foreground)]">
              {r.value}
            </dd>
          </div>
        ))}
      </dl>
    </div>
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
      <header className="max-w-[42rem] border-b border-[var(--border)] pb-8">
        <p className="type-eyebrow text-[var(--accent)]">Chennai job</p>
        <h1 className="type-display mt-2 text-3xl text-[var(--foreground)] sm:text-4xl">
          {job.title}
        </h1>
        <p className="type-lede mt-3 text-sm leading-relaxed text-[var(--muted)]">
          <span className="text-[var(--foreground)]">{employer.name}</span>
          {employer.verified ? (
            <span className="text-[var(--accent)]"> · Checked by us</span>
          ) : null}
          {job.locationLabel ? ` · ${job.locationLabel}` : " · Chennai"}
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
      </header>

      <div className="mt-8 flex flex-col gap-8 lg:mt-10 lg:grid lg:grid-cols-[minmax(0,42rem)_minmax(260px,300px)] lg:items-start lg:gap-10 xl:gap-12">
        <aside className="min-w-0 lg:sticky lg:top-24 lg:col-start-2 lg:row-start-1 lg:self-start">
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
                  Opens in a new tab. Prefer a quiet place before you message
                  the employer.
                </p>
              </div>
            ) : null}
          </div>
        </aside>

        <div className="min-w-0 lg:col-start-1 lg:row-start-1">
          {applyHref ? (
            <div className="mb-6 lg:hidden">
              <ApplyCta
                href={applyHref}
                label={applyLabel}
                isWhatsApp={isWhatsApp}
                linkProps={applyLinkProps}
              />
            </div>
          ) : null}

          <section
            className="rounded-2xl border border-[color-mix(in_srgb,var(--border)_85%,transparent)] bg-[color-mix(in_srgb,var(--surface)_94%,var(--foreground)_2%)] px-5 py-6 sm:px-6"
            aria-labelledby="job-full-desc-heading"
          >
            <h2
              id="job-full-desc-heading"
              className="text-base font-semibold tracking-tight text-[var(--foreground)]"
            >
              Role details
            </h2>
            <div className="mt-5 border-t border-[var(--border)] pt-5">
              <ArticleProse
                content={job.body}
                className="text-[var(--foreground)]"
              />
            </div>
          </section>

          {applyHref ? (
            <div className="mt-10 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 ring-1 ring-[color-mix(in_srgb,var(--foreground)_4%,transparent)]">
              <p className="text-sm font-semibold text-[var(--foreground)]">
                Ready to apply?
              </p>
              <p className="mt-1 text-sm text-[var(--muted)]">
                Use the same channel the employer asked for — confirm details
                before you share personal information.
              </p>
              <div className="mt-4 max-w-md">
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
      </div>
    </article>
  );
}
