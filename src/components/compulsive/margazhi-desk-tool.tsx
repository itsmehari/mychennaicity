"use client";

import { useMemo, useState } from "react";
import { CopyShareButton } from "@/components/compulsive/copy-share-button";
import {
  isMargazhiSeason,
  MARGAZHI_HOW_TO,
  MARGAZHI_IN_SEASON_MESSAGE,
  MARGAZHI_OFF_SEASON_MESSAGE,
  MARGAZHI_SEASON_PACK,
} from "@/content/compulsive/margazhi-desk";
import { compulsivePath } from "@/content/compulsive/index";
import { CHENNAI_FESTIVALS_GUIDE_PATH } from "@/content/guides/chennai-festivals-calendar";
import { getSiteUrl } from "@/lib/env";
import Link from "next/link";

export function MargazhiDeskTool() {
  const [now] = useState(() => new Date());
  const inSeason = useMemo(() => isMargazhiSeason(now), [now]);
  const path = compulsivePath("margazhi");

  return (
    <div className="not-prose space-y-4 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 sm:p-5">
      <div
        className={`rounded-xl border p-3 ${
          inSeason
            ? "border-[var(--accent)] bg-[color-mix(in_srgb,var(--accent)_10%,transparent)]"
            : "border-[var(--border)] bg-[var(--background)]"
        }`}
      >
        <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--accent)]">
          {inSeason ? "In season (approx.)" : "Off season"}
        </p>
        <p className="mt-1 text-sm text-[var(--foreground)]">
          {inSeason ? MARGAZHI_IN_SEASON_MESSAGE : MARGAZHI_OFF_SEASON_MESSAGE}
        </p>
        <p className="mt-2 text-xs text-[var(--muted)]">
          Practical window: ~15 Dec–15 Jan IST. Sabha calendars can differ — verify live.
        </p>
      </div>

      <div className="flex flex-wrap gap-3 text-xs">
        <Link
          href="/chennai-local-events"
          className="font-semibold text-[var(--accent)] underline-offset-2 hover:underline"
        >
          Chennai local events
        </Link>
        <Link
          href={CHENNAI_FESTIVALS_GUIDE_PATH}
          className="font-semibold text-[var(--accent)] underline-offset-2 hover:underline"
        >
          Festivals calendar
        </Link>
      </div>

      <section className="space-y-3">
        <h3 className="text-sm font-bold text-[var(--foreground)]">Evergreen how-to</h3>
        <ol className="space-y-3">
          {MARGAZHI_HOW_TO.map((step, i) => (
            <li
              key={step.id}
              className="rounded-xl border border-[var(--border)] bg-[var(--background)] px-3 py-3"
            >
              <p className="text-sm font-bold text-[var(--foreground)]">
                {i + 1}. {step.title}
              </p>
              <p className="mt-1 text-sm text-[var(--muted)]">{step.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="space-y-3">
        <h3 className="text-sm font-bold text-[var(--foreground)]">Seasonal pack checklist</h3>
        <p className="text-xs text-[var(--muted)]">
          Use whenever December approaches — useful off-season as a planning bookmark.
        </p>
        <ul className="space-y-2">
          {MARGAZHI_SEASON_PACK.map((item) => (
            <li
              key={item.id}
              className="rounded-xl border border-[var(--border)] bg-[var(--background)] px-3 py-3"
            >
              <p className="text-sm font-semibold text-[var(--foreground)]">{item.label}</p>
              <p className="mt-1 text-xs text-[var(--muted)]">{item.hint}</p>
            </li>
          ))}
        </ul>
      </section>

      <CopyShareButton
        buildText={() =>
          inSeason
            ? `Margazhi kutcheri desk (in season) — how-to + seasonal pack on mychennaicity.in ${getSiteUrl()}${path}`
            : `Margazhi kutcheri desk (off season right now) — evergreen how-to for Music Season: ${getSiteUrl()}${path}`
        }
      />
    </div>
  );
}
