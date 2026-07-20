"use client";

import Link from "next/link";
import { useState } from "react";
import { loadCivicGeoBundle } from "@/lib/civic-geo/load-civic-geo-bundle";
import { getMigrationRow } from "@/lib/civic-geo/lookup";
import { isPublishableProvenance } from "@/lib/civic-geo/provenance";
import type { WardMigrationRow } from "@/lib/civic-geo/types";
import { DataSourceDrawer } from "../shared/data-source-drawer";
import { MissingDataNote, ProvenanceBadge } from "../shared/provenance-badge";
import { DATAMEET_WARDS_PROVENANCE } from "@/lib/civic-geo/provenance";

export function WardMigrationLookup() {
  const [wardInput, setWardInput] = useState("");
  const [row, setRow] = useState<WardMigrationRow | null>(null);
  const [presentZone, setPresentZone] = useState<string | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLookup = async (e: React.FormEvent) => {
    e.preventDefault();
    const n = Number(wardInput.trim());
    if (!Number.isFinite(n) || n < 1) return;
    setLoading(true);
    setNotFound(false);
    setError(null);
    try {
      const civic = await loadCivicGeoBundle();
      const ward = civic.wards15.find((w) => w.wardNo === n);
      if (!ward) {
        setNotFound(true);
        setRow(null);
        setPresentZone(null);
        return;
      }
      setPresentZone(`${ward.zoneLabel} (${ward.zoneId})`);
      const migration = getMigrationRow(civic, n);
      setRow(migration);
      if (!migration) setNotFound(true);
    } catch (lookupError) {
      setError(
        lookupError instanceof Error
          ? lookupError.message
          : "Could not load migration data.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl space-y-6">
      <form onSubmit={(e) => void handleLookup(e)} className="flex gap-2">
        <input
          type="number"
          min={1}
          placeholder="Current ward number"
          value={wardInput}
          onChange={(e) => setWardInput(e.target.value)}
          className="w-full rounded-lg border border-[var(--border)] px-3 py-2 text-sm"
        />
        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-[var(--accent)] px-4 py-2 text-sm font-medium text-white disabled:opacity-60"
        >
          Lookup
        </button>
      </form>
      {error ? <p className="text-sm text-red-600">{error}</p> : null}

      {presentZone ? (
        <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4">
          <p className="text-xs uppercase tracking-wide text-[var(--muted)]">
            Present zone (operational)
          </p>
          <p className="mt-1 font-semibold text-[var(--foreground)]">{presentZone}</p>
        </div>
      ) : null}

      {row && isPublishableProvenance(row.provenance) ? (
        <div className="space-y-4 rounded-xl border border-[var(--border)] p-4">
          <ProvenanceBadge provenance={row.provenance} />
          <dl className="grid gap-2 text-sm">
            <div>
              <dt className="text-[var(--muted)]">Proposed 20-zone</dt>
              <dd className="font-medium">
                {row.proposed20ZoneLabel ?? "Not documented"}
              </dd>
            </div>
            <div>
              <dt className="text-[var(--muted)]">Historical 23-zone (2022)</dt>
              <dd className="font-medium">
                {row.historical23ZoneLabel ?? "Not documented"}
              </dd>
            </div>
            <div>
              <dt className="text-[var(--muted)]">Zone changes?</dt>
              <dd className="font-medium">{row.zoneChanges ? "Yes" : "No"}</dd>
            </div>
            <div>
              <dt className="text-[var(--muted)]">Boundary changes?</dt>
              <dd className="font-medium">
                {row.boundaryChanges ? "Yes" : "No — zone reassignment only"}
              </dd>
            </div>
            <div>
              <dt className="text-[var(--muted)]">Source</dt>
              <dd>{row.provenance.source}</dd>
            </div>
            <div>
              <dt className="text-[var(--muted)]">Confidence</dt>
              <dd className="capitalize">{row.provenance.confidence}</dd>
            </div>
          </dl>
        </div>
      ) : notFound ? (
        <MissingDataNote label="No verified migration row for this ward in our database." />
      ) : null}

      {notFound ? (
        <p className="text-sm text-[var(--muted)]">
          Have a boundary concern?{" "}
          <Link href="/civic-tools/boundary-feedback" className="text-[var(--accent)] hover:underline">
            Submit community feedback
          </Link>{" "}
          (does not change official data).
        </p>
      ) : null}

      <DataSourceDrawer
        title="Migration data policy"
        provenance={{
          ...DATAMEET_WARDS_PROVENANCE,
          methodology:
            "Ward migration assignments are published only from GO, gazette, or official tables — never from low-resolution media maps.",
        }}
      />
    </div>
  );
}
