import Link from "next/link";
import type { PublicEventRow } from "@/domains/events";
import { formatIndiaLongDate } from "@/lib/presentation-dates";

function formatEventWhen(startsAt: Date, allDay: boolean): string {
  if (allDay) return formatIndiaLongDate(startsAt);
  return startsAt.toLocaleString("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "2-digit",
    timeZone: "Asia/Kolkata",
  });
}

type Props = {
  eventCount: number;
  nextEvents: PublicEventRow[];
};

/**
 * Above-the-fold events hub: answer-first lede, jump links, and next listings.
 * Keeps tickets/ads/promos out of the first screen so humans and crawlers hit the calendar.
 */
export function EventsHubHero({ eventCount, nextEvents }: Props) {
  const hasEvents = eventCount > 0;

  return (
    <header className="mcc-events-hub-hero" aria-labelledby="events-hub-title">
      <div className="mcc-events-hub-hero__top">
        <div className="mcc-events-hub-hero__copy">
          <p className="type-eyebrow text-[var(--accent-warm)]">
            Chennai local events
          </p>
          <h1
            id="events-hub-title"
            className="mcc-events-hub-hero__title"
            data-speakable="events-hub-title"
          >
            What&apos;s on in Chennai
          </h1>
          <p
            className="mcc-events-hub-hero__lede"
            data-speakable="events-hub-lede"
          >
            Concerts, comedy, exhibitions, temple utsavams, and neighbourhood
            gatherings across Greater Chennai — date, venue, and booking links in
            one calendar.
          </p>

          <p
            className="mcc-events-hub-hero__answer"
            data-speakable="hub-aeo-answer"
          >
            <span className="mcc-events-hub-hero__answer-label">
              Direct answer
            </span>
            {hasEvents
              ? ` mychennaicity.in/chennai-local-events currently lists ${eventCount} upcoming event${eventCount === 1 ? "" : "s"}. Browsing is free; tickets stay with each organiser — confirm on their page before you pay or travel.`
              : " mychennaicity.in/chennai-local-events lists upcoming Chennai concerts, comedy, exhibitions, and meetups when organisers share dates. Browsing is free; we are not the ticket seller."}
          </p>

          <nav className="mcc-events-hub-hero__jumps" aria-label="On this page">
            <a href="#browse-events" className="mcc-events-hub-hero__jump is-primary">
              Browse listings
            </a>
            <a href="#events-next-up" className="mcc-events-hub-hero__jump">
              Next up
            </a>
            <a href="#events-hub-faq" className="mcc-events-hub-hero__jump">
              FAQ
            </a>
            <Link href="/contact#events" className="mcc-events-hub-hero__jump">
              Submit an event
            </Link>
            <a href="/chennai-local-events/feed.xml" className="mcc-events-hub-hero__jump">
              RSS
            </a>
          </nav>

          <dl className="mcc-events-hub-hero__stats">
            <div>
              <dt>Upcoming</dt>
              <dd>{hasEvents ? eventCount : "—"}</dd>
            </div>
            <div>
              <dt>Browse</dt>
              <dd>Free</dd>
            </div>
            <div>
              <dt>Tickets</dt>
              <dd>Via organiser</dd>
            </div>
            <div>
              <dt>Coverage</dt>
              <dd>Greater Chennai</dd>
            </div>
          </dl>
        </div>

        <aside
          id="events-next-up"
          className="mcc-events-hub-hero__next"
          aria-labelledby="events-next-up-heading"
        >
          <div className="mcc-events-hub-hero__next-head">
            <h2 id="events-next-up-heading">Next up</h2>
            <a href="#browse-events" className="mcc-events-hub-hero__next-all">
              See all
            </a>
          </div>
          {nextEvents.length === 0 ? (
            <p className="mcc-events-hub-hero__next-empty">
              No upcoming listings yet.{" "}
              <Link href="/contact#events">Share a date and venue</Link>.
            </p>
          ) : (
            <ol className="mcc-events-hub-hero__next-list">
              {nextEvents.map((e, i) => (
                <li key={e.id}>
                  <span className="mcc-events-hub-hero__next-n" aria-hidden>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <Link
                      href={`/chennai-local-events/${e.slug}`}
                      className="mcc-events-hub-hero__next-title"
                    >
                      {e.title}
                    </Link>
                    <p className="mcc-events-hub-hero__next-meta">
                      {formatEventWhen(e.startsAt, e.allDay)}
                      {e.venueName ? ` · ${e.venueName}` : ""}
                      {e.localityLabel ? ` · ${e.localityLabel}` : ""}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          )}
        </aside>
      </div>
    </header>
  );
}
