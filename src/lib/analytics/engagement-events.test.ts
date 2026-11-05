import { describe, expect, it } from "vitest";
import { isCrawlerUserAgent } from "./crawler-ua";
import {
  contentKindFromParam,
  engagementAttrForHref,
  engagementEventFromClick,
  isTrackedSlug,
} from "./engagement-events";

function node(attrs: Record<string, string | null>) {
  return {
    getAttribute(name: string) {
      return attrs[name] ?? null;
    },
  };
}

describe("engagement click classification", () => {
  it("reads call and WhatsApp links", () => {
    expect(engagementEventFromClick(node({ href: "tel:+917671065348" }))).toBe("call_click");
    expect(
      engagementEventFromClick(node({ href: "https://wa.me/917671065348?text=Hi" })),
    ).toBe("whatsapp_click");
    expect(
      engagementEventFromClick(node({ href: "https://api.whatsapp.com/send?phone=91" })),
    ).toBe("whatsapp_click");
  });

  it("counts the event enquire button and ignores other links", () => {
    expect(engagementEventFromClick(node({ "data-whatsapp-desk": "" }))).toBe(
      "whatsapp_click",
    );
    expect(engagementEventFromClick(node({ href: "/whatsapp-community/join" }))).toBeNull();
    expect(engagementEventFromClick(node({ href: "https://facebook.com/x" }))).toBeNull();
  });

  it("marks call and WhatsApp hrefs for classified buttons", () => {
    expect(engagementAttrForHref("tel:+917671065348")).toBe("call");
    expect(engagementAttrForHref("https://wa.me/917671065348")).toBe("whatsapp");
    expect(engagementAttrForHref("https://facebook.com/x")).toBeUndefined();
  });

  it("skips crawlers and keeps in-app browsers", () => {
    expect(isCrawlerUserAgent("Mozilla/5.0 (compatible; Googlebot/2.1)")).toBe(true);
    expect(isCrawlerUserAgent("facebookexternalhit/1.1")).toBe(true);
    expect(
      isCrawlerUserAgent(
        "Mozilla/5.0 (Linux; Android 14) AppleWebKit/537.36 Chrome/120.0.0.0 Mobile Safari/537.36",
      ),
    ).toBe(false);
  });

  it("accepts stored slugs and the admin kind param", () => {
    expect(isTrackedSlug("male-office-assistant-guindy-race-course")).toBe(true);
    expect(isTrackedSlug("resumedoctor--home_after_areas")).toBe(true);
    expect(isTrackedSlug("../admin")).toBe(false);
    expect(contentKindFromParam("job-seeker")).toBe("job_seeker");
    expect(contentKindFromParam("news")).toBe("news");
    expect(contentKindFromParam("users")).toBeNull();
  });
});
