import { describe, expect, it } from "vitest";
import { buildNewsHubJsonLdGraph } from "./news-hub-jsonld";
import type { PublicArticleRow } from "@/domains/news";

function fakeArticle(
  overrides: Partial<PublicArticleRow> & Pick<PublicArticleRow, "slug" | "title">,
): PublicArticleRow {
  const now = new Date("2026-07-20T12:00:00.000Z");
  return {
    id: overrides.id ?? "a1",
    cityId: "c1",
    authorId: null,
    slug: overrides.slug,
    title: overrides.title,
    summary: "Summary",
    body: "Body text for reading time.",
    reportBody: null,
    analysisBody: null,
    interactiveJson: null,
    sourceUrl: null,
    sourceName: null,
    category: "Chennai",
    dek: "Dek",
    status: "published",
    publishedAt: now,
    featured: false,
    heroImageUrl: null,
    areaHubSlug: null,
    authorByline: null,
    authorSameAs: null,
    createdAt: now,
    updatedAt: now,
    ...overrides,
  };
}

describe("buildNewsHubJsonLdGraph", () => {
  it("emits WebPage, CollectionPage, ItemList, BreadcrumbList, and FAQPage", () => {
    const ld = buildNewsHubJsonLdGraph([
      fakeArticle({ id: "1", slug: "story-one", title: "Story one" }),
      fakeArticle({ id: "2", slug: "story-two", title: "Story two" }),
    ]);

    expect(ld["@context"]).toBe("https://schema.org");
    const graph = ld["@graph"] as Record<string, unknown>[];
    const types = graph.map((n) => n["@type"]);
    expect(types).toContain("WebPage");
    expect(types).toContain("CollectionPage");
    expect(types).toContain("ItemList");
    expect(types).toContain("BreadcrumbList");
    expect(types).toContain("FAQPage");

    const web = graph.find((n) => n["@type"] === "WebPage") as Record<
      string,
      unknown
    >;
    expect(web.about).toMatchObject({ name: "Chennai" });
    expect(web.contentLocation).toMatchObject({ name: "Chennai" });
    expect(web.speakable).toBeTruthy();

    const list = graph.find((n) => n["@type"] === "ItemList") as {
      numberOfItems: number;
      itemListElement: { name: string }[];
    };
    expect(list.numberOfItems).toBe(2);
    expect(list.itemListElement[0].name).toBe("Story one");
  });
});
