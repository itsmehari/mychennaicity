import type { FestivalFaqItem } from "@/content/special-events/types";

type Props = {
  tips: string[];
  faq: FestivalFaqItem[];
};

export function PracticalAndFaq({ tips, faq }: Props) {
  return (
    <>
      <section
        id="practical"
        className="mt-12 scroll-mt-24"
        aria-labelledby="practical-heading"
      >
        <h2
          id="practical-heading"
          className="type-display text-xl font-semibold text-[var(--foreground)] sm:text-2xl"
        >
          Before you go
        </h2>
        <ul className="mt-4 max-w-2xl space-y-3 text-sm leading-relaxed text-[var(--muted)]">
          {tips.map((t, i) => (
            <li key={i}>
              <span className="text-[var(--foreground)]">•</span> {t}
            </li>
          ))}
        </ul>
      </section>
      <section
        id="faq"
        className="mt-12 scroll-mt-24"
        aria-labelledby="faq-heading"
      >
        <h2
          id="faq-heading"
          className="type-display text-xl font-semibold text-[var(--foreground)] sm:text-2xl"
        >
          Frequently asked questions
        </h2>
        <dl className="mt-6 space-y-6">
          {faq.map((item, i) => (
            <div key={i}>
              <dt className="font-semibold text-[var(--foreground)]">
                {item.question}
              </dt>
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
