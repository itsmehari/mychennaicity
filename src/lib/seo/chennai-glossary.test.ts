import { describe, expect, it } from "vitest";
import { CHENNAI_GLOSSARY } from "@/lib/seo/chennai-glossary";

describe("Chennai glossary", () => {
  it("has at least 13 terms including the P2 civic set", () => {
    expect(CHENNAI_GLOSSARY.length).toBeGreaterThanOrEqual(13);
    const slugs = CHENNAI_GLOSSARY.map((e) => e.slug);
    expect(slugs).toEqual(
      expect.arrayContaining([
        "cmda",
        "tangedco",
        "cmwssb",
        "minnagam",
        "gcc-ward",
        "mtc",
        "ecr",
        "tidel",
      ]),
    );
  });
});
