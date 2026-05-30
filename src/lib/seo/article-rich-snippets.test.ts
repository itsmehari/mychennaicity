import { describe, expect, it } from "vitest";
import {
  buildArticleSupplementalJsonLd,
  buildOfficialPdfDocumentJsonLd,
  parseFactBoxFaqItems,
} from "./article-rich-snippets";
import type { PublicArticleRow } from "@/domains/news";

const baseArticle = {
  id: "1",
  cityId: "c",
  slug: "tamil-nadu-ias-reshuffle-collectors-may-2026",
  title: "Tamil Nadu transfers 40 IAS officers",
  summary: "G.O. reshuffle",
  body: "",
  reportBody: `## Fact box

| Item | Detail |
|------|--------|
| **Order** | G.O. (Rt.) No. 1883 |
| **Date** | 29 May 2026 |`,
  analysisBody: "",
  category: "Politics",
  status: "published" as const,
  publishedAt: new Date("2026-05-29T05:30:00.000Z"),
  featured: true,
  heroImageUrl: null,
  sourceUrl: "https://mychennaicity.in/documents/go.pdf",
  sourceName: "G.O. 1883 PDF",
  interactiveJson: {
    type: "checklist",
    title: "Follow-ups",
    items: [{ id: "a", label: "Download PDF" }],
    faqItems: [
      {
        question: "How many collectors moved?",
        answer: "14 district collectors.",
      },
    ],
  },
  createdAt: new Date(),
  updatedAt: new Date(),
} satisfies Partial<PublicArticleRow> as PublicArticleRow;

describe("parseFactBoxFaqItems", () => {
  it("parses fact box table into FAQ pairs", () => {
    const items = parseFactBoxFaqItems(baseArticle.reportBody!);
    expect(items.length).toBe(2);
    expect(items[0]?.question).toContain("order");
    expect(items[0]?.answer).toContain("1883");
  });
});

describe("buildArticleSupplementalJsonLd", () => {
  it("emits FAQPage, ItemList, and DigitalDocument", () => {
    const docs = buildArticleSupplementalJsonLd(baseArticle, {
      articleUrl: "https://mychennaicity.in/chennai-local-news/test",
      reportBody: baseArticle.reportBody!,
    });
    const types = docs.map((d) =>
      d && typeof d === "object" && "@type" in d
        ? (d as { "@type": string })["@type"]
        : null,
    );
    expect(types).toContain("FAQPage");
    expect(types).toContain("ItemList");
    expect(types).toContain("DigitalDocument");
  });
});

describe("buildOfficialPdfDocumentJsonLd", () => {
  it("returns null when source is not a PDF", () => {
    expect(
      buildOfficialPdfDocumentJsonLd({
        ...baseArticle,
        sourceUrl: "https://example.com/page",
      }),
    ).toBeNull();
  });
});
