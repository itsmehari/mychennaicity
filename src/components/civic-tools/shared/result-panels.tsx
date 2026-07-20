"use client";

import type { ReactNode } from "react";
import type { DataProvenance } from "@/lib/civic-geo/provenance";
import { ProvenanceBadge } from "./provenance-badge";

export function OperationalResultPanel({
  zoneLabel,
  zoneId,
  wardNo,
  councillorName,
  zonalOffice,
  complaintUrl,
  verifyUrl,
  provenance,
  children,
}: {
  zoneLabel: string;
  zoneId: string;
  wardNo: number;
  councillorName: string | null;
  zonalOffice: string | null;
  complaintUrl: string;
  verifyUrl: string;
  provenance: DataProvenance;
  children?: ReactNode;
}) {
  return (
    <section className="rounded-2xl border-2 border-[var(--accent)]/30 bg-[var(--surface)] p-4 sm:p-5">
      <p className="type-eyebrow text-[var(--accent)]">Current — operational (15 zones)</p>
      <h2 className="mt-1 text-xl font-semibold text-[var(--foreground)]">
        Zone {zoneLabel} · Ward {wardNo}
      </h2>
      <dl className="mt-4 grid gap-2 text-sm">
        <div>
          <dt className="text-[var(--muted)]">Zone ID</dt>
          <dd className="font-medium text-[var(--foreground)]">{zoneId}</dd>
        </div>
        <div>
          <dt className="text-[var(--muted)]">Councillor</dt>
          <dd className="font-medium text-[var(--foreground)]">
            {councillorName ?? "Not verified in our database"}
          </dd>
        </div>
        <div>
          <dt className="text-[var(--muted)]">Zonal office</dt>
          <dd className="font-medium text-[var(--foreground)]">
            {zonalOffice ?? "Address pending verification"}
          </dd>
        </div>
        <div className="flex flex-wrap gap-3 pt-1">
          <a
            href={complaintUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-[var(--accent)] underline-offset-4 hover:underline"
          >
            GCC complaint channel
          </a>
          <a
            href={verifyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-[var(--accent)] underline-offset-4 hover:underline"
          >
            Official verification
          </a>
        </div>
      </dl>
      <div className="mt-3">
        <ProvenanceBadge provenance={provenance} />
        <p className="mt-1 text-xs text-[var(--muted)]">
          Data verification date: {provenance.sourceDate}
        </p>
      </div>
      {children}
    </section>
  );
}

export function ProposedResultPanel({
  zoneLabel,
  zoneId,
  provenance,
}: {
  zoneLabel: string | null;
  zoneId: string | null;
  provenance: DataProvenance | null;
}) {
  const hasData = zoneLabel && zoneId && provenance;

  return (
    <section className="rounded-2xl border border-dashed border-[var(--border)] bg-[var(--background)] p-4 sm:p-5">
      <p className="type-eyebrow text-[var(--muted)]">
        Proposed — not currently operational
      </p>
      {hasData ? (
        <>
          <h2 className="mt-1 text-lg font-semibold text-[var(--foreground)]">
            Future zone: {zoneLabel}
          </h2>
          <p className="mt-1 text-sm text-[var(--muted)]">ID: {zoneId}</p>
          <div className="mt-3">
            <ProvenanceBadge provenance={provenance} />
          </div>
        </>
      ) : (
        <p className="mt-2 text-sm text-[var(--muted)]">
          Pending verified mapping for the proposed 20-zone structure. We do not
          publish ward assignments from low-resolution media maps.
        </p>
      )}
    </section>
  );
}
