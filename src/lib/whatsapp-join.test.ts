import { describe, expect, it } from "vitest";
import { whatsappCommunityJoinHref, withWhatsappGroupShareUtms } from "./whatsapp-community";
import {
  isWhatsappJoinId,
  parseWhatsappJoinStatus,
  safeWhatsappQueueReturn,
  withQueueFlag,
} from "./whatsapp-join-desk";
import {
  formatWhatsappJoinPhone,
  formatWhatsappJoinStamp,
  isWhatsappJoinSpamNumber,
  normalizeIndianMobile,
  openJoinUnlock,
  sealJoinUnlock,
  whatsappJoinFollowupMessage,
  whatsappJoinQueueHeadline,
  whatsappJoinNudgeEligible,
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

  it("formats the queue phone and the IST stamp", () => {
    expect(formatWhatsappJoinPhone("919876543210")).toBe("+91 98765 43210");
    expect(formatWhatsappJoinStamp(new Date("2026-11-04T16:06:00.000Z"))).toBe(
      "4 Nov, 21:36",
    );
  });

  it("puts the intro on the queue row and falls back to the intent chip", () => {
    expect(whatsappJoinQueueHeadline("jobs", "  Fresher looking for work  ")).toBe(
      "Fresher looking for work",
    );
    expect(whatsappJoinQueueHeadline("jobs", "  ")).toBe("Jobs");
    expect(whatsappJoinQueueHeadline("custom pitch", null)).toBe("custom pitch");
  });

  it("rejects a known spam-list number", () => {
    expect(isWhatsappJoinSpamNumber("919717718323")).toBe(true);
    expect(whatsappJoinSavePlan(null, "919717718323")).toBe("reject-spam");
    expect(whatsappJoinSavePlan("spam", "919876543210")).toBe("reject-spam");
    expect(whatsappJoinSavePlan("approved", "919876543210")).toBe("keep-approved");
    expect(whatsappJoinSavePlan("declined", "919876543210")).toBe("update");
    expect(whatsappJoinSavePlan(null, "919876543210")).toBe("insert");
  });
});

describe("whatsapp join messages", () => {
  const invite = "https://example.test/group?utm_content=admin-nudge";

  it("writes a reply-first Ready line with no invite, and none for approved rows", () => {
    expect(
      whatsappJoinFollowupMessage({
        displayName: "Meera Nair",
        status: "submitted",
        phoneE164: "919876543210",
        locality: "Velachery",
        inviteForNudge: invite,
      }),
    ).toBe(
      "Hi Meera, we got your MyChennai request for Velachery. If WhatsApp did not open the group, reply here and we will help.",
    );
    expect(
      whatsappJoinFollowupMessage({
        displayName: "Meera Nair",
        status: "approved",
        phoneE164: "919876543210",
        inviteForNudge: invite,
      }),
    ).toBeNull();
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

describe("whatsapp join nudge window", () => {
  const created = new Date("2026-11-16T00:00:00.000Z");

  it("waits 12 hours and only during IST daytime", () => {
    expect(
      whatsappJoinNudgeEligible({
        status: "submitted",
        lastContactedAt: null,
        createdAt: created,
        approvalHours: 12,
        now: new Date("2026-11-16T04:30:00.000Z"),
        daytime: true,
      }),
    ).toBe(false);
    expect(
      whatsappJoinNudgeEligible({
        status: "submitted",
        lastContactedAt: null,
        createdAt: created,
        approvalHours: 12,
        now: new Date("2026-11-16T13:00:00.000Z"),
        daytime: false,
      }),
    ).toBe(false);
    expect(
      whatsappJoinNudgeEligible({
        status: "submitted",
        lastContactedAt: null,
        createdAt: created,
        approvalHours: 12,
        now: new Date("2026-11-16T13:00:00.000Z"),
        daytime: true,
      }),
    ).toBe(true);
  });
});

describe("whatsapp join desk redirects", () => {
  it("keeps only the queue page as the post-save return", () => {
    expect(safeWhatsappQueueReturn("/super-admin/whatsapp-join-requests?status=spam&q=porur")).toBe(
      "/super-admin/whatsapp-join-requests?status=spam&q=porur",
    );
    expect(safeWhatsappQueueReturn("https://evil.example/super-admin/whatsapp-join-requests")).toBe(
      "/super-admin/whatsapp-join-requests",
    );
    expect(safeWhatsappQueueReturn("//evil.example")).toBe("/super-admin/whatsapp-join-requests");
    expect(safeWhatsappQueueReturn("/super-admin/jobs")).toBe("/super-admin/whatsapp-join-requests");
  });

  it("adds one notice and drops the previous flag", () => {
    expect(
      withQueueFlag("/super-admin/whatsapp-join-requests?status=submitted&error=save", "notice", "approved"),
    ).toBe("/super-admin/whatsapp-join-requests?status=submitted&notice=approved");
    expect(parseWhatsappJoinStatus("approved")).toBe("approved");
    expect(parseWhatsappJoinStatus("ready")).toBeNull();
    expect(isWhatsappJoinId("6f1e3c2a-9b7d-4e8a-8c1d-2a4b6c8d0e1f")).toBe(true);
    expect(isWhatsappJoinId("not-an-id")).toBe(false);
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
