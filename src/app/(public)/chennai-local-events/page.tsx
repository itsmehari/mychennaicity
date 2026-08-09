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
import { EventsHubAeoStrip } from "@/components/events/events-hub-aeo-strip";
import { EventsHubFaq } from "@/components/events/events-hub-faq";
import { EventsHubHero } from "@/components/events/events-hub-hero";
import { EventsHubListing } from "@/components/events/events-hub-listing";
import { EventsHubThisWeekDigest } from "@/components/events/events-hub-this-week-digest";
import { listPublicEventsForChennaiHub } from "@/domains/events";
import { getSiteUrl } from "@/lib/env";
import { buildHubCardFromDb } from "@/lib/events/event-hub-helpers";
import { buildEventsHubJsonLdGraph } from "@/lib/seo/events-hub-jsonld";
import { CHENNAI_GEO_META } from "@/lib/seo/chennai-geo-meta";
import { CHENNAI_JOBS_HUB_PATH } from "@/lib/routes/chennai-jobs";
import { fullSiteTitle } from "@/lib/seo/site-titles";

const canonicalPath = "/chennai-local-events";
const hubTitleSegment =
  "Chennai events this week — concerts, comedy & markets";

export async function generateMetadata(): Promise<Metadata> {
  const base = getSiteUrl();
  const hubUrl = `${base}${canonicalPath}`;
  let count = 0;
  try {
    const rows = await listPublicEventsForChennaiHub(80);
    count = rows.length;
  } catch {
    count = 0;
  }

  const description =
    count > 0
      ? `${count} upcoming Chennai events — concerts, comedy, exhibitions, temple and neighbourhood listings across Mylapore, Adyar, OMR, Porur, T Nagar and Greater Chennai. Free to browse; confirm tickets with the organiser.`
      : "Chennai events calendar: live music, stand-up comedy, exhibitions, and meetups across Greater Chennai. Free to browse on mychennaicity.in — confirm tickets with each organiser.";

  return {
    title: hubTitleSegment,
    description,
    alternates: {
      canonical: hubUrl,
      types: {
        "application/rss+xml": `${hubUrl}/feed.xml`,
      },
    },
    openGraph: {
      title: fullSiteTitle(hubTitleSegment),
      description:
        count > 0
          ? `${count} upcoming Chennai listings — concerts, comedy, markets and meetups with venue and date.`
          : "What's on in Chennai — concerts, comedy nights, shopping festivals, and tech meetups across the city.",
      url: hubUrl,
      images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullSiteTitle(hubTitleSegment),
      description:
        count > 0
          ? `${count} Chennai events listed — venue, time, and booking links.`
          : "Chennai concerts, comedy, exhibitions, and meetups — updated listings with venue and booking links.",
      images: ["/twitter-image"],
    },
    other: { ...CHENNAI_GEO_META },
  };
}

export const dynamic = "force-dynamic";

export default async function ChennaiLocalEventsPage() {
  let dbEvents: Awaited<ReturnType<typeof listPublicEventsForChennaiHub>> = [];
  try {
    dbEvents = await listPublicEventsForChennaiHub(80);
  } catch {
    dbEvents = [];
  }
  const useDb = dbEvents.length > 0;
  const hubLd = buildEventsHubJsonLdGraph(dbEvents);
  const hubCards = dbEvents.map(buildHubCardFromDb);
  const nextEvents = dbEvents.slice(0, 5);

  return (
    <div className={interiorMainClassName}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(hubLd) }}
      />
      <a href="#browse-events" className="mcc-skip-to-events">
        Skip to event listings
      </a>
      <PageBreadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Chennai local events" },
        ]}
      />

      <EventsHubHero eventCount={dbEvents.length} nextEvents={nextEvents} />

      {useDb ? (
        <EventsHubListing cards={hubCards} />
      ) : (
        <div
          id="browse-events"
          className="mt-8 scroll-mt-28 rounded-2xl border border-dashed border-[var(--border)] bg-[var(--surface)] px-5 py-8 text-sm text-[var(--muted)]"
        >
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

      <EventsHubThisWeekDigest events={dbEvents} />

      <EventsHubAeoStrip eventCount={dbEvents.length} />

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
            Egmore, Island, and OMR venues fill fast on weekends — consider Metro
            Rail last mile or app cabs from interchange stations.
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
        <p className="mt-4 text-sm text-[var(--muted)]">
          Area guides:{" "}
          <Link
            href="/areas/adyar-thiruvanmiyur"
            className="font-medium text-[var(--accent)] underline-offset-4 hover:underline"
          >
            Adyar–Thiruvanmiyur
          </Link>
          {" · "}
          <Link
            href="/areas/kodambakkam-t-nagar"
            className="font-medium text-[var(--accent)] underline-offset-4 hover:underline"
          >
            Kodambakkam–T. Nagar
          </Link>
        </p>
      </Section>

      <div className="mt-12 flex justify-center">
        <AdSlot slotId="events-index-top" size="728x90" />
      </div>

      <div className="mt-8">
        <WhatsAppCommunityCta variant="compact" utmContent="events-hub" />
      </div>

      <AdvertisePanel variant="events" layout="section" className="mt-8" />

      <HubCommunityStrip businessVariant="events" />

      <div className="mt-10 flex justify-center">
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
