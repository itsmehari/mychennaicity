"use client";

import { buildConsultantWhatsAppUrl } from "@/content/guides/bwg-readiness-2026/meta";

export function BwgConsultantCta({ compact = false }: { compact?: boolean }) {
  const href = buildConsultantWhatsAppUrl();

  return (
    <section
      className="bwg-cta"
      id={compact ? undefined : "section-consultant"}
      aria-labelledby={compact ? undefined : "bwg-consultant-heading"}
    >
      <h2 id={compact ? undefined : "bwg-consultant-heading"}>
        Get the help of an independent consultant to handle the planning and
        operations
      </h2>
      <p>
        Facility managers and associations can work with an independent
        consultant on BWG readiness planning, waste audits, vendor verification
        and documentation — separate from this free public guide.
      </p>
      <a
        className="bwg-btn bwg-btn--primary"
        href={href}
        target="_blank"
        rel="nofollow noopener noreferrer"
        data-nosnippet
      >
        Message on WhatsApp
      </a>
    </section>
  );
}
