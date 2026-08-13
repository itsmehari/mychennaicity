import { compulsivePath } from "@/content/compulsive/index";

export const AC_BILL_PATH = compulsivePath("ac-bill");

/** Rough kWh per ton-hour for planning (not a lab rating). */
export const AC_KWH_PER_TON_HOUR = 1.2;

export const AC_BILL_FAQ = [
  {
    q: "Is this my official TNPDCL bill?",
    a: "No. It is a directional estimate of AC-driven units so you can stress-test habits. Use your bill and the TNPDCL / TNEB slab explainers for real numbers.",
  },
  {
    q: "Why use tonnage × hours?",
    a: "It is a simple household planning model. Inverter efficiency, room size, and outdoor heat change real draw.",
  },
];

/** Very rough incremental ₹ per monthly kWh band for conversation (illustrative). */
export function estimateAcBillInr(monthlyKwh: number): { low: number; high: number } {
  if (monthlyKwh <= 0) return { low: 0, high: 0 };
  // Soft progressive feel — not official tariff tables
  const mid = monthlyKwh * 6.5 + Math.max(0, monthlyKwh - 200) * 2.5;
  return { low: Math.round(mid * 0.85), high: Math.round(mid * 1.2) };
}
