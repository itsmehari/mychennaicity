"use client";

import { useState } from "react";
import { CHENNAI_NEWS_HUB_FAQ } from "@/content/news/chennai-news-hub-faq";

export function ChennaiNewsHubFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      id="news-hub-faq"
      aria-labelledby="news-hub-faq-heading"
      className="mcc-news-shelf"
    >
      <h2 id="news-hub-faq-heading" className="mcc-news-section-head" style={{ display: "block" }}>
        <span style={{ fontSize: "1.35rem", fontWeight: 700, letterSpacing: "-0.02em" }}>
          Chennai local news — common questions
        </span>
      </h2>
      <p className="mcc-news-area-strip__intro">
        Plain answers for residents and search — the same text we publish in
        structured data for answer engines.
      </p>
      <div
        className="divide-y rounded-2xl border bg-[var(--mcc-news-surface,#fff)]"
        style={{ borderColor: "var(--mcc-news-border, #e5e2dc)" }}
      >
        {CHENNAI_NEWS_HUB_FAQ.map((item, i) => {
          const open = openIndex === i;
          const panelId = `news-hub-faq-panel-${i}`;
          const btnId = `news-hub-faq-btn-${i}`;
          return (
            <div key={item.question}>
              <h3>
                <button
                  id={btnId}
                  type="button"
                  className="flex w-full items-start justify-between gap-4 px-5 py-4 text-left text-sm font-semibold transition hover:bg-[color-mix(in_srgb,#172120_3%,transparent)] sm:px-6"
                  style={{ color: "var(--mcc-news-ink, #172120)" }}
                  aria-expanded={open}
                  aria-controls={panelId}
                  onClick={() => setOpenIndex(open ? null : i)}
                >
                  <span>{item.question}</span>
                  <span
                    className="mt-0.5 shrink-0"
                    style={{ color: "var(--mcc-news-muted, #68716f)" }}
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
                className="px-5 pb-4 text-sm leading-relaxed sm:px-6"
                style={{ color: "var(--mcc-news-muted, #68716f)" }}
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
