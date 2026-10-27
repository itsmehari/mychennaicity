"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  HSE_WORKSHEET_CODES,
  HSE_WORKSHEET_FACTORS,
  worksheetGroupHref,
} from "@/content/education/hse-worksheet";

const STORAGE_KEY = "mcc-hse-worksheet-v1";

type Scores = Record<string, Record<string, number>>;

function emptyScores(): Scores {
  const next: Scores = {};
  for (const code of HSE_WORKSHEET_CODES) {
    next[code] = {};
    for (const factor of HSE_WORKSHEET_FACTORS) {
      next[code][factor.id] = 0;
    }
  }
  return next;
}

export function EducationWorksheet() {
  const [scores, setScores] = useState<Scores>(emptyScores);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as Scores;
      setScores({ ...emptyScores(), ...parsed });
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(scores));
    } catch {
      /* ignore */
    }
  }, [scores]);

  const totals = useMemo(() => {
    return HSE_WORKSHEET_CODES.map((code) => {
      const total = HSE_WORKSHEET_FACTORS.reduce(
        (sum, factor) => sum + (scores[code]?.[factor.id] ?? 0),
        0,
      );
      return { code, total };
    }).sort((a, b) => b.total - a.total);
  }, [scores]);

  return (
    <div className="not-prose my-8 overflow-x-auto rounded-2xl border border-[var(--border)]">
      <table className="min-w-full text-left text-sm">
        <thead className="bg-[var(--surface)]">
          <tr>
            <th className="p-3 font-semibold">Check</th>
            {HSE_WORKSHEET_CODES.map((code) => (
              <th key={code} className="p-3 font-semibold">
                <Link href={worksheetGroupHref(code)}>{code}</Link>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {HSE_WORKSHEET_FACTORS.map((factor) => (
            <tr key={factor.id} className="border-t border-[var(--border)]">
              <th className="p-3 align-top font-medium">{factor.label}</th>
              {HSE_WORKSHEET_CODES.map((code) => (
                <td key={code} className="p-2">
                  <label className="sr-only" htmlFor={`${code}-${factor.id}`}>
                    {code} {factor.label}
                  </label>
                  <select
                    id={`${code}-${factor.id}`}
                    className="w-16 rounded-md border border-[var(--border)] bg-[var(--background)] p-1"
                    value={scores[code]?.[factor.id] ?? 0}
                    onChange={(event) => {
                      const value = Number(event.target.value);
                      setScores((prev) => ({
                        ...prev,
                        [code]: { ...prev[code], [factor.id]: value },
                      }));
                    }}
                  >
                    <option value={0}>—</option>
                    {[1, 2, 3, 4, 5].map((n) => (
                      <option key={n} value={n}>
                        {n}
                      </option>
                    ))}
                  </select>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="border-t border-[var(--border)] bg-[var(--surface)]">
            <th className="p-3">Total</th>
            {HSE_WORKSHEET_CODES.map((code) => {
              const row = totals.find((t) => t.code === code);
              return (
                <td key={code} className="p-3 font-bold">
                  {row?.total ?? 0}
                </td>
              );
            })}
          </tr>
        </tfoot>
      </table>
      <p className="p-3 text-sm text-[var(--muted)]">
        Highest in this browser:{" "}
        <Link href={worksheetGroupHref(totals[0]?.code ?? "2502")}>
          {totals[0]?.code}
        </Link>{" "}
        ({totals[0]?.total ?? 0}). Scores never leave this device.
      </p>
    </div>
  );
}
