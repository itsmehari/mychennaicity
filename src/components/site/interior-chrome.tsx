import Link from "next/link";
import { CHENNAI_NEWS_TOPIC_NAV } from "@/lib/news-topics";

export const interiorMainClassName =
  "mx-auto max-w-[1280px] px-4 py-10 sm:py-14";

/** Keeps breadcrumb trails readable on mobile. */
export function clipCrumbTitle(text: string, max = 52): string {
  const t = text.trim();
  if (t.length <= max) return t;
  return `${t.slice(0, max - 1).trimEnd()}…`;
}

export type BreadcrumbItem = { label: string; href?: string };

export function PageBreadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6 text-xs text-[var(--muted)]">
      <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1">
        {items.map((c, i) => (
          <li key={`${c.label}-${i}`} className="flex items-center gap-1.5">
            {i > 0 ? (
              <span className="text-[var(--border)]" aria-hidden>
                /
              </span>
            ) : null}
            {c.href ? (
              <Link
                href={c.href}
                className="font-medium text-[var(--accent)] underline-offset-4 hover:underline"
              >
                {c.label}
              </Link>
            ) : (
              <span className="max-w-[min(100%,48ch)] truncate font-medium text-[var(--foreground)]">
                {c.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

const CROSS_LINKS: { href: string; label: string; hint: string }[] = [
  {
    href: "/",
    label: "Home",
    hint: "Hero, map, and city pulse",
  },
  {
    href: "/chennai-local-news",
    label: "Chennai local news",
    hint: "Front page and desks",
  },
  {
    href: "/chennai-local-events",
    label: "Events",
    hint: "What’s on across the city",
  },
  {
    href: "/jobs",
    label: "Jobs",
    hint: "Curated employer links",
  },
  {
    href: "/directory",
    label: "Directory",
    hint: "Places, services, listings",
  },
  {
    href: "/#areas",
    label: "Area map",
    hint: "Macro hubs around GCC",
  },
];

export function TopicDeskNav({ currentSlug }: { currentSlug?: string }) {
  return (
    <div
      className="mb-8 flex flex-wrap gap-2"
      aria-label="News desks"
    >
      {CHENNAI_NEWS_TOPIC_NAV.map((t) => {
        const active = t.slug === currentSlug;
        return (
          <Link
            key={t.slug}
            href={`/chennai-local-news/topic/${t.slug}`}
            className={`rounded-full px-3 py-1.5 text-xs font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] ${
              active
                ? "bg-[var(--accent)] text-[var(--background)]"
                : "border border-[var(--border)] bg-[var(--surface)] text-[var(--foreground)] hover:border-[var(--accent)]"
            }`}
          >
            {t.label}
          </Link>
        );
      })}
    </div>
  );
}

export function InteriorCrossNav() {
  return (
    <nav
      aria-label="Explore mychennaicity.in"
      className="mt-14 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-sm sm:p-6"
    >
      <p className="type-eyebrow text-[var(--accent)]">Keep exploring</p>
      <h2 className="type-display mt-2 text-xl text-[var(--foreground)] sm:text-2xl">
        More Chennai pages
      </h2>
      <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {CROSS_LINKS.map((l) => (
          <li key={l.href}>
            <Link
              href={l.href}
              className="block rounded-xl border border-[var(--border)] bg-[color-mix(in_srgb,var(--surface)_92%,var(--foreground))] px-4 py-3 text-sm font-semibold text-[var(--foreground)] transition hover:border-[var(--accent)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
            >
              {l.label}
              <span className="mt-1 block text-xs font-normal text-[var(--muted)]">
                {l.hint}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
