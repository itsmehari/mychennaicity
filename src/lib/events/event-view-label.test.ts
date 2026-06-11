import { describe, expect, it } from "vitest";
import { formatReaderViewLabel } from "./event-view-label";

describe("formatReaderViewLabel", () => {
  it("returns null for zero or invalid counts", () => {
    expect(formatReaderViewLabel(0)).toBeNull();
    expect(formatReaderViewLabel(-1)).toBeNull();
  });

  it("uses singular copy for one reader", () => {
    expect(formatReaderViewLabel(1)).toBe("1 reader viewed this");
  });

  it("uses plural copy with locale grouping", () => {
    expect(formatReaderViewLabel(142)).toBe("142 readers viewed this");
    expect(formatReaderViewLabel(1200)).toBe("1,200 readers viewed this");
  });
});
