import { describe, expect, it } from "vitest";
import { extractEmployerPhoneFromApplyUrl } from "./job-call-phone";

describe("extractEmployerPhoneFromApplyUrl", () => {
  it("reads tel links", () => {
    expect(extractEmployerPhoneFromApplyUrl("tel:+918610103740")).toBe("8610103740");
  });

  it("reads wa.me links", () => {
    expect(
      extractEmployerPhoneFromApplyUrl(
        "https://wa.me/918870905988?text=hi",
      ),
    ).toBe("8870905988");
  });

  it("returns null for mailto", () => {
    expect(extractEmployerPhoneFromApplyUrl("mailto:a@b.com")).toBeNull();
  });
});
