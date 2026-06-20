import { describe, expect, it } from "vitest";
import {
  ADSENSE_PUBLISHER_ID_DEFAULT,
  adsTxtBody,
  normalizeAdsensePublisherId,
  resolveAdsensePublisherId,
} from "@/lib/adsense-config";

describe("adsense-config", () => {
  it("builds the Google-recommended ads.txt line", () => {
    expect(adsTxtBody(ADSENSE_PUBLISHER_ID_DEFAULT)).toBe(
      "google.com, pub-5760699639501978, DIRECT, f08c47fec0942fa0\n",
    );
  });

  it("normalises ca-pub and digits-only env values", () => {
    expect(normalizeAdsensePublisherId("ca-pub-5760699639501978")).toBe(
      "pub-5760699639501978",
    );
    expect(normalizeAdsensePublisherId("5760699639501978")).toBe(
      "pub-5760699639501978",
    );
  });

  it("falls back to site default when env is empty", () => {
    expect(resolveAdsensePublisherId(undefined)).toBe(
      "pub-5760699639501978",
    );
    expect(resolveAdsensePublisherId("pub-1111111111111111")).toBe(
      "pub-1111111111111111",
    );
  });
});
