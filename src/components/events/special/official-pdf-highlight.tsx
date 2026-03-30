import type { OfficialPdfSpec } from "@/content/special-events/types";

type Props = { pdf: OfficialPdfSpec };

export function OfficialPdfHighlight({ pdf }: Props) {
  return (
    <section
      id="official-pdf"
      className="mt-8 scroll-mt-24 rounded-2xl border border-[color-mix(in_srgb,var(--accent-warm)_35%,var(--border))] bg-[color-mix(in_srgb,var(--accent-warm)_8%,var(--surface))] p-5 sm:p-6"
      aria-labelledby="official-pdf-heading"
    >
      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--accent-warm)]">
        Official notice
      </p>
      <h2
        id="official-pdf-heading"
        className="mt-2 text-lg font-semibold text-[var(--foreground)]"
      >
        {pdf.label}
      </h2>
      {pdf.subtitle ? (
        <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
          {pdf.subtitle}
        </p>
      ) : null}
      <a
        href={pdf.url}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-flex items-center gap-2 rounded-xl bg-[var(--foreground)] px-4 py-2.5 text-sm font-semibold text-[var(--background)] transition hover:opacity-90"
      >
        <span className="font-mono text-xs" aria-hidden>
          PDF
        </span>
        Open PDF
      </a>
    </section>
  );
}
