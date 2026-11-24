import type { Metadata } from "next";
import { WhatsAppPlacementCta } from "@/components/community/whatsapp-placement-cta";
import { EventSubmitForm } from "@/components/events/event-submit-form";
import { PublicPostGate } from "@/components/free-posting/public-post-gate";
import {
  InteriorCrossNav,
  PageBreadcrumbs,
  interiorMainClassName,
} from "@/components/site/interior-chrome";
import { EVENTS_ORGANISER_PASSAGE } from "@/content/aeo/jobs-events-passages";
import { freePostHandoffMetadata } from "@/lib/free-posting-metadata";

export const metadata: Metadata = freePostHandoffMetadata("event");

export default function SubmitChennaiEventPage() {
  return (
    <PublicPostGate kind="event">
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
    </PublicPostGate>
  );
}
