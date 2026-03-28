/** Outline entries for ## / ### lines (matches ArticleProse block rules). */

export type OutlineItem = {
  level: 2 | 3;
  /** Raw heading text (may include ** for display). */
  text: string;
  /** Slug fragment before section prefix. */
  baseId: string;
};

const TOC_MIN_TOTAL_CHARS = 4000;
const TOC_MIN_HEADINGS = 3;

function stripInlineBoldForSlug(s: string): string {
  return s.replace(/\*\*(.+?)\*\*/g, "$1").trim();
}

function slugifyHeading(text: string): string {
  const t = stripInlineBoldForSlug(text)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  return t || "section";
}

function allocateUniqueBaseId(text: string, used: Map<string, number>): string {
  const base = slugifyHeading(text);
  const n = (used.get(base) ?? 0) + 1;
  used.set(base, n);
  return n === 1 ? base : `${base}-${n}`;
}

/** Extract ordered ## / ### headings from markdown-like body. */
export function extractMarkdownOutline(markdown: string): OutlineItem[] {
  if (!markdown.trim()) return [];
  const blocks = markdown.split(/\n\n+/);
  const used = new Map<string, number>();
  const items: OutlineItem[] = [];
  for (const block of blocks) {
    const line = block.trim();
    if (line.startsWith("## ") && !line.startsWith("### ")) {
      const raw = line.slice(3).trim();
      items.push({
        level: 2,
        text: raw,
        baseId: allocateUniqueBaseId(raw, used),
      });
    } else if (line.startsWith("### ")) {
      const raw = line.slice(4).trim();
      items.push({
        level: 3,
        text: raw,
        baseId: allocateUniqueBaseId(raw, used),
      });
    }
  }
  return items;
}

export type ArticleTocEntry = {
  level: 2 | 3;
  text: string;
  domId: string;
};

export function buildArticleTocEntries(
  report: string,
  analysis: string,
): ArticleTocEntry[] {
  const reportOutline = extractMarkdownOutline(report);
  const analysisOutline = extractMarkdownOutline(analysis);
  return [
    ...reportOutline.map((o) => ({
      level: o.level,
      text: o.text,
      domId: `report-${o.baseId}`,
    })),
    ...analysisOutline.map((o) => ({
      level: o.level,
      text: o.text,
      domId: `analysis-${o.baseId}`,
    })),
  ];
}

export function shouldShowArticleToc(report: string, analysis: string): boolean {
  const entries = buildArticleTocEntries(report, analysis);
  const totalChars = report.length + analysis.length;
  return totalChars >= TOC_MIN_TOTAL_CHARS || entries.length >= TOC_MIN_HEADINGS;
}

export { TOC_MIN_HEADINGS, TOC_MIN_TOTAL_CHARS };

/** ItemList JSON-LD for in-page section anchors (NewsArticle page URL + fragment). */
export function buildArticleSectionItemListJsonLd(
  articleUrl: string,
  entries: ArticleTocEntry[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Article sections",
    numberOfItems: entries.length,
    itemListElement: entries.map((e, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: stripInlineBoldForSlug(e.text),
      url: `${articleUrl}#${e.domId}`,
    })),
  };
}
