import Link from "next/link";
import { WHATSAPP_COMMUNITY_PAGE_PATH } from "@/lib/whatsapp-community";
import { formatInrPerGram } from "@/lib/gold-rate/format-inr";
import type { GoldRateSnapshotView } from "@/domains/gold-rate";
import { formatIndiaLongDate } from "@/lib/presentation-dates";

type Props = {
  snapshot: GoldRateSnapshotView;
};

export function GoldRateHubHero({ snapshot }: Props) {
  const dateLabel = formatIndiaLongDate(new Date(`${snapshot.rateDate}T12:00:00+05:30`));
  const shareText = encodeURIComponent(
    `Chennai gold rate today (${dateLabel}): 24K ${formatInrPerGram(snapshot.rate24kPerGram)}, 22K ${formatInrPerGram(snapshot.rate22kPerGram)} — mychennaicity.in/chennai-gold-rate`,
  );

  return (
    <section className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-sm sm:p-8">
      <p className="type-eyebrow text-[var(--accent)]">Chennai buyer&apos;s desk</p>
      <h1 className="type-display mt-2 text-2xl text-[var(--foreground)] sm:text-4xl">
        Chennai gold rate today
      </h1>
      <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[var(--muted)] sm:text-base">
        Daily 24K, 22K, and 18K gold per gram for Greater Chennai — plus a
        jewellery bill calculator and plain answers for shoppers, not traders.
      </p>
      <div className="mt-5 flex flex-wrap gap-3">
        <a href="#calculator" className="rounded-xl bg-[var(--accent)] px-4 py-2.5 text-sm font-semibold text-[var(--background)]">
          Open calculator
        </a>
        <Link
          href={WHATSAPP_COMMUNITY_PAGE_PATH}
          className="rounded-xl border border-[var(--border)] px-4 py-2.5 text-sm font-semibold text-[var(--foreground)]"
        >
          Join reader WhatsApp
        </Link>
        <a
          href={`https://wa.me/?text=${shareText}`}
          className="rounded-xl border border-[var(--border)] px-4 py-2.5 text-sm font-semibold text-[var(--foreground)]"
          target="_blank"
          rel="noopener noreferrer"
        >
          Share today&apos;s rate
        </a>
      </div>
    </section>
  );
}
