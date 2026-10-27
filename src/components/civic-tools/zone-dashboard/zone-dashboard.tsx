"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { loadCivicGeoBundle } from "@/lib/civic-geo/load-civic-geo-bundle";
import type { ZoneMetricsRecord } from "@/lib/civic-geo/types";
import { ProvenanceBadge } from "../shared/provenance-badge";
import { CIVIC_TOOL_PATHS } from "@/lib/routes/civic-tools";

export function ZoneDashboard() {
  const [zones, setZones] = useState<ZoneMetricsRecord[]>([]);
  const [zoneId, setZoneId] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadCivicGeoBundle()
      .then((bundle) => {
        setZones(bundle.zoneMetrics);
        setZoneId(bundle.zoneMetrics[0]?.zoneId ?? "");
        setError(null);
      })
      .catch(() => setError("Could not load zone metrics."));
  }, []);

  const selectedZone = zones.find((zone) => zone.zoneId === zoneId);
  const published = selectedZone?.metrics.filter((m) => m.value != null) ?? [];
  const missing = selectedZone?.metrics.filter((m) => m.value == null) ?? [];

  const ranked = useMemo(
    () =>
      [...zones].sort((a, b) => {
        const av =
          Number(a.metrics.find((m) => m.key === "ward_count")?.value) || 0;
        const bv =
          Number(b.metrics.find((m) => m.key === "ward_count")?.value) || 0;
        return bv - av;
      }),
    [zones],
  );

  return (
    <div className="space-y-8">
      <p className="text-sm leading-relaxed text-[var(--muted)]">
        Only figures we can count from the operational Datameet ward polygons —
        and a few clearly labelled editorial flood scores — are shown as numbers.
        Population, budget, parks, and complaint volumes are listed as{" "}
        <strong className="font-medium text-[var(--foreground)]">
          not published zone-wise
        </strong>{" "}
        until GCC releases them. We do not fill those cells with estimates.
      </p>

      {error ? <p className="text-sm text-red-600">{error}</p> : null}

      <section>
        <h2 className="text-lg font-semibold text-[var(--foreground)]">
          Ward counts across 15 zones
        </h2>
        <p className="mt-1 text-sm text-[var(--muted)]">
          Verified polygon counts. Tap a row to inspect that zone.
        </p>
        <div className="mt-3 overflow-x-auto rounded-xl border border-[var(--border)]">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-[var(--surface)] text-xs uppercase tracking-wide text-[var(--muted)]">
              <tr>
                <th className="px-3 py-2">Zone</th>
                <th className="px-3 py-2">Wards</th>
                <th className="px-3 py-2">Flood score</th>
              </tr>
            </thead>
            <tbody>
              {ranked.map((z) => {
                const wards = z.metrics.find((m) => m.key === "ward_count");
                const flood = z.metrics.find(
                  (m) => m.key === "flood_editorial_score",
                );
                const active = z.zoneId === zoneId;
                return (
                  <tr
                    key={z.zoneId}
                    className={
                      active ? "bg-[var(--accent)]/8" : "odd:bg-[var(--surface)]"
                    }
                  >
                    <td className="px-3 py-2">
                      <button
                        type="button"
                        className="text-left font-medium text-[var(--accent)] hover:underline"
                        onClick={() => setZoneId(z.zoneId)}
                      >
                        {z.zoneLabel}
                      </button>
                    </td>
                    <td className="px-3 py-2 tabular-nums">
                      {wards?.value ?? "—"}
                    </td>
                    <td className="px-3 py-2 tabular-nums text-[var(--muted)]">
                      {flood?.value != null
                        ? `${flood.value}${flood.unit ?? ""}`
                        : "—"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      <label className="block text-sm">
        <span className="text-[var(--muted)]">Zone detail</span>
        <select
          value={zoneId}
          onChange={(e) => setZoneId(e.target.value)}
          className="mt-1 w-full max-w-md rounded-lg border border-[var(--border)] px-3 py-2"
        >
          {zones.map((z) => (
            <option key={z.zoneId} value={z.zoneId}>
              {z.zoneLabel}
            </option>
          ))}
        </select>
      </label>

      <div className="grid gap-3 sm:grid-cols-2">
        {published.map((m) => (
          <div
            key={m.key}
            className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4"
          >
            <p className="text-xs text-[var(--muted)]">{m.label}</p>
            <p className="mt-1 text-lg font-semibold text-[var(--foreground)]">
              {`${m.value}${m.unit ? ` ${m.unit}` : ""}`}
            </p>
            <div className="mt-2">
              <ProvenanceBadge provenance={m.provenance} />
            </div>
            <p className="mt-1 text-[10px] text-[var(--muted)]">
              {m.provenance.methodology}
            </p>
            <p className="mt-1 text-[10px] text-[var(--muted)]">
              Source: {m.provenance.source} · {m.provenance.sourceDate}
            </p>
          </div>
        ))}
      </div>

      {missing.length > 0 ? (
        <section className="rounded-xl border border-dashed border-[var(--border)] p-4">
          <h3 className="text-sm font-semibold text-[var(--foreground)]">
            Not published zone-wise by GCC (yet)
          </h3>
          <p className="mt-1 text-xs text-[var(--muted)]">
            These fields stay empty on purpose. Filling them from a news graphic
            or a citywide total split by eye would be a fake dashboard.
          </p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {missing.map((m) => (
              <li
                key={m.key}
                className="rounded-full border border-[var(--border)] px-2 py-1 text-[11px] text-[var(--muted)]"
              >
                {m.label}
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <p className="text-sm text-[var(--muted)]">
        Related:{" "}
        <Link
          href={CIVIC_TOOL_PATHS.zonalOfficeAccess}
          className="text-[var(--accent)] hover:underline"
        >
          Zonal office
        </Link>
        ,{" "}
        <Link
          href={CIVIC_TOOL_PATHS.floodStreet}
          className="text-[var(--accent)] hover:underline"
        >
          Flood street-score
        </Link>
        ,{" "}
        <Link
          href={CIVIC_TOOL_PATHS.zoneWardFinder}
          className="text-[var(--accent)] hover:underline"
        >
          Zone & Ward Finder
        </Link>
        .
      </p>
    </div>
  );
}
