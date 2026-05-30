import Link from "next/link";

export function OfficialDocumentBanner({
  href,
  label,
  meta,
}: {
  href: string;
  label: string;
  meta?: string;
}) {
  return (
    <div className="rounded-2xl border border-[color-mix(in_srgb,var(--accent)_28%,var(--border))] bg-[color-mix(in_srgb,var(--accent)_6%,var(--surface))] p-5 sm:flex sm:items-center sm:justify-between sm:gap-6">
      <div className="min-w-0">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--accent)]">
          Official government order
        </p>
        <p className="mt-2 text-sm font-semibold leading-snug text-[var(--foreground)]">
          {label}
        </p>
        {meta ? (
          <p className="mt-1 text-xs text-[var(--muted)]">{meta}</p>
        ) : null}
      </div>
      <Link
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-flex shrink-0 items-center gap-2 rounded-xl bg-[var(--foreground)] px-4 py-2.5 text-sm font-semibold text-[var(--background)] transition hover:opacity-90 sm:mt-0"
      >
        <span className="font-mono text-xs" aria-hidden>
          PDF
        </span>
        Download G.O.
      </Link>
    </div>
  );
}
