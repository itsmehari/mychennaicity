"use client";

import type { DataProvenance } from "@/lib/civic-geo/provenance";
import { provenanceLabel } from "@/lib/civic-geo/provenance";

export function ProvenanceBadge({ provenance }: { provenance: DataProvenance }) {
  const status = provenance.verificationStatus;
  const tone =
    status === "official" || status === "verified"
      ? "bg-emerald-500/15 text-emerald-800 dark:text-emerald-200"
      : status === "missing"
        ? "bg-amber-500/15 text-amber-900 dark:text-amber-100"
        : "bg-zinc-500/15 text-zinc-700 dark:text-zinc-300";

  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${tone}`}
    >
      {provenanceLabel(status)} · {provenance.confidence}
    </span>
  );
}

export function MissingDataNote({ label = "Data not yet verified" }: { label?: string }) {
  return (
    <p className="rounded-lg border border-dashed border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-xs text-[var(--muted)]">
      {label}
    </p>
  );
}
