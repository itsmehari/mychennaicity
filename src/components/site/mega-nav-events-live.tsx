"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { EventsNavPreviewResponse } from "@/lib/events/nav-preview-types";

type Props = {
  onNavigate?: () => void;
  compact?: boolean;
};

/**
 * Live “Next up” rail for the Local events megamenu.
 * Fetches `/api/events/nav-preview` so the panel stays current without a full page rebuild.
 */
export function MegaNavEventsLive({ onNavigate, compact = false }: Props) {
  const [data, setData] = useState<EventsNavPreviewResponse | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const ctrl = new AbortController();

    fetch("/api/events/nav-preview", { signal: ctrl.signal })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error("bad status"))))
      .then((json: EventsNavPreviewResponse) => {
        if (!cancelled) setData(json);
      })
      .catch(() => {
        if (!cancelled) setFailed(true);
      });

    return () => {
      cancelled = true;
      ctrl.abort();
    };
  }, []);

  return (
    <div
      className={`mega-nav-events-live${compact ? " mega-nav-events-live--compact" : ""}`}
    >
      <div className="mega-nav-events-live__head">
        <div>
          <p className="mega-nav-events-live__eyebrow">Live calendar</p>
          <p className="mega-nav-events-live__title">Next up in Chennai</p>
        </div>
        <p className="mega-nav-events-live__count" aria-live="polite">
          {data ? (
            <>
              <strong>{data.count}</strong> upcoming
            </>
          ) : failed ? (
            "—"
          ) : (
            <span className="mega-nav-events-live__pulse">Updating…</span>
          )}
        </p>
      </div>

      {data && data.upcoming.length > 0 ? (
        <ol className="mega-nav-events-live__list">
          {data.upcoming.slice(0, compact ? 4 : 5).map((e, i) => (
            <li key={e.slug}>
              <Link
                href={e.href}
                onClick={onNavigate}
                className="mega-nav-events-live__item"
              >
                <span className="mega-nav-events-live__n" aria-hidden>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="mega-nav-events-live__body">
                  <span className="mega-nav-events-live__when">{e.dateBadge}</span>
                  <span className="mega-nav-events-live__name">{e.title}</span>
                  <span className="mega-nav-events-live__venue">{e.venueLine}</span>
                </span>
              </Link>
            </li>
          ))}
        </ol>
      ) : (
        <p className="mega-nav-events-live__empty">
          {failed
            ? "Couldn’t load live listings — open the full calendar."
            : "Loading upcoming events…"}
        </p>
      )}

      <Link
        href="/chennai-local-events#browse-events"
        onClick={onNavigate}
        className="mega-nav-events-live__cta"
      >
        Browse all listings
      </Link>
    </div>
  );
}
