import { describe, expect, it } from "vitest";
import {
  CANONICAL_SITE_URL,
  isWrongSiteHost,
  SITE_HOST_ALIASES,
} from "@/lib/canonical-site";

describe("canonical-site", () => {
  it("defines apex .in origin", () => {
    expect(CANONICAL_SITE_URL).toBe("https://mychennaicity.in");
  });

  it("flags .com and www aliases", () => {
    for (const host of SITE_HOST_ALIASES) {
      expect(isWrongSiteHost(host)).toBe(true);
    }
    expect(isWrongSiteHost("mychennaicity.in")).toBe(false);
    expect(isWrongSiteHost("preview.vercel.app")).toBe(false);
  });

  it("flags any mychennaicity.com subdomain", () => {
    expect(isWrongSiteHost("www.mychennaicity.com")).toBe(true);
  });
});
