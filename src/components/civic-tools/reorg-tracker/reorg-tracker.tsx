import Link from "next/link";
import {
  REORG_STATUS_LABELS,
  REORG_UPDATES,
  type ReorgStatusStage,
} from "@/content/civic-reorg/updates";
import { ProvenanceBadge } from "../shared/provenance-badge";

const STAGE_ORDER: ReorgStatusStage[] = [
  "announced",
  "draft_mapped",
  "government_approved",
  "gazette_notified",
  "offices_constituted",
  "staff_appointed",
  "digital_systems_updated",
  "operational",
];

export function ReorgTracker() {
  return (
    <div className="space-y-8">
      <div className="flex flex-wrap gap-2">
        {STAGE_ORDER.map((stage) => (
          <span
            key={stage}
            className="rounded-full border border-[var(--border)] px-2 py-1 text-[10px] font-medium uppercase tracking-wide text-[var(--muted)]"
          >
            {REORG_STATUS_LABELS[stage]}
          </span>
        ))}
      </div>

      <ol className="relative space-y-6 border-l border-[var(--border)] pl-6">
        {REORG_UPDATES.map((u) => (
          <li key={u.id} className="relative">
            <span className="absolute -left-[1.35rem] top-1 h-3 w-3 rounded-full bg-[var(--accent)]" />
            <p className="text-xs text-[var(--muted)]">
              {u.date} · {u.typeLabel} · {u.statusLabel}
            </p>
            <h2 className="mt-1 text-lg font-semibold text-[var(--foreground)]">
              {u.title}
            </h2>
            <p className="mt-2 text-sm text-[var(--muted)]">{u.summary}</p>
            <div className="mt-2">
              <ProvenanceBadge provenance={u.provenance} />
            </div>
            {u.sourceUrl ? (
              <a
                href={u.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-block text-sm text-[var(--accent)] hover:underline"
              >
                Primary source
              </a>
            ) : null}
          </li>
        ))}
      </ol>

      <p className="text-sm text-[var(--muted)]">
        Track ward-level changes in{" "}
        <Link href="/civic-tools/ward-migration" className="text-[var(--accent)] hover:underline">
          Ward migration lookup
        </Link>
        .
      </p>
    </div>
  );
}
