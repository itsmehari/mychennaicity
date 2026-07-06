import Link from "next/link";
import { CHENNAI_GOLD_RATE_FAQ } from "@/content/gold-rate/chennai-gold-rate-faq";

export function GoldRateEditorialSections() {
  return (
    <>
      <section className="prose prose-sm max-w-none text-[var(--muted)] prose-headings:text-[var(--foreground)] prose-strong:text-[var(--foreground)]">
        <h2>Buying gold in Chennai — what the daily rate does not show</h2>
        <p>
          The per-gram numbers on this page are a starting point. Most Chennai
          shoppers buy <strong>jewellery</strong>, not raw bullion — so the bill
          includes design labour, wastage on some pieces, stones priced
          separately, and GST on the invoice. Festival weeks (Diwali, Tamil
          wedding season, Akshaya Tritiya) often bring foot traffic to corridors
          like T Nagar and George Town; compare making charges, not just the
          headline rate.
        </p>

        <h2>Where Chennai shops and how demand looks</h2>
        <p>
          Retail demand skews toward chains, bangles, rings, and wedding sets.
          Coins and bars are a smaller slice. Established showrooms and
          neighbourhood jewellers both compete — ask for BIS hallmark, a detailed
          invoice, and buy-back terms before you pay a deposit.
        </p>
        <ul>
          <li>
            <Link href="/areas/kodambakkam-t-nagar">Kodambakkam &amp; T Nagar area hub</Link>{" "}
            — dense jewellery retail corridor.
          </li>
          <li>
            <Link href="/chennai-classifieds">Chennai classifieds</Link> — occasional
            pre-owned or service listings from readers.
          </li>
          <li>
            <Link href="/chennai-local-news/topic/economy">Economy desk</Link> — macro
            moves that can ripple into local prices.
          </li>
        </ul>

        <h2>Methodology &amp; disclaimer</h2>
        <p>
          We publish one Chennai snapshot per IST calendar day, sourced from
          widely used Indian bullion benchmarks and rounded for retail
          readability. Numbers are <strong>indicative</strong> — not an offer to
          buy or sell. Always confirm the final quote at the counter. For
          editorial standards see{" "}
          <Link href="/editorial-standards">editorial standards</Link>.
        </p>
      </section>

      <section id="faq" className="scroll-mt-24 mt-12" aria-labelledby="gold-faq-title">
        <h2 id="gold-faq-title" className="type-display text-xl text-[var(--foreground)] sm:text-2xl">
          Frequently asked questions
        </h2>
        <dl className="mt-5 space-y-4">
          {CHENNAI_GOLD_RATE_FAQ.map((item) => (
            <div
              key={item.question}
              className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5"
            >
              <dt className="font-semibold text-[var(--foreground)]">{item.question}</dt>
              <dd className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                {item.answer}
              </dd>
            </div>
          ))}
        </dl>
      </section>
    </>
  );
}
