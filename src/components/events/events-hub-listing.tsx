"use client";

import { useMemo, useState } from "react";
import { EventHubCard } from "@/components/events/event-hub-card";
import {
  EVENT_HUB_CATEGORIES,
  type EventHubCardData,
  type EventHubCategoryId,
} from "@/lib/events/event-hub-helpers";

function EventCardGrid({
  cards,
  label,
  labelledBy,
}: {
  cards: EventHubCardData[];
  label: string;
  labelledBy: string;
}) {
  if (cards.length === 0) return null;

  return (
    <section className="mcc-events-hub-section" aria-labelledby={labelledBy}>
      <h2 id={labelledBy} className="mcc-events-hub-section__title">
        {label}
        <span className="mcc-events-hub-section__count">{cards.length}</span>
      </h2>
      <div className="mcc-events-hub-grid" role="list">
        {cards.map((card) => (
          <div key={card.id} className="mcc-events-hub-grid__item" role="listitem">
            <EventHubCard card={card} />
          </div>
        ))}
      </div>
    </section>
  );
}

export function EventsHubListing({ cards }: { cards: EventHubCardData[] }) {
  const [activeCategory, setActiveCategory] = useState<EventHubCategoryId>("all");

  const sorted = useMemo(() => {
    const list =
      activeCategory === "all"
        ? cards
        : cards.filter((c) => c.tags.includes(activeCategory));
    return [...list].sort((a, b) => {
      if (a.featured !== b.featured) return a.featured ? -1 : 1;
      return a.sortKey - b.sortKey;
    });
  }, [cards, activeCategory]);

  const sectionLabel =
    activeCategory === "all"
      ? "Chennai events — concerts, comedy, markets & meetups"
      : (EVENT_HUB_CATEGORIES.find((c) => c.id === activeCategory)?.label ??
        "Events");

  return (
    <div id="browse-events" className="mcc-events-hub-listing mt-8 scroll-mt-28">
      <div className="mcc-events-hub-listing__intro">
        <h2 className="mcc-events-hub-listing__heading">Browse Chennai events</h2>
        <p className="mcc-events-hub-listing__dek">
          Filter by type, then open a card for venue, time, and booking notes.
          Confirm with the organiser before you travel.
        </p>
      </div>
      <nav
        className="mcc-events-hub-categories mcc-events-hub-categories--sticky"
        aria-label="Filter events by category"
      >
        {EVENT_HUB_CATEGORIES.map((cat) => {
          const active = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              className={`mcc-events-hub-categories__chip${active ? " is-active" : ""}`}
              aria-pressed={active}
              onClick={() => setActiveCategory(cat.id)}
            >
              {cat.label}
            </button>
          );
        })}
      </nav>

      {sorted.length === 0 ? (
        <p className="mt-8 text-sm leading-relaxed text-[var(--muted)]">
          No events in this category right now. Try another filter or check back
          soon.
        </p>
      ) : (
        <EventCardGrid
          cards={sorted}
          label={sectionLabel}
          labelledBy="events-hub-main"
        />
      )}

      <p className="mcc-events-hub-footnote mt-6 text-xs leading-relaxed text-[var(--muted)]">
        Grid shows upcoming listings across Greater Chennai — OMR, central, and
        western suburbs. Confirm date, venue, and tickets on the organiser page
        before you travel.
      </p>
    </div>
  );
}
