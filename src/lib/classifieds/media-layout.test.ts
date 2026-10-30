import { describe, expect, it } from "vitest";
import {
  photoTileLayout,
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

describe("videoOrientationFromDimensions", () => {
  it("classifies phone walkthroughs as portrait", () => {
    expect(videoOrientationFromDimensions(464, 832)).toBe("portrait");
  });

  it("classifies wide clips as landscape", () => {
    expect(videoOrientationFromDimensions(1280, 720)).toBe("landscape");
  });
});

describe("photoTileLayout", () => {
  it("spans the first tile for three or five photos", () => {
    expect(photoTileLayout(3, 0).frameClass).toContain("col-span-2");
    expect(photoTileLayout(3, 1).frameClass).not.toContain("col-span-2");
    expect(photoTileLayout(5, 0).frameClass).toContain("col-span-2");
  });

  it("uses contain for a single photo", () => {
    expect(photoTileLayout(1, 0).objectFit).toBe("contain");
  });
});
