import Link from "next/link";
import {
  MYCHENNAICITY_USAGE_AUDIENCES,
  MYCHENNAICITY_USAGE_GUIDE_PATH,
} from "@/content/guides/mychennaicity-usage";

/**
 * Special section for hubs and interior pages — audience cards linking into the
 * usage guide anchors and primary features.
 */
export function SiteUsageAudienceSection({
  className = "",
}: {
  className?: string;
}) {
  return (
    <section
      className={`mt-14 rounded-2xl border border-[var(--border)] bg-[color-mix(in_srgb,var(--accent)_5%,var(--surface))] p-5 shadow-sm sm:p-6 ${className}`.trim()}
      aria-labelledby="site-usage-audience-heading"
    >
      <p className="type-eyebrow text-[var(--accent)]">Who is this for?</p>
      <h2
        id="site-usage-audience-heading"
        className="type-display mt-2 text-xl text-[var(--foreground)] sm:text-2xl"
      >
        How to use mychennaicity.in
      </h2>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[var(--muted)]">
        Pick your role — we point you to the right pages for news, jobs, events,
        WhatsApp, and civic tools.
      </p>
      <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {MYCHENNAICITY_USAGE_AUDIENCES.map((a) => (
          <li key={a.id}>
            <Link
              href={`${MYCHENNAICITY_USAGE_GUIDE_PATH}#${a.id}`}
              className="block h-full rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3 transition hover:border-[var(--accent)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
            >
              <span className="text-sm font-semibold text-[var(--foreground)]">
                {a.shortLabel}
              </span>
              <span className="mt-1 block text-xs leading-relaxed text-[var(--muted)]">
                {a.intro.length > 96 ? `${a.intro.slice(0, 93).trimEnd()}…` : a.intro}
              </span>
            </Link>
          </li>
        ))}
      </ul>
      <p className="mt-5 text-sm">
        <Link
          href={MYCHENNAICITY_USAGE_GUIDE_PATH}
          className="font-semibold text-[var(--accent)] underline-offset-4 hover:underline"
        >
          Open the full usage guide →
        </Link>
      </p>
    </section>
  );
}
