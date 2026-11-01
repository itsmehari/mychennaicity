import { describe, expect, it } from "vitest";
import {
  photoGalleryLayout,
  photoTileLayout,
  photoTileUsesMasonry,
  resolveClassifiedMediaMode,
  videoOrientationFromDimensions,
} from "./media-layout";

describe("resolveClassifiedMediaMode", () => {
  it("detects none, photos, video, and mixed", () => {
    expect(resolveClassifiedMediaMode(0, false)).toBe("none");
    expect(resolveClassifiedMediaMode(2, false)).toBe("photos");
    expect(resolveClassifiedMediaMode(0, true)).toBe("video");
    expect(resolveClassifiedMediaMode(4, true)).toBe("mixed");
  });
});

describe("photoGalleryLayout", () => {
  it("escalates to masonry for five or more photos", () => {
    expect(photoGalleryLayout(1)).toBe("single");
    expect(photoGalleryLayout(4)).toBe("quad");
    expect(photoGalleryLayout(5)).toBe("masonry");
  });
});

describe("videoOrientationFromDimensions", () => {
  it("classifies phone walkthroughs as portrait", () => {
    expect(videoOrientationFromDimensions(464, 832)).toBe("portrait");
  });

  it("classifies wide clips as landscape", () => {
    expect(videoOrientationFromDimensions(1280, 720)).toBe("landscape");
  });
});

describe("photoTileLayout", () => {
  it("spans the first tile in the feature layout", () => {
    expect(photoTileLayout("feature", 0).frameClass).toContain("col-span-2");
    expect(photoTileLayout("feature", 1).frameClass).not.toContain("col-span-2");
  });

  it("uses contain for a single photo", () => {
    expect(photoTileLayout("single", 0).objectFit).toBe("contain");
  });

  it("marks masonry layouts", () => {
    expect(photoTileUsesMasonry("masonry")).toBe(true);
    expect(photoTileUsesMasonry("quad")).toBe(false);
  });
});
