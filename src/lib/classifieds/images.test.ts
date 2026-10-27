import { describe, expect, it } from "vitest";
import {
  classifiedCoverSrc,
  classifiedImageUrls,
} from "./images";
import { isClassifiedCategoryId } from "./categories";

describe("classified images", () => {
  it("keeps site paths and https urls", () => {
    expect(
      classifiedImageUrls([
        "/images/classifieds/a.png",
        "https://mychennaicity.in/x.png",
        "javascript:alert(1)",
        "  ",
      ]),
    ).toEqual([
      "/images/classifieds/a.png",
      "https://mychennaicity.in/x.png",
    ]);
  });

  it("uses the first photo as cover", () => {
    expect(
      classifiedCoverSrc(["/images/classifieds/a.png", "/images/classifieds/b.png"]),
    ).toBe("/images/classifieds/a.png");
    expect(classifiedCoverSrc(null)).toBeNull();
  });
});

describe("classified categories", () => {
  it("recognises vehicles", () => {
    expect(isClassifiedCategoryId("vehicles")).toBe(true);
  });
});
