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
  slug: "onecard-app-crashes-payment-failures-play-store-reviews",
  title: "OneCard app issues",
  summary: "Play Store reviews",
  body: "",
  reportBody: `## Fact box

| Item | Detail |
|------|--------|
| **App** | OneCard |
| **Platform** | Android |`,
  analysisBody: "",
  category: "Consumer",
  status: "published" as const,
  publishedAt: new Date("2026-05-30T06:00:00.000Z"),
  featured: true,
  heroImageUrl: null,
  sourceUrl: "https://play.google.com/store/apps/details?id=co.onecard.android",
  sourceName: "Google Play",
  interactiveJson: {
    type: "faq",
    items: [
      {
        question: "What are users reporting?",
        answer: "App crashes after updates.",
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
    expect(items[0]?.question).toContain("app");
  });
});

describe("buildArticleSupplementalJsonLd", () => {
  it("emits a single FAQPage when interactive type is faq", () => {
    const docs = buildArticleSupplementalJsonLd(baseArticle, {
      articleUrl: "https://mychennaicity.in/chennai-local-news/test",
      reportBody: baseArticle.reportBody!,
    });
    const faqPages = docs.filter(
      (d) =>
        d &&
        typeof d === "object" &&
        (d as { "@type"?: string })["@type"] === "FAQPage",
    );
    expect(faqPages).toHaveLength(1);
  });

  it("does not emit FAQPage for checklist-only interactives", () => {
    const docs = buildArticleSupplementalJsonLd(
      {
        ...baseArticle,
        interactiveJson: {
          type: "checklist",
          title: "Steps",
          items: [{ id: "a", label: "Check Play Store" }],
        },
      },
      {
        articleUrl: "https://mychennaicity.in/chennai-local-news/test",
        reportBody: baseArticle.reportBody!,
      },
    );
    const faqPages = docs.filter(
      (d) =>
        d &&
        typeof d === "object" &&
        (d as { "@type"?: string })["@type"] === "FAQPage",
    );
    expect(faqPages).toHaveLength(0);
  });

  it("emits ItemList for checklist interactives", () => {
    const docs = buildArticleSupplementalJsonLd(
      {
        ...baseArticle,
        interactiveJson: {
          type: "checklist",
          title: "Steps",
          items: [{ id: "a", label: "Check Play Store" }],
        },
      },
      {
        articleUrl: "https://mychennaicity.in/chennai-local-news/test",
      },
    );
    const types = docs.map((d) =>
      d && typeof d === "object" && "@type" in d
        ? (d as { "@type": string })["@type"]
        : null,
    );
    expect(types).toContain("ItemList");
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
