import { describe, expect, it } from "vitest";
import {
  calculateJewelleryBill,
  gramsFromBudget,
} from "./jewellery-calculator";
import {
  computeRateDelta,
  derivePurityRatesFrom24k,
  sovereignValue,
} from "./purity-math";
import { previousIstCalendarDate } from "./ist-date";
import {
  computeInrPerGramFromUsdTroyOz,
  computeRetailRatesFromSpot,
  isGoldRateSnapshotStale,
} from "./spot-math";

describe("derivePurityRatesFrom24k", () => {
  it("derives 22K and 18K from 24K", () => {
    const r = derivePurityRatesFrom24k(14_946);
    expect(r.rate24kPerGram).toBe(14_946);
    expect(r.rate22kPerGram).toBe(13_701);
    expect(r.rate18kPerGram).toBe(11_210);
  });
});

describe("sovereignValue", () => {
  it("multiplies by 8 grams", () => {
    expect(sovereignValue(13_700)).toBe(109_600);
  });
});

describe("computeRateDelta", () => {
  it("detects upward move", () => {
    expect(computeRateDelta(100, 90)).toEqual({
      amount: 10,
      percent: 11.1,
      direction: "up",
    });
  });
});

describe("calculateJewelleryBill", () => {
  const rates = {
    rate24kPerGram: 14_946,
    rate22kPerGram: 13_700,
    rate18kPerGram: 11_440,
  };

  it("computes making, wastage, and GST", () => {
    const bill = calculateJewelleryBill({
      purity: "22k",
      weightGrams: 10,
      makingMode: "percent",
      makingValue: 12,
      wastagePercent: 5,
      gstPercent: 3,
      rates,
    });
    expect(bill.baseGoldValue).toBe(137_000);
    expect(bill.makingCharges).toBe(16_440);
    expect(bill.wastageCharges).toBe(6_850);
    expect(bill.gstAmount).toBe(4_809);
    expect(bill.totalPayable).toBe(165_099);
  });
});

describe("gramsFromBudget", () => {
  it("returns grams for budget", () => {
    expect(
      gramsFromBudget(137_000, "22k", {
        rate24kPerGram: 14_946,
        rate22kPerGram: 13_700,
        rate18kPerGram: 11_440,
      }),
    ).toBe(10);
  });
});

describe("previousIstCalendarDate", () => {
  it("steps back one day", () => {
    expect(previousIstCalendarDate("2026-07-05")).toBe("2026-07-04");
  });
});

describe("computeRetailRatesFromSpot", () => {
  it("converts USD spot to INR per gram with markup", () => {
    const r = computeRetailRatesFromSpot({
      xauUsdPerTroyOz: 2400,
      xagUsdPerTroyOz: 28,
      usdInr: 85,
      retailMarkupPercent: 0,
    });
    expect(r.rate24kPerGram).toBe(
      computeInrPerGramFromUsdTroyOz(2400, 85, 0),
    );
    expect(r.rate22kPerGram).toBe(Math.round(r.rate24kPerGram * (22 / 24)));
  });
});

describe("isGoldRateSnapshotStale", () => {
  it("flags snapshots older than 36 hours", () => {
    const old = new Date(Date.now() - 40 * 60 * 60 * 1000);
    expect(isGoldRateSnapshotStale(old)).toBe(true);
    expect(isGoldRateSnapshotStale(new Date())).toBe(false);
  });
});
