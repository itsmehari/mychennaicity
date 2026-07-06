import type { GoldRateSnapshotView } from "@/domains/gold-rate";
import { formatInrPerGram, formatInrWhole } from "@/lib/gold-rate/format-inr";
import { formatIndiaLongDate } from "@/lib/presentation-dates";

type Props = {
  snapshot: GoldRateSnapshotView;
};

export function GoldRateAnswerBox({ snapshot }: Props) {
  const dateLabel = formatIndiaLongDate(new Date(`${snapshot.rateDate}T12:00:00+05:30`));
  const silverLine =
    snapshot.silverPerGram != null
      ? ` Silver is ${formatInrPerGram(snapshot.silverPerGram)}.`
      : "";

  return (
    <section
      className="rounded-2xl border border-[color-mix(in_srgb,var(--accent)_25%,var(--border))] bg-[color-mix(in_srgb,var(--accent)_6%,var(--surface))] p-5 sm:p-6"
      aria-label="Today's gold rate summary"
    >
      <p className="text-sm leading-relaxed text-[var(--foreground)] sm:text-base">
        <strong>Chennai gold rate today ({dateLabel}):</strong> 24 carat gold is{" "}
        {formatInrPerGram(snapshot.rate24kPerGram)}, 22 carat is{" "}
        {formatInrPerGram(snapshot.rate22kPerGram)}, and 18 carat is{" "}
        {formatInrPerGram(snapshot.rate18kPerGram)}.{silverLine} Rates are
        indicative retail benchmarks for Greater Chennai — confirm at the shop
        before you pay.
      </p>
      <p className="mt-3 text-xs text-[var(--muted)]">
        Last updated{" "}
        {snapshot.fetchedAt.toLocaleString("en-IN", {
          timeZone: "Asia/Kolkata",
          dateStyle: "medium",
          timeStyle: "short",
        })}{" "}
        IST · Source: {snapshot.sourceName}
        {snapshot.isFallback ? " · preview data" : ""}
      </p>
    </section>
  );
}

export function buildGoldRateMetaDescription(snapshot: GoldRateSnapshotView): string {
  const dateLabel = formatIndiaLongDate(new Date(`${snapshot.rateDate}T12:00:00+05:30`));
  return `Chennai gold rate today (${dateLabel}): 24K ${formatInrWhole(snapshot.rate24kPerGram)}/g, 22K ${formatInrWhole(snapshot.rate22kPerGram)}/g, 18K ${formatInrWhole(snapshot.rate18kPerGram)}/g. Jewellery bill calculator and buyer guide on mychennaicity.in.`;
}
