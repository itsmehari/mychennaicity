"use client";

import { useEffect, useState } from "react";
import { loadCivicGeoBundle } from "@/lib/civic-geo/load-civic-geo-bundle";
import type { ZoneMetricsRecord } from "@/lib/civic-geo/types";
import { ProvenanceBadge } from "../shared/provenance-badge";

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

  return (
    <div className="space-y-4">
      <label className="block text-sm">
        <span className="text-[var(--muted)]">Zone</span>
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
      {error ? <p className="text-sm text-red-600">{error}</p> : null}

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {selectedZone?.metrics.map((m) => (
          <div
            key={m.key}
            className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4"
          >
            <p className="text-xs text-[var(--muted)]">{m.label}</p>
            <p className="mt-1 text-lg font-semibold text-[var(--foreground)]">
              {m.value == null ? "—" : `${m.value}${m.unit ? ` ${m.unit}` : ""}`}
            </p>
            <div className="mt-2">
              <ProvenanceBadge provenance={m.provenance} />
            </div>
            <p className="mt-1 text-[10px] text-[var(--muted)]">
              {m.provenance.methodology}
            </p>
            <p className="mt-1 text-[10px] text-[var(--muted)]">
              Source: {m.provenance.source} · {m.provenance.sourceDate} ·{" "}
              {m.provenance.geographyVersion}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
