import { expandCollapsedMarkdownTable } from "@/lib/markdown-table";

/** Prepare seeded article markdown for GFM renderers (fixes collapsed `| |` table rows). */
export function normalizeArticleMarkdown(markdown: string): string {
  return markdown
    .replace(/\r\n/g, "\n")
    .split(/\n\n+/)
    .map((block) => expandCollapsedMarkdownTable(block.trim()))
    .filter(Boolean)
    .join("\n\n");
}
