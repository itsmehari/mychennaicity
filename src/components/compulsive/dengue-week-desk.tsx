"use client";

import { useState } from "react";
import { CopyShareButton } from "@/components/compulsive/copy-share-button";
import {
  DENGUE_CHECKLIST,
  DENGUE_GCC_NOTE,
  DENGUE_WEEK_PATH,
  DENGUE_ZONE_CARDS,
} from "@/content/compulsive/dengue-week";
import { trackCompulsiveEvent } from "@/lib/analytics/compulsive-events";
import { getSiteUrl } from "@/lib/env";

export function DengueWeekDesk() {
  const [done, setDone] = useState<Record<string, boolean>>({});
  const n = DENGUE_CHECKLIST.filter((item) => done[item]).length;

  return (
    <div className="not-prose space-y-6">
      <p className="rounded-lg border border-dashed border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-xs text-[var(--muted)]">
        {DENGUE_GCC_NOTE} This is not a live case map.
      </p>

      <section className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 sm:p-5">
        <h2 className="text-sm font-bold text-[var(--foreground)]">
          This week’s household checklist ({n}/{DENGUE_CHECKLIST.length})
        </h2>
        <ul className="mt-3 space-y-2">
          {DENGUE_CHECKLIST.map((item) => (
            <li key={item}>
              <label className="flex cursor-pointer items-start gap-2 text-sm text-[var(--foreground)]">
                <input
                  type="checkbox"
                  className="mt-1"
                  checked={Boolean(done[item])}
                  onChange={(e) => {
                    const next = { ...done, [item]: e.target.checked };
                    setDone(next);
                    const progress = DENGUE_CHECKLIST.filter((i) => next[i]).length;
                    if (progress === DENGUE_CHECKLIST.length) {
                      trackCompulsiveEvent("compulsive_checklist_complete", {
                        hub_id: "dengue-week",
                      });
                    }
                  }}
                />
                {item}
              </label>
            </li>
          ))}
        </ul>
      </section>

      <ul className="space-y-3">
        {DENGUE_ZONE_CARDS.map((z) => (
          <li
            key={z.id}
            className="rounded-2xl border border-[var(--border)] bg-[var(--background)] p-4"
          >
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wide text-[var(--accent)]">
                {z.zoneLabel}
              </span>
              <span className="text-[10px] font-semibold uppercase text-[var(--muted)]">
                {z.risk}
              </span>
            </div>
            <p className="mt-2 text-sm text-[var(--muted)]">{z.why}</p>
            <p className="mt-2 text-xs text-[var(--foreground)]">
              <strong>Do now:</strong> {z.doNow}
            </p>
          </li>
        ))}
      </ul>

      <CopyShareButton
        buildText={() =>
          `Chennai dengue week desk (GCC: 1,198 cases Jan–15 Jul 2026, lower than 2025 — still do the checklist): ${getSiteUrl()}${DENGUE_WEEK_PATH}`
        }
      />
    </div>
  );
}
