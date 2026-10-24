/** Search title and description for a job detail page. */

const TITLE_MAX = 78;
const DESC_MAX = 158;

function clipAtBoundary(value: string, max: number, minBreak: number): string {
  const t = value.replace(/\s+/g, " ").trim();
  if (t.length <= max) return t;
  const cut = t.slice(0, max - 1);
  const dot = cut.lastIndexOf(" · ");
  const space = cut.lastIndexOf(" ");
  const breakAt = dot > minBreak ? dot : space;
  const base = (breakAt > minBreak ? cut.slice(0, breakAt) : cut)
    .replace(/[·\s]+$/u, "")
    .trimEnd();
  return `${base}…`;
}

/** Keep the listing headline. Do not spend the title budget on the employer name. */
export function jobSearchTitleSegment(title: string): string {
  return clipAtBoundary(title, TITLE_MAX, 32);
}

export function jobSearchDescription(input: {
  title: string;
  body: string;
  employerName: string;
  locationLabel: string | null;
}): string {
  const paragraphs = input.body
    .replace(/\*\*(.+?)\*\*/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .split(/\n\s*\n/)
    .map((paragraph) =>
      paragraph.replace(/^#+\s+/gm, "").replace(/\s+/g, " ").trim(),
    )
    .filter((paragraph) => paragraph.length > 40);
  const fallback = [input.title, input.locationLabel, input.employerName]
    .map((part) => part?.trim())
    .filter(Boolean)
    .join(" — ");
  return clipAtBoundary(paragraphs[0] || fallback, DESC_MAX, 80);
}
