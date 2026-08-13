"use client";

import { useMemo, useState } from "react";
import { CopyShareButton } from "@/components/compulsive/copy-share-button";
import {
  WEDDING_HIDDEN_COSTS,
  WEDDING_SEASONS,
  WEDDING_VENUE_METHODOLOGY,
  WEDDING_ZONES,
  bandFor,
  formatWeddingInr,
  type WeddingSeasonId,
  type WeddingZoneId,
} from "@/content/compulsive/wedding-venue";
import { compulsivePath } from "@/content/compulsive/index";
import { getSiteUrl } from "@/lib/env";

export function WeddingVenueCosts() {
  const [zoneId, setZoneId] = useState<WeddingZoneId>("south-central");
  const [seasonId, setSeasonId] = useState<WeddingSeasonId>("peak");
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const path = compulsivePath("wedding-venue");

  const zone = useMemo(
    () => WEDDING_ZONES.find((z) => z.id === zoneId)!,
    [zoneId],
  );
  const season = useMemo(
    () => WEDDING_SEASONS.find((s) => s.id === seasonId)!,
    [seasonId],
  );
  const band = useMemo(() => bandFor(zoneId, seasonId), [zoneId, seasonId]);

  const hiddenDone = useMemo(
    () => WEDDING_HIDDEN_COSTS.filter((item) => checked[item.id]).length,
    [checked],
  );

  function toggle(id: string) {
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  return (
    <div className="not-prose space-y-5 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 sm:p-5">
      <p className="rounded-lg border border-amber-500/30 bg-amber-500/10 px-3 py-2 text-xs leading-relaxed text-[var(--foreground)]">
        <strong>Methodology:</strong> {WEDDING_VENUE_METHODOLOGY}
      </p>

      <div className="space-y-3">
        <div>
          <p className="mb-2 text-xs font-bold uppercase tracking-wide text-[var(--muted)]">
            Zone
          </p>
          <div className="flex flex-wrap gap-2">
            {WEDDING_ZONES.map((z) => (
              <button
                key={z.id}
                type="button"
                onClick={() => setZoneId(z.id)}
                className={`rounded-full px-3 py-1.5 text-xs font-bold ${
                  zoneId === z.id
                    ? "bg-[var(--accent)] text-[var(--accent-fg)]"
                    : "border border-[var(--border)] text-[var(--foreground)]"
                }`}
              >
                {z.label.split(" (")[0]}
              </button>
            ))}
          </div>
          <p className="mt-2 text-sm text-[var(--muted)]">{zone.blurb}</p>
        </div>

        <div>
          <p className="mb-2 text-xs font-bold uppercase tracking-wide text-[var(--muted)]">
            Season
          </p>
          <div className="flex flex-wrap gap-2">
            {WEDDING_SEASONS.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setSeasonId(s.id)}
                className={`rounded-full px-3 py-1.5 text-xs font-bold ${
                  seasonId === s.id
                    ? "bg-[var(--accent)] text-[var(--accent-fg)]"
                    : "border border-[var(--border)] text-[var(--foreground)]"
                }`}
              >
                {s.id === "peak"
                  ? "Peak"
                  : s.id === "shoulder"
                    ? "Shoulder"
                    : "Off-peak"}
              </button>
            ))}
          </div>
          <p className="mt-2 text-sm text-[var(--muted)]">{season.blurb}</p>
        </div>
      </div>

      {band ? (
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl border border-[var(--border)] p-3">
            <p className="text-[11px] font-bold uppercase tracking-wide text-[var(--muted)]">
              Hall / mandapam (day)
            </p>
            <p className="mt-1 text-lg font-bold text-[var(--foreground)]">
              {formatWeddingInr(band.hallMidInr)}
              <span className="ml-1 text-sm font-semibold text-[var(--muted)]">
                mid
              </span>
            </p>
            <p className="text-sm text-[var(--muted)]">
              {formatWeddingInr(band.hallLowInr)} –{" "}
              {formatWeddingInr(band.hallHighInr)}
            </p>
          </div>
          <div className="rounded-xl border border-[var(--border)] p-3">
            <p className="text-[11px] font-bold uppercase tracking-wide text-[var(--muted)]">
              Catering / plate
            </p>
            <p className="mt-1 text-lg font-bold text-[var(--foreground)]">
              {formatWeddingInr(band.plateMidInr)}
              <span className="ml-1 text-sm font-semibold text-[var(--muted)]">
                mid
              </span>
            </p>
            <p className="text-sm text-[var(--muted)]">
              {formatWeddingInr(band.plateLowInr)} –{" "}
              {formatWeddingInr(band.plateHighInr)}
            </p>
          </div>
          <p className="sm:col-span-2 text-xs leading-relaxed text-[var(--muted)]">
            {band.note}
          </p>
        </div>
      ) : null}

      <div className="space-y-3 border-t border-[var(--border)] pt-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="text-sm font-bold text-[var(--foreground)]">
            Hidden-cost checklist
          </p>
          <p className="text-xs text-[var(--muted)]">
            Reviewed{" "}
            <strong className="text-[var(--foreground)]">
              {hiddenDone}/{WEDDING_HIDDEN_COSTS.length}
            </strong>
          </p>
        </div>
        <ul className="space-y-2">
          {WEDDING_HIDDEN_COSTS.map((item) => {
            const on = Boolean(checked[item.id]);
            return (
              <li
                key={item.id}
                className={`rounded-xl border p-3 ${
                  on
                    ? "border-[var(--accent)]/40 bg-[var(--accent)]/5"
                    : "border-[var(--border)]"
                }`}
              >
                <label className="flex cursor-pointer gap-3">
                  <input
                    type="checkbox"
                    className="mt-1 h-4 w-4 accent-[var(--accent)]"
                    checked={on}
                    onChange={() => toggle(item.id)}
                  />
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-bold text-[var(--foreground)]">
                      {item.title}
                    </span>
                    <span className="mt-1 block text-xs leading-relaxed text-[var(--muted)]">
                      {item.summary}
                    </span>
                  </span>
                </label>
              </li>
            );
          })}
        </ul>
      </div>

      <CopyShareButton
        buildText={() => {
          if (!band) return `Chennai wedding venue costs: ${getSiteUrl()}${path}`;
          return `Chennai wedding costs (${zone.label.split(" (")[0]}, ${season.label.split(" (")[0]}): hall mid ~${formatWeddingInr(band.hallMidInr)}, plate mid ~${formatWeddingInr(band.plateMidInr)}. Hidden costs checked ${hiddenDone}/${WEDDING_HIDDEN_COSTS.length}. ${getSiteUrl()}${path}`;
        }}
      />
    </div>
  );
}
