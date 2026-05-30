/**
 * Normalise markdown tables — including rows collapsed onto one line in DB/HTML output.
 * Example: `| A | B | |---|---| | C | D |`
 */

const SEPARATOR_ROW = /^\|[\s\-:|]+\|$/;

function normalizeRowLine(line: string): string {
  let p = line.trim();
  if (!p) return "";
  if (!p.startsWith("|")) p = `| ${p}`;
  if (!p.endsWith("|")) p = `${p} |`;
  return p.replace(/\s+/g, " ").trim();
}

/** Split `| a | b | |---|---| | c | d |` into one row per line. */
function splitCollapsedPipeRows(text: string): string[] {
  const trimmed = text.trim();
  if (!trimmed.includes("| |")) return [];

  const parts = trimmed.split(/\s*\|\s*\|\s*/);
  return parts
    .map((part, index) => {
      const p = part.trim();
      if (!p) return "";
      if (index === 0) {
        return normalizeRowLine(p);
      }
      if (/^[\-:]+(\|[\s\-:]+)*\|?$/.test(p.replace(/\s/g, "")) || p.includes("---")) {
        const cells = p.split("|").filter(Boolean);
        if (cells.every((c) => /^[\-:]+$/.test(c.trim()))) {
          return `| ${cells.join(" | ")} |`;
        }
      }
      return normalizeRowLine(p.startsWith("|") ? p : `| ${p}`);
    })
    .filter(Boolean);
}

export function expandCollapsedMarkdownTable(block: string): string {
  const trimmed = block.trim().replace(/\r\n/g, "\n");
  if (!trimmed.includes("|")) return trimmed;

  const lines = trimmed
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);

  if (
    lines.length >= 2 &&
    lines.every((l) => l.includes("|")) &&
    lines.some((l) => SEPARATOR_ROW.test(l))
  ) {
    return lines.join("\n");
  }

  const tableStart = trimmed.search(/\|[^|]+\|/);
  if (tableStart < 0) return trimmed;

  const prefix = tableStart > 0 ? trimmed.slice(0, tableStart).trim() : "";
  const tablePart = trimmed.slice(tableStart);

  const collapsedRows = splitCollapsedPipeRows(tablePart);
  if (collapsedRows.length >= 2 && collapsedRows.some((r) => SEPARATOR_ROW.test(r))) {
    const table = collapsedRows.join("\n");
    return prefix ? `${prefix}\n\n${table}` : table;
  }

  return trimmed;
}

export function isMarkdownTableBlock(block: string): boolean {
  const expanded = expandCollapsedMarkdownTable(block);
  const lines = expanded
    .trim()
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);

  if (lines.length < 2) return false;

  const pipeLines = lines.filter((l) => l.includes("|"));
  if (pipeLines.length < 2) return false;

  return pipeLines.some((l) => SEPARATOR_ROW.test(l));
}

export function parseMarkdownTableBlock(block: string): {
  headers: string[];
  rows: string[][];
  intro?: string;
} {
  const expanded = expandCollapsedMarkdownTable(block);
  const parts = expanded.trim().split(/\n\n+/);
  let intro: string | undefined;
  let tableText = expanded.trim();

  if (parts.length > 1) {
    const last = parts[parts.length - 1] ?? "";
    if (isMarkdownTableBlock(last)) {
      intro = parts.slice(0, -1).join("\n\n").trim() || undefined;
      tableText = expandCollapsedMarkdownTable(last);
    }
  } else {
    tableText = expandCollapsedMarkdownTable(expanded);
  }

  const lines = tableText
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l.length > 0 && !SEPARATOR_ROW.test(l));

  const parseRow = (line: string) =>
    line
      .replace(/^\|/, "")
      .replace(/\|$/, "")
      .split("|")
      .map((c) => c.trim());

  const headers = parseRow(lines[0] ?? "");
  const rows = lines.slice(1).map(parseRow);

  return { headers, rows, intro };
}
