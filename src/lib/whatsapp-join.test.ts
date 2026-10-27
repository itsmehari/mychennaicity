import { describe, expect, it } from "vitest";
import { whatsappCommunityJoinHref, withWhatsappGroupShareUtms } from "./whatsapp-community";
import {
  isWhatsappJoinSpamNumber,
  normalizeIndianMobile,
  openJoinUnlock,
  sealJoinUnlock,
  whatsappJoinFollowupMessage,
  whatsappJoinSavePlan,
  whatsappJoinWaMeUrl,
} from "./whatsapp-join";

describe("whatsapp join phone", () => {
  it("accepts a 10-digit Indian mobile and stores e164 digits", () => {
    const phone = normalizeIndianMobile("+91 98765 43210");
    expect(phone).toMatchObject({
      e164: "919876543210",
      last4: "3210",
      display: "+91 98765 43210",
    });
  });

  it("rejects short and non-mobile numbers", () => {
    expect(normalizeIndianMobile("12345")).toBeNull();
    expect(normalizeIndianMobile("5123456789")).toBeNull();
  });

  it("rejects a known spam-list number", () => {
    expect(isWhatsappJoinSpamNumber("919717718323")).toBe(true);
    expect(whatsappJoinSavePlan(null, "919717718323")).toBe("reject-spam");
    expect(whatsappJoinSavePlan("spam", "919876543210")).toBe("reject-spam");
    expect(whatsappJoinSavePlan("approved", "919876543210")).toBe("update");
    expect(whatsappJoinSavePlan(null, "919876543210")).toBe("insert");
  });
});

describe("whatsapp join messages", () => {
  const invite = "https://example.test/group?utm_content=admin-nudge";

  it("writes the Ready line with the invite and the Approved line without it", () => {
    expect(
      whatsappJoinFollowupMessage({
        displayName: "Meera Nair",
        status: "submitted",
        phoneE164: "919876543210",
        inviteForNudge: invite,
      }),
    ).toBe(
      `Hi Meera, we have your MyChennai join request. Open the group link and tap Join so we can approve you. ${invite}`,
    );
    expect(
      whatsappJoinFollowupMessage({
        displayName: "Meera Nair",
        status: "approved",
        phoneE164: "919876543210",
        inviteForNudge: invite,
      }),
    ).toBe(
      "Hi Meera, you're in the MyChennai Chennai community. Open the group from the link we sent.",
    );
  });

  it("hides Message for declined, spam, and spam-list numbers", () => {
    expect(
      whatsappJoinWaMeUrl({
        displayName: "Meera",
        status: "declined",
        phoneE164: "919876543210",
        inviteForNudge: invite,
      }),
    ).toBeNull();
    expect(
      whatsappJoinWaMeUrl({
        displayName: "Flood",
        status: "submitted",
        phoneE164: "919717718323",
        inviteForNudge: invite,
      }),
    ).toBeNull();
  });
});

describe("whatsapp join urls", () => {
  it("points public CTAs at the form", () => {
    const href = whatsappCommunityJoinHref("nav");
    expect(href.startsWith("/whatsapp-community/join?src=nav")).toBe(true);
    expect(href).not.toMatch(/whatsapp\.com/);
  });

  it("tags links that will be pasted inside the group", () => {
    const url = withWhatsappGroupShareUtms("https://mychennaicity.in/chennai-local-news");
    expect(url).toContain("utm_source=whatsapp");
    expect(url).toContain("utm_medium=group");
    expect(url).toContain("utm_campaign=community_share");
  });

  it("seals the success cookie for 24 hours", () => {
    const token = sealJoinUnlock("test-secret", "Meera", "+91 98765 43210", 1_000);
    expect(openJoinUnlock("test-secret", token, 1_000)).toEqual({
      name: "Meera",
      phone: "+91 98765 43210",
    });
    expect(openJoinUnlock("test-secret", token, 1_000 + 25 * 60 * 60 * 1000)).toBeNull();
    expect(openJoinUnlock("other-secret", token, 1_000)).toBeNull();
  });
});
