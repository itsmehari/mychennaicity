import { describe, expect, it } from "vitest";
import type { PublicArticleRow } from "@/domains/news";
import {
  buildArticleImageObjects,
  buildNewsArticleJsonLd,
} from "./news-article-jsonld";

const baseArticle = {
  id: "1",
  cityId: "c",
  slug: "ozone-greens-perumbakkam-power-crisis-generator-electricity-issue",
  title: "Ozone Greens Power Crisis in Perumbakkam",
  summary: "Residents demand permanent EB connection.",
  body: "Report body with enough words for counting purposes here.",
  reportBody: "Report body with enough words for counting purposes here.",
  analysisBody: "Analysis section with additional context for readers.",
  category: "Chennai",
  status: "published" as const,
  publishedAt: new Date("2026-06-20T06:00:00.000Z"),
  updatedAt: new Date("2026-06-20T18:00:00.000Z"),
  createdAt: new Date("2026-06-20T06:00:00.000Z"),
  heroImageUrl: "/images/articles/ozone-greens-perumbakkam-hero.jpg",
  authorByline: "mychennaicity.in editorial",
} satisfies Partial< PublicArticleRow> as PublicArticleRow;

describe("buildArticleImageObjects", () => {
  it("includes a 1200x630 OG image for Article rich-result eligibility", () => {
    const images = buildArticleImageObjects(baseArticle);
    const og = images.find(
      (img) => img.width === 1200 && img.height === 630,
    );
    expect(og).toBeDefined();
    expect(String(og?.url)).toContain("/opengraph-image");
  });
});

describe("buildNewsArticleJsonLd", () => {
  it("emits a linked @graph with WebPage, NewsArticle, and Organization", () => {
    const ld = buildNewsArticleJsonLd(baseArticle);
    expect(ld["@graph"]).toBeDefined();
    const graph = ld["@graph"] as Record<string, unknown>[];
    const types = graph.map((node) => node["@type"]);
    expect(types).toContainEqual(["NewsArticle", "Article"]);
    expect(types).toContain("WebPage");
    expect(types).toContain("ImageObject");
    expect(types).toContain("Organization");
  });

  it("includes wordCount and Article image references", () => {
    const ld = buildNewsArticleJsonLd(baseArticle);
    const graph = ld["@graph"] as Record<string, unknown>[];
    const article = graph.find(
      (node) =>
        Array.isArray(node["@type"]) &&
        node["@type"].includes("NewsArticle"),
    );
    expect(article?.wordCount).toBeGreaterThan(10);
    expect(Array.isArray(article?.image)).toBe(true);
  });
});
