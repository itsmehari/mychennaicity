import type { Metadata } from "next";
import { WhatsAppPlacementCta } from "@/components/community/whatsapp-placement-cta";
import { EventSubmitForm } from "@/components/events/event-submit-form";
import {
  InteriorCrossNav,
  PageBreadcrumbs,
  interiorMainClassName,
} from "@/components/site/interior-chrome";
import { EVENTS_ORGANISER_PASSAGE } from "@/content/aeo/jobs-events-passages";
import { getSiteUrl } from "@/lib/env";
import { fullSiteTitle } from "@/lib/seo/site-titles";

const path = "/chennai-local-events/submit";

export const metadata: Metadata = {
  title: "Submit a Chennai event",
  description: EVENTS_ORGANISER_PASSAGE,
  alternates: { canonical: `${getSiteUrl()}${path}` },
  openGraph: {
    title: fullSiteTitle("Submit a Chennai event"),
    url: `${getSiteUrl()}${path}`,
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
};

export default function SubmitChennaiEventPage() {
  return (
    <div className={interiorMainClassName}>
      <PageBreadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Chennai local events", href: "/chennai-local-events" },
          { label: "Submit" },
        ]}
      />
      <p className="type-eyebrow text-[var(--accent)]">Local events</p>
      <h1 className="type-display mt-2 text-3xl text-[var(--foreground)] sm:text-4xl">
        Submit a Chennai event
      </h1>
      <p className="type-lede mt-4 max-w-2xl text-sm leading-relaxed text-[var(--muted)]">
        {EVENTS_ORGANISER_PASSAGE}
      </p>
      <EventSubmitForm />
      <div className="mt-10">
        <WhatsAppPlacementCta pageType="thank_you" slot="post_conversion" />
      </div>
      <InteriorCrossNav />
    </div>
  );
}
