"use client";

import { useMemo, useState } from "react";
import { CopyShareButton } from "@/components/compulsive/copy-share-button";
import {
  USED_VEHICLE_METHODOLOGY,
  VEHICLE_SEGMENTS,
  YEAR_BUCKETS,
  bandsForSegment,
  formatInrLakhOrWhole,
  type VehicleSegmentId,
} from "@/content/compulsive/used-vehicle";
import { compulsivePath } from "@/content/compulsive/index";
import { getSiteUrl } from "@/lib/env";

export function UsedVehiclePulse() {
  const [segmentId, setSegmentId] = useState<VehicleSegmentId>("hatch");
  const path = compulsivePath("used-vehicle");

  const segment = useMemo(
    () => VEHICLE_SEGMENTS.find((s) => s.id === segmentId)!,
    [segmentId],
  );

  const bands = useMemo(() => bandsForSegment(segmentId), [segmentId]);

  return (
    <div className="not-prose space-y-4 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 sm:p-5">
      <p className="rounded-lg border border-amber-500/30 bg-amber-500/10 px-3 py-2 text-xs leading-relaxed text-[var(--foreground)]">
        <strong>Methodology:</strong> {USED_VEHICLE_METHODOLOGY}
      </p>

      <div>
        <p className="mb-2 text-xs font-bold uppercase tracking-wide text-[var(--muted)]">
          Segment
        </p>
        <div className="flex flex-wrap gap-2">
          {VEHICLE_SEGMENTS.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setSegmentId(s.id)}
              className={`rounded-full px-3 py-1.5 text-xs font-bold ${
                segmentId === s.id
                  ? "bg-[var(--accent)] text-[var(--accent-fg)]"
                  : "border border-[var(--border)] text-[var(--foreground)]"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
        <p className="mt-2 text-sm text-[var(--muted)]">{segment.blurb}</p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {bands.map((band) => {
          const year = YEAR_BUCKETS.find((y) => y.id === band.yearBucketId)!;
          return (
            <div
              key={`${band.segmentId}-${band.yearBucketId}`}
              className="rounded-xl border border-[var(--border)] p-3"
            >
              <p className="text-[11px] font-bold uppercase tracking-wide text-[var(--muted)]">
                {year.label}
                <span className="ml-1 font-semibold normal-case text-[var(--foreground)]/70">
                  · {year.short}
                </span>
              </p>
              <p className="mt-1 text-lg font-bold text-[var(--foreground)]">
                {formatInrLakhOrWhole(band.midInr)}
                <span className="ml-1 text-sm font-semibold text-[var(--muted)]">
                  mid
                </span>
              </p>
              <p className="text-sm text-[var(--muted)]">
                {formatInrLakhOrWhole(band.lowInr)} –{" "}
                {formatInrLakhOrWhole(band.highInr)}
              </p>
              <p className="mt-2 text-xs leading-relaxed text-[var(--muted)]">
                {band.note}
              </p>
            </div>
          );
        })}
      </div>

      <CopyShareButton
        buildText={() => {
          const midLine = bands
            .map((b) => {
              const y = YEAR_BUCKETS.find((x) => x.id === b.yearBucketId)!;
              return `${y.short} ~${formatInrLakhOrWhole(b.midInr)}`;
            })
            .join("; ");
          return `Chennai used ${segment.label} pulse (directional): ${midLine}. Not classified ads — ${getSiteUrl()}${path}`;
        }}
      />
    </div>
  );
}
