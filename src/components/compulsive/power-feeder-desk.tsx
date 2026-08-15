"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { CopyShareButton } from "@/components/compulsive/copy-share-button";
import {
  POWER_FEEDER_CORRIDORS,
  POWER_FEEDER_PATH,
  POWER_FEEDER_STEPS,
  TANGEDCO_MINNAGAM,
  TANGEDCO_PORTAL,
  TNPDCL_BILL_HUB,
} from "@/content/compulsive/power-feeder";
import { getSiteUrl } from "@/lib/env";
import { CIVIC_TOOL_PATHS } from "@/lib/routes/civic-tools";

export function PowerFeederDesk() {
  const zones = useMemo(() => {
    const set = new Set(POWER_FEEDER_CORRIDORS.map((c) => c.zoneLabel));
    return ["All", ...Array.from(set)];
  }, []);
  const [zoneFilter, setZoneFilter] = useState("All");
  const rows = useMemo(
    () =>
      zoneFilter === "All"
        ? POWER_FEEDER_CORRIDORS
        : POWER_FEEDER_CORRIDORS.filter((c) => c.zoneLabel === zoneFilter),
    [zoneFilter],
  );

  return (
    <div className="not-prose space-y-6">
      <p className="rounded-lg border border-dashed border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-xs text-[var(--muted)]">
        Editorial feeder patterns — not live Tangedco status. Call Minnagam{" "}
        <strong className="text-[var(--foreground)]">{TANGEDCO_MINNAGAM}</strong> with
        your service-connection number.
      </p>

      <section className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 sm:p-5">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-sm font-bold text-[var(--foreground)]">
              Recurring outage corridors
            </h2>
            <p className="mt-1 text-xs text-[var(--muted)]">
              How Chennai usually loses supply — verify on your street.
            </p>
          </div>
          <label className="text-xs font-semibold text-[var(--foreground)]">
            Belt
            <select
              className="ml-2 rounded-lg border border-[var(--border)] bg-[var(--background)] px-2 py-1.5 text-xs"
              value={zoneFilter}
              onChange={(e) => setZoneFilter(e.target.value)}
            >
              {zones.map((z) => (
                <option key={z} value={z}>
                  {z}
                </option>
              ))}
            </select>
          </label>
        </div>
        <ul className="mt-4 space-y-3">
          {rows.map((row) => (
            <li
              key={row.id}
              className="rounded-xl border border-[var(--border)] bg-[var(--background)] p-4"
            >
              <p className="text-[10px] font-bold uppercase tracking-wide text-[var(--accent)]">
                {row.zoneLabel}
              </p>
              <p className="mt-2 text-sm font-semibold text-[var(--foreground)]">
                {row.corridor}
              </p>
              <p className="mt-1 text-sm text-[var(--muted)]">{row.pattern}</p>
              <p className="mt-2 text-xs text-[var(--foreground)]">
                <strong>Report tip:</strong> {row.tip}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 sm:p-5">
        <h2 className="text-sm font-bold text-[var(--foreground)]">How to report</h2>
        <ol className="mt-3 space-y-3">
          {POWER_FEEDER_STEPS.map((step, i) => (
            <li key={step.title} className="flex gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[var(--border)] text-[11px] font-bold">
                {i + 1}
              </span>
              <div>
                <p className="text-sm font-semibold text-[var(--foreground)]">{step.title}</p>
                <p className="mt-0.5 text-sm text-[var(--muted)]">{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
        <div className="mt-4 flex flex-wrap gap-3 text-sm">
          <a
            href={TANGEDCO_PORTAL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-[var(--accent)] hover:underline"
          >
            Tangedco / TNPDCL portal →
          </a>
          <Link
            href={CIVIC_TOOL_PATHS.streetlightDeadSpots}
            className="font-semibold text-[var(--accent)] hover:underline"
          >
            Streetlight desk →
          </Link>
          <Link href={TNPDCL_BILL_HUB} className="font-semibold text-[var(--accent)] hover:underline">
            High-bill desk →
          </Link>
        </div>
      </section>

      <CopyShareButton
        buildText={() =>
          `Chennai power/feeder desk (how to tell feeder vs streetlight vs house; Minnagam ${TANGEDCO_MINNAGAM}): ${getSiteUrl()}${POWER_FEEDER_PATH}`
        }
      />
    </div>
  );
}
