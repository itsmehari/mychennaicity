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
