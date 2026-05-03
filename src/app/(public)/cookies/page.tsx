import type { Metadata } from "next";
import Link from "next/link";
import {
  InteriorCrossNav,
  PageBreadcrumbs,
  interiorMainClassName,
} from "@/components/site/interior-chrome";
import { getSiteUrl } from "@/lib/env";
import { fullSiteTitle } from "@/lib/seo/site-titles";

const path = "/cookies";

const titleSegment = "Cookie policy — Chennai-area local site";

export const metadata: Metadata = {
  title: titleSegment,
  description:
    "How mychennaicity.in uses cookies and similar technologies, including analytics and ads.",
  alternates: { canonical: `${getSiteUrl()}${path}` },
  openGraph: {
    title: fullSiteTitle(titleSegment),
    description:
      "Cookie and storage practices on mychennaicity.in and links to Google policies.",
    url: `${getSiteUrl()}${path}`,
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: fullSiteTitle(titleSegment),
    images: ["/twitter-image"],
  },
};

export default function CookiesPage() {
  return (
    <div className={interiorMainClassName}>
      <PageBreadcrumbs
        items={[{ label: "Home", href: "/" }, { label: "Cookies" }]}
      />
      <p className="type-eyebrow text-[var(--accent)]">Legal</p>
      <h1 className="type-display mt-2 text-3xl text-[var(--foreground)] sm:text-4xl">
        Cookies &amp; similar technologies
      </h1>
      <div className="type-lede mt-6 max-w-2xl space-y-4 text-sm leading-relaxed text-[var(--muted)]">
        <p>
          Cookies are small files stored on your device. We also refer to
          similar technologies (such as local storage or pixels) where they
          behave like cookies for transparency.
        </p>
        <p>
          <strong className="text-[var(--foreground)]">Essential / functional.</strong>{" "}
          We may use first-party cookies to keep you signed in if you use
          password or OAuth sessions, to remember preferences, or to protect the
          site (for example CSRF or rate limiting). These are typically
          first-party and limited to our domain.
        </p>
        <p>
          <strong className="text-[var(--foreground)]">Analytics.</strong> If
          Google Analytics (GA4) is enabled, Google may set cookies or use
          identifiers to measure page views and events. See{" "}
          <a
            href="https://policies.google.com/technologies/cookies"
            className="font-semibold text-[var(--accent)] underline-offset-4 hover:underline"
            rel="noopener noreferrer"
            target="_blank"
          >
            Google&apos;s cookie policy
          </a>{" "}
          and{" "}
          <a
            href="https://policies.google.com/privacy"
            className="font-semibold text-[var(--accent)] underline-offset-4 hover:underline"
            rel="noopener noreferrer"
            target="_blank"
          >
            Google Privacy Policy
          </a>
          .
        </p>
        <p>
          <strong className="text-[var(--foreground)]">Advertising.</strong> If
          we use Google AdSense or other ad networks, those partners may set
          third-party cookies or use advertising identifiers to serve and
          measure ads. See{" "}
          <a
            href="https://policies.google.com/technologies/ads"
            className="font-semibold text-[var(--accent)] underline-offset-4 hover:underline"
            rel="noopener noreferrer"
            target="_blank"
          >
            How Google uses information from sites that use our services
          </a>
          .
        </p>
        <p>
          <strong className="text-[var(--foreground)]">Your choices.</strong>{" "}
          Most browsers let you block or delete cookies. Blocking cookies may
          break sign-in or some features. Ad personalisation controls may also
          be available in your Google account or device settings.
        </p>
        <p>
          For how we use personal data overall, see our{" "}
          <Link
            href="/privacy"
            className="font-semibold text-[var(--accent)] underline-offset-4 hover:underline"
          >
            Privacy policy
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
