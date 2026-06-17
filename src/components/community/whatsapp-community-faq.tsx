"use client";

import { useState } from "react";
import { WHATSAPP_COMMUNITY_FAQ } from "@/content/whatsapp-community/faq";
import { WhatsAppCommunityJoinLink } from "./whatsapp-community-join-link";

export function WhatsAppCommunityFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section aria-labelledby="wa-faq-heading" className="mt-14">
      <h2
        id="wa-faq-heading"
        className="type-display text-2xl text-[var(--foreground)] sm:text-3xl"
      >
        Frequently asked questions
      </h2>
      <p className="type-lede mt-2 max-w-2xl text-sm text-[var(--muted)]">
        Answers about the official my chennai city WhatsApp group — same text
        search engines and AI assistants read in our structured data.
      </p>
      <div className="mt-6 divide-y divide-[var(--border)] rounded-2xl border border-[var(--border)] bg-[var(--surface)]">
        {WHATSAPP_COMMUNITY_FAQ.map((item, i) => {
          const open = openIndex === i;
          const panelId = `wa-faq-panel-${i}`;
          const btnId = `wa-faq-btn-${i}`;
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
                {i === 0 ? (
                  <p className="mt-3">
                    <WhatsAppCommunityJoinLink
                      utmContent="faq"
                      className="font-semibold text-[#128C7E] underline-offset-4 hover:underline"
                    >
                      Join on WhatsApp →
                    </WhatsAppCommunityJoinLink>
                  </p>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
