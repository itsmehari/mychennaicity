"use client";

import type { DataProvenance } from "@/lib/civic-geo/provenance";
import { ProvenanceBadge } from "./provenance-badge";

export function DataSourceDrawer({
  title,
  provenance,
  extra,
}: {
  title: string;
  provenance: DataProvenance;
  extra?: string;
}) {
  return (
    <details className="group rounded-xl border border-[var(--border)] bg-[var(--surface)]">
      <summary className="cursor-pointer list-none px-4 py-3 text-sm font-medium text-[var(--foreground)] marker:content-none [&::-webkit-details-marker]:hidden">
        <span className="flex items-center justify-between gap-2">
          {title}
          <span className="text-xs text-[var(--muted)] group-open:hidden">Show sources</span>
          <span className="hidden text-xs text-[var(--muted)] group-open:inline">Hide</span>
        </span>
      </summary>
      <div className="space-y-2 border-t border-[var(--border)] px-4 py-3 text-xs text-[var(--muted)]">
        <ProvenanceBadge provenance={provenance} />
        <p>
          <span className="font-medium text-[var(--foreground)]">Source:</span>{" "}
          {provenance.source}
        </p>
        <p>
          <span className="font-medium text-[var(--foreground)]">Source date:</span>{" "}
          {provenance.sourceDate}
        </p>
        <p>
          <span className="font-medium text-[var(--foreground)]">Geography:</span>{" "}
          {provenance.geographyVersion}
        </p>
        <p>
          <span className="font-medium text-[var(--foreground)]">Methodology:</span>{" "}
          {provenance.methodology}
        </p>
        {extra ? <p>{extra}</p> : null}
      </div>
    </details>
  );
}
