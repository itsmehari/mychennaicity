/** Meta, path, and stage constants for the BWG readiness guide. */

export const BWG_GUIDE_PATH =
  "/guides/bulk-waste-generator-readiness-checklist-2026" as const;

export const BWG_GUIDE_LEGACY_PATH =
  "/chennai-guides/bulk-waste-generator-readiness-checklist-2026" as const;

export const BWG_GUIDE_SLUG =
  "bulk-waste-generator-readiness-checklist-2026" as const;

export const BWG_H1 =
  "Is Your Organisation Ready for the Solid Waste Management Rules, 2026?";

export const BWG_SEO_TITLE =
  "Bulk Waste Generator Compliance Checklist 2026 for Chennai Organisations";

export const BWG_STANDFIRST =
  "The Solid Waste Management Rules, 2026 have expanded the responsibilities of large apartments, institutions, hotels, hospitals, offices and commercial establishments. This interactive guide helps organisations assess whether their waste-management systems are ready, identify gaps and prepare a practical compliance action plan.";

export const BWG_META_DESCRIPTION =
  "Check whether your apartment, hotel, hospital, school, office or institution is ready for the Solid Waste Management Rules, 2026 using this practical Bulk Waste Generator checklist.";

export const BWG_READING_TIME = "28 min read · interactive tools included";

export const BWG_DATE_PUBLISHED = "2026-07-20";
export const BWG_DATE_MODIFIED = "2026-07-20";
export const BWG_VERIFIED_ON = "20 July 2026";

/** Brief listed 988475845 (9 digits). Confirm 10-digit mobile before go-live. */
export const BWG_CONSULTANT_WA_DIGITS = "988475845";

export const BWG_CONSULTANT_WA_PREFILL =
  "Hi, I need help with Bulk Waste Generator readiness planning for my organisation in Chennai.";

export const BWG_STAGES = [
  { id: "know", label: "Know your status", href: "#section-eligibility" },
  { id: "audit", label: "Audit your waste", href: "#section-audit" },
  { id: "infra", label: "Check infrastructure", href: "#section-infrastructure" },
  { id: "vendors", label: "Verify vendors", href: "#section-vendors" },
  { id: "records", label: "Review records", href: "#section-documents" },
  { id: "score", label: "Get readiness score", href: "#section-assessment" },
] as const;

export const BWG_TOC = [
  { id: "section-why", label: "1. Why this matters now" },
  { id: "section-eligibility", label: "2. Who may qualify" },
  { id: "section-streams", label: "3. Four-stream segregation" },
  { id: "section-governance", label: "4. Governance & ownership" },
  { id: "section-audit", label: "5. Waste audit" },
  { id: "section-infrastructure", label: "6. Segregation infrastructure" },
  { id: "section-wet-waste", label: "7. Wet-waste readiness" },
  { id: "section-vendors", label: "8. Dry waste & vendors" },
  { id: "section-sanitary", label: "9. Sanitary & special-care" },
  { id: "section-regulated", label: "10. Separately regulated waste" },
  { id: "section-documents", label: "11. Registration & documents" },
  { id: "section-training", label: "12. Training" },
  { id: "section-journey", label: "13. Waste journey" },
  { id: "section-metrics", label: "14. Management dashboard" },
  { id: "section-community", label: "15. Community benefit" },
  { id: "section-myths", label: "16. Common myths" },
  { id: "section-action-plan", label: "17. 30-day action plan" },
  { id: "section-assessment", label: "18. Self-assessment" },
  { id: "section-consultant", label: "Get independent help" },
  { id: "section-sources", label: "Sources" },
] as const;

export function buildConsultantWhatsAppUrl(): string {
  const digits = BWG_CONSULTANT_WA_DIGITS.replace(/\D/g, "");
  const withCc = digits.length === 10 ? `91${digits}` : digits.startsWith("91") ? digits : `91${digits}`;
  return `https://wa.me/${withCc}?text=${encodeURIComponent(BWG_CONSULTANT_WA_PREFILL)}`;
}
