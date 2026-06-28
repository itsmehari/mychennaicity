import type { Metadata } from "next";
import Link from "next/link";
import { AdSlot } from "@/ads/render-ad-slot";
import { AdvertisePanel } from "@/components/ads/advertise-panel";
import { HubCommunityStrip } from "@/components/community/hub-community-strip";
import { WhatsAppCommunityCta } from "@/components/community/whatsapp-community-cta";
import { Section } from "@/components/home/section";
import {
  InteriorCrossNav,
  PageBreadcrumbs,
  interiorMainClassName,
} from "@/components/site/interior-chrome";
import { EventsHubListing } from "@/components/events/events-hub-listing";
import { listPublicEventsForChennaiHub } from "@/domains/events";
import { getSiteUrl } from "@/lib/env";
import {
  buildHubCardFromDb,
} from "@/lib/events/event-hub-helpers";
import { buildEventsHubJsonLdGraph } from "@/lib/seo/events-hub-jsonld";
import { CHENNAI_GEO_META } from "@/lib/seo/chennai-geo-meta";
import { EventsHubFaq } from "@/components/events/events-hub-faq";
import { CHENNAI_JOBS_HUB_PATH } from "@/lib/routes/chennai-jobs";
import { formatIndiaLongDate } from "@/lib/presentation-dates";
import { fullSiteTitle } from "@/lib/seo/site-titles";

const canonicalPath = "/chennai-local-events";

const titleSegment =
  "Chennai events this week — concerts, comedy & markets";

export const metadata: Metadata = {
  title: titleSegment,
  description:
    "Chennai events calendar: live music, stand-up comedy, exhibitions, and meetups in Mylapore, OMR, Porur, T Nagar, Egmore, and across Greater Chennai. Free to browse on mychennaicity.in.",
  alternates: { canonical: `${getSiteUrl()}${canonicalPath}` },
  openGraph: {
    title: fullSiteTitle(titleSegment),
    description:
      "What's on in Chennai — concerts, comedy nights, shopping festivals, and tech meetups across the city.",
    url: `${getSiteUrl()}${canonicalPath}`,
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: fullSiteTitle(titleSegment),
    description:
      "Chennai concerts, comedy, exhibitions, and meetups — updated listings with venue and booking links.",
    images: ["/twitter-image"],
  },
  other: { ...CHENNAI_GEO_META },
};

export const dynamic = "force-dynamic";

