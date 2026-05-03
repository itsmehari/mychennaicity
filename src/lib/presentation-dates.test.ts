import { describe, expect, it } from "vitest";
import { formatIndiaLongDate } from "./presentation-dates";

describe("formatIndiaLongDate", () => {
  it("formats fixed instant in IST", () => {
    const d = new Date("2026-04-30T12:00:00.000Z");
    expect(formatIndiaLongDate(d)).toBe("30 Apr 2026");
  });
});
