import type { GoldRateSnapshotView } from "@/domains/gold-rate";
import { formatInrPerGram, formatInrWhole } from "@/lib/gold-rate/format-inr";
import {
  computeRateDelta,
  sovereignValue,
  type RateDelta,
} from "@/lib/gold-rate/purity-math";
import { GoldRateTrendBadge } from "./gold-rate-trend-badge";

type Props = {
  snapshot: GoldRateSnapshotView;
  previous: GoldRateSnapshotView | null;
};

type Card = {
  id: string;
  label: string;
  purity: string;
  rate: number;
  sovereign?: number;
  delta: RateDelta | null;
};

function buildCards(snapshot: GoldRateSnapshotView, previous: GoldRateSnapshotView | null): Card[] {
  const prev = previous;
  const cards: Card[] = [
    {
      id: "24k",
      label: "24K gold",
      purity: "99.9% purity",
      rate: snapshot.rate24kPerGram,
      sovereign: sovereignValue(snapshot.rate24kPerGram),
      delta: computeRateDelta(snapshot.rate24kPerGram, prev?.rate24kPerGram ?? null),
    },
    {
      id: "22k",
      label: "22K gold",
      purity: "91.6% purity",
      rate: snapshot.rate22kPerGram,
      sovereign: sovereignValue(snapshot.rate22kPerGram),
      delta: computeRateDelta(snapshot.rate22kPerGram, prev?.rate22kPerGram ?? null),
    },
    {
      id: "18k",
      label: "18K gold",
      purity: "75% purity",
      rate: snapshot.rate18kPerGram,
      delta: computeRateDelta(snapshot.rate18kPerGram, prev?.rate18kPerGram ?? null),
    },
  ];

  if (snapshot.silverPerGram != null) {
    cards.push({
      id: "silver",
      label: "Silver",
      purity: "Retail benchmark",
      rate: snapshot.silverPerGram,
      delta: computeRateDelta(snapshot.silverPerGram, prev?.silverPerGram ?? null),
    });
  }

  if (snapshot.platinumPerGram != null) {
    cards.push({
      id: "platinum",
      label: "Platinum",
      purity: "Retail benchmark",
      rate: snapshot.platinumPerGram,
      delta: computeRateDelta(snapshot.platinumPerGram, prev?.platinumPerGram ?? null),
    });
  }

  return cards;
}

export function GoldRateCards({ snapshot, previous }: Props) {
  const cards = buildCards(snapshot, previous);

  return (
    <section aria-labelledby="gold-rate-cards-title">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 id="gold-rate-cards-title" className="type-display text-xl text-[var(--foreground)] sm:text-2xl">
            Today&apos;s rates per gram
          </h2>
          <p className="mt-1 text-sm text-[var(--muted)]">
            Gold sovereign (8&nbsp;g) shown where relevant for Chennai buyers.
          </p>
        </div>
        {cards[0]?.delta ? (
          <GoldRateTrendBadge delta={cards[0].delta} />
        ) : null}
      </div>

      <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => (
          <li
            key={card.id}
            className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-sm"
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-[var(--accent)]">
              {card.label}
            </p>
            <p className="mt-1 text-xs text-[var(--muted)]">{card.purity}</p>
            <p className="mt-3 text-2xl font-bold tabular-nums text-[var(--foreground)] sm:text-3xl">
              {formatInrPerGram(card.rate)}
            </p>
            {card.sovereign != null ? (
              <p className="mt-2 text-sm text-[var(--muted)]">
                Sovereign (8&nbsp;g):{" "}
                <span className="font-semibold text-[var(--foreground)]">
                  {formatInrWhole(card.sovereign)}
                </span>
              </p>
            ) : null}
            {card.delta && card.id !== "24k" ? (
              <div className="mt-3">
                <GoldRateTrendBadge delta={card.delta} />
              </div>
            ) : null}
          </li>
        ))}
      </ul>
    </section>
  );
}
