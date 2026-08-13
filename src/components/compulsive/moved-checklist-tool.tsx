"use client";

import { useEffect, useMemo, useState } from "react";
import { CopyShareButton } from "@/components/compulsive/copy-share-button";
import {
  MOVED_CHECKLIST_SECTIONS,
  MOVED_CHECKLIST_STORAGE_KEY,
} from "@/content/compulsive/moved-checklist";
import { compulsivePath } from "@/content/compulsive/index";
import { getSiteUrl } from "@/lib/env";

function loadChecked(): Record<string, boolean> {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(MOVED_CHECKLIST_STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as unknown;
    if (!parsed || typeof parsed !== "object") return {};
    return parsed as Record<string, boolean>;
  } catch {
    return {};
  }
}

export function MovedChecklistTool() {
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [ready, setReady] = useState(false);
  const path = compulsivePath("moved-checklist");

  useEffect(() => {
    setChecked(loadChecked());
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      window.localStorage.setItem(MOVED_CHECKLIST_STORAGE_KEY, JSON.stringify(checked));
    } catch {
      /* ignore quota */
    }
  }, [checked, ready]);

  const totals = useMemo(() => {
    let done = 0;
    let total = 0;
    for (const section of MOVED_CHECKLIST_SECTIONS) {
      for (const item of section.items) {
        total += 1;
        if (checked[item.id]) done += 1;
      }
    }
    return { done, total };
  }, [checked]);

  function toggle(id: string) {
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  function resetAll() {
    setChecked({});
  }

  return (
    <div className="not-prose space-y-4 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 sm:p-5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-sm text-[var(--muted)]">
          Progress:{" "}
          <span className="font-bold text-[var(--foreground)]">
            {totals.done}/{totals.total}
          </span>
          {!ready ? " · loading…" : " · saved in this browser"}
        </p>
        <button
          type="button"
          onClick={resetAll}
          className="rounded-lg border border-[var(--border)] px-3 py-1.5 text-xs font-bold text-[var(--foreground)] hover:border-[var(--accent)]"
        >
          Reset
        </button>
      </div>

      <div className="space-y-5">
        {MOVED_CHECKLIST_SECTIONS.map((section) => {
          const sectionDone = section.items.filter((i) => checked[i.id]).length;
          return (
            <section key={section.id} className="rounded-xl border border-[var(--border)] p-3 sm:p-4">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="text-sm font-bold text-[var(--foreground)]">{section.title}</h3>
                <span className="text-xs text-[var(--muted)]">
                  {sectionDone}/{section.items.length}
                </span>
              </div>
              <p className="mt-1 text-xs text-[var(--muted)]">{section.blurb}</p>
              <ul className="mt-3 space-y-2">
                {section.items.map((item) => (
                  <li key={item.id}>
                    <label className="flex cursor-pointer gap-3 rounded-lg px-1 py-1.5 hover:bg-[color-mix(in_srgb,var(--accent)_6%,transparent)]">
                      <input
                        type="checkbox"
                        className="mt-1"
                        checked={Boolean(checked[item.id])}
                        onChange={() => toggle(item.id)}
                      />
                      <span>
                        <span
                          className={`block text-sm font-semibold ${
                            checked[item.id]
                              ? "text-[var(--muted)] line-through"
                              : "text-[var(--foreground)]"
                          }`}
                        >
                          {item.label}
                        </span>
                        {item.hint ? (
                          <span className="mt-0.5 block text-xs text-[var(--muted)]">
                            {item.hint}
                          </span>
                        ) : null}
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
          `Moved to Chennai checklist: ${totals.done}/${totals.total} done. Keep going: ${getSiteUrl()}${path}`
        }
      />
    </div>
  );
}
