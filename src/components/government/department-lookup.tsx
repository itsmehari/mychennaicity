"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { DEPARTMENT_INDEX } from "@/content/government/departments";
import { ministerPath } from "@/content/government/paths";

type Props = { locale?: "en" | "ta" };

export function DepartmentLookup({ locale = "en" }: Props) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return DEPARTMENT_INDEX;
    return DEPARTMENT_INDEX.filter(
      (d) =>
        d.keyword.toLowerCase().includes(q) ||
        d.ministerName.toLowerCase().includes(q) ||
        d.ministryTitle.toLowerCase().includes(q),
    );
  }, [query]);

  return (
    <div className="not-prose my-6 space-y-4">
      <input
        type="search"
        placeholder={
          locale === "ta"
            ? "துறை / department தேட..."
            : "Search department or keyword…"
        }
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full max-w-lg rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-2.5 text-sm"
      />
      <div className="overflow-x-auto rounded-2xl border border-[var(--border)]">
        <table className="w-full min-w-[520px] text-left text-sm">
          <thead className="bg-[var(--surface)] text-[11px] font-bold uppercase tracking-wider text-[var(--muted)]">
            <tr>
              <th className="px-4 py-3">Department / subject</th>
              <th className="px-4 py-3">Minister</th>
              <th className="px-4 py-3">Ministry</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border)]">
            {filtered.slice(0, 200).map((d, i) => (
              <tr key={`${d.keyword}-${d.ministerSlug}-${i}`}>
                <td className="px-4 py-2.5 text-[var(--foreground)]">{d.keyword}</td>
                <td className="px-4 py-2.5">
                  <Link
                    href={ministerPath(d.ministerSlug, locale)}
                    className="font-semibold text-[var(--accent)] hover:underline"
                  >
                    {d.ministerName}
                  </Link>
                </td>
                <td className="px-4 py-2.5 text-[var(--muted)]">{d.ministryTitle}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {filtered.length > 200 ? (
        <p className="text-xs text-[var(--muted)]">
          Showing first 200 matches — refine your search.
        </p>
      ) : null}
    </div>
  );
}
