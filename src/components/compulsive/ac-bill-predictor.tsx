"use client";

import { useMemo, useState } from "react";
import { CopyShareButton } from "@/components/compulsive/copy-share-button";
import { AC_KWH_PER_TON_HOUR, estimateAcBillInr } from "@/content/compulsive/ac-bill";
import { compulsivePath } from "@/content/compulsive/index";
import { getSiteUrl } from "@/lib/env";

function inr(n: number) {
  return `₹${Math.round(n).toLocaleString("en-IN")}`;
}

export function AcBillPredictor() {
  const [acs, setAcs] = useState(2);
  const [tons, setTons] = useState(1.5);
  const [hours, setHours] = useState(8);
  const [days, setDays] = useState(30);

  const result = useMemo(() => {
    const kwh = acs * tons * hours * days * AC_KWH_PER_TON_HOUR;
    const bill = estimateAcBillInr(kwh);
    return { kwh: Math.round(kwh), bill };
  }, [acs, tons, hours, days]);

  const path = compulsivePath("ac-bill");

  return (
    <div className="not-prose space-y-4 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 sm:p-5">
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="text-xs font-semibold text-[var(--foreground)]">
          Number of ACs
          <input
            type="number"
            min={1}
            className="mt-1 w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm"
            value={acs}
            onChange={(e) => setAcs(Number(e.target.value) || 0)}
          />
        </label>
        <label className="text-xs font-semibold text-[var(--foreground)]">
          Avg tonnage each
          <input
            type="number"
            min={0.5}
            step={0.1}
            className="mt-1 w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm"
            value={tons}
            onChange={(e) => setTons(Number(e.target.value) || 0)}
          />
        </label>
        <label className="text-xs font-semibold text-[var(--foreground)]">
          Hours / day
          <input
            type="number"
            min={1}
            className="mt-1 w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm"
            value={hours}
            onChange={(e) => setHours(Number(e.target.value) || 0)}
          />
        </label>
        <label className="text-xs font-semibold text-[var(--foreground)]">
          Days / month
          <input
            type="number"
            min={1}
            max={31}
            className="mt-1 w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm"
            value={days}
            onChange={(e) => setDays(Number(e.target.value) || 0)}
          />
        </label>
      </div>

      <div className="rounded-xl border border-[var(--border)] p-4">
        <p className="text-sm text-[var(--muted)]">Directional AC units / month</p>
        <p className="text-2xl font-bold text-[var(--foreground)]">{result.kwh} kWh</p>
        <p className="mt-2 text-sm text-[var(--foreground)]">
          Rough bill impact band: {inr(result.bill.low)} – {inr(result.bill.high)} (not a TNPDCL
          estimate).
        </p>
      </div>

      <CopyShareButton
        buildText={() =>
          `Chennai AC stress test: ${acs}×${tons}T, ${hours}h × ${days}d ≈ ${result.kwh} kWh/month → rough ₹${result.bill.low}–${result.bill.high}. Tool: ${getSiteUrl()}${path}`
        }
      />
    </div>
  );
}
