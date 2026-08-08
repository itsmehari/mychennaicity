import Link from "next/link";
import type { PublicEventRow } from "@/domains/events";
import { AeoAnswerBlock } from "@/components/seo/aeo-answer-block";
import { CHENNAI_EVENTS_HUB_AEO } from "@/content/aeo/hub-answers";
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
 * Plain-text “this week / upcoming” digest AI systems can cite,
 * plus the shared events hub AEO answer block.
 */
export function EventsHubThisWeekDigest({ events }: Props) {
  const slice = events.slice(0, 7);

  return (
    <div className="mt-10 space-y-8">
      <AeoAnswerBlock content={CHENNAI_EVENTS_HUB_AEO} />

      <section
        id="events-this-week"
        className="mcc-events-digest"
        aria-labelledby="events-this-week-heading"
      >
        <h2
          id="events-this-week-heading"
          className="type-display text-2xl text-[var(--foreground)] sm:text-3xl"
        >
          Upcoming in Chennai
        </h2>
        <p className="type-lede mt-2 max-w-2xl text-sm text-[var(--muted)]">
          Next listings from our calendar — date, venue and locality in plain
          text. Confirm with the organiser before you travel.
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
    </div>
  );
}
