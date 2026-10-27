import { describe, expect, it } from "vitest";
import {
  EDUCATION_SITEMAP_ENTRIES,
  EDUCATION_TAMIL_SITEMAP_PATHS,
} from "@/content/education/index";
import { HSE_EXPLAINERS } from "@/content/education/hse-pathways";
import {
  HSE_TEXTBOOKS,
  HSE_TEXTBOOK_FINDERS,
  HSE_TEXTBOOK_GUIDE_FOOTER,
  textbooksForFinder,
} from "@/content/education/hse-textbooks";

const OFFICIAL_HOSTS = [
  "textbookcorp.in",
  "textbookcorp.tn.gov.in",
  "textbooksonline.tn.nic.in",
  "tn.gov.in",
];

describe("HSE textbooks", () => {
  it("records lastChecked and official portal fallback on every row", () => {
    for (const book of HSE_TEXTBOOKS) {
      expect(book.lastChecked).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(book.officialIndexUrl.startsWith("https://")).toBe(true);
      expect(book.usedByGroupCodes.length).toBeGreaterThan(0);
      if (book.officialPdfUrl) {
        const ok = OFFICIAL_HOSTS.some((h) => book.officialPdfUrl!.includes(h));
        expect(ok).toBe(true);
      }
    }
  });

  it("has eight finder pages with 400+ words of guide copy", () => {
    expect(HSE_TEXTBOOK_FINDERS).toHaveLength(8);
    for (const finder of HSE_TEXTBOOK_FINDERS) {
      const words = [...finder.paragraphs, HSE_TEXTBOOK_GUIDE_FOOTER]
        .join(" ")
        .split(/\s+/).length;
      expect(words, finder.slug).toBeGreaterThanOrEqual(400);
      expect(textbooksForFinder(finder.slug).length).toBeGreaterThan(0);
    }
  });
});

describe("education sitemap after Waves B–E", () => {
  it("ships English cluster including magnets and Tamil twins", () => {
    const paths = EDUCATION_SITEMAP_ENTRIES.map((e) => e.path);
    expect(paths).toContain("/guides/tn-plus-two");
    expect(paths).toContain("/guides/tn-plus-two/textbooks");
    expect(paths).toContain("/plus-two-textbooks-pdf");
    expect(paths).toContain("/class-11-groups-chennai");
    expect(paths).toContain("/guides/tn-plus-two/science");
    expect(EDUCATION_SITEMAP_ENTRIES).toHaveLength(32);
    expect(EDUCATION_TAMIL_SITEMAP_PATHS).toHaveLength(15);
    expect(EDUCATION_TAMIL_SITEMAP_PATHS).toContain("/guides/tn-plus-two-tamil");
    expect(EDUCATION_TAMIL_SITEMAP_PATHS).toContain(
      "/guides/tn-plus-two-tamil/textbooks/class-11",
    );
  });
});

describe("HSE pathways", () => {
  it("does not invent numeric cut-offs", () => {
    const blob = JSON.stringify(HSE_EXPLAINERS);
    expect(blob).not.toMatch(/cut-off of \d/i);
    expect(blob.toLowerCase()).toContain("does not publish");
  });
});
