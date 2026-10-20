import { describe, expect, it } from "vitest";
import { normalizeIndianMobile } from "./phone-gate";

describe("normalizeIndianMobile", () => {
  it("keeps a 10-digit mobile that starts with 91", () => {
    expect(normalizeIndianMobile("9176691715")).toBe("9176691715");
  });

  it("strips a leading 91 only when the full number is 12 digits", () => {
    expect(normalizeIndianMobile("919176691715")).toBe("9176691715");
    expect(normalizeIndianMobile("+91 88389 22250")).toBe("8838922250");
  });
});
