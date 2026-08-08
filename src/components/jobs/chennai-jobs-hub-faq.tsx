"use client";

import { useState } from "react";
import { CHENNAI_JOBS_HUB_FAQ } from "@/content/jobs/chennai-jobs-hub-faq";

export function ChennaiJobsHubFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      id="jobs-hub-faq"
      aria-labelledby="jobs-hub-faq-heading"
      className="mt-14"
    >
      <h2
        id="jobs-hub-faq-heading"
        className="type-display text-2xl text-[var(--foreground)] sm:text-3xl"
      >
        Chennai jobs — common questions
      </h2>
      <p className="type-lede mt-2 max-w-2xl text-sm text-[var(--muted)]">
        How hiring works on this board — the same answers appear in our
        structured data for search and answer engines.
      </p>
      <div className="mt-6 divide-y divide-[var(--border)] rounded-2xl border border-[var(--border)] bg-[var(--surface)]">
        {CHENNAI_JOBS_HUB_FAQ.map((item, i) => {
          const open = openIndex === i;
          const panelId = `jobs-hub-faq-panel-${i}`;
          const btnId = `jobs-hub-faq-btn-${i}`;
          return (
            <div key={item.question}>
              <h3>
                <button
                  id={btnId}
                  type="button"
                  className="flex w-full items-start justify-between gap-4 px-5 py-4 text-left text-sm font-semibold text-[var(--foreground)] transition hover:bg-[color-mix(in_srgb,var(--foreground)_3%,transparent)] sm:px-6"
                  aria-expanded={open}
                  aria-controls={panelId}
                  onClick={() => setOpenIndex(open ? null : i)}
                >
                  <span>{item.question}</span>
                  <span className="mt-0.5 shrink-0 text-[var(--muted)]" aria-hidden>
                    {open ? "−" : "+"}
                  </span>
                </button>
              </h3>
              <div
                id={panelId}
                role="region"
                aria-labelledby={btnId}
                hidden={!open}
                className="px-5 pb-4 text-sm leading-relaxed text-[var(--muted)] sm:px-6"
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
