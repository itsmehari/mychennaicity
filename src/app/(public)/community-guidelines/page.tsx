import type { Metadata } from "next";
import Link from "next/link";
import {
  InteriorCrossNav,
  PageBreadcrumbs,
  interiorMainClassName,
} from "@/components/site/interior-chrome";
import { getSiteUrl } from "@/lib/env";
import { fullSiteTitle } from "@/lib/seo/site-titles";

const path = "/community-guidelines";

const titleSegment = "Community guidelines";

export const metadata: Metadata = {
  title: titleSegment,
  description:
    "How we expect people to behave on mychennaicity.in tips, comments, and future community features.",
  alternates: { canonical: `${getSiteUrl()}${path}` },
  openGraph: {
    title: fullSiteTitle(titleSegment),
    description:
      "Community standards for mychennaicity.in: civility, accuracy, and safety.",
    url: `${getSiteUrl()}${path}`,
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: fullSiteTitle(titleSegment),
    images: ["/twitter-image"],
  },
};

export default function CommunityGuidelinesPage() {
  return (
    <div className={interiorMainClassName}>
      <PageBreadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Community guidelines" },
        ]}
      />
      <p className="type-eyebrow text-[var(--accent)]">Trust</p>
      <h1 className="type-display mt-2 text-3xl text-[var(--foreground)] sm:text-4xl">
        Community guidelines
      </h1>
      <div className="type-lede mt-6 max-w-2xl space-y-4 text-sm leading-relaxed text-[var(--muted)]">
        <p>
          These guidelines apply to tips you send us, comments or forums if we
          enable them, and any other public participation on{" "}
          <strong className="text-[var(--foreground)]">mychennaicity.in</strong>
          . They align with our{" "}
          <Link
            href="/editorial-standards"
            className="font-semibold text-[var(--accent)] underline-offset-4 hover:underline"
          >
            Editorial standards
          </Link>{" "}
          for newsroom behaviour.
        </p>
        <p>
          <strong className="text-[var(--foreground)]">Be civil.</strong>{" "}
          Disagree on facts and policy, not on identity. No harassment, threats,
          hate speech, or coordinated pile-ons.
        </p>
        <p>
          <strong className="text-[var(--foreground)]">Be accurate.</strong>{" "}
          When you report something, include what you saw, when, and where.
          Speculation is fine if labelled as such; do not present rumours as
          confirmed fact.
        </p>
        <p>
          <strong className="text-[var(--foreground)]">Respect privacy.</strong>{" "}
          Do not post someone else&apos;s private information (addresses, phone
          numbers, ID numbers) without a clear public-interest reason. Be
          careful with photos of minors and vulnerable people.
        </p>
        <p>
          <strong className="text-[var(--foreground)]">No spam or scams.</strong>{" "}
          No repetitive promotion, phishing, or fake job or property listings. We
          may remove content and block accounts that abuse the platform.
        </p>
        <p>
          <strong className="text-[var(--foreground)]">Moderation.</strong> We
          may hide, edit, or remove contributions that break these rules or our{" "}
          <Link
            href="/terms"
            className="font-semibold text-[var(--accent)] underline-offset-4 hover:underline"
          >
            Terms of use
          </Link>
          . Serious cases may be referred to authorities when appropriate.
        </p>
        <p>
          <strong className="text-[var(--foreground)]">Contact.</strong> For
          appeals or questions, use{" "}
          <Link
            href="/contact"
            className="font-semibold text-[var(--accent)] underline-offset-4 hover:underline"
          >
            Contact &amp; tips
          </Link>
          .
        </p>
        <p className="text-xs text-[var(--muted)]">
          Last updated: March 2026.
        </p>
      </div>
      <InteriorCrossNav />
    </div>
  );
}
