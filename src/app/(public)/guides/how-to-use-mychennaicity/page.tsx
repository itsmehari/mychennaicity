import type { Metadata } from "next";
import Link from "next/link";
import { ExploreMyChennaiCityBand } from "@/components/site/explore-mychennaicity-band";
import {
  InteriorCrossNav,
  PageBreadcrumbs,
  interiorMainClassName,
} from "@/components/site/interior-chrome";
import {
  MYCHENNAICITY_USAGE_AUDIENCES,
  MYCHENNAICITY_USAGE_GUIDE_LAST_UPDATED,
  MYCHENNAICITY_USAGE_GUIDE_PATH,
} from "@/content/guides/mychennaicity-usage";
import { getSiteUrl } from "@/lib/env";
import { CHENNAI_GEO_META } from "@/lib/seo/chennai-geo-meta";
import { fullSiteTitle } from "@/lib/seo/site-titles";

const path = MYCHENNAICITY_USAGE_GUIDE_PATH;
const titleSegment =
  "How to use mychennaicity.in — guide for residents, job seekers, admins & more";

export const metadata: Metadata = {
  title: titleSegment,
  description:
    "Audience-by-audience guide to mychennaicity.in: Chennai local news, jobs, events, gold rate, WhatsApp community, spammers list, area hubs, and civic tools.",
  alternates: { canonical: `${getSiteUrl()}${path}` },
  openGraph: {
    title: fullSiteTitle(titleSegment),
    description:
      "Start with the pages that match how you use Chennai — resident, job seeker, employer, WhatsApp admin, events, or civic reader.",
    url: `${getSiteUrl()}${path}`,
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: fullSiteTitle(titleSegment),
    images: ["/twitter-image"],
  },
  other: { ...CHENNAI_GEO_META },
};

export default function HowToUseMyChennaiCityPage() {
  return (
    <div className={interiorMainClassName}>
      <PageBreadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Guides", href: "/guides/chennai-tech-careers" },
          { label: "How to use mychennaicity.in" },
        ]}
      />

      <p className="type-eyebrow text-[var(--accent)]">Usage guide</p>
      <h1
        className="type-display mt-2 text-3xl text-[var(--foreground)] sm:text-4xl"
        data-speakable="article-title"
      >
        How to use mychennaicity.in
      </h1>
      <p
        className="type-lede mt-4 max-w-2xl text-sm leading-relaxed text-[var(--muted)]"
        data-speakable="article-lead"
      >
        One Chennai city desk for local news, jobs, events, gold rate, area
        hubs, civic tools, and a moderated WhatsApp community. Pick your
        audience below — last updated{" "}
        <strong className="text-[var(--foreground)]">
          {MYCHENNAICITY_USAGE_GUIDE_LAST_UPDATED}
        </strong>
        .
      </p>

      <nav
        className="mt-8 flex flex-wrap gap-2"
        aria-label="Jump to audience"
      >
        {MYCHENNAICITY_USAGE_AUDIENCES.map((a) => (
          <a
            key={a.id}
            href={`#${a.id}`}
            className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1.5 text-xs font-semibold text-[var(--foreground)] transition hover:border-[var(--accent)]"
          >
            {a.shortLabel}
          </a>
        ))}
      </nav>

      <div className="mt-8">
        <ExploreMyChennaiCityBand compact />
      </div>

      <div className="mt-12 space-y-14">
        {MYCHENNAICITY_USAGE_AUDIENCES.map((a) => (
          <section
            key={a.id}
            id={a.id}
            className="scroll-mt-28"
            aria-labelledby={`usage-${a.id}`}
          >
            <h2
              id={`usage-${a.id}`}
              className="type-display text-2xl text-[var(--foreground)]"
            >
              {a.title}
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[var(--muted)]">
              {a.intro}
            </p>

            <h3 className="mt-6 text-sm font-semibold uppercase tracking-wide text-[var(--muted)]">
              Start here
            </h3>
            <ul className="mt-3 grid gap-2 sm:grid-cols-2">
              {a.startHere.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="block rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3 transition hover:border-[var(--accent)]"
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

            <h3 className="mt-6 text-sm font-semibold uppercase tracking-wide text-[var(--muted)]">
              Quick tips
            </h3>
            <ul className="mt-3 max-w-2xl list-disc space-y-2 pl-5 text-sm leading-relaxed text-[var(--muted)]">
              {a.tips.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <section className="mt-14 max-w-2xl text-sm leading-relaxed text-[var(--muted)]">
        <h2 className="type-display text-xl text-[var(--foreground)]">
          Still stuck?
        </h2>
        <p className="mt-3">
          Use{" "}
          <Link
            href="/search"
            className="font-semibold text-[var(--accent)] hover:underline"
          >
            site search
          </Link>
          , read{" "}
          <Link
            href="/about"
            className="font-semibold text-[var(--accent)] hover:underline"
          >
            About
          </Link>
          , or{" "}
          <Link
            href="/contact"
            className="font-semibold text-[var(--accent)] hover:underline"
          >
            contact the desk
          </Link>{" "}
          with a tip or question.
        </p>
      </section>

      <InteriorCrossNav includeUsageSection={false} />
    </div>
  );
}
