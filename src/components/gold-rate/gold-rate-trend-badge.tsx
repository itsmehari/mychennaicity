import type { RateDelta } from "@/lib/gold-rate/purity-math";
import { formatInrWhole } from "@/lib/gold-rate/format-inr";

export function GoldRateTrendBadge({ delta }: { delta: RateDelta | null }) {
  if (!delta) return null;

  const label =
    delta.direction === "flat"
      ? "Unchanged vs previous day"
      : `${delta.direction === "up" ? "Up" : "Down"} ${formatInrWhole(Math.abs(delta.amount))} (${Math.abs(delta.percent)}%) vs previous day`;

  const tone =
    delta.direction === "up"
      ? "text-emerald-700 bg-emerald-50 border-emerald-200"
      : delta.direction === "down"
        ? "text-rose-700 bg-rose-50 border-rose-200"
        : "text-[var(--muted)] bg-[var(--surface)] border-[var(--border)]";

  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold ${tone}`}
    >
      {label}
    </span>
  );
}
