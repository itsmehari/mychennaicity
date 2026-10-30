import { describe, expect, it } from "vitest";
import { normalizeEnquirerName, normalizeIndianMobile } from "./phone-gate";

describe("normalizeIndianMobile", () => {
  it("keeps a 10-digit mobile that starts with 91", () => {
    expect(normalizeIndianMobile("9176691715")).toBe("9176691715");
  });

  it("strips a leading 91 only when the full number is 12 digits", () => {
    expect(normalizeIndianMobile("919176691715")).toBe("9176691715");
    expect(normalizeIndianMobile("+91 88389 22250")).toBe("8838922250");
  });
});

describe("normalizeEnquirerName", () => {
  it("keeps a normal name", () => {
    expect(normalizeEnquirerName("  Priya  N  ")).toBe("Priya N");
  });

  it("rejects a blank name, a url, and a number", () => {
    expect(normalizeEnquirerName(" ")).toBeNull();
    expect(normalizeEnquirerName("https://example.com")).toBeNull();
    expect(normalizeEnquirerName("9876543210")).toBeNull();
  });
});
