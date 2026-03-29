import type { Metadata } from "next";
import {
  InteriorCrossNav,
  PageBreadcrumbs,
  interiorMainClassName,
} from "@/components/site/interior-chrome";
import Link from "next/link";
import { getSiteUrl } from "@/lib/env";
import { CHENNAI_JOBS_HUB_PATH } from "@/lib/routes/chennai-jobs";
import {
  CHENNAI_GLOSSARY,
  buildGlossaryDefinedTermSetJsonLd,
} from "@/lib/seo/chennai-glossary";
import { fullSiteTitle } from "@/lib/seo/site-titles";

const path = "/glossary";

const titleSegment = "Chennai & GCC glossary";

export const metadata: Metadata = {
  title: titleSegment,
  description:
    "Short definitions for Chennai, GCC, OMR, CMRL, and planning terms used on mychennaicity.in.",
  alternates: { canonical: `${getSiteUrl()}${path}` },
  openGraph: {
    title: fullSiteTitle(titleSegment),
    description:
      "Editorial definitions for local terms — verify official sources for legal boundaries.",
    url: `${getSiteUrl()}${path}`,
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: fullSiteTitle(titleSegment),
    images: ["/twitter-image"],
  },
};

export default function GlossaryPage() {
  const base = getSiteUrl();
  const ld = buildGlossaryDefinedTermSetJsonLd(base);

  return (
    <div className={interiorMainClassName}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
      />
      <PageBreadcrumbs
        items={[{ label: "Home", href: "/" }, { label: "Glossary" }]}
      />
      <p className="type-eyebrow text-[var(--accent)]">Reference</p>
      <h1
        id="glossary"
        className="type-display mt-2 text-3xl text-[var(--foreground)] sm:text-4xl"
      >
        Chennai &amp; GCC glossary
      </h1>
      <p className="type-lede mt-4 max-w-2xl text-sm leading-relaxed text-[var(--muted)]">
        We use these terms consistently across news and hubs. They are for reader
        orientation, not legal cadastral or jurisdictional advice.
      </p>
      <p className="type-lede mt-4 max-w-2xl text-sm leading-relaxed text-[var(--muted)]">
        Looking for work? See{" "}
        <Link
          href={CHENNAI_JOBS_HUB_PATH}
          className="font-semibold text-[var(--accent)] underline-offset-4 hover:underline"
        >
          jobs in Chennai
        </Link>{" "}
        and{" "}
        <Link
          href="/guides/chennai-tech-careers"
          className="font-semibold text-[var(--accent)] underline-offset-4 hover:underline"
        >
          how to read a job ad
        </Link>
        .
      </p>

      <dl className="mt-10 max-w-2xl space-y-10">
        {CHENNAI_GLOSSARY.map((e) => (
          <div key={e.slug} id={e.slug}>
            <dt className="type-display text-lg text-[var(--foreground)]">
              {e.term}
            </dt>
            <dd className="type-lede mt-2 text-sm leading-relaxed text-[var(--muted)]">
              {e.definition}
            </dd>
            {e.sameAs?.length ? (
              <dd className="mt-2 text-xs text-[var(--muted)]">
                <span className="font-medium text-[var(--foreground)]">
                  References:{" "}
                </span>
                {e.sameAs.map((url, i) => (
                  <span key={url}>
                    {i > 0 ? " · " : null}
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[var(--accent)] underline-offset-2 hover:underline"
                    >
                      {url.replace(/^https?:\/\/(www\.)?/, "")}
                    </a>
                  </span>
                ))}
              </dd>
            ) : null}
          </div>
        ))}
      </dl>

      <InteriorCrossNav />
    </div>
  );
}
