import Link from "next/link";
import type { PublicEventRow } from "@/domains/events";
import {
  buildEventDetailRows,
  buildEventEnquireHref,
  buildGoogleCalendarUrl,
  buildMapsSearchUrl,
  EVENT_POST_SUBMIT_PATH,
  extractOrganizerFromDescription,
  formatEventDate,
  formatEventTime,
  getEventAudienceTags,
  getEventCategoryLabel,
} from "@/lib/events/event-detail-helpers";
import { EventShareButton } from "@/components/events/event-share-button";

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="mcc-event-summary-row">
      <dt className="text-sm font-medium text-[var(--muted)]">{label}</dt>
      <dd className="text-sm font-semibold leading-snug text-[var(--foreground)]">
        {value}
      </dd>
    </div>
  );
}

export function EventSummaryCard({ ev }: { ev: PublicEventRow }) {
  const date = formatEventDate(ev.startsAt, ev.endsAt, ev.allDay);
  const time = formatEventTime(ev.startsAt, ev.endsAt, ev.allDay);
  const organizer = extractOrganizerFromDescription(ev.description);
  const category = getEventCategoryLabel(ev.presentationKey);

  const rows: { label: string; value: string }[] = [];
  if (date) rows.push({ label: "Date", value: date });
  if (time) rows.push({ label: "Time", value: time });
  if (ev.venueName?.trim()) rows.push({ label: "Venue", value: ev.venueName.trim() });
  if (ev.localityLabel?.trim()) rows.push({ label: "Area", value: ev.localityLabel.trim() });
  if (organizer) rows.push({ label: "Organiser", value: organizer });
  if (category) rows.push({ label: "Type", value: category });

  if (rows.length === 0) return null;

  return (
    <section
      className="mcc-event-summary-card mt-6"
      aria-label="Event summary"
    >
      <h2 className="sr-only">Quick details</h2>
      <dl>
        {rows.map((r) => (
          <SummaryRow key={r.label} label={r.label} value={r.value} />
        ))}
      </dl>
    </section>
  );
}

export function EventLocationCard({ ev }: { ev: PublicEventRow }) {
  const mapsUrl = buildMapsSearchUrl(ev);
  const address = ev.venueAddress?.trim();
  const venue = ev.venueName?.trim();
  if (!address && !venue && !mapsUrl) return null;

  return (
    <section className="mcc-event-location-card mt-6" aria-label="Location">
      <h2 className="text-sm font-semibold text-[var(--foreground)]">Location</h2>
      {venue ? (
        <p className="mt-2 text-sm font-semibold text-[var(--foreground)]">{venue}</p>
      ) : null}
      {address ? (
        <p className="mt-1 text-sm leading-relaxed text-[var(--muted)]">{address}</p>
      ) : null}
      {ev.localityLabel?.trim() && !address ? (
        <p className="mt-1 text-sm text-[var(--muted)]">{ev.localityLabel.trim()}</p>
      ) : null}
      {mapsUrl ? (
        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mcc-event-btn mcc-event-btn--outline mt-4 inline-flex"
        >
          Open in Google Maps
        </a>
      ) : null}
    </section>
  );
}

export function EventDetailsTable({ ev }: { ev: PublicEventRow }) {
  const rows = buildEventDetailRows(ev);
  if (rows.length === 0) return null;

  return (
    <section className="mt-10" aria-labelledby="event-details-heading">
      <h2
        id="event-details-heading"
        className="text-lg font-semibold text-[var(--foreground)]"
      >
        Event details
      </h2>
      <div className="mt-4 overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-sm">
        <table className="mcc-event-details-table w-full text-left text-sm">
          <tbody>
            {rows.map((r) => (
              <tr key={r.label}>
                <th
                  scope="row"
                  className="px-4 py-3.5 font-medium text-[var(--muted)] sm:w-[10rem]"
                >
                  {r.label}
                </th>
                <td className="px-4 py-3.5 font-semibold text-[var(--foreground)]">
                  {r.value}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export function EventAudienceBlock({ ev }: { ev: PublicEventRow }) {
  const tags = getEventAudienceTags(ev);
  if (tags.length === 0) return null;

  return (
    <section
      className="mt-10 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 sm:p-6"
      aria-labelledby="event-audience-heading"
    >
      <h2
        id="event-audience-heading"
        className="text-lg font-semibold text-[var(--foreground)]"
      >
        Who this event is useful for
      </h2>
      <ul className="mt-4 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <li key={tag}>
            <span className="inline-flex rounded-full border border-[color-mix(in_srgb,var(--accent)_25%,var(--border))] bg-[color-mix(in_srgb,var(--accent)_6%,var(--surface))] px-3 py-1.5 text-xs font-semibold text-[var(--foreground)]">
              {tag}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function EventPostCta({ className = "" }: { className?: string }) {
  return (
    <aside
      className={`mcc-event-cta-card ${className}`.trim()}
      aria-labelledby="event-post-cta-heading"
    >
      <h2
        id="event-post-cta-heading"
        className="text-base font-semibold text-[var(--foreground)]"
      >
        Post your Chennai event for free
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
        mychennaicity.in helps Chennai event organisers, entrepreneurs, small
        businesses, trainers, communities, schools, colleges, startups, and local
        groups publish events and reach people across the city.
      </p>
      {/* TODO: dedicated /chennai-local-events/submit route when public submission form ships */}
      <Link href={EVENT_POST_SUBMIT_PATH} className="mcc-event-btn mcc-event-btn--primary mt-4 inline-flex">
        Post your event
      </Link>
    </aside>
  );
}

export function EventHostingCta({ className = "" }: { className?: string }) {
  return (
    <aside
      className={`mcc-event-cta-card mcc-event-cta-card--hosting ${className}`.trim()}
      aria-labelledby="event-hosting-cta-heading"
    >
      <h2
        id="event-hosting-cta-heading"
        className="text-base font-semibold text-[var(--foreground)]"
      >
        Hosting an event in Chennai?
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
        Post your event on mychennaicity.in and reach Chennai residents,
        entrepreneurs, businesses, students, professionals, and local
        communities.
      </p>
      <Link href={EVENT_POST_SUBMIT_PATH} className="mcc-event-btn mcc-event-btn--primary mt-4 inline-flex">
        Post your event
      </Link>
    </aside>
  );
}

export function EventDesktopSidebar({ ev }: { ev: PublicEventRow }) {
  const mapsUrl = buildMapsSearchUrl(ev);
  const calendarUrl = buildGoogleCalendarUrl(ev);
  const enquireHref = buildEventEnquireHref();

  return (
    <aside
      className="mcc-event-desktop-sidebar hidden lg:block"
      aria-label="Event actions"
    >
      <div className="sticky top-24 flex flex-col gap-4">
        <EventSummaryCard ev={ev} />
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-sm">
          <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--accent)]">
            Quick actions
          </p>
          <div className="mt-4 flex flex-col gap-2.5">
            <a href={enquireHref} className="mcc-event-btn mcc-event-btn--primary">
              Contact / enquire
            </a>
            {mapsUrl ? (
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mcc-event-btn mcc-event-btn--outline"
              >
                Get directions
              </a>
            ) : null}
            {calendarUrl ? (
              <a
                href={calendarUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mcc-event-btn mcc-event-btn--outline"
              >
                Add to calendar
              </a>
            ) : null}
            <EventShareButton
              title={ev.title}
              text={ev.title}
              className="mcc-event-btn mcc-event-btn--outline w-full"
            />
          </div>
        </div>
        <EventPostCta />
      </div>
    </aside>
  );
}
