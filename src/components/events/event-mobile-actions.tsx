"use client";

import type { PublicEventRow } from "@/domains/events";
import {
  buildEventEnquireHref,
  buildGoogleCalendarUrl,
  buildMapsSearchUrl,
  plainEventShareText,
} from "@/lib/events/event-detail-helpers";
import { EventShareButton } from "@/components/events/event-share-button";

export function EventMobileActions({ ev }: { ev: PublicEventRow }) {
  const enquireHref = buildEventEnquireHref();
  const mapsUrl = buildMapsSearchUrl(ev);
  const calendarUrl = buildGoogleCalendarUrl(ev);
  const shareText = plainEventShareText(ev);

  const primaryHref = enquireHref;
  const primaryLabel = "Contact / enquire";

  return (
    <div
      className="mcc-event-mobile-actions lg:hidden"
      role="toolbar"
      aria-label="Event actions"
    >
      <a href={primaryHref} className="mcc-event-btn mcc-event-btn--primary">
        {primaryLabel}
      </a>
      <EventShareButton
        title={ev.title}
        text={shareText}
        className="mcc-event-btn mcc-event-btn--outline"
      />
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
    </div>
  );
}
