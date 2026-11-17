import { describe, expect, it } from "vitest";
import { whatsappJoinQueryNoindex } from "./whatsapp-join-seo";

describe("whatsappJoinQueryNoindex", () => {
  it("is indexable with no query", () => {
    expect(whatsappJoinQueryNoindex({})).toBe(false);
  });

  it("noindex for any query key", () => {
    expect(whatsappJoinQueryNoindex({ lang: "ta" })).toBe(true);
    expect(whatsappJoinQueryNoindex({ ok: "1" })).toBe(true);
    expect(whatsappJoinQueryNoindex({ utm_source: "x", placement: "y" })).toBe(true);
  });
});