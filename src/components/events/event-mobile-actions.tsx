"use client";

import type { PublicEventRow } from "@/domains/events";
import { WhatsAppDeskButton } from "@/components/contact/whatsapp-desk-button";
import {
  eventEnquireDesk,
  buildGoogleCalendarUrl,
  buildMapsSearchUrl,
  plainEventShareText,
} from "@/lib/events/event-detail-helpers";
import { EventShareButton } from "@/components/events/event-share-button";

export function EventMobileActions({ ev }: { ev: PublicEventRow }) {
  const enquire = eventEnquireDesk();
  const mapsUrl = buildMapsSearchUrl(ev);
  const calendarUrl = buildGoogleCalendarUrl(ev);
  const shareText = plainEventShareText(ev);

  const primaryLabel = "Contact / enquire";

  return (
    <div
      className="mcc-event-mobile-actions lg:hidden"
      role="toolbar"
      aria-label="Event actions"
    >
      <WhatsAppDeskButton
        text={enquire.text}
        source={enquire.source}
        className="mcc-event-btn mcc-event-btn--primary"
      >
        {primaryLabel}
      </WhatsAppDeskButton>
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
