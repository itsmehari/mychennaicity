import { describe, expect, it } from "vitest";
import {
  articleInLanguage,
  articleLanguageAlternates,
  englishSlugForArticle,
} from "./article-language";

describe("article language twins", () => {
  it("maps EN tax desk to ta-IN and back", () => {
    const en = "gcc-suspends-property-tax-reassessment-august-2026";
    const ta = `${en}-tamil`;
    expect(articleInLanguage(en)).toBe("en-IN");
    expect(articleInLanguage(ta)).toBe("ta-IN");
    expect(englishSlugForArticle(ta)).toBe(en);
    const alts = articleLanguageAlternates(en);
    expect(alts?.["en-IN"]).toContain(en);
    expect(alts?.["ta-IN"]).toContain(ta);
  });
});
