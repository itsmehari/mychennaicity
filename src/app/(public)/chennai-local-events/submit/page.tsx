import type { Metadata } from "next";
import { EventSubmitForm } from "@/components/events/event-submit-form";
import {
  InteriorCrossNav,
  PageBreadcrumbs,
  interiorMainClassName,
} from "@/components/site/interior-chrome";
import { getSiteUrl } from "@/lib/env";
import { fullSiteTitle } from "@/lib/seo/site-titles";

const path = "/chennai-local-events/submit";

export const metadata: Metadata = {
  title: "Submit a Chennai event",
  description:
    "Propose a Greater Chennai concert, workshop, or neighbourhood listing. Drafts stay off the public hub until editors schedule them.",
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
        Free for qualifying public listings. We do not sell tickets. Submissions
        land as <strong className="text-[var(--foreground)]">drafts</strong> and
        appear on the hub only after an editor schedules them. You can also use{" "}
        <a href="/contact#events" className="font-semibold text-[var(--accent)] hover:underline">
          Contact → Events
        </a>
        .
      </p>
      <EventSubmitForm />
      <InteriorCrossNav />
    </div>
  );
}
