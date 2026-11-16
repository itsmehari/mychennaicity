import { describe, expect, it } from "vitest";
import { waLink, whatsappRequestCtaLabel } from "./whatsapp-link";

describe("waLink", () => {
  it("builds request and learn paths and never an invite", () => {
    const request = waLink("request", { source: "nav", placement: "nav" });
    expect(request.startsWith("/whatsapp-community/join?src=")).toBe(true);
    expect(request).toContain("placement=nav");
    expect(waLink("learn", { lang: "ta" })).toBe("/chennai-whatsapp-group-tamil");
    expect(waLink("chat")).toBe("/contact");
    expect(request).not.toMatch(/chat\.whatsapp\.com/);
  });

  it("adds share UTMs and refuses listing without a number", () => {
    const share = waLink("share", { url: "https://mychennaicity.in/chennai-jobs" });
    expect(share.startsWith("https://wa.me/?text=")).toBe(true);
    expect(decodeURIComponent(share)).toContain("utm_source=whatsapp");
    expect(decodeURIComponent(share)).toContain("utm_medium=share");
    expect(waLink("listing", {})).toBe("#");
    expect(waLink("listing", { phoneE164: "919876543210" })).toBe(
      "https://wa.me/919876543210",
    );
  });

  it("labels Request vs waitlist from the accepting switch", () => {
    expect(whatsappRequestCtaLabel("en")).toMatch(/Request|waitlist/i);
  });
});
