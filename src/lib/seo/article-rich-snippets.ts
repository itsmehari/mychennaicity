import type { PublicArticleRow } from "@/domains/news";
import type { ArticleTocEntry } from "@/lib/markdown-outline";
import { buildFaqPageJsonLdFromItems, type FaqItem } from "@/lib/seo/faq-jsonld";
import { buildInteractiveExtraJsonLd } from "@/lib/seo/article-interactive-jsonld";

function stripMarkdownCell(s: string): string {
  return s.replace(/\*\*(.+?)\*\*/g, "$1").replace(/\*(.+?)\*/g, "$1").trim();
}

function parseMarkdownTableRow(line: string): string[] {
  return line
    .replace(/^\|/, "")
    .replace(/\|$/, "")
    .split("|")
    .map((c) => stripMarkdownCell(c));
}

/** Turn ## Fact box table rows into FAQ entities for rich results. */
export function parseFactBoxFaqItems(markdown: string): FaqItem[] {
  const match = markdown.match(
    /##\s*Fact box\s*\n+([\s\S]*?)(?=\n##\s|\n---\s*\n|$)/i,
  );
  if (!match?.[1]) return [];

  const tableLines = match[1]
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l.includes("|") && !/^\|[\s\-:|]+\|$/.test(l));

  if (tableLines.length < 2) return [];

  const rows = tableLines.slice(1);
  const items: FaqItem[] = [];

  for (const row of rows) {
    const cells = parseMarkdownTableRow(row);
    if (cells.length < 2) continue;
    const label = cells[0];
    const value = cells[1];
    if (!label || !value) continue;
    items.push({
      question: `What is the ${label.toLowerCase()} for this story?`,
      answer: value,
    });
  }

  return items;
}

function readOptionalFaqItems(
  interactive: Record<string, unknown> | null | undefined,
): FaqItem[] {
  if (!interactive || typeof interactive !== "object") return [];
  const raw = interactive.faqItems;
  if (!Array.isArray(raw)) return [];
  const items: FaqItem[] = [];
  for (const x of raw) {
    if (
      x &&
      typeof x === "object" &&
      typeof (x as FaqItem).question === "string" &&
      typeof (x as FaqItem).answer === "string" &&
      (x as FaqItem).question.trim() &&
      (x as FaqItem).answer.trim()
    ) {
      items.push({
        question: (x as FaqItem).question.trim(),
        answer: (x as FaqItem).answer.trim(),
      });
    }
  }
  return items;
}

function buildChecklistItemListJsonLd(
  interactive: Record<string, unknown>,
  articleUrl: string,
) {
  if (interactive.type !== "checklist" || !Array.isArray(interactive.items)) {
    return null;
  }
  const title =
    typeof interactive.title === "string" && interactive.title.trim()
      ? interactive.title.trim()
      : "Reader checklist";
  const items = interactive.items.filter(
    (x) =>
      x &&
      typeof x === "object" &&
      typeof (x as { label?: unknown }).label === "string" &&
      (x as { label: string }).label.trim(),
  ) as { id?: string; label: string }[];

  if (!items.length) return null;

  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: title,
    url: `${articleUrl}#interactive-heading`,
    numberOfItems: items.length,
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.label.trim(),
    })),
  };
}

function buildTakeawaysItemListJsonLd(
  interactive: Record<string, unknown>,
  articleUrl: string,
) {
  if (interactive.type !== "takeaways" || !Array.isArray(interactive.items)) {
    return null;
  }
  const lines = interactive.items.filter(
    (x) => typeof x === "string" && x.trim(),
  ) as string[];
  if (!lines.length) return null;

  const title =
    typeof interactive.title === "string" && interactive.title.trim()
      ? interactive.title.trim()
      : "Key takeaways";

  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: title,
    url: articleUrl,
    numberOfItems: lines.length,
    itemListElement: lines.map((line, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: line.trim(),
    })),
  };
}

/** DigitalDocument JSON-LD when primary source is an official PDF. */
export function buildOfficialPdfDocumentJsonLd(article: PublicArticleRow) {
  const url = article.sourceUrl?.trim();
  if (!url?.toLowerCase().includes(".pdf")) return null;

  const body = `${article.reportBody ?? ""}\n${article.body ?? ""}\n${article.title}`;
  const goNum = body.match(/G\.O\.\s*\(Rt\.\)\s*No\.\s*(\d+)/i)?.[1];

  const published = article.publishedAt?.toISOString();

  return {
    "@context": "https://schema.org",
    "@type": "DigitalDocument",
    name:
      article.sourceName?.trim() ??
      (goNum ? `G.O. (Rt.) No. ${goNum}` : "Official government document"),
    url,
    encodingFormat: "application/pdf",
    inLanguage: "en-IN",
    ...(published ? { datePublished: published } : {}),
    publisher: {
      "@type": "GovernmentOrganization",
      name: "Government of Tamil Nadu",
    },
  };
}

export type ArticleSupplementalJsonLdOptions = {
  articleUrl: string;
  reportBody?: string;
  tocEntries?: ArticleTocEntry[];
};

/**
 * All supplemental JSON-LD for a news article (FAQ, ItemList, DigitalDocument, interactive).
 * Keep NewsArticle / Breadcrumb / TOC ItemList on the page route; merge outputs here.
 */
export function buildArticleSupplementalJsonLd(
  article: PublicArticleRow,
  options: ArticleSupplementalJsonLdOptions,
): unknown[] {
  const out: unknown[] = [];
  const interactive = article.interactiveJson;
  const report = options.reportBody ?? article.reportBody ?? article.body ?? "";

  out.push(...buildInteractiveExtraJsonLd(article.slug, interactive ?? undefined));

  const faqCandidates: FaqItem[] = [
    ...readOptionalFaqItems(interactive ?? undefined),
    ...parseFactBoxFaqItems(report),
  ];
  const faqSeen = new Set<string>();
  const faqDeduped = faqCandidates.filter((item) => {
    const key = item.question.toLowerCase();
    if (faqSeen.has(key)) return false;
    faqSeen.add(key);
    return true;
  });
  const faqLd = buildFaqPageJsonLdFromItems(faqDeduped);
  if (faqLd) out.push(faqLd);

  if (interactive && typeof interactive === "object") {
    const checklistLd = buildChecklistItemListJsonLd(
      interactive,
      options.articleUrl,
    );
    if (checklistLd) out.push(checklistLd);

    const takeawaysLd = buildTakeawaysItemListJsonLd(
      interactive,
      options.articleUrl,
    );
    if (takeawaysLd) out.push(takeawaysLd);
  }

  const pdfLd = buildOfficialPdfDocumentJsonLd(article);
  if (pdfLd) out.push(pdfLd);

  return out;
}
