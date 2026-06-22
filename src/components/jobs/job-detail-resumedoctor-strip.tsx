import {
  buildResumeDoctorStripUrl,
  selectResumeDoctorStripVariant,
  type ResumeDoctorStripAudience,
} from "@/lib/partners/resumedoctor-strip";

const ACCENT = "#1565c0";
const ACCENT_DARK = "#0d47a1";

function DocumentIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      aria-hidden
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" />
    </svg>
  );
}

function LinkIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      aria-hidden
    >
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  );
}

const ctaClass =
  "inline-flex shrink-0 items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:brightness-[0.97] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 sm:min-h-[44px] sm:px-6";

const secondaryLinkClass =
  "mt-2 block text-center text-xs font-semibold hover:underline sm:mt-2";

/**
 * Partner strip for job detail pages — rotates copy per page load.
 * Placed after breadcrumbs / WhatsApp community strip, before the job title.
 */
export function JobDetailResumeDoctorStrip({
  audience,
  isWhatsAppApply = false,
  className = "",
}: {
  audience: ResumeDoctorStripAudience;
  isWhatsAppApply?: boolean;
  className?: string;
}) {
  const variant = selectResumeDoctorStripVariant({ audience, isWhatsAppApply });
  const primaryUrl = buildResumeDoctorStripUrl(variant.id);
  const secondaryUrl =
    variant.secondaryCtaPath != null
      ? buildResumeDoctorStripUrl(
          `${variant.id}-secondary`,
          variant.secondaryCtaPath,
        )
      : null;

  const Icon = variant.id === "whatsapp-link" ? LinkIcon : DocumentIcon;
  const isCompact = variant.layout === "compact";

  if (isCompact) {
    return (
      <section
        className={`mt-6 ${className}`.trim()}
        aria-label="ResumeDoctor partner tip"
      >
        <a
          href={primaryUrl}
          target="_blank"
          rel="sponsored noopener noreferrer"
          className="group flex items-center gap-3 rounded-2xl border px-4 py-3.5 shadow-sm transition hover:brightness-[0.99] sm:gap-4 sm:px-5"
          style={{
            borderColor: `color-mix(in srgb, ${ACCENT} 28%, var(--border))`,
            background: `color-mix(in srgb, var(--surface) 92%, ${ACCENT} 6%)`,
          }}
        >
          <span
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-white"
            style={{ background: ACCENT }}
            aria-hidden
          >
            <DocumentIcon className="h-4 w-4" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-sm font-semibold leading-snug text-[var(--foreground)]">
              {variant.headline}
            </span>
            <span className="mt-0.5 block text-xs leading-relaxed text-[var(--muted)]">
              {variant.body}
            </span>
          </span>
          <span
            className="shrink-0 text-sm font-semibold group-hover:underline"
            style={{ color: ACCENT_DARK }}
          >
            {variant.ctaLabel} →
          </span>
        </a>
        <p className="mt-2 text-[11px] text-[var(--muted)]">
          Partner ·{" "}
          <span className="font-medium text-[var(--foreground)]">
            resumedoctor.in
          </span>
        </p>
      </section>
    );
  }

  return (
    <section
      className={`relative mt-6 overflow-hidden rounded-2xl border shadow-sm ring-1 ${className}`.trim()}
      style={{
        borderColor: `color-mix(in srgb, ${ACCENT} 28%, var(--border))`,
        background: `color-mix(in srgb, var(--surface) 88%, ${ACCENT} 8%)`,
        // ring color via arbitrary style on wrapper child
      }}
      aria-label="ResumeDoctor partner tip"
    >
      <div
        className="pointer-events-none absolute inset-y-0 left-0 w-1.5"
        style={{ background: ACCENT }}
        aria-hidden
      />
      <div className="flex flex-col gap-4 px-4 py-4 pl-5 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:px-6 sm:py-5 sm:pl-7">
        <div className="flex min-w-0 items-start gap-3 sm:items-center sm:gap-4">
          <span
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-white shadow-sm"
            style={{ background: ACCENT }}
            aria-hidden
          >
            <Icon className="h-6 w-6" />
          </span>
          <div className="min-w-0">
            <p
              className="text-[11px] font-bold uppercase tracking-[0.14em]"
              style={{ color: ACCENT_DARK }}
            >
              {variant.eyebrow}
            </p>
            <h2 className="mt-1 text-base font-semibold leading-snug text-[var(--foreground)] sm:text-lg">
              {variant.headline}
            </h2>
            <p className="mt-1 text-sm leading-relaxed text-[var(--muted)]">
              {variant.body}
            </p>
            {variant.linkPreview ? (
              <p
                className="mt-2 inline-block rounded-lg border bg-[var(--surface)] px-3 py-1.5 font-mono text-xs text-[var(--foreground)]"
                style={{
                  borderColor: `color-mix(in srgb, ${ACCENT} 22%, var(--border))`,
                }}
              >
                {variant.linkPreview}
              </p>
            ) : null}
            {variant.badge ? (
              <p className="mt-2">
                <span
                  className="inline-block rounded-full px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-[0.08em]"
                  style={{
                    color: ACCENT_DARK,
                    background: `color-mix(in srgb, ${ACCENT} 12%, var(--surface))`,
                  }}
                >
                  {variant.badge}
                </span>
              </p>
            ) : null}
          </div>
        </div>
        <div className="sm:shrink-0">
          <a
            href={primaryUrl}
            target="_blank"
            rel="sponsored noopener noreferrer"
            className={ctaClass}
            style={{
              background: ACCENT,
              outlineColor: ACCENT_DARK,
            }}
          >
            {variant.ctaLabel}
          </a>
          {secondaryUrl && variant.secondaryCtaLabel ? (
            <a
              href={secondaryUrl}
              target="_blank"
              rel="sponsored noopener noreferrer"
              className={secondaryLinkClass}
              style={{ color: ACCENT_DARK }}
            >
              {variant.secondaryCtaLabel}
            </a>
          ) : null}
          <p className="mt-2 text-center text-[11px] text-[var(--muted)] sm:text-end">
            Partner · resumedoctor.in
          </p>
        </div>
      </div>
    </section>
  );
}
