"use client";

import { useMemo, useState } from "react";
import { CopyShareButton } from "@/components/compulsive/copy-share-button";
import {
  AFFORD_AREA_BANDS,
  affordVerdict,
  takeHomeFromCtcMonthly,
} from "@/content/compulsive/afford-area";
import { compulsivePath } from "@/content/compulsive/index";
import { getSiteUrl } from "@/lib/env";

function inr(n: number) {
  return `₹${Math.round(n).toLocaleString("en-IN")}`;
}

export function AffordAreaCalculator() {
  const [mode, setMode] = useState<"takehome" | "ctc">("takehome");
  const [takeHome, setTakeHome] = useState(80000);
  const [ctcLakh, setCtcLakh] = useState(18);
  const [takeHomePct, setTakeHomePct] = useState(70);
  const [areaId, setAreaId] = useState("adyar");
  const [rentOverride, setRentOverride] = useState<number | "">("");

  const band = AFFORD_AREA_BANDS.find((b) => b.id === areaId) ?? AFFORD_AREA_BANDS[0];

  const result = useMemo(() => {
    const monthly =
      mode === "takehome"
        ? takeHome
        : takeHomeFromCtcMonthly(ctcLakh * 100000, takeHomePct);
    const rent = rentOverride === "" ? band.rentMid : Number(rentOverride);
    const share = monthly > 0 ? (rent / monthly) * 100 : 0;
    const verdict = affordVerdict(share);
    return { monthly, rent, share, verdict };
  }, [mode, takeHome, ctcLakh, takeHomePct, band, rentOverride]);

  const path = compulsivePath("afford-area");
  const verdictLabel =
    result.verdict === "comfortable"
      ? "Comfortable"
      : result.verdict === "ok"
        ? "Doable with discipline"
        : "Stretch — budget carefully";

  return (
    <div className="not-prose space-y-4 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 sm:p-5">
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          className={`rounded-full px-3 py-1.5 text-xs font-bold ${mode === "takehome" ? "bg-[var(--accent)] text-[var(--accent-fg)]" : "border border-[var(--border)]"}`}
          onClick={() => setMode("takehome")}
        >
          Monthly take-home
        </button>
        <button
          type="button"
          className={`rounded-full px-3 py-1.5 text-xs font-bold ${mode === "ctc" ? "bg-[var(--accent)] text-[var(--accent-fg)]" : "border border-[var(--border)]"}`}
          onClick={() => setMode("ctc")}
        >
          Annual CTC
        </button>
      </div>

      {mode === "takehome" ? (
        <label className="block text-xs font-semibold text-[var(--foreground)]">
          Take-home ₹ / month
          <input
            type="number"
            min={10000}
            className="mt-1 w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm"
            value={takeHome}
            onChange={(e) => setTakeHome(Number(e.target.value) || 0)}
          />
        </label>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="text-xs font-semibold text-[var(--foreground)]">
            CTC (₹ lakh / year)
            <input
              type="number"
              min={1}
              step={0.5}
              className="mt-1 w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm"
              value={ctcLakh}
              onChange={(e) => setCtcLakh(Number(e.target.value) || 0)}
            />
          </label>
          <label className="text-xs font-semibold text-[var(--foreground)]">
            Approx take-home % of CTC
            <input
              type="number"
              min={40}
              max={90}
              className="mt-1 w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm"
              value={takeHomePct}
              onChange={(e) => setTakeHomePct(Number(e.target.value) || 0)}
            />
          </label>
        </div>
      )}

      <label className="block text-xs font-semibold text-[var(--foreground)]">
        Target area
        <select
          className="mt-1 w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm"
          value={areaId}
          onChange={(e) => {
            setAreaId(e.target.value);
            setRentOverride("");
          }}
        >
          {AFFORD_AREA_BANDS.map((b) => (
            <option key={b.id} value={b.id}>
              {b.label} (mid ~{inr(b.rentMid)})
            </option>
          ))}
        </select>
      </label>

      <label className="block text-xs font-semibold text-[var(--foreground)]">
        Rent override ₹ / month (optional)
        <input
          type="number"
          min={5000}
          placeholder={`${band.rentLow} – ${band.rentHigh}`}
          className="mt-1 w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm"
          value={rentOverride}
          onChange={(e) =>
            setRentOverride(e.target.value === "" ? "" : Number(e.target.value) || 0)
          }
        />
      </label>

      <div className="rounded-xl border border-[var(--border)] p-4">
        <p className="text-sm text-[var(--muted)]">
          Planning take-home {inr(result.monthly)} · rent {inr(result.rent)}
        </p>
        <p className="mt-1 text-2xl font-bold text-[var(--foreground)]">
          {result.share.toFixed(0)}% of take-home
        </p>
        <p className="mt-2 font-semibold text-[var(--accent)]">{verdictLabel}</p>
        <p className="mt-1 text-xs text-[var(--muted)]">{band.note}</p>
      </div>

      <CopyShareButton
        buildText={() =>
          `Can I afford ${band.label}? Rent ~${inr(result.rent)} is ~${result.share.toFixed(0)}% of ${inr(result.monthly)} take-home → ${verdictLabel}. ${getSiteUrl()}${path}`
        }
      />
    </div>
  );
}
