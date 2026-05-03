import type { Metadata } from "next";
import Link from "next/link";
import {
  InteriorCrossNav,
  PageBreadcrumbs,
  interiorMainClassName,
} from "@/components/site/interior-chrome";
import { getPublicContactEmail, getSiteUrl } from "@/lib/env";
import { CHENNAI_JOBS_HUB_PATH } from "@/lib/routes/chennai-jobs";
import { fullSiteTitle } from "@/lib/seo/site-titles";

const path = "/contact";

const titleSegment = "Contact — Chennai story tips & corrections";

export const metadata: Metadata = {
  title: titleSegment,
  description:
    "Reach mychennaicity.in with story tips, corrections, and partnership questions about Chennai-area coverage.",
  alternates: { canonical: `${getSiteUrl()}${path}` },
  openGraph: {
    title: fullSiteTitle(titleSegment),
    description:
      "Story tips, corrections, and questions about our Chennai local news.",
    url: `${getSiteUrl()}${path}`,
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: fullSiteTitle(titleSegment),
    images: ["/twitter-image"],
  },
};

export default function ContactPage() {
  const contactEmail = getPublicContactEmail();

  return (
    <div className={interiorMainClassName}>
      <PageBreadcrumbs items={[{ label: "Home", href: "/" }, { label: "Contact" }]} />
      <p className="type-eyebrow text-[var(--accent)]">Contact</p>
      <h1 className="type-display mt-2 text-3xl text-[var(--foreground)] sm:text-4xl">
        Tips, corrections, and partnerships
      </h1>
      <div className="type-lede mt-6 max-w-2xl space-y-4 text-sm leading-relaxed text-[var(--muted)]">
        {contactEmail ? (
          <p>
            For <strong className="text-[var(--foreground)]">story tips</strong>,{" "}
            <strong className="text-[var(--foreground)]">corrections</strong>, and{" "}
            <strong className="text-[var(--foreground)]">editorial enquiries</strong>
            , write to{" "}
            <a
              href={`mailto:${contactEmail}`}
              className="font-semibold text-[var(--accent)] underline-offset-4 hover:underline"
            >
              {contactEmail}
            </a>
            . Please include dates, locations, and primary sources where possible.
          </p>
        ) : (
          <p>
            For <strong className="text-[var(--foreground)]">story tips</strong>,{" "}
            <strong className="text-[var(--foreground)]">corrections</strong>, and{" "}
            <strong className="text-[var(--foreground)]">editorial enquiries</strong>
            , we are setting up a dedicated public inbox. In the meantime, read{" "}
            <Link
              href="/editorial-standards"
              className="font-semibold text-[var(--accent)] underline-offset-4 hover:underline"
            >
              how we handle mistakes
            </Link>{" "}
            — and watch this page for a mail link once it goes live.
          </p>
        )}
        <p>
          For urgent safety issues (fire, medical, crime in progress), contact
          emergency services and official helplines first — not this site.
        </p>
        <p>
          <strong className="text-[var(--foreground)]">Hiring or job listings.</strong>{" "}
          Open roles we publish live on{" "}
          <Link
            href={CHENNAI_JOBS_HUB_PATH}
            className="font-semibold text-[var(--accent)] underline-offset-4 hover:underline"
          >
            jobs in Chennai
          </Link>
          ; use the same tips channel for listing enquiries or corrections to an
          employer we show.
        </p>
      </div>
      <InteriorCrossNav />
    </div>
  );
}
