import Link from "next/link";
import {
  EXPLORE_MYCHENNAICITY_LINKS,
  MYCHENNAICITY_USAGE_GUIDE_PATH,
} from "@/content/guides/mychennaicity-usage";

/**
 * Soft conversion band for article footers: WhatsApp + News + Jobs + usage guide.
 * Keeps tone useful, not markety.
 */
export function ExploreMyChennaiCityBand({
  compact = false,
}: {
  compact?: boolean;
}) {
  return (
    <section
      className={
        compact
          ? "rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4"
          : "rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 sm:p-6"
      }
      aria-label="Explore mychennaicity.in"
    >
      <p className="type-eyebrow text-[var(--accent)]">Explore the site</p>
      <h2
        className={
          compact
            ? "mt-1 text-base font-semibold text-[var(--foreground)]"
            : "type-display mt-1 text-xl text-[var(--foreground)]"
        }
      >
        More from mychennaicity.in
      </h2>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[var(--muted)]">
        Chennai today, local news, jobs, events, gold rate, and a moderated WhatsApp
        community — one city desk.
      </p>
      <ul className="mt-4 grid gap-2 sm:grid-cols-3">
        {EXPLORE_MYCHENNAICITY_LINKS.map((l) => (
          <li key={l.href}>
            <Link
              href={l.href}
              className="block rounded-xl border border-[var(--border)] bg-[color-mix(in_srgb,var(--background)_90%,var(--foreground))] px-3 py-3 transition hover:border-[var(--accent)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
            >
              <span className="text-sm font-semibold text-[var(--foreground)]">
                {l.label}
              </span>
              <span className="mt-0.5 block text-xs text-[var(--muted)]">
                {l.hint}
              </span>
            </Link>
          </li>
        ))}
      </ul>
      <p className="mt-4 text-xs text-[var(--muted)]">
        New here?{" "}
        <Link
          href={MYCHENNAICITY_USAGE_GUIDE_PATH}
          className="font-semibold text-[var(--accent)] underline-offset-2 hover:underline"
        >
          How to use mychennaicity.in
        </Link>{" "}
        — guides for residents, job seekers, admins, and more.
      </p>
    </section>
  );
}
