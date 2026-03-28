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

export function InteractiveBlock({
  data,
}: {
  data: Record<string, unknown> | null | undefined;
}) {
  if (!data || typeof data !== "object" || !("type" in data)) {
    return null;
  }
  const t = data.type as string;
  if (t === "checklist") {
    const c = data as unknown as ChecklistJson;
    if (!c.items?.length) return null;
    return (
      <aside
        className="rounded-2xl border border-[var(--border)] bg-[color-mix(in_srgb,var(--accent)_8%,var(--surface))] p-5"
        aria-label="Interactive checklist"
      >
        <h2 className="text-sm font-semibold text-[var(--foreground)]">
          {c.title}
        </h2>
        <ul className="mt-3 space-y-2">
          {c.items.map((item) => (
            <li key={item.id} className="flex gap-2 text-sm">
              <input
                id={`chk-${item.id}`}
                type="checkbox"
                className="mt-0.5 h-4 w-4 shrink-0 rounded border-[var(--border)] text-[var(--accent)] focus:ring-[var(--accent)]"
              />
              <label htmlFor={`chk-${item.id}`} className="text-[var(--foreground)]">
                {item.label}
              </label>
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
      <aside
        className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 ring-1 ring-[color-mix(in_srgb,var(--foreground)_6%,transparent)]"
        aria-label="Key takeaways"
      >
        <h2 className="text-sm font-semibold text-[var(--foreground)]">
          {tk.title?.trim() || "Key takeaways"}
        </h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-[var(--foreground)]">
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
    return (
      <aside
        className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5"
        aria-label="Frequently asked questions"
      >
        <h2 className="text-sm font-semibold text-[var(--foreground)]">
          Quick answers
        </h2>
        <dl className="mt-4 space-y-4">
          {f.items.map((item, i) => (
            <div key={i}>
              <dt className="text-sm font-medium text-[var(--foreground)]">
                {item.question}
              </dt>
              <dd className="mt-1 text-sm leading-relaxed text-[var(--muted)]">
                {item.answer}
              </dd>
            </div>
          ))}
        </dl>
      </aside>
    );
  }
  if (t === "howto") {
    const h = data as unknown as HowToBlockJson;
    if (!h.steps?.length) return null;
    return (
      <aside
        className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5"
        aria-label={h.name?.trim() || "How to"}
      >
        <h2 className="text-sm font-semibold text-[var(--foreground)]">
          {h.name?.trim() || "Steps"}
        </h2>
        <ol className="mt-4 list-decimal space-y-3 pl-5 text-sm text-[var(--foreground)]">
          {h.steps.map((s, i) => (
            <li key={i}>
              <span className="font-medium">{s.name}</span>
              <span className="mt-1 block font-normal text-[var(--muted)]">
                {s.text}
              </span>
            </li>
          ))}
        </ol>
      </aside>
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
      className="rounded-2xl border border-dashed border-[var(--accent)] bg-[var(--surface)] p-5"
      aria-label="Reader poll"
    >
      <h2 className="text-sm font-semibold text-[var(--foreground)]">
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
          Thanks — share this story if the topic matters to your neighbourhood group
          (canonical URL, not screenshots).
        </p>
      ) : null}
    </aside>
  );
}
