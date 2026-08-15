"use client";

import { useMemo, useState } from "react";
import { CopyShareButton } from "@/components/compulsive/copy-share-button";
import {
  AUTO_FARE_CONSUMER_2026,
  AUTO_FARE_CONTEXT,
  AUTO_FARE_OFFICIAL_2013,
  AUTO_FARE_PATH,
  AUTO_FARE_UNION_2026,
  autoFareInr,
} from "@/content/compulsive/auto-fare";
import { getSiteUrl } from "@/lib/env";

function inr(n: number) {
  return `₹${n.toLocaleString("en-IN")}`;
}

export function AutoFareCards() {
  const [km, setKm] = useState(5);
  const [night, setNight] = useState(false);

  const rows = useMemo(() => {
    const unionNight = night ? AUTO_FARE_UNION_2026.nightMultiplier : 1;
    const consumerNight = night ? AUTO_FARE_CONSUMER_2026.nightMultiplier : 1;
    return [
      {
        id: "official",
        label: AUTO_FARE_OFFICIAL_2013.label,
        note: `₹${AUTO_FARE_OFFICIAL_2013.flagInr} / first ${AUTO_FARE_OFFICIAL_2013.flagKm} km + ₹${AUTO_FARE_OFFICIAL_2013.extraPerKm}/km`,
        fare: autoFareInr(km, AUTO_FARE_OFFICIAL_2013, 1),
      },
      {
        id: "consumer",
        label: AUTO_FARE_CONSUMER_2026.label,
        note: `₹${AUTO_FARE_CONSUMER_2026.flagInr} / first ${AUTO_FARE_CONSUMER_2026.flagKm} km + ~₹${AUTO_FARE_CONSUMER_2026.extraPerKm}/km${night ? " · 50% after 11 pm (proposal)" : ""}`,
        fare: autoFareInr(km, AUTO_FARE_CONSUMER_2026, consumerNight),
      },
      {
        id: "union",
        label: AUTO_FARE_UNION_2026.label,
        note: `₹${AUTO_FARE_UNION_2026.flagInr} / first ${AUTO_FARE_UNION_2026.flagKm} km + ₹${AUTO_FARE_UNION_2026.extraPerKm}/km${night ? " · 2× night (proposal)" : ""}`,
        fare: autoFareInr(km, AUTO_FARE_UNION_2026, unionNight),
      },
    ];
  }, [km, night]);

  return (
    <div className="not-prose space-y-4 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 sm:p-5">
      <p className="text-xs text-[var(--muted)]">
        Last official meter: <strong className="text-[var(--foreground)]">{AUTO_FARE_CONTEXT.lastRevision}</strong>.{" "}
        {AUTO_FARE_CONTEXT.status}
      </p>

      <div className="grid gap-3 sm:grid-cols-2">
        <label className="text-xs font-semibold text-[var(--foreground)]">
          Trip km
          <input
            type="number"
            min={0.5}
            step={0.1}
            className="mt-1 w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm"
            value={km}
            onChange={(e) => setKm(Number(e.target.value) || 0)}
          />
        </label>
        <label className="flex items-end gap-2 text-xs font-semibold text-[var(--foreground)]">
          <input
            type="checkbox"
            checked={night}
            onChange={(e) => setNight(e.target.checked)}
            className="mb-2 h-4 w-4"
          />
          After 11 pm (apply proposed night extra on 2026 columns only)
        </label>
      </div>

      <ul className="grid gap-3 sm:grid-cols-3">
        {rows.map((row) => (
          <li
            key={row.id}
            className="rounded-xl border border-[var(--border)] bg-[var(--background)] p-4"
          >
            <p className="text-[10px] font-bold uppercase tracking-wide text-[var(--accent)]">
              {row.label}
            </p>
            <p className="mt-2 text-2xl font-bold text-[var(--foreground)]">{inr(row.fare)}</p>
            <p className="mt-1 text-xs text-[var(--muted)]">{row.note}</p>
          </li>
        ))}
      </ul>

      <p className="text-xs text-[var(--muted)]">
        Street quotes and app prices will differ. This is a planning card for WhatsApp
        arguments — not a Transport Department order.
      </p>

      <CopyShareButton
        buildText={() => {
          const line = rows.map((r) => `${r.label} ${inr(r.fare)}`).join(" · ");
          return `Chennai auto ${km} km${night ? " (after 11 pm, proposed extra)" : ""}: ${line}. Official meter still 2013 until a new GO. ${getSiteUrl()}${AUTO_FARE_PATH}`;
        }}
      />
    </div>
  );
}
