"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { CIVIC_ISSUE_GUIDES } from "@/content/civic-responsibility/issues";
import { DataSourceDrawer } from "../shared/data-source-drawer";
import { ProvenanceBadge } from "../shared/provenance-badge";

export function ResponsibilityRouter() {
  const [q, setQ] = useState("");
  const [selected, setSelected] = useState(CIVIC_ISSUE_GUIDES[0]!.id);

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return CIVIC_ISSUE_GUIDES;
    return CIVIC_ISSUE_GUIDES.filter(
      (g) =>
        g.label.toLowerCase().includes(needle) ||
        g.primaryAuthority.toLowerCase().includes(needle),
    );
  }, [q]);

  const issue = CIVIC_ISSUE_GUIDES.find((g) => g.id === selected) ?? filtered[0];

  return (
    <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
      <div className="space-y-3">
        <input
          type="search"
          placeholder="Filter issues…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          className="w-full rounded-lg border border-[var(--border)] px-3 py-2 text-sm"
        />
        <ul className="max-h-[420px] space-y-1 overflow-y-auto rounded-xl border border-[var(--border)] p-2">
          {filtered.map((g) => (
            <li key={g.id}>
              <button
                type="button"
                onClick={() => setSelected(g.id)}
                className={`w-full rounded-lg px-3 py-2 text-left text-sm ${
                  issue?.id === g.id
                    ? "bg-[var(--accent)]/10 font-medium text-[var(--foreground)]"
                    : "text-[var(--muted)] hover:bg-[var(--surface)]"
                }`}
              >
                {g.label}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {issue ? (
        <div className="space-y-4 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">{issue.label}</h2>
          <ProvenanceBadge provenance={issue.provenance} />
          <dl className="grid gap-3 text-sm">
            <div>
              <dt className="text-[var(--muted)]">Primary authority</dt>
              <dd className="font-medium text-[var(--foreground)]">{issue.primaryAuthority}</dd>
            </div>
            {issue.gccDepartment ? (
              <div>
                <dt className="text-[var(--muted)]">GCC department</dt>
                <dd className="font-medium">{issue.gccDepartment}</dd>
              </div>
            ) : null}
            <div>
              <dt className="text-[var(--muted)]">Zone / ward involvement</dt>
              <dd>{issue.zoneWardInvolvement}</dd>
            </div>
            {issue.otherAgency ? (
              <div>
                <dt className="text-[var(--muted)]">Other agency</dt>
                <dd className="font-medium text-amber-800 dark:text-amber-200">
                  {issue.otherAgency}
                </dd>
              </div>
            ) : null}
            <div>
              <dt className="text-[var(--muted)]">Complaint method</dt>
              <dd>{issue.complaintMethod}</dd>
            </div>
            <div>
              <dt className="text-[var(--muted)]">Documents / photos</dt>
              <dd>
                <ul className="list-disc pl-5">
                  {issue.documentsRequired.map((d) => (
                    <li key={d}>{d}</li>
                  ))}
                </ul>
              </dd>
            </div>
            <div>
              <dt className="text-[var(--muted)]">Escalation path</dt>
              <dd>
                <ol className="list-decimal pl-5">
                  {issue.escalationPath.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ol>
              </dd>
            </div>
          </dl>
          <p className="text-sm text-[var(--muted)]">
            Not sure of your ward?{" "}
            <Link href="/civic-tools/zone-ward-finder" className="text-[var(--accent)] hover:underline">
              Zone & Ward Finder
            </Link>
          </p>
          <DataSourceDrawer title="Routing guide sources" provenance={issue.provenance} />
        </div>
      ) : null}
    </div>
  );
}
