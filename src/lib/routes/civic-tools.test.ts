import { describe, expect, it } from "vitest";
import { CIVIC_TOOLS } from "@/content/civic-tools/tools-config";
import {
  CIVIC_TOOL_PREVIEW_PATHS,
  CIVIC_TOOL_SITEMAP_PATHS,
  CIVIC_TOOLS_HUB_PATH,
} from "@/lib/routes/civic-tools";
import { ZONAL_OFFICE_SEED } from "../../../data/civic-geo/zonal-offices";

describe("civic tool sitemap gates", () => {
  it("sitemaps the hub plus live tools only", () => {
    expect(CIVIC_TOOL_SITEMAP_PATHS[0]).toBe(CIVIC_TOOLS_HUB_PATH);
    expect(CIVIC_TOOL_SITEMAP_PATHS).toContain("/civic-tools/area-sabha");
    expect(CIVIC_TOOL_SITEMAP_PATHS).toContain("/civic-tools/zone-dashboard");
    expect(CIVIC_TOOL_SITEMAP_PATHS).toContain(
      "/civic-tools/zonal-office-access",
    );
    expect(CIVIC_TOOL_SITEMAP_PATHS).toContain("/civic-tools/flood-street-score");
    expect(CIVIC_TOOL_SITEMAP_PATHS).toHaveLength(
      1 + CIVIC_TOOLS.filter((t) => t.status === "live").length,
    );
  });

  it("has no remaining preview civic tools", () => {
    expect(CIVIC_TOOL_PREVIEW_PATHS).toEqual([]);
    expect(CIVIC_TOOLS.every((t) => t.status === "live")).toBe(true);
  });

  it("lists 15 GCC zonal offices with directory fields", () => {
    expect(ZONAL_OFFICE_SEED).toHaveLength(15);
    for (const office of ZONAL_OFFICE_SEED) {
      expect(office.address).toMatch(/Chennai/);
      expect(office.email).toMatch(/@chennaicorporation\.gov\.in$/);
      expect(office.phone).toMatch(/1913/);
      expect(office.lat).toEqual(expect.any(Number));
      expect(office.lng).toEqual(expect.any(Number));
    }
  });
});
