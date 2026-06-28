import { parseMarkdownTableBlock } from "@/lib/markdown-table";

export type KeyDetailItem = {
  label: string;
  value: string;
};

function stripMarkdownInline(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, "$1")
    .replace(/\[(.+?)\]\(.+?\)/g, "$1")
    .replace(/`/g, "")
    .trim();
}

function extractSectionBody(
  markdown: string,
  headingPattern: RegExp,
): string | null {
  const blocks = markdown.replace(/\r\n/g, "\n").split(/\n\n+/);
  let capture = false;
  const lines: string[] = [];

  for (const block of blocks) {
    const line = block.trim();
    if (/^## /.test(line)) {
      if (capture) break;
      if (headingPattern.test(line.slice(3).trim())) {
        capture = true;
      }
      continue;
    }
    if (capture) lines.push(block);
  }

  return lines.length ? lines.join("\n\n") : null;
}

export function extractTakeawaysBullets(markdown: string): string[] {
  const body = extractSectionBody(
    markdown,
    /^key takeaways?$/i,
  );
  if (!body) return [];

  return body
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.startsWith("- "))
    .map((line) => stripMarkdownInline(line.slice(2)))
    .filter(Boolean);
}

export function extractFactBoxDetails(markdown: string): KeyDetailItem[] {
  const body = extractSectionBody(markdown, /^fact box$/i);
  if (!body) return [];

  const table = parseMarkdownTableBlock(body);
  if (!table) return [];

  return table.rows
    .map((row) => ({
      label: stripMarkdownInline(row[0] ?? ""),
      value: stripMarkdownInline(row[1] ?? ""),
    }))
    .filter((item) => item.label && item.value);
}

export function removeExtractedSections(
  markdown: string,
  sections: ("takeaways" | "factbox")[],
): string {
  const blocks = markdown.replace(/\r\n/g, "\n").split(/\n\n+/);
  const out: string[] = [];
  let skip = false;

  for (const block of blocks) {
    const line = block.trim();
    if (/^## /.test(line)) {
      skip = false;
      const heading = line.slice(3).trim().toLowerCase();
      if (
        sections.includes("takeaways") &&
        /^key takeaways?$/.test(heading)
      ) {
        skip = true;
        continue;
      }
      if (sections.includes("factbox") && heading === "fact box") {
        skip = true;
        continue;
      }
    }
    if (!skip) out.push(block);
  }

  return out.join("\n\n").trim();
}

export function buildGenericKeyDetails(input: {
  category: string | null;
  publishedAt: Date | null;
  sourceName: string | null;
  areaLabel?: string | null;
}): KeyDetailItem[] {
  const items: KeyDetailItem[] = [];

  if (input.areaLabel) {
    items.push({ label: "Location", value: input.areaLabel });
  } else {
    items.push({ label: "Location", value: "Chennai, Tamil Nadu" });
  }

  if (input.publishedAt) {
    items.push({
      label: "Published",
      value: input.publishedAt.toLocaleString("en-IN", {
        dateStyle: "medium",
        timeZone: "Asia/Kolkata",
      }),
    });
  }

  if (input.category) {
    items.push({ label: "Topic", value: input.category });
  }

  if (input.sourceName) {
    items.push({ label: "Primary source", value: input.sourceName });
  }

  items.push({ label: "Status", value: "Published & verified editorial" });

  return items;
}
