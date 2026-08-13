"use client";

import { useMemo, useState } from "react";
import { CopyShareButton } from "@/components/compulsive/copy-share-button";
import {
  FILTER_COFFEE_CORRIDORS,
  FILTER_COFFEE_SPOTS,
  type CoffeeCorridor,
} from "@/content/compulsive/filter-coffee";
import { compulsivePath } from "@/content/compulsive/index";
import { getSiteUrl } from "@/lib/env";

export function FilterCoffeeMap() {
  const [corridor, setCorridor] = useState<CoffeeCorridor | "all">("all");
  const path = compulsivePath("filter-coffee");

  const visible = useMemo(
    () =>
      FILTER_COFFEE_SPOTS.filter((spot) =>
        corridor === "all" ? true : spot.corridor === corridor,
      ),
    [corridor],
  );

  return (
    <div className="not-prose space-y-4 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 sm:p-5">
      <p className="text-sm text-[var(--muted)]">
        Editorial corridor map — filter by neighbourhood feel. No star ratings, no paid
        “#1 coffee” crowns.
      </p>

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setCorridor("all")}
          className={`rounded-full px-3 py-1.5 text-xs font-bold ${
            corridor === "all"
              ? "bg-[var(--accent)] text-[var(--accent-fg)]"
              : "border border-[var(--border)] text-[var(--foreground)]"
          }`}
        >
          All corridors
        </button>
        {FILTER_COFFEE_CORRIDORS.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setCorridor(c)}
            className={`rounded-full px-3 py-1.5 text-xs font-bold ${
              corridor === c
                ? "bg-[var(--accent)] text-[var(--accent-fg)]"
                : "border border-[var(--border)] text-[var(--foreground)]"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <p className="text-xs text-[var(--muted)]">
        Showing {visible.length} of {FILTER_COFFEE_SPOTS.length} spots
        {corridor !== "all" ? ` · ${corridor}` : ""}
      </p>

      <ul className="space-y-3">
        {visible.map((spot) => (
          <li
            key={spot.id}
            className="rounded-xl border border-[var(--border)] bg-[var(--background)] px-3 py-3"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <p className="text-sm font-bold text-[var(--foreground)]">{spot.name}</p>
              <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--accent)]">
                {spot.corridor}
              </span>
            </div>
            <p className="mt-1 text-xs text-[var(--muted)]">{spot.landmark}</p>
            <p className="mt-2 text-sm text-[var(--foreground)]">{spot.vibe}</p>
            <p className="mt-1 text-xs text-[var(--muted)]">{spot.note}</p>
          </li>
        ))}
      </ul>

      <CopyShareButton
        buildText={() =>
          corridor === "all"
            ? `Chennai filter coffee map — ${FILTER_COFFEE_SPOTS.length} editorial corridor spots on mychennaicity.in ${getSiteUrl()}${path}`
            : `Chennai filter coffee · ${corridor} — ${visible.length} editorial picks: ${getSiteUrl()}${path}`
        }
      />
    </div>
  );
}
