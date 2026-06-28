"use client";

import { useId, useState } from "react";

type ChecklistJson = {
  type: "checklist";
  title: string;
  items: { id: string; label: string }[];
};

type PollJson = {
  type: "poll";
  question: string;
  options: { id: string; label: string }[];
};

type TakeawaysJson = {
  type: "takeaways";
  title?: string;
  items: string[];
};

type FaqBlockJson = {
  type: "faq";
  items: { question: string; answer: string }[];
};

type HowToBlockJson = {
  type: "howto";
  name?: string;
  steps: { name: string; text: string }[];
};

function FaqAccordion({ items }: { items: FaqBlockJson["items"] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="civic-faq" aria-label="Frequently asked questions">
      <h2 className="civic-faq__title">FAQ</h2>
      <div>
        {items.map((item, i) => {
          const isOpen = openIndex === i;
          return (
            <div
              key={i}
              className="civic-faq__item"
              data-open={isOpen ? "true" : "false"}
            >
              <button
                type="button"
                className="civic-faq__question"
                aria-expanded={isOpen}
                onClick={() => setOpenIndex(isOpen ? null : i)}
              >
                <span>{item.question}</span>
                <span className="civic-faq__chevron" aria-hidden>
                  ▾
                </span>
              </button>
              {isOpen ? (
                <p className="civic-faq__answer">{item.answer}</p>
              ) : null}
            </div>
          );
        })}
      </div>
    </section>
  );
}

function StepGuide({
  title,
  steps,
}: {
  title: string;
  steps: HowToBlockJson["steps"];
}) {
  return (
    <aside className="civic-steps" aria-label={title}>
      <h2 className="civic-steps__title">{title}</h2>
      <ol className="civic-steps__list">
        {steps.map((step, i) => (
          <li key={i} className="civic-steps__step">
            <span className="civic-steps__number">{i + 1}</span>
            <div>
              <p className="civic-steps__name">{step.name}</p>
              <p className="civic-steps__text">{step.text}</p>
            </div>
          </li>
        ))}
      </ol>
    </aside>
  );
}

export function InteractiveBlock({
  data,
  variant = "default",
}: {
  data: Record<string, unknown> | null | undefined;
  variant?: "default" | "faq-only" | "howto-only";
}) {
  if (!data || typeof data !== "object" || !("type" in data)) {
    return null;
  }
  const t = data.type as string;

  if (t === "checklist") {
    const c = data as unknown as ChecklistJson;
    if (!c.items?.length) return null;
    return (
      <aside className="civic-prose-advisory" aria-label="Interactive checklist">
        <p className="text-[0.625rem] font-bold uppercase tracking-[0.14em] text-[var(--accent-warm)]">
          Reader checklist
        </p>
        <h2 className="mt-2 text-base font-semibold text-[var(--foreground)]">
          {c.title}
        </h2>
        <ul className="mt-4 space-y-2">
          {c.items.map((item) => (
            <li
              key={item.id}
              className="flex gap-3 py-2 text-sm leading-relaxed text-[var(--foreground)]"
            >
              <input
                id={`chk-${item.id}`}
                type="checkbox"
                className="mt-0.5 h-4 w-4 shrink-0 rounded border-[var(--border)] text-[var(--accent)] focus:ring-[var(--accent)]"
              />
              <label htmlFor={`chk-${item.id}`}>{item.label}</label>
            </li>
          ))}
        </ul>
      </aside>
    );
  }

  if (t === "poll") {
    const p = data as unknown as PollJson;
    if (!p.options?.length) return null;
    return <PollBlock question={p.question} options={p.options} />;
  }

  if (t === "takeaways") {
    const tk = data as unknown as TakeawaysJson;
    if (!tk.items?.length) return null;
    return (
      <aside className="civic-quick-summary" aria-label="Key takeaways">
        <h2 className="civic-quick-summary__title">
          {tk.title?.trim() || "Quick Summary"}
        </h2>
        <ul className="civic-quick-summary__list">
          {tk.items.map((line, i) => (
            <li key={i}>{line}</li>
          ))}
        </ul>
      </aside>
    );
  }

  if (t === "faq") {
    const f = data as unknown as FaqBlockJson;
    if (!f.items?.length) return null;
    if (variant === "howto-only") return null;
    return <FaqAccordion items={f.items} />;
  }

  if (t === "howto") {
    const h = data as unknown as HowToBlockJson;
    if (!h.steps?.length) return null;
    if (variant === "faq-only") return null;
    return (
      <StepGuide
        title={h.name?.trim() || "Step-by-step guide"}
        steps={h.steps}
      />
    );
  }

  return null;
}

function PollBlock({
  question,
  options,
}: {
  question: string;
  options: { id: string; label: string }[];
}) {
  const gid = useId();
  const [picked, setPicked] = useState<string | null>(null);
  return (
    <aside
      className="civic-prose-advisory"
      aria-label="Reader poll"
    >
      <h2 className="text-base font-semibold text-[var(--foreground)]">
        {question}
      </h2>
      <p className="mt-1 text-xs text-[var(--muted)]">
        Informal pulse — results are not scientifically weighted.
      </p>
      <div className="mt-4 space-y-2" role="radiogroup" aria-label={question}>
        {options.map((opt) => {
          const inputId = `${gid}-${opt.id}`;
          return (
            <div key={opt.id} className="flex items-center gap-2">
              <input
                id={inputId}
                type="radio"
                name={`poll-${gid}`}
                checked={picked === opt.id}
                onChange={() => setPicked(opt.id)}
                className="h-4 w-4 border-[var(--border)] text-[var(--accent)] focus:ring-[var(--accent)]"
              />
              <label htmlFor={inputId} className="text-sm text-[var(--foreground)]">
                {opt.label}
              </label>
            </div>
          );
        })}
      </div>
      {picked ? (
        <p className="mt-3 text-xs text-[var(--muted)]">
          Thanks — share this story if the topic matters to your neighbourhood
          group (canonical URL, not screenshots).
        </p>
      ) : null}
    </aside>
  );
}
