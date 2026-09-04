import { describe, expect, it } from "vitest";
import { CIVIC_TOOLS } from "@/content/civic-tools/tools-config";
import {
  CIVIC_TOOL_PREVIEW_PATHS,
  CIVIC_TOOL_SITEMAP_PATHS,
  CIVIC_TOOLS_HUB_PATH,
} from "@/lib/routes/civic-tools";

describe("civic tool sitemap gates", () => {
  it("sitemaps the hub plus live tools only", () => {
    expect(CIVIC_TOOL_SITEMAP_PATHS[0]).toBe(CIVIC_TOOLS_HUB_PATH);
    expect(CIVIC_TOOL_SITEMAP_PATHS).not.toContain("/civic-tools/area-sabha");
    expect(CIVIC_TOOL_SITEMAP_PATHS).not.toContain("/civic-tools/zone-dashboard");
    expect(CIVIC_TOOL_SITEMAP_PATHS).not.toContain(
      "/civic-tools/zonal-office-access",
    );
    expect(CIVIC_TOOL_SITEMAP_PATHS).toContain("/civic-tools/flood-street-score");
    expect(CIVIC_TOOL_SITEMAP_PATHS).toHaveLength(
      1 + CIVIC_TOOLS.filter((t) => t.status === "live").length,
    );
  });

  it("lists every preview tool for ads deny-list", () => {
    expect(CIVIC_TOOL_PREVIEW_PATHS).toEqual(
      expect.arrayContaining([
        "/civic-tools/area-sabha",
        "/civic-tools/zone-dashboard",
        "/civic-tools/zonal-office-access",
      ]),
    );
  });
});
