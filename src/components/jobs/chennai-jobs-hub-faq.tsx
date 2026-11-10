"use client";

import { useState } from "react";
import { CHENNAI_JOBS_HUB_FAQ } from "@/content/jobs/chennai-jobs-hub-faq";

const FAQ_GROUPS = [
  { id: "finding", label: "Finding work", indexes: [0, 1, 5] },
  { id: "employers", label: "Employers", indexes: [2, 3] },
  { id: "safety", label: "Safety", indexes: [4] },
] as const;

export function ChennaiJobsHubFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [group, setGroup] = useState<(typeof FAQ_GROUPS)[number]["id"]>("finding");
  const visible = new Set(
    FAQ_GROUPS.find((item) => item.id === group)?.indexes ?? [],
  );

  return (
    <section
      id="jobs-hub-faq"
      aria-labelledby="jobs-hub-faq-heading"
      className="mt-14"
    >
      <h2
        id="jobs-hub-faq-heading"
        className="text-2xl font-semibold tracking-tight text-[#16161d] sm:text-3xl"
      >
        Questions before you <span className="text-[#5b4dff] italic">apply</span>
      </h2>
      <p className="mt-2 max-w-2xl text-sm text-[#5c5872]">
        How hiring works on this board — fees, applications, and what we do not
        handle.
      </p>
      <div className="mt-4 flex flex-wrap gap-2" role="tablist" aria-label="Question groups">
        {FAQ_GROUPS.map((item) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={group === item.id}
            onClick={() => {
              setGroup(item.id);
              setOpenIndex(item.indexes[0] ?? null);
            }}
            className={
              group === item.id
                ? "rounded-full bg-[#16161d] px-4 py-2 text-sm font-semibold text-white"
                : "rounded-full border border-[#e4e1ee] bg-white px-4 py-2 text-sm font-semibold text-[#3c3954]"
            }
          >
            {item.label}
          </button>
        ))}
      </div>
      <div className="mt-4 divide-y divide-[#eceaf3] overflow-hidden rounded-3xl border border-[#eceaf3] bg-white">
        {CHENNAI_JOBS_HUB_FAQ.map((item, i) => {
          const open = openIndex === i;
          const panelId = `jobs-hub-faq-panel-${i}`;
          const btnId = `jobs-hub-faq-btn-${i}`;
          return (
            <div key={item.question} hidden={!visible.has(i)}>
              <h3>
                <button
                  id={btnId}
                  type="button"
                  className="flex w-full items-start justify-between gap-4 px-5 py-4 text-left text-sm font-semibold text-[#16161d] transition hover:bg-[#f7f6fb] sm:px-6"
                  aria-expanded={open}
                  aria-controls={panelId}
                  onClick={() => setOpenIndex(open ? null : i)}
                >
                  <span>{item.question}</span>
                  <span
                    className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#f4f1ff] text-sm text-[#5b4dff]"
                    aria-hidden
                  >
                    {open ? "−" : "+"}
                  </span>
                </button>
              </h3>
              <div
                id={panelId}
                role="region"
                aria-labelledby={btnId}
                hidden={!open}
                className="px-5 pb-4 text-sm leading-relaxed text-[#5c5872] sm:px-6"
              >
                <p>{item.answer}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
