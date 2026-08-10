import type { Metadata } from "next";
import Link from "next/link";
import { ContactServiceGrid } from "@/components/contact/contact-service-grid";
import {
  InteriorCrossNav,
  PageBreadcrumbs,
} from "@/components/site/interior-chrome";
import { getSiteUrl } from "@/lib/env";
import { fullSiteTitle } from "@/lib/seo/site-titles";

const path = "/contact";

const titleSegment = "Contact — news, jobs, events & listings";

export const metadata: Metadata = {
  title: titleSegment,
  description:
    "Corporate contact desk for mychennaicity.in — story tips, Chennai jobs and events, directory listings, advertising, and the reader WhatsApp community.",
  alternates: { canonical: `${getSiteUrl()}${path}` },
  openGraph: {
    title: fullSiteTitle(titleSegment),
    description:
      "Engage with the mychennaicity.in team for Chennai news, jobs, events, listings, and partnerships.",
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
    <>
      <div className="mcc-corp-crumbs">
        <PageBreadcrumbs items={[{ label: "Home", href: "/" }, { label: "Contact" }]} />
      </div>

      <ContactServiceGrid />

      <div className="mcc-corp-note" role="note">
        <p>
          <strong>Urgent safety.</strong> For fire, medical emergencies, or crime
          in progress, contact emergency services and official helplines first —
          not this site.
        </p>
        <p>
          <strong>Community rules.</strong> Tips and group messages should follow
          our{" "}
          <Link href="/community-guidelines">community guidelines</Link>.
        </p>
      </div>

      <div className="mcc-corp-cross">
        <InteriorCrossNav />
      </div>
    </>
  );
}
