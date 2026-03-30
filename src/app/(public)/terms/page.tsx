import type { Metadata } from "next";
import Link from "next/link";
import {
  InteriorCrossNav,
  PageBreadcrumbs,
  interiorMainClassName,
} from "@/components/site/interior-chrome";
import { getSiteUrl } from "@/lib/env";
import { fullSiteTitle } from "@/lib/seo/site-titles";

const path = "/terms";

const titleSegment = "Terms of use";

export const metadata: Metadata = {
  title: titleSegment,
  description:
    "Terms governing use of mychennaicity.in, disclaimers, and governing law (India).",
  alternates: { canonical: `${getSiteUrl()}${path}` },
  openGraph: {
    title: fullSiteTitle(titleSegment),
    description:
      "Terms of use for mychennaicity.in: acceptable use, disclaimers, and liability.",
    url: `${getSiteUrl()}${path}`,
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: fullSiteTitle(titleSegment),
    images: ["/twitter-image"],
  },
};

export default function TermsPage() {
  return (
    <div className={interiorMainClassName}>
      <PageBreadcrumbs
        items={[{ label: "Home", href: "/" }, { label: "Terms of use" }]}
      />
      <p className="type-eyebrow text-[var(--accent)]">Legal</p>
      <h1 className="type-display mt-2 text-3xl text-[var(--foreground)] sm:text-4xl">
        Terms of use
      </h1>
      <p className="mt-4 max-w-2xl text-xs leading-relaxed text-[var(--muted)]">
        These terms are a practical summary for visitors. They are not a
        substitute for legal review for your specific situation.
      </p>
      <div className="type-lede mt-6 max-w-2xl space-y-4 text-sm leading-relaxed text-[var(--muted)]">
        <p>
          By using{" "}
          <strong className="text-[var(--foreground)]">mychennaicity.in</strong>
          , you agree to these terms and our{" "}
          <Link
            href="/privacy"
            className="font-semibold text-[var(--accent)] underline-offset-4 hover:underline"
          >
            Privacy policy
          </Link>
          . If you do not agree, please do not use the site.
        </p>
        <p>
          <strong className="text-[var(--foreground)]">Nature of the site.</strong>{" "}
          We publish local news, listings, events, and related information. We
          are not a government agency. Maps and area labels are for orientation
          only unless stated otherwise.
        </p>
        <p>
          <strong className="text-[var(--foreground)]">Not professional advice.</strong>{" "}
          Content is for general information. It is not legal, medical,
          financial, or other professional advice. Verify facts with official
          sources before acting.
        </p>
        <p>
          <strong className="text-[var(--foreground)]">Third-party links &amp; jobs.</strong>{" "}
          We link to external sites and employers. We do not control those
          services and are not responsible for their content or hiring
          decisions.
        </p>
        <p>
          <strong className="text-[var(--foreground)]">Acceptable use.</strong>{" "}
          Do not misuse the site: no unlawful activity, harassment, scraping
          that harms performance, attempting to break security, or uploading
          malware. Follow our{" "}
          <Link
            href="/community-guidelines"
            className="font-semibold text-[var(--accent)] underline-offset-4 hover:underline"
          >
            Community guidelines
          </Link>{" "}
          for submissions and discussion when those features exist.
        </p>
        <p>
          <strong className="text-[var(--foreground)]">Intellectual property.</strong>{" "}
          Text, design, and branding on the site are owned by us or our
          licensors unless marked otherwise. You may share links and short
          quotations with attribution; wider reuse needs our permission unless
          allowed by law.
        </p>
        <p>
          <strong className="text-[var(--foreground)]">Disclaimer of warranties.</strong>{" "}
          The site is provided &quot;as is&quot;. We do not warrant uninterrupted
          or error-free operation.
        </p>
        <p>
          <strong className="text-[var(--foreground)]">Limitation of liability.</strong>{" "}
          To the fullest extent permitted by applicable law in India, we are not
          liable for indirect or consequential damages arising from your use of
          the site. Our total liability for any claim related to the site is
          limited to the greater of one hundred Indian rupees or the amount you
          paid us for the specific paid service giving rise to the claim (if
          any).
        </p>
        <p>
          <strong className="text-[var(--foreground)]">Governing law.</strong>{" "}
          These terms are governed by the laws of India. Courts in Chennai,
          Tamil Nadu, shall have exclusive jurisdiction, subject to any
          non-waivable rights you may have under law.
        </p>
        <p>
          <strong className="text-[var(--foreground)]">Changes.</strong> We may
          update these terms; continued use after changes means you accept the
          revised terms. Material changes will be reflected on this page with
          an updated date.
        </p>
        <p className="text-xs text-[var(--muted)]">
          Last updated: March 2026.
        </p>
      </div>
      <InteriorCrossNav />
    </div>
  );
}
