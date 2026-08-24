import Link from "next/link";
import { CHENNAI_CONCERNS } from "@/content/government/chennai-relevance";
import { ministerPath } from "@/content/government/paths";
import { getMinister, ministerDisplayName } from "@/content/government/ministers-may-2026";

type Props = { locale?: "en" | "ta" };

export function ChennaiMinistersShelf({ locale = "en" }: Props) {
  return (
    <div className="not-prose my-6 overflow-x-auto rounded-2xl border border-[var(--border)]">
      <table className="w-full min-w-[560px] text-left text-sm">
        <thead className="bg-[var(--surface)] text-[11px] font-bold uppercase tracking-wider text-[var(--muted)]">
          <tr>
            <th className="px-4 py-3">
              {locale === "ta" ? "கவலை / துறை" : "Citizen concern"}
            </th>
            <th className="px-4 py-3">{locale === "ta" ? "அமைச்சர்" : "Minister"}</th>
            <th className="px-4 py-3">{locale === "ta" ? "குறிப்பு" : "Why"}</th>
            <th className="px-4 py-3">{locale === "ta" ? "கருவி" : "Tool"}</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[var(--border)]">
          {CHENNAI_CONCERNS.map((row) => {
            const m = getMinister(row.ministerSlug);
            if (!m) return null;
            return (
              <tr key={row.concern}>
                <td className="px-4 py-3 font-medium text-[var(--foreground)]">
                  {locale === "ta" ? row.concernTa : row.concern}
                </td>
                <td className="px-4 py-3">
                  <Link
                    href={ministerPath(m.slug, locale)}
                    className="font-semibold text-[var(--accent)] hover:underline"
                  >
                    {ministerDisplayName(m)}
                  </Link>
                </td>
                <td className="px-4 py-3 text-[var(--muted)]">
                  {locale === "ta" ? row.whyTa : row.why}
                </td>
                <td className="px-4 py-3">
                  {row.civicToolHref ? (
                    <Link
                      href={row.civicToolHref}
                      className="text-xs font-semibold text-[var(--accent)] hover:underline"
                    >
                      {row.civicToolLabel}
                    </Link>
                  ) : (
                    <span className="text-xs text-[var(--muted)]">—</span>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
