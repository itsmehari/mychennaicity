import type { Metadata } from "next";
import Link from "next/link";
import {
  InteriorCrossNav,
  PageBreadcrumbs,
  interiorMainClassName,
} from "@/components/site/interior-chrome";
import { getSiteUrl } from "@/lib/env";
import { fullSiteTitle } from "@/lib/seo/site-titles";

const path = "/privacy";

const titleSegment = "Privacy policy — Chennai-area local site";

export const metadata: Metadata = {
  title: titleSegment,
  description:
    "How mychennaicity.in collects and uses information, including analytics and advertising.",
  alternates: { canonical: `${getSiteUrl()}${path}` },
  openGraph: {
    title: fullSiteTitle(titleSegment),
    description:
      "Privacy practices for mychennaicity.in: data we collect, cookies, and third-party services.",
    url: `${getSiteUrl()}${path}`,
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: fullSiteTitle(titleSegment),
    images: ["/twitter-image"],
  },
};

export default function PrivacyPage() {
  return (
    <div className={interiorMainClassName}>
      <PageBreadcrumbs
        items={[{ label: "Home", href: "/" }, { label: "Privacy" }]}
      />
      <p className="type-eyebrow text-[var(--accent)]">Legal</p>
      <h1 className="type-display mt-2 text-3xl text-[var(--foreground)] sm:text-4xl">
        Privacy policy
      </h1>
      <p className="mt-4 max-w-2xl text-xs leading-relaxed text-[var(--muted)]">
        This page is an editorial summary of our practices, not legal advice. We
        may update it as the site grows; the date at the bottom reflects the last
        substantive revision.
      </p>
      <div className="type-lede mt-6 max-w-2xl space-y-4 text-sm leading-relaxed text-[var(--muted)]">
        <p>
          <strong className="text-[var(--foreground)]">Who we are.</strong>{" "}
          <strong className="text-[var(--foreground)]">mychennaicity.in</strong>{" "}
          is operated as a Chennai-focused local information site. For privacy
          questions or requests, use{" "}
          <Link
            href="/contact"
            className="font-semibold text-[var(--accent)] underline-offset-4 hover:underline"
          >
            Contact &amp; tips
          </Link>
          .
        </p>
        <p>
          <strong className="text-[var(--foreground)]">What we collect.</strong>{" "}
          Depending on how you use the site, we may process server logs (such as
          IP address, user agent, and requested URL), optional account data if
          you sign in to restricted areas, and information you send us (for
          example tips, feedback, or newsletter sign-ups).
        </p>
        <p>
          <strong className="text-[var(--foreground)]">Newsletter.</strong> If
          you subscribe to email updates, we store the address you provide and
          use it only to send the digest or related service messages, unless you
          opt out or we say otherwise at collection.
        </p>
        <p>
          <strong className="text-[var(--foreground)]">Analytics.</strong> We may
          use{" "}
          <a
            href="https://policies.google.com/privacy"
            className="font-semibold text-[var(--accent)] underline-offset-4 hover:underline"
            rel="noopener noreferrer"
            target="_blank"
          >
            Google Analytics
          </a>{" "}
          (GA4) when configured, to understand traffic and improve the product.
          Google&apos;s terms and privacy policy apply to how they process data
          on our behalf.
        </p>
        <p>
          <strong className="text-[var(--foreground)]">Advertising.</strong> We
          may show ads through{" "}
          <a
            href="https://policies.google.com/technologies/ads"
            className="font-semibold text-[var(--accent)] underline-offset-4 hover:underline"
            rel="noopener noreferrer"
            target="_blank"
          >
            Google AdSense
          </a>{" "}
          or similar programmes. Ad partners may use cookies or similar
          technologies to measure delivery and relevance. See our{" "}
          <Link
            href="/cookies"
            className="font-semibold text-[var(--accent)] underline-offset-4 hover:underline"
          >
            Cookies
          </Link>{" "}
          page for more detail.
        </p>
        <p>
          <strong className="text-[var(--foreground)]">Cookies.</strong> We and
          third parties may set cookies or use local storage as described on{" "}
          <Link
            href="/cookies"
            className="font-semibold text-[var(--accent)] underline-offset-4 hover:underline"
          >
            /cookies
          </Link>
          .
        </p>
        <p>
          <strong className="text-[var(--foreground)]">Retention.</strong> We
          keep information only as long as needed for the purposes above,
          security, and legal obligations. Log retention follows our hosting and
          tooling defaults unless we shorten them.
        </p>
        <p>
          <strong className="text-[var(--foreground)]">India (DPDP).</strong>{" "}
          India&apos;s Digital Personal Data Protection Act and rules may apply
          to some processing. You may have rights to access, correction, erasure,
          and grievance handling as the law provides; contact us via{" "}
          <Link
            href="/contact"
            className="font-semibold text-[var(--accent)] underline-offset-4 hover:underline"
          >
            Contact &amp; tips
          </Link>{" "}
          and we will respond within reasonable timelines.
        </p>
        <p>
          <strong className="text-[var(--foreground)]">Children.</strong> The
          site is not directed at children under 18 for commercial profiling. If
          you believe we have collected a minor&apos;s data in error, contact
          us to remove it.
        </p>
        <p className="text-xs text-[var(--muted)]">
          Last updated: March 2026.
        </p>
      </div>
      <InteriorCrossNav />
    </div>
  );
}
