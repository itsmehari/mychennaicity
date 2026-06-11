"use client";

import { useMemo, useState } from "react";
import { EventHubCard } from "@/components/events/event-hub-card";
import {
  EVENT_HUB_CATEGORIES,
  type EventHubCardData,
  type EventHubCategoryId,
  groupHubCards,
} from "@/lib/events/event-hub-helpers";

function EventCardRail({
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
      </h2>
      <div className="mcc-events-hub-rail" role="list">
        {cards.map((card) => (
          <div key={card.id} className="mcc-events-hub-rail__item" role="listitem">
            <EventHubCard card={card} />
          </div>
        ))}
      </div>
    </section>
  );
}

export function EventsHubListing({ cards }: { cards: EventHubCardData[] }) {
  const [activeCategory, setActiveCategory] = useState<EventHubCategoryId>("all");

  const filtered = useMemo(() => {
    if (activeCategory === "all") return cards;
    return cards.filter((c) => c.tags.includes(activeCategory));
  }, [cards, activeCategory]);

  const { featured, upcoming } = useMemo(
    () => groupHubCards(filtered),
    [filtered],
  );

  const showFeaturedSection =
    activeCategory === "all" && featured.length > 0 && upcoming.length > 0;

  return (
    <div className="mcc-events-hub-listing mt-10">
      <nav
        className="mcc-events-hub-categories"
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

      {filtered.length === 0 ? (
        <p className="mt-8 text-sm leading-relaxed text-[var(--muted)]">
          No events in this category right now. Try another filter or check back
          soon.
        </p>
      ) : showFeaturedSection ? (
        <>
          <EventCardRail
            cards={featured}
            label="Featured"
            labelledBy="events-hub-featured"
          />
          <EventCardRail
            cards={upcoming}
            label="Coming up in Chennai"
            labelledBy="events-hub-upcoming"
          />
        </>
      ) : (
        <EventCardRail
          cards={filtered}
          label={
            activeCategory === "all"
              ? "Coming up in Chennai"
              : EVENT_HUB_CATEGORIES.find((c) => c.id === activeCategory)?.label ??
                "Events"
          }
          labelledBy="events-hub-main"
        />
      )}

      <p className="mcc-events-hub-footnote mt-6 text-xs leading-relaxed text-[var(--muted)]">
        Swipe sideways on your phone to browse rows. Confirm date, venue, and
        tickets on the organiser page before you travel.
      </p>
    </div>
  );
}
