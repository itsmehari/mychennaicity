"use client";

import { useMemo, useState } from "react";
import type { GoldRateSnapshotView } from "@/domains/gold-rate";
import { formatInrWhole } from "@/lib/gold-rate/format-inr";
import {
  calculateJewelleryBill,
  gramsFromBudget,
  type MakingChargeMode,
} from "@/lib/gold-rate/jewellery-calculator";
import type { GoldPurity } from "@/lib/gold-rate/purity-math";

type Props = {
  snapshot: GoldRateSnapshotView;
};

const PURITY_OPTIONS: { value: GoldPurity; label: string }[] = [
  { value: "24k", label: "24K" },
  { value: "22k", label: "22K" },
  { value: "18k", label: "18K" },
];

export function GoldRateCalculators({ snapshot }: Props) {
  const rates = useMemo(
    () => ({
      rate24kPerGram: snapshot.rate24kPerGram,
      rate22kPerGram: snapshot.rate22kPerGram,
      rate18kPerGram: snapshot.rate18kPerGram,
    }),
    [
      snapshot.rate24kPerGram,
      snapshot.rate22kPerGram,
      snapshot.rate18kPerGram,
    ],
  );

  const [purity, setPurity] = useState<GoldPurity>("22k");
  const [weight, setWeight] = useState("10");
  const [makingMode, setMakingMode] = useState<MakingChargeMode>("percent");
  const [makingValue, setMakingValue] = useState("12");
  const [wastage, setWastage] = useState("5");
  const [gst, setGst] = useState("3");
  const [budget, setBudget] = useState("150000");

  const bill = useMemo(() => {
    const weightGrams = parseFloat(weight) || 0;
    const making = parseFloat(makingValue) || 0;
    return calculateJewelleryBill({
      purity,
      weightGrams,
      makingMode,
      makingValue: making,
      wastagePercent: parseFloat(wastage) || 0,
      gstPercent: parseFloat(gst) || 0,
      rates,
    });
  }, [purity, weight, makingMode, makingValue, wastage, gst, rates]);

  const grams = useMemo(() => {
    return gramsFromBudget(parseFloat(budget) || 0, purity, rates);
  }, [budget, purity, rates]);

  return (
    <section id="calculator" className="scroll-mt-24" aria-labelledby="gold-calculator-title">
      <h2 id="gold-calculator-title" className="type-display text-xl text-[var(--foreground)] sm:text-2xl">
        Jewellery bill calculator
      </h2>
      <p className="mt-2 max-w-3xl text-sm text-[var(--muted)]">
        Estimate what you might pay at a Chennai counter — gold value, making,
        wastage, and GST. This is not a quote from any shop; use it to compare
        bills before you buy.
      </p>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <form
          className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-sm"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block text-sm">
              <span className="font-semibold text-[var(--foreground)]">Purity</span>
              <select
                className="mt-1.5 w-full rounded-xl border border-[var(--border)] bg-[var(--background)] px-3 py-2.5"
                value={purity}
                onChange={(e) => setPurity(e.target.value as GoldPurity)}
              >
                {PURITY_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="block text-sm">
              <span className="font-semibold text-[var(--foreground)]">Weight (grams)</span>
              <input
                type="number"
                min="0"
                step="0.01"
                className="mt-1.5 w-full rounded-xl border border-[var(--border)] bg-[var(--background)] px-3 py-2.5 tabular-nums"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />
            </label>

            <label className="block text-sm">
              <span className="font-semibold text-[var(--foreground)]">Making charges</span>
              <div className="mt-1.5 flex gap-2">
                <select
                  className="rounded-xl border border-[var(--border)] bg-[var(--background)] px-2 py-2.5 text-sm"
                  value={makingMode}
                  onChange={(e) => setMakingMode(e.target.value as MakingChargeMode)}
                >
                  <option value="percent">%</option>
                  <option value="per_gram">₹/g</option>
                </select>
                <input
                  type="number"
                  min="0"
                  step="0.1"
                  className="min-w-0 flex-1 rounded-xl border border-[var(--border)] bg-[var(--background)] px-3 py-2.5 tabular-nums"
                  value={makingValue}
                  onChange={(e) => setMakingValue(e.target.value)}
                />
              </div>
            </label>

            <label className="block text-sm">
              <span className="font-semibold text-[var(--foreground)]">Wastage (%)</span>
              <input
                type="number"
                min="0"
                step="0.1"
                className="mt-1.5 w-full rounded-xl border border-[var(--border)] bg-[var(--background)] px-3 py-2.5 tabular-nums"
                value={wastage}
                onChange={(e) => setWastage(e.target.value)}
              />
            </label>

            <label className="block text-sm sm:col-span-2">
              <span className="font-semibold text-[var(--foreground)]">GST (%)</span>
              <input
                type="number"
                min="0"
                step="0.1"
                className="mt-1.5 w-full rounded-xl border border-[var(--border)] bg-[var(--background)] px-3 py-2.5 tabular-nums"
                value={gst}
                onChange={(e) => setGst(e.target.value)}
              />
            </label>
          </div>
        </form>

        <div className="rounded-2xl border border-[var(--border)] bg-[color-mix(in_srgb,var(--accent)_5%,var(--surface))] p-5">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-[var(--accent)]">
            Estimated bill
          </h3>
          <dl className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between gap-4">
              <dt className="text-[var(--muted)]">Gold rate used</dt>
              <dd className="font-semibold tabular-nums">{formatInrWhole(bill.ratePerGram)}/g</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-[var(--muted)]">Base gold value</dt>
              <dd className="font-semibold tabular-nums">{formatInrWhole(bill.baseGoldValue)}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-[var(--muted)]">Making charges</dt>
              <dd className="font-semibold tabular-nums">{formatInrWhole(bill.makingCharges)}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-[var(--muted)]">Wastage</dt>
              <dd className="font-semibold tabular-nums">{formatInrWhole(bill.wastageCharges)}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-[var(--muted)]">GST</dt>
              <dd className="font-semibold tabular-nums">{formatInrWhole(bill.gstAmount)}</dd>
            </div>
            <div className="flex justify-between gap-4 border-t border-[var(--border)] pt-3 text-base">
              <dt className="font-semibold text-[var(--foreground)]">Total payable</dt>
              <dd className="font-bold tabular-nums text-[var(--foreground)]">
                {formatInrWhole(bill.totalPayable)}
              </dd>
            </div>
          </dl>
        </div>
      </div>

      <div
        id="budget-calculator"
        className="mt-8 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-sm"
      >
        <h3 className="text-lg font-semibold text-[var(--foreground)]">
          How much gold for your budget?
        </h3>
        <p className="mt-1 text-sm text-[var(--muted)]">
          Gold weight only — excludes making charges and GST you will pay at the shop.
        </p>
        <div className="mt-4 flex flex-wrap items-end gap-3">
          <label className="block min-w-[12rem] flex-1 text-sm">
            <span className="font-semibold text-[var(--foreground)]">Budget (INR)</span>
            <input
              type="number"
              min="0"
              className="mt-1.5 w-full rounded-xl border border-[var(--border)] bg-[var(--background)] px-3 py-2.5 tabular-nums"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
            />
          </label>
          <p className="text-sm text-[var(--muted)]">
            ≈{" "}
            <strong className="text-lg text-[var(--foreground)]">{grams} g</strong>{" "}
            of {purity.toUpperCase()} at today&apos;s rate
          </p>
        </div>
      </div>
    </section>
  );
}
