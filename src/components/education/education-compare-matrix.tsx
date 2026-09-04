import { COMPARE_CODES, COMPARE_COLUMN_LABELS, HSE_COMPARE_ROWS } from "@/content/education/hse-compare";

export function EducationCompareMatrix() {
  return (
    <div className="not-prose overflow-x-auto">
      <table className="w-full min-w-[40rem] border-collapse text-left text-sm">
        <caption className="mb-3 text-left text-xs text-[var(--muted)]">
          Comparison of five preferred Tamil Nadu Higher Secondary groups. Humanities column is
          2804; see group 2802 for Computer Applications instead of Political Science.
        </caption>
        <thead>
          <tr className="border-b border-[var(--border)]">
            <th className="py-2 pr-3 font-semibold text-[var(--foreground)]">Factor</th>
            {COMPARE_CODES.map((code) => (
              <th key={code} className="px-2 py-2 font-semibold text-[var(--foreground)]">
                {COMPARE_COLUMN_LABELS[code]}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {HSE_COMPARE_ROWS.map((row) => (
            <tr key={row.factor} className="border-b border-[var(--border)] align-top">
              <th className="py-2 pr-3 font-medium text-[var(--foreground)]">{row.factor}</th>
              {COMPARE_CODES.map((code) => (
                <td key={code} className="px-2 py-2 text-[var(--muted)]">
                  {row.values[code]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
