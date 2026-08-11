"use client";

import { useEffect, useMemo, useState } from "react";
import { EventHubCard } from "@/components/events/event-hub-card";
import {
  EVENT_HUB_CATEGORIES,
  eventStartsThisWeekend,
  eventStartsToday,
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

function categoryFromHash(hash: string): EventHubCategoryId | null {
  const raw = hash.replace(/^#/, "").toLowerCase();
  if (raw === "events-today" || raw === "today") return "today";
  if (raw === "events-weekend" || raw === "weekend") return "weekend";
  const match = EVENT_HUB_CATEGORIES.find((c) => c.id === raw);
  return match?.id ?? null;
}

export function EventsHubListing({ cards }: { cards: EventHubCardData[] }) {
  const [activeCategory, setActiveCategory] = useState<EventHubCategoryId>("all");

  useEffect(() => {
    const apply = () => {
      const fromHash = categoryFromHash(window.location.hash);
      if (fromHash) setActiveCategory(fromHash);
    };
    apply();
    window.addEventListener("hashchange", apply);
    return () => window.removeEventListener("hashchange", apply);
  }, []);

  const sorted = useMemo(() => {
    let list = cards;
    if (activeCategory === "today") {
      list = cards.filter((c) => eventStartsToday(c));
    } else if (activeCategory === "weekend") {
      list = cards.filter((c) => eventStartsThisWeekend(c));
    } else if (activeCategory !== "all") {
      list = cards.filter((c) => c.tags.includes(activeCategory));
    }
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

  const selectCategory = (id: EventHubCategoryId) => {
    setActiveCategory(id);
    if (typeof window === "undefined") return;
    const hash =
      id === "today"
        ? "events-today"
        : id === "weekend"
          ? "events-weekend"
          : id === "all"
            ? "browse-events"
            : id;
    history.replaceState(null, "", `#${hash}`);
  };

  return (
    <div id="browse-events" className="mcc-events-hub-listing mt-8 scroll-mt-28">
      <div className="mcc-events-hub-listing__intro">
        <h2 className="mcc-events-hub-listing__heading">Browse Chennai events</h2>
        <p className="mcc-events-hub-listing__dek">
          Filter by <strong>Today</strong>, <strong>This weekend</strong>, or type —
          then open a card for venue, time, and booking notes. Confirm with the
          organiser before you travel.
        </p>
      </div>
      <nav
        className="mcc-events-hub-categories mcc-events-hub-categories--sticky"
        aria-label="Filter events by time or category"
        id="events-weekend"
      >
        <span id="events-today" className="sr-only">
          Today filter
        </span>
        {EVENT_HUB_CATEGORIES.map((cat) => {
          const active = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              className={`mcc-events-hub-categories__chip${active ? " is-active" : ""}`}
              aria-pressed={active}
              onClick={() => selectCategory(cat.id)}
            >
              {cat.label}
            </button>
          );
        })}
      </nav>

      {sorted.length === 0 ? (
        <p className="mt-8 text-sm leading-relaxed text-[var(--muted)]">
          {activeCategory === "today"
            ? "No listed events start today. Try This weekend or All."
            : activeCategory === "weekend"
              ? "No listed events this weekend yet. Try All or check back soon."
              : "No events in this category right now. Try another filter or check back soon."}
        </p>
      ) : (
        <EventCardGrid
          cards={sorted}
          label={sectionLabel}
          labelledBy="events-hub-main"
        />
      )}
    </div>
  );
}
