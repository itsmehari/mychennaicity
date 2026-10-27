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
          or similar programmes. Third-party vendors, including Google, may
          place and read cookies on your browser, or use web beacons, IP
          addresses, or other identifiers, to collect information as a result of
          ads serving on this site. Those vendors may use cookies to serve ads
          based on your prior visits to this site or other sites. Google&apos;s
          use of advertising cookies enables it and its partners to serve ads
          based on your visit here and/or elsewhere on the internet. We do not
          pass information to Google that Google could use or recognise as
          personally identifiable information. See{" "}
          <a
            href="https://policies.google.com/technologies/partner-sites"
            className="font-semibold text-[var(--accent)] underline-offset-4 hover:underline"
            rel="noopener noreferrer"
            target="_blank"
          >
            How Google uses data when you use our partners&apos; sites or apps
          </a>
          . More detail is on our{" "}
          <Link
            href="/cookies"
            className="font-semibold text-[var(--accent)] underline-offset-4 hover:underline"
          >
            Cookies
          </Link>{" "}
          page.
        </p>
        <p>
          <strong className="text-[var(--foreground)]">
            Ad personalisation choices.
          </strong>{" "}
          You can opt out of personalised advertising in{" "}
          <a
            href="https://adssettings.google.com"
            className="font-semibold text-[var(--accent)] underline-offset-4 hover:underline"
            rel="noopener noreferrer"
            target="_blank"
          >
            Google Ads Settings
          </a>
          . You can also opt out of some third-party vendors&apos; use of
          cookies for personalised advertising at{" "}
          <a
            href="https://www.aboutads.info"
            className="font-semibold text-[var(--accent)] underline-offset-4 hover:underline"
            rel="noopener noreferrer"
            target="_blank"
          >
            www.aboutads.info
          </a>
          .
        </p>
        <p>
          <strong className="text-[var(--foreground)]">Cookies.</strong> We and
          third parties may set cookies, use local storage, or use pixels as
          described on{" "}
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
          <strong className="text-[var(--foreground)]">Children.</strong> This
          site is not directed at children under 13 (COPPA) and is not intended
          for commercial profiling of anyone under 18. We do not use Google ads
          or audience lists to target users we know are under 13, or activity on
          child-directed areas. If you believe we have collected a minor&apos;s
          data in error, contact us to remove it.
        </p>
        <p>
          <strong className="text-[var(--foreground)]">Location.</strong> We do
          not collect precise GPS, wifi, or cell-tower location for ads. Server
          logs may include a coarse IP-based location used for hosting, security,
          and approximate analytics.
        </p>
        <p className="text-xs text-[var(--muted)]">
          Last updated: August 2026.
        </p>
      </div>
      <InteriorCrossNav />
    </div>
  );
}
