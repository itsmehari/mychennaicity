import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/home/section";
import {
  InteriorCrossNav,
  PageBreadcrumbs,
  interiorMainClassName,
} from "@/components/site/interior-chrome";
import { listPublicEventsForChennaiHub } from "@/domains/events";
import { getSiteUrl } from "@/lib/env";
import { homeStats, mockEvents } from "@/lib/home-mock";
import { buildEventsHubJsonLd } from "@/lib/seo/events-hub-jsonld";
import { CHENNAI_JOBS_HUB_PATH } from "@/lib/routes/chennai-jobs";
import { formatIndiaLongDate } from "@/lib/presentation-dates";
import { fullSiteTitle } from "@/lib/seo/site-titles";

const canonicalPath = "/chennai-local-events";

const titleSegment = "Chennai events calendar — what’s on";

export const metadata: Metadata = {
  title: titleSegment,
  description:
    "Chennai local events: temple festivals, neighbourhood meetups, culture, and civic dates across the city and suburbs. See what is on and plan your week.",
  alternates: { canonical: `${getSiteUrl()}${canonicalPath}` },
  openGraph: {
    title: fullSiteTitle(titleSegment),
    description:
      "Festivals, meetups, and civic dates for Chennai — from the core city to OMR and suburbs.",
    url: `${getSiteUrl()}${canonicalPath}`,
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: fullSiteTitle(titleSegment),
    description:
      "Temple festivals, culture, meetups, and civic dates across Chennai and nearby.",
    images: ["/twitter-image"],
  },
};

export const dynamic = "force-dynamic";

function formatEventWhen(startsAt: Date, endsAt: Date | null, allDay: boolean) {
  const opts: Intl.DateTimeFormatOptions = allDay
    ? { dateStyle: "medium", timeZone: "Asia/Kolkata" }
    : { dateStyle: "medium", timeStyle: "short", timeZone: "Asia/Kolkata" };
  const a = startsAt.toLocaleString("en-IN", opts);
  if (!endsAt || +endsAt === +startsAt) return a;
  return `${a} – ${endsAt.toLocaleString("en-IN", opts)}`;
}

export default async function ChennaiLocalEventsPage() {
  let dbEvents: Awaited<ReturnType<typeof listPublicEventsForChennaiHub>> = [];
  const sampleAsOf = formatIndiaLongDate();
  try {
    dbEvents = await listPublicEventsForChennaiHub(40);
  } catch {
    dbEvents = [];
  }
  const useDb = dbEvents.length > 0;
  const hubLd = useDb ? buildEventsHubJsonLd(dbEvents) : null;

  return (
    <div className={interiorMainClassName}>
      {hubLd ? (
        <>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(hubLd.collectionPage),
            }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(hubLd.itemList) }}
          />
        </>
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
            Below is a{" "}
            <strong className="font-medium text-[var(--foreground)]">
              sample list ({sampleAsOf})
            </strong>
            — illustrative only; confirm dates, venue gates, and tickets on the
            organiser or ticket site before you travel.
          </>
        )}
      </p>

      <div className="mt-8 flex flex-wrap gap-3">
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3 shadow-sm">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--accent-warm)]">
            This week on the home page
          </p>
          <p className="mt-1 text-lg font-semibold text-[var(--foreground)]">
            {homeStats.eventsWeek} picks
          </p>
          <p className="text-xs text-[var(--muted)]">
            Rotating spotlight — not an exhaustive city calendar
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

      <ul className="mt-10 space-y-4">
        {useDb
          ? dbEvents.map((e) => (
              <li
                key={e.id}
                className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-5 py-4 shadow-sm"
              >
                <Link
                  href={`/chennai-local-events/${e.slug}`}
                  className="block text-[var(--foreground)] transition hover:text-[var(--accent)]"
                >
                  <span className="text-sm font-semibold">{e.title}</span>
                  <span className="mt-1 block text-xs text-[var(--muted)]">
                    {formatEventWhen(e.startsAt, e.endsAt, e.allDay)}
                    {e.venueName ? ` · ${e.venueName}` : null}
                    {e.localityLabel ? ` · ${e.localityLabel}` : null}
                    {" · "}
                    Full detail on site
                  </span>
                </Link>
              </li>
            ))
          : mockEvents.map((e) => (
              <li
                key={`${e.href}-${e.title}`}
                className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-5 py-4 shadow-sm"
              >
                {e.external ? (
                  <a
                    href={e.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-[var(--foreground)] transition hover:text-[var(--accent)]"
                  >
                    <span className="text-sm font-semibold">{e.title}</span>
                    <span className="mt-1 block text-xs text-[var(--muted)]">
                      {e.when} · {e.where} · opens in new tab
                    </span>
                  </a>
                ) : (
                  <div className="text-[var(--foreground)]">
                    <span className="text-sm font-semibold">{e.title}</span>
                    <span className="mt-1 block text-xs text-[var(--muted)]">
                      {e.when} · {e.where}
                    </span>
                  </div>
                )}
              </li>
            ))}
      </ul>

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
            Organisers will soon list free and paid events directly — follow{" "}
            <Link
              href="/directory"
              className="font-medium text-[var(--accent)] underline-offset-4 hover:underline"
            >
              Directory
            </Link>{" "}
            for the submission launch post.
          </li>
        </ul>
      </Section>

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
