import { describe, expect, it, afterEach } from "vitest";
import { FREE_POST_BRAND_PREFIX, freePostStarter } from "@/content/free-posting";
import { buildFreePostHref } from "@/lib/free-posting-desk";

describe("free posting desk links", () => {
  const previous = process.env.WHATSAPP_BUSINESS_E164;

  afterEach(() => {
    if (previous === undefined) delete process.env.WHATSAPP_BUSINESS_E164;
    else process.env.WHATSAPP_BUSINESS_E164 = previous;
  });

  it("prefixes every starter with the site mark", () => {
    expect(freePostStarter("job").startsWith(`${FREE_POST_BRAND_PREFIX} `)).toBe(true);
    expect(freePostStarter("pg")).toContain("PG");
    expect(freePostStarter("home")).not.toContain("chat.whatsapp.com");
  });

  it("hides the button when the desk number is missing", () => {
    delete process.env.WHATSAPP_BUSINESS_E164;
    expect(buildFreePostHref("job")).toBeNull();
  });

  it("builds a wa.me link to the desk", () => {
    process.env.WHATSAPP_BUSINESS_E164 = "919000000000";
    const href = buildFreePostHref("classified");
    expect(href).toBeTruthy();
    const url = new URL(href!);
    expect(url.origin).toBe("https://wa.me");
    expect(url.pathname).toBe("/919000000000");
    expect(url.searchParams.get("text")?.startsWith(FREE_POST_BRAND_PREFIX)).toBe(true);
  });
});
