"use client";

import { useMemo, useState } from "react";
import { CopyShareButton } from "@/components/compulsive/copy-share-button";
import { SLANG_ENTRIES } from "@/content/compulsive/slang-decoder";
import { compulsivePath } from "@/content/compulsive/index";
import { getSiteUrl } from "@/lib/env";

export function SlangDecoderTool() {
  const [query, setQuery] = useState("");
  const path = compulsivePath("slang");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return SLANG_ENTRIES;
    return SLANG_ENTRIES.filter((entry) => {
      const hay = `${entry.term} ${entry.meaning} ${entry.example ?? ""}`.toLowerCase();
      return hay.includes(q);
    });
  }, [query]);

  return (
    <div className="not-prose space-y-4 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 sm:p-5">
      <label className="block text-xs font-semibold text-[var(--foreground)]">
        Search slang
        <input
          type="search"
          placeholder="Try: filter coffee, current, machan, only…"
          className="mt-1 w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </label>

      <p className="text-xs text-[var(--muted)]">
        Showing {filtered.length} of {SLANG_ENTRIES.length} entries
      </p>

      <ul className="max-h-[32rem] space-y-2 overflow-y-auto pr-1">
        {filtered.map((entry) => (
          <li
            key={entry.term}
            className="rounded-xl border border-[var(--border)] bg-[var(--background)] px-3 py-3"
          >
            <p className="text-sm font-bold text-[var(--foreground)]">{entry.term}</p>
            <p className="mt-1 text-sm text-[var(--muted)]">{entry.meaning}</p>
            {entry.example ? (
              <p className="mt-2 text-xs italic text-[var(--foreground)]">“{entry.example}”</p>
            ) : null}
          </li>
        ))}
        {filtered.length === 0 ? (
          <li className="rounded-xl border border-dashed border-[var(--border)] px-3 py-6 text-center text-sm text-[var(--muted)]">
            No matches — try a shorter word or clear the search.
          </li>
        ) : null}
      </ul>

      <CopyShareButton
        buildText={() =>
          query.trim()
            ? `Chennai slang search “${query.trim()}” → ${filtered.length} hits on mychennaicity.in ${getSiteUrl()}${path}`
            : `Chennai slang decoder — ${SLANG_ENTRIES.length}+ city desk entries: ${getSiteUrl()}${path}`
        }
      />
    </div>
  );
}