export default async function ChennaiLocalEventsPage() {
  let dbEvents: Awaited<ReturnType<typeof listPublicEventsForChennaiHub>> = [];
  try {
    dbEvents = await listPublicEventsForChennaiHub(40);
  } catch {
    dbEvents = [];
  }
  const useDb = dbEvents.length > 0;
  const hubLd = useDb ? buildEventsHubJsonLdGraph(dbEvents) : null;
  const hubCards = dbEvents.map(buildHubCardFromDb);

  return (
    <div className={interiorMainClassName}>
      {hubLd ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(hubLd) }}
        />
      ) : null}
      <PageBreadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Chennai local events" },
        ]}
      />
      <p className="type-eyebrow text-[var(--accent-warm)]">Chennai local events</p>
      <h1 className="type-display mt-2 text-3xl text-[var(--foreground)] sm:text-4xl">
        What&apos;s on in Chennai
      </h1>
      <p className="type-lede mt-4 max-w-2xl text-sm leading-relaxed">
        Temple utsavams, concerts, theatre, lit fests, and neighbourhood
        gatherings across Chennai and nearby.
        {useDb ? (
          <>
            {" "}
            Below lists <strong className="font-medium text-[var(--foreground)]">upcoming on-site events</strong> from our database — confirm on the organiser before you travel.
          </>
        ) : (
          <>
            {" "}
            Listings are added as organisers share dates — send yours via{" "}
            <Link
              href="/contact#events"
              className="font-semibold text-[var(--accent)] underline-offset-4 hover:underline"
            >
              Contact → Local events
            </Link>
            .
          </>
        )}
      </p>

      <div className="mt-8 flex justify-center sm:mt-10">
        <AdSlot slotId="events-index-top" size="728x90" />
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3 shadow-sm">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--accent-warm)]">
            Upcoming listings
          </p>
          <p className="mt-1 text-lg font-semibold text-[var(--foreground)]">
            {useDb ? dbEvents.length : 0}
          </p>
          <p className="text-xs text-[var(--muted)]">
            Scheduled events on mychennaicity.in
          </p>
        </div>
        <Link
          href="/areas/adyar-thiruvanmiyur"
          className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-sm font-medium text-[var(--foreground)] shadow-sm transition hover:border-[var(--accent)]"
        >
          Coastal venues belt
          <span className="mt-1 block text-xs font-normal text-[var(--muted)]">
            Museums, halls, beaches — Adyar to Thiruvanmiyur hub
          </span>
        </Link>
        <Link
          href="/areas/kodambakkam-t-nagar"
          className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-sm font-medium text-[var(--foreground)] shadow-sm transition hover:border-[var(--accent)]"
        >
          Central Chennai nights
          <span className="mt-1 block text-xs font-normal text-[var(--muted)]">
            T. Nagar retail peaks and Kodambakkam corridors
          </span>
        </Link>
      </div>

      <div className="mt-8">
        <WhatsAppCommunityCta variant="compact" utmContent="events-hub" />
      </div>

      <AdvertisePanel variant="events" layout="section" className="mt-8" />

      <HubCommunityStrip businessVariant="events" />

      {useDb ? (
        <EventsHubListing cards={hubCards} />
      ) : (
        <div className="mt-10 rounded-2xl border border-dashed border-[var(--border)] bg-[var(--surface)] px-5 py-8 text-sm text-[var(--muted)]">
          No events are listed yet. Share date, venue, and ticket link via{" "}
          <Link
            href="/contact#events"
            className="font-semibold text-[var(--accent)] underline-offset-4 hover:underline"
          >
            Contact → Local events
          </Link>
          .
        </div>
      )}

      <EventsHubFaq />

      <Section
        className="mt-14"
        eyebrow="Planning"
        title="Before you head out"
        subtitle="Chennai’s best events still punish poor planning — a quick checklist."
      >
        <ul className="max-w-2xl space-y-3 text-sm leading-relaxed text-[var(--muted)]">
          <li>
            <strong className="text-[var(--foreground)]">Parking and metro.</strong>{" "}
            Egmore, Island, and OMR venues fill fast on weekends — consider
            Metro Rail last mile or app cabs from interchange stations.
          </li>
          <li>
            <strong className="text-[var(--foreground)]">Temple utsavams.</strong>{" "}
            Crowd flows and road closures may not appear on ticket aggregators;
            check local notices and ward social feeds.
          </li>
          <li>
            <strong className="text-[var(--foreground)]">Submit yours.</strong>{" "}
            Organisers can send free and paid events via{" "}
            <Link
              href="/contact#events"
              className="font-medium text-[var(--accent)] underline-offset-4 hover:underline"
            >
              Contact &amp; tips
            </Link>
            . Include date, venue, and a ticket or RSVP link when you have one.
          </li>
        </ul>
      </Section>

      <div className="mt-12 flex justify-center">
        <AdSlot slotId="events-index-mid" size="300x250" />
      </div>

      <p className="mt-10 max-w-2xl text-sm leading-relaxed text-[var(--muted)]">
        Job hunting around the same dates? See{" "}
        <Link
          href={CHENNAI_JOBS_HUB_PATH}
          className="font-semibold text-[var(--accent)] underline-offset-4 hover:underline"
        >
          jobs in Chennai
        </Link>{" "}
        and{" "}
        <Link
          href="/guides/chennai-tech-careers"
          className="font-semibold text-[var(--accent)] underline-offset-4 hover:underline"
        >
          how to read job ads
        </Link>
        .
      </p>

      <InteriorCrossNav />
    </div>
  );
}
