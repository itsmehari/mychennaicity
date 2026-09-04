import { describe, expect, it } from "vitest";
import { getRichAreaHubContent } from "@/content/area-hubs/index";

const CUSTOM_SLUGS = [
  "omr-perungudi-sholinganallur",
  "adyar-thiruvanmiyur",
  "kodambakkam-t-nagar",
  "ambattur-annanagar",
] as const;

describe("custom area hub packs", () => {
  it("overrides doorway FAQ on the three P1 hubs plus OMR", () => {
    for (const slug of CUSTOM_SLUGS) {
      const pack = getRichAreaHubContent(slug);
      expect(pack).toBeDefined();
      expect(pack!.faq.length).toBeGreaterThanOrEqual(5);
      const questions = pack!.faq.map((f) => f.question).join(" ");
      expect(questions).not.toMatch(/area hub on mychennaicity\.in/i);
    }
  });

  it("does not reuse the default identical mapBlurb on custom packs", () => {
    for (const slug of CUSTOM_SLUGS) {
      const pack = getRichAreaHubContent(slug)!;
      expect(pack.mapBlurb).not.toBe(
        "Wards in this hub highlight on the city map. Open the full explorer to pick a ward and jump back into local news.",
      );
    }
  });
});
