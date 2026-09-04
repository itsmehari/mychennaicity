import { describe, expect, it } from "vitest";
import {
  hasDedicatedPartnerAdSlot,
  isPartnerAdHost,
  partnerAds,
  shouldShowSiteWideAd,
  withPartnerUtm,
} from "@/lib/partner-ads";

describe("withPartnerUtm", () => {
  it("bakes source, medium, campaign, and placement content", () => {
    const href = withPartnerUtm("https://vacancychennai.in/", "job_detail_square");
    const url = new URL(href);
    expect(url.searchParams.get("utm_source")).toBe("mychennaicity");
    expect(url.searchParams.get("utm_medium")).toBe("referral");
    expect(url.searchParams.get("utm_campaign")).toBe("partner_ad");
    expect(url.searchParams.get("utm_content")).toBe("job_detail_square");
  });
});

describe("partnerAds", () => {
  it("returns the same partners with placement-specific UTMs", () => {
    const ads = partnerAds("home_after_areas");
    expect(ads).toHaveLength(3);
    expect(ads.map((a) => a.id)).toEqual([
      "resumedoctor",
      "vacancychennai",
      "agsunwin",
    ]);
    for (const ad of ads) {
      expect(ad.href).toContain("utm_content=home_after_areas");
      expect(ad.href).toContain("utm_source=mychennaicity");
    }
  });
});

describe("isPartnerAdHost", () => {
  it("matches partner hosts with or without www", () => {
    expect(isPartnerAdHost("vacancychennai.in")).toBe(true);
    expect(isPartnerAdHost("www.resumedoctor.in")).toBe(true);
    expect(isPartnerAdHost("agsunwinenergysolutions.com")).toBe(true);
    expect(isPartnerAdHost("mychennaicity.in")).toBe(false);
  });
});

describe("shouldShowSiteWideAd", () => {
  it("hides on legal, auth, admin, and contact chrome", () => {
    expect(shouldShowSiteWideAd("/privacy")).toBe(false);
    expect(shouldShowSiteWideAd("/terms")).toBe(false);
    expect(shouldShowSiteWideAd("/cookies")).toBe(false);
    expect(shouldShowSiteWideAd("/admin")).toBe(false);
    expect(shouldShowSiteWideAd("/admin/articles")).toBe(false);
    expect(shouldShowSiteWideAd("/api/auth/signin")).toBe(false);
    expect(shouldShowSiteWideAd("/contact")).toBe(false);
    expect(shouldShowSiteWideAd("/chennai-local-events/submit")).toBe(false);
    expect(shouldShowSiteWideAd("/search")).toBe(false);
    expect(shouldShowSiteWideAd("/whatsapp-community/partners")).toBe(false);
    expect(shouldShowSiteWideAd("/civic-tools/area-sabha")).toBe(false);
    expect(shouldShowSiteWideAd("/civic-tools/zone-dashboard")).toBe(false);
    expect(shouldShowSiteWideAd("/civic-tools/zonal-office-access")).toBe(false);
  });

  it("hides when the page already has an inline slot", () => {
    expect(hasDedicatedPartnerAdSlot("/")).toBe(true);
    expect(shouldShowSiteWideAd("/")).toBe(false);
    expect(shouldShowSiteWideAd("/chennai-jobs")).toBe(false);
    expect(shouldShowSiteWideAd("/chennai-jobs/example-role")).toBe(false);
    expect(shouldShowSiteWideAd("/chennai-local-news")).toBe(false);
    expect(
      shouldShowSiteWideAd("/chennai-local-news/some-civic-story"),
    ).toBe(false);
    expect(
      shouldShowSiteWideAd("/chennai-local-news/topic/chennai"),
    ).toBe(false);
    expect(shouldShowSiteWideAd("/chennai-local-events")).toBe(false);
    expect(shouldShowSiteWideAd("/chennai-local-events/example-show")).toBe(
      false,
    );
    expect(shouldShowSiteWideAd("/directory")).toBe(false);
    expect(shouldShowSiteWideAd("/chennai-classifieds")).toBe(false);
    expect(shouldShowSiteWideAd("/chennai-classifieds/example-ad")).toBe(
      false,
    );
    expect(shouldShowSiteWideAd("/elections-2026")).toBe(false);
    expect(shouldShowSiteWideAd("/areas/adyar-thiruvanmiyur")).toBe(false);
    expect(shouldShowSiteWideAd("/guides/chennai-tech-careers")).toBe(false);
    expect(shouldShowSiteWideAd("/guides/tn-plus-two")).toBe(false);
    expect(shouldShowSiteWideAd("/guides/tn-plus-two/groups/2502")).toBe(false);
    expect(shouldShowSiteWideAd("/guides/tn-council-of-ministers")).toBe(false);
    expect(shouldShowSiteWideAd("/guides/tn-council-of-ministers/ministers/n-anand")).toBe(false);
    expect(shouldShowSiteWideAd("/guides/tn-council-of-ministers-tamil")).toBe(false);
  });

  it("shows on public pages without a dedicated slot", () => {
    expect(shouldShowSiteWideAd("/directory/restaurant/example")).toBe(true);
    expect(shouldShowSiteWideAd("/chennai-gold-rate")).toBe(true);
    expect(shouldShowSiteWideAd("/guides/chennai-auto-fare")).toBe(true);
    expect(shouldShowSiteWideAd("/chennai-jobs/looking-for-work")).toBe(true);
    expect(shouldShowSiteWideAd("/areas")).toBe(true);
  });
});
