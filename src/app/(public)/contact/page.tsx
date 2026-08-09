import type { Metadata } from "next";
import Link from "next/link";
import { ContactServiceGrid } from "@/components/contact/contact-service-grid";
import {
  InteriorCrossNav,
  PageBreadcrumbs,
  interiorMainClassName,
} from "@/components/site/interior-chrome";
import { getSiteUrl } from "@/lib/env";
import { fullSiteTitle } from "@/lib/seo/site-titles";

const path = "/contact";

const titleSegment = "Contact — news, jobs, events & listings";

export const metadata: Metadata = {
  title: titleSegment,
  description:
    "Reach the mychennaicity.in desk for story tips, Chennai job and event listings, directory entries, advertising, or the reader WhatsApp group. WhatsApp is usually the fastest path.",
  alternates: { canonical: `${getSiteUrl()}${path}` },
  openGraph: {
    title: fullSiteTitle(titleSegment),
    description:
      "Contact paths for Chennai local news, jobs, events, directory listings, and partnerships.",
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
  return (
    <div className={interiorMainClassName}>
      <PageBreadcrumbs items={[{ label: "Home", href: "/" }, { label: "Contact" }]} />

      <ContactServiceGrid />

      <div className="mcc-contact-note" role="note">
        <p>
          <strong>Urgent safety.</strong> For fire, medical emergencies, or crime
          in progress, contact emergency services and official helplines first —
          not this site.
        </p>
        <p>
          <strong>Community rules.</strong> Tips and group messages should follow
          our{" "}
          <Link
            href="/community-guidelines"
            className="font-semibold text-[var(--accent)] underline-offset-4 hover:underline"
          >
            community guidelines
          </Link>
          .
        </p>
      </div>

      <InteriorCrossNav />
    </div>
  );
}
