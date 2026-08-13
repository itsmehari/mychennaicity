"use client";

import { useEffect, useMemo, useState } from "react";
import { CopyShareButton } from "@/components/compulsive/copy-share-button";
import {
  PROPERTY_TAX_CHECKLIST,
  PROPERTY_TAX_OFFICIAL_NOTE,
  PROPERTY_TAX_PORTAL_URL,
} from "@/content/compulsive/property-tax";
import { compulsivePath } from "@/content/compulsive/index";
import { getSiteUrl } from "@/lib/env";

const STORAGE_KEY = "mcc-property-tax-checklist-v1";

type CheckedMap = Record<string, boolean>;

export function PropertyTaxChecklist() {
  const [checked, setChecked] = useState<CheckedMap>({});
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) setChecked(JSON.parse(raw) as CheckedMap);
      } catch {
        /* ignore */
      }
      setHydrated(true);
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(checked));
    } catch {
      /* ignore */
    }
  }, [checked, hydrated]);

  const doneCount = useMemo(
    () => PROPERTY_TAX_CHECKLIST.filter((item) => checked[item.id]).length,
    [checked],
  );

  const path = compulsivePath("property-tax");

  function toggle(id: string) {
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  function reset() {
    setChecked({});
  }

  return (
    <div className="not-prose space-y-4">
      <p className="rounded-lg border border-amber-500/30 bg-amber-500/10 px-3 py-2 text-xs leading-relaxed text-[var(--foreground)]">
        <strong>Official portal:</strong> {PROPERTY_TAX_OFFICIAL_NOTE}
      </p>

      <div className="flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3">
        <p className="text-sm text-[var(--muted)]">
          Progress{" "}
          <strong className="text-[var(--foreground)]">
            {doneCount}/{PROPERTY_TAX_CHECKLIST.length}
          </strong>
          {hydrated ? " · saved in this browser" : ""}
        </p>
        <div className="flex flex-wrap gap-2">
          <a
            href={PROPERTY_TAX_PORTAL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg border border-[var(--border)] px-3 py-1.5 text-xs font-bold text-[var(--accent)] hover:border-[var(--accent)]"
          >
            Open GCC civic services
          </a>
          <button
            type="button"
            onClick={reset}
            className="rounded-lg border border-[var(--border)] px-3 py-1.5 text-xs font-bold text-[var(--muted)] hover:border-[var(--accent)]"
          >
            Reset
          </button>
        </div>
      </div>

      <ul className="space-y-3">
        {PROPERTY_TAX_CHECKLIST.map((item) => {
          const on = Boolean(checked[item.id]);
          return (
            <li
              key={item.id}
              className={`rounded-2xl border p-4 sm:p-5 ${
                on
                  ? "border-[var(--accent)]/40 bg-[var(--accent)]/5"
                  : "border-[var(--border)] bg-[var(--surface)]"
              }`}
            >
              <label className="flex cursor-pointer gap-3">
                <input
                  type="checkbox"
                  className="mt-1 h-4 w-4 accent-[var(--accent)]"
                  checked={on}
                  onChange={() => toggle(item.id)}
                />
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-bold text-[var(--foreground)]">
                    {item.title}
                  </span>
                  <span className="mt-1 block text-sm text-[var(--muted)]">{item.summary}</span>
                </span>
              </label>
              <div className="mt-3 space-y-2 border-t border-[var(--border)] pt-3 text-sm">
                <p className="text-[var(--muted)]">
                  <strong className="text-[var(--foreground)]">Why it matters:</strong>{" "}
                  {item.whyItMatters}
                </p>
                <p className="text-[var(--muted)]">
                  <strong className="text-[var(--foreground)]">Do next:</strong> {item.doNext}
                </p>
              </div>
            </li>
          );
        })}
      </ul>

      <CopyShareButton
        buildText={() =>
          `Chennai property-tax overpay checklist (${doneCount}/${PROPERTY_TAX_CHECKLIST.length} checked) — verify on GCC portal: ${getSiteUrl()}${path}`
        }
      />
    </div>
  );
}
