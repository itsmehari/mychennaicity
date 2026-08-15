"use client";

import { formatInrWhole } from "@/lib/gold-rate/format-inr";

export type GoldHistoryPoint = {
  rateDate: string;
  rate22kPerGram: number;
  rate24kPerGram: number;
};

export function GoldRateHistoryChart({ points }: { points: GoldHistoryPoint[] }) {
  if (points.length < 2) {
    return (
      <p className="text-sm text-[var(--muted)]">
        Not enough daily snapshots yet for a chart. The hub still shows today’s
        rate.
      </p>
    );
  }

  const values = points.map((p) => p.rate22kPerGram);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const span = Math.max(1, max - min);
  const w = 640;
  const h = 180;
  const pad = 8;
  const d = points
    .map((p, i) => {
      const x = pad + (i / (points.length - 1)) * (w - pad * 2);
      const y = h - pad - ((p.rate22kPerGram - min) / span) * (h - pad * 2);
      return `${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`;
    })
    .join(" ");

  return (
    <div>
      <svg
        viewBox={`0 0 ${w} ${h}`}
        className="h-auto w-full"
        role="img"
        aria-label="Chennai 22K gold per gram over recent IST dates"
      >
        <path
          d={d}
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          className="text-[var(--accent)]"
        />
      </svg>
      <p className="mt-2 text-xs text-[var(--muted)]">
        22K ₹/g · {points[0].rateDate} {formatInrWhole(points[0].rate22kPerGram)} →{" "}
        {points[points.length - 1].rateDate}{" "}
        {formatInrWhole(points[points.length - 1].rate22kPerGram)} · source:
        mychennaicity.in daily snapshots
      </p>
    </div>
  );
}
