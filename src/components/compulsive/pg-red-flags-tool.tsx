"use client";

import { useMemo, useState } from "react";
import { CopyShareButton } from "@/components/compulsive/copy-share-button";
import {
  PG_FLAG_ITEMS,
  PG_FLAG_LEVEL_META,
  type FlagLevel,
} from "@/content/compulsive/pg-red-flags";
import { compulsivePath } from "@/content/compulsive/index";
import { getSiteUrl } from "@/lib/env";

const LEVELS: FlagLevel[] = ["red", "amber", "green"];

export function PgRedFlagsTool() {
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [filter, setFilter] = useState<FlagLevel | "all">("all");
  const path = compulsivePath("pg-red-flags");

  const visible = useMemo(
    () =>
      PG_FLAG_ITEMS.filter((item) => (filter === "all" ? true : item.level === filter)),
    [filter],
  );

  const counts = useMemo(() => {
    const base = { red: 0, amber: 0, green: 0 };
    for (const item of PG_FLAG_ITEMS) {
      if (checked[item.id]) base[item.level] += 1;
    }
    return base;
  }, [checked]);

  function toggle(id: string) {
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  const verdict =
    counts.red > 0
      ? "Red flags ticked — pause and verify hard before paying."
      : counts.amber >= 3
        ? "Several amber signals — get answers in writing."
        : counts.green > 0
          ? "Green signals looking healthier — still read the agreement."
          : "Tick what you noticed on your visit.";

  return (
    <div className="not-prose space-y-4 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 sm:p-5">
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setFilter("all")}
          className={`rounded-full px-3 py-1.5 text-xs font-bold ${
            filter === "all"
              ? "bg-[var(--accent)] text-[var(--accent-fg)]"
              : "border border-[var(--border)]"
          }`}
        >
          All
        </button>
        {LEVELS.map((level) => (
          <button
            key={level}
            type="button"
            onClick={() => setFilter(level)}
            className={`rounded-full px-3 py-1.5 text-xs font-bold ${
              filter === level
                ? "bg-[var(--accent)] text-[var(--accent-fg)]"
                : "border border-[var(--border)]"
            }`}
          >
            {PG_FLAG_LEVEL_META[level].title}
          </button>
        ))}
      </div>

      <div className="rounded-xl border border-[var(--border)] p-3 text-sm text-[var(--foreground)]">
        <p className="font-semibold">{verdict}</p>
        <p className="mt-1 text-xs text-[var(--muted)]">
          Ticked — red {counts.red} · amber {counts.amber} · green {counts.green}
        </p>
      </div>

      <div className="space-y-4">
        {LEVELS.filter((level) => filter === "all" || filter === level).map((level) => {
          const meta = PG_FLAG_LEVEL_META[level];
          const items = visible.filter((i) => i.level === level);
          if (items.length === 0) return null;
          return (
            <section key={level}>
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <span
                  className={`rounded-full border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${meta.badgeClass}`}
                >
                  {meta.title}
                </span>
                <span className="text-xs text-[var(--muted)]">{meta.blurb}</span>
              </div>
              <ul className="space-y-2">
                {items.map((item) => (
                  <li key={item.id}>
                    <label className="flex cursor-pointer gap-3 rounded-xl border border-[var(--border)] bg-[var(--background)] px-3 py-3 hover:border-[var(--accent)]">
                      <input
                        type="checkbox"
                        className="mt-1"
                        checked={Boolean(checked[item.id])}
                        onChange={() => toggle(item.id)}
                      />
                      <span>
                        <span className="block text-sm font-semibold text-[var(--foreground)]">
                          {item.label}
                        </span>
                        <span className="mt-1 block text-xs text-[var(--muted)]">
                          {item.detail}
                        </span>
                      </span>
                    </label>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>

      <CopyShareButton
        buildText={() =>
          `Chennai PG / flatmate check: red ${counts.red}, amber ${counts.amber}, green ${counts.green}. ${verdict} Tool: ${getSiteUrl()}${path}`
        }
      />
    </div>
  );
}
