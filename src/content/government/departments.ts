import { MINISTERS_MAY_2026 } from "@/content/government/ministers-may-2026";

export type DepartmentEntry = {
  keyword: string;
  ministerSlug: string;
  ministerName: string;
  ministryTitle: string;
};

/** Flatten portfolios into searchable department keywords. */
function buildDepartmentIndex(): DepartmentEntry[] {
  const entries: DepartmentEntry[] = [];
  for (const m of MINISTERS_MAY_2026) {
    for (const portfolio of m.portfolios) {
      const parts = portfolio
        .split(/[,;]/)
        .map((s) => s.trim())
        .filter(Boolean);
      for (const part of parts) {
        entries.push({
          keyword: part,
          ministerSlug: m.slug,
          ministerName: `${m.honorific} ${m.name}`,
          ministryTitle: m.ministryTitle,
        });
      }
    }
  }
  return entries.sort((a, b) =>
    a.keyword.localeCompare(b.keyword, "en-IN"),
  );
}

export const DEPARTMENT_INDEX = buildDepartmentIndex();

export function searchDepartments(query: string): DepartmentEntry[] {
  const q = query.trim().toLowerCase();
  if (!q) return DEPARTMENT_INDEX;
  return DEPARTMENT_INDEX.filter(
    (d) =>
      d.keyword.toLowerCase().includes(q) ||
      d.ministryTitle.toLowerCase().includes(q) ||
      d.ministerName.toLowerCase().includes(q),
  );
}
