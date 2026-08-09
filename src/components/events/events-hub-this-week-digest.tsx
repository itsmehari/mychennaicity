import Link from "next/link";
import type { PublicEventRow } from "@/domains/events";
import { formatIndiaLongDate } from "@/lib/presentation-dates";

function formatEventWhen(startsAt: Date, allDay: boolean): string {
  if (allDay) {
    return formatIndiaLongDate(startsAt);
  }
  return startsAt.toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZone: "Asia/Kolkata",
  });
}

type Props = {
  events: PublicEventRow[];
};

/**
 * Crawlable plain-text digest of upcoming events (full list slice).
 * Lives below the visual grid so AI/search can cite a simple ordered list
 * without pushing the browse UI below the fold.
 */
export function EventsHubThisWeekDigest({ events }: Props) {
  const slice = events.slice(0, 12);

  return (
    <section
      id="events-this-week"
      className="mcc-events-digest mt-12 scroll-mt-28"
      aria-labelledby="events-this-week-heading"
    >
      <h2
        id="events-this-week-heading"
        className="type-display text-2xl text-[var(--foreground)] sm:text-3xl"
      >
        Upcoming in Chennai — plain list
      </h2>
      <p className="type-lede mt-2 max-w-2xl text-sm text-[var(--muted)]">
        Same calendar as the cards above, in plain text for quick scanning and
        citation. Confirm with the organiser before you travel.
      </p>

      {slice.length === 0 ? (
        <p className="mt-4 text-sm text-[var(--muted)]">
          No upcoming events are listed right now.{" "}
          <Link
            href="/contact#events"
            className="font-semibold text-[var(--accent)] underline-offset-4 hover:underline"
          >
            Submit an event
          </Link>
          .
        </p>
      ) : (
        <ol className="mcc-events-digest__list">
          {slice.map((e, i) => (
            <li key={e.id} className="mcc-events-digest__item">
              <span className="mcc-events-digest__n" aria-hidden>
                {i + 1}.
              </span>
              <div>
                <Link
                  href={`/chennai-local-events/${e.slug}`}
                  className="mcc-events-digest__title"
                >
                  {e.title}
                </Link>
                <p className="mcc-events-digest__meta">
                  {formatEventWhen(e.startsAt, e.allDay)}
                  {e.venueName ? ` · ${e.venueName}` : ""}
                  {e.localityLabel ? ` · ${e.localityLabel}` : ""}
                </p>
              </div>
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}
