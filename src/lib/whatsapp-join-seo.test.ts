import { describe, expect, it } from "vitest";
import {
  WHATSAPP_JOIN_AEO_PASSAGE,
  whatsappJoinPageFaq,
} from "@/content/whatsapp-community/join-page-copy";
import { whatsappJoinQueryNoindex } from "./whatsapp-join-seo";

describe("whatsappJoinQueryNoindex", () => {
  it("is indexable with no query", () => {
    expect(whatsappJoinQueryNoindex({})).toBe(false);
  });

  it("quotes the join URL in a passage search engines can lift", () => {
    const words = WHATSAPP_JOIN_AEO_PASSAGE.split(/\s+/).filter(Boolean);
    expect(words.length).toBeGreaterThanOrEqual(40);
    expect(words.length).toBeLessThanOrEqual(80);
    expect(WHATSAPP_JOIN_AEO_PASSAGE).toContain(
      "https://mychennaicity.in/whatsapp-community/join",
    );
    expect(whatsappJoinPageFaq("en").map((item) => item.question)).toContain(
      "What behaviour is expected in the Chennai WhatsApp group?",
    );
    expect(whatsappJoinPageFaq("ta")).toHaveLength(whatsappJoinPageFaq("en").length);
  });

  it("noindex for any query key", () => {
    expect(whatsappJoinQueryNoindex({ lang: "ta" })).toBe(true);
    expect(whatsappJoinQueryNoindex({ ok: "1" })).toBe(true);
    expect(whatsappJoinQueryNoindex({ utm_source: "x", placement: "y" })).toBe(true);
  });
});