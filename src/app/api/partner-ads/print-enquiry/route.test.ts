import { afterEach, describe, expect, it } from "vitest";
import { NextRequest } from "next/server";
import { GET, POST } from "./route";

const FAKE_LINE = "919800000000";

describe("print-offer WhatsApp enquiry", () => {
  const previous = process.env.WHATSAPP_PRINT_ENQUIRY_E164;

  afterEach(() => {
    if (previous === undefined) delete process.env.WHATSAPP_PRINT_ENQUIRY_E164;
    else process.env.WHATSAPP_PRINT_ENQUIRY_E164 = previous;
  });

  it("GET never returns a WhatsApp address", async () => {
    process.env.WHATSAPP_PRINT_ENQUIRY_E164 = FAKE_LINE;
    const res = GET(
      new NextRequest("https://mychennaicity.in/api/partner-ads/print-enquiry"),
    );
    const location = res.headers.get("location") ?? "";
    const body = await res.text();
    expect(location).toBe("https://mychennaicity.in/contact");
    expect(`${location}\n${body}`).not.toMatch(/wa\.me|api\.whatsapp|9800000000/);
    expect(res.headers.get("x-robots-tag")).toContain("noindex");
    expect(res.headers.get("x-robots-tag")).toContain("nofollow");
  });

  it("POST from another site does not return a WhatsApp address", async () => {
    process.env.WHATSAPP_PRINT_ENQUIRY_E164 = FAKE_LINE;
    const res = await POST(
      new NextRequest("https://mychennaicity.in/api/partner-ads/print-enquiry", {
        method: "POST",
        headers: {
          origin: "https://example.com",
          "x-forwarded-for": "203.0.113.20",
        },
      }),
    );
    expect(res.status).toBe(403);
    expect(await res.text()).not.toMatch(/wa\.me|9800000000/);
  });

  it("POST from the site returns a WhatsApp enquiry without campaign tags", async () => {
    process.env.WHATSAPP_PRINT_ENQUIRY_E164 = FAKE_LINE;
    const res = await POST(
      new NextRequest("https://mychennaicity.in/api/partner-ads/print-enquiry", {
        method: "POST",
        headers: {
          origin: "https://mychennaicity.in",
          "sec-fetch-site": "same-origin",
          "x-forwarded-for": "203.0.113.21",
        },
      }),
    );
    expect(res.status).toBe(200);
    const json = (await res.json()) as { url: string };
    const parsed = new URL(json.url);
    expect(parsed.origin).toBe("https://wa.me");
    expect(parsed.pathname).toBe(`/${FAKE_LINE}`);
    expect(parsed.searchParams.get("text")).toMatch(/enquiry/i);
    expect(parsed.search).not.toMatch(/utm_/);
    expect(res.headers.get("referrer-policy")).toBe("no-referrer");
    expect(res.headers.get("x-robots-tag")).toContain("noindex");
  });
});
