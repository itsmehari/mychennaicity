import type { Metadata } from "next";
import Link from "next/link";
import { ContactServiceGrid } from "@/components/contact/contact-service-grid";
import { WhatsAppCommunityCta } from "@/components/community/whatsapp-community-cta";
import {
  InteriorCrossNav,
  PageBreadcrumbs,
  interiorMainClassName,
} from "@/components/site/interior-chrome";
import { getPublicContactEmail, getSiteUrl } from "@/lib/env";
import { fullSiteTitle } from "@/lib/seo/site-titles";

const path = "/contact";

const titleSegment = "Contact — news, jobs, events & listings";

export const metadata: Metadata = {
  title: titleSegment,
  description:
    "How to reach mychennaicity.in for story tips, job and event listings, directory entries, advertising, and the Chennai reader WhatsApp group.",
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
  const contactEmail = getPublicContactEmail();

  return (
    <div className={interiorMainClassName}>
      <PageBreadcrumbs items={[{ label: "Home", href: "/" }, { label: "Contact" }]} />
      <p className="type-eyebrow text-[var(--accent)]">Contact</p>
      <h1 className="type-display mt-2 text-3xl text-[var(--foreground)] sm:text-4xl">
        How to reach us
      </h1>
      <div className="type-lede mt-6 max-w-3xl space-y-4 text-sm leading-relaxed text-[var(--muted)]">
        <p>
          Pick the path that matches what you need — news tips, hiring, events,
          directory listings, advertising, or the reader WhatsApp group. We read
          everything, even if we cannot reply instantly.
        </p>
        <p>
          Prefer email? Write to{" "}
          <a
            href={`mailto:${contactEmail}`}
            className="font-semibold text-[var(--accent)] underline-offset-4 hover:underline"
          >
            {contactEmail}
          </a>{" "}
          with a clear subject line so we can route it faster.
        </p>
      </div>

      <div className="mt-8">
        <WhatsAppCommunityCta variant="compact" utmContent="contact" />
      </div>

      <ContactServiceGrid />

      <div
        className="mt-10 max-w-3xl rounded-2xl border border-[color-mix(in_srgb,var(--foreground)_8%,var(--border))] bg-[color-mix(in_srgb,var(--surface)_94%,var(--accent)_4%)] p-5 text-sm leading-relaxed text-[var(--muted)] sm:p-6"
        role="note"
      >
        <p>
          <strong className="text-[var(--foreground)]">Urgent safety.</strong>{" "}
          For fire, medical emergencies, or crime in progress, contact emergency
          services and official helplines first — not this site.
        </p>
        <p className="mt-3">
          <strong className="text-[var(--foreground)]">Community rules.</strong>{" "}
          Tips and group messages should follow our{" "}
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
