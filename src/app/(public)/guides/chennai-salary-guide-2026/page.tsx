import type { Metadata } from "next";
import { ReachGuideShell } from "@/components/guides/reach-guide-shell";
import {
  CHENNAI_SALARY_BANDS_2026,
  CHENNAI_SALARY_GUIDE_PATH,
  SALARY_CORRIDOR_NOTES,
} from "@/content/guides/chennai-salary-guide-2026";
import { getSiteUrl } from "@/lib/env";
import { CHENNAI_JOBS_HUB_PATH } from "@/lib/routes/chennai-jobs";
import { fullSiteTitle } from "@/lib/seo/site-titles";

const titleSegment = "Chennai salary guide 2026";

export const metadata: Metadata = {
  title: titleSegment,
  description:
    "Chennai IT salary benchmarks 2026 — fresher, mid, and senior CTC bands for Java, React, and software roles, plus OMR vs Guindy corridor notes.",
  alternates: { canonical: `${getSiteUrl()}${CHENNAI_SALARY_GUIDE_PATH}` },
  openGraph: {
    title: fullSiteTitle(titleSegment),
    description:
      "Directional Chennai CTC bands by role and corridor — compare offers, then browse live jobs.",
    url: `${getSiteUrl()}${CHENNAI_SALARY_GUIDE_PATH}`,
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
};

export default function ChennaiSalaryGuidePage() {
  return (
    <ReachGuideShell
      crumbs={[
        { label: "Home", href: "/" },
        { label: "Guides" },
        { label: "Salary guide 2026" },
      ]}
      eyebrow="Jobs · Chennai"
      title="Chennai salary guide 2026"
      dek="Directional annual CTC bands for common tech roles in Chennai, plus corridor tips for OMR, Guindy, and Ambattur. Use this to sanity-check offers — not as a promise of pay."
      related={[
        { href: CHENNAI_JOBS_HUB_PATH, label: "Browse Chennai jobs" },
        { href: "/guides/chennai-tech-careers", label: "How to read Chennai job ads" },
        { href: "/chennai-jobs/looking-for-work", label: "Looking for work board" },
      ]}
    >
      <p>
        <strong>Disclaimer:</strong> Figures are synthesised from public 2026 city salary models
        and market write-ups (percentile-style bands). Actual offers depend on company tier,
        skills, hybrid policy, and bonus/ESOP. Always get the offer in writing.
      </p>

      <h2>Tech CTC bands (annual, indicative)</h2>
      <div className="not-prose overflow-x-auto rounded-xl border border-[var(--border)]">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-[color-mix(in_srgb,var(--accent)_8%,var(--surface))] text-[var(--foreground)]">
            <tr>
              <th className="px-3 py-2 font-bold">Role</th>
              <th className="px-3 py-2 font-bold">Fresher-ish</th>
              <th className="px-3 py-2 font-bold">Mid market</th>
              <th className="px-3 py-2 font-bold">Senior / upper</th>
              <th className="px-3 py-2 font-bold">Note</th>
            </tr>
          </thead>
          <tbody>
            {CHENNAI_SALARY_BANDS_2026.map((row) => (
              <tr key={row.role} className="border-t border-[var(--border)]">
                <td className="px-3 py-2 font-semibold text-[var(--foreground)]">{row.role}</td>
                <td className="px-3 py-2">{row.fresher}</td>
                <td className="px-3 py-2">{row.mid}</td>
                <td className="px-3 py-2">{row.senior}</td>
                <td className="px-3 py-2 text-[var(--muted)]">{row.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2>Corridor notes</h2>
      <ul>
        {SALARY_CORRIDOR_NOTES.map((c) => (
          <li key={c.corridor}>
            <strong>{c.corridor}:</strong> {c.tip}
          </li>
        ))}
      </ul>

      <h2>Negotiation checklist</h2>
      <ul>
        <li>Ask for <strong>CTC vs take-home</strong> and variable pay %</li>
        <li>Clarify hybrid days and which campus is the payroll base</li>
        <li>Compare total cost of commute (OMR bus / cab / Metro) against a “higher” offer</li>
        <li>
          Cross-check live openings on our{" "}
          <a href={CHENNAI_JOBS_HUB_PATH}>Chennai jobs hub</a>
        </li>
      </ul>
    </ReachGuideShell>
  );
}
