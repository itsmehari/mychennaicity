import { afterEach, describe, expect, it } from "vitest";
import { NextRequest } from "next/server";
import { GET, POST } from "./route";

const FAKE_LINE = "919800000000";

describe("contact WhatsApp desk route", () => {
  const previous = process.env.WHATSAPP_BUSINESS_E164;

  afterEach(() => {
    if (previous === undefined) delete process.env.WHATSAPP_BUSINESS_E164;
    else process.env.WHATSAPP_BUSINESS_E164 = previous;
  });

  it("GET never returns a WhatsApp address", async () => {
    process.env.WHATSAPP_BUSINESS_E164 = FAKE_LINE;
    const res = GET(
      new NextRequest("https://mychennaicity.in/api/contact/whatsapp?text=hello"),
    );
    const location = res.headers.get("location") ?? "";
    const body = await res.text();
    expect(location).toBe("https://mychennaicity.in/contact");
    expect(`${location}\n${body}`).not.toMatch(/wa\.me|api\.whatsapp|9800000000/);
    expect(res.headers.get("x-robots-tag")).toContain("noindex");
  });

  it("POST from another site does not return a WhatsApp address", async () => {
    process.env.WHATSAPP_BUSINESS_E164 = FAKE_LINE;
    const res = await POST(
      new NextRequest("https://mychennaicity.in/api/contact/whatsapp", {
        method: "POST",
        headers: {
          origin: "https://example.com",
          "content-type": "application/json",
          "x-forwarded-for": "203.0.113.10",
        },
        body: JSON.stringify({ text: "hello", source: "news" }),
      }),
    );
    expect(res.status).toBe(403);
    expect(await res.text()).not.toMatch(/wa\.me|9800000000/);
  });

  it("POST from the site returns a WhatsApp address for the click", async () => {
    process.env.WHATSAPP_BUSINESS_E164 = FAKE_LINE;
    const res = await POST(
      new NextRequest("https://mychennaicity.in/api/contact/whatsapp", {
        method: "POST",
        headers: {
          origin: "https://mychennaicity.in",
          "sec-fetch-site": "same-origin",
          "content-type": "application/json",
          "x-forwarded-for": "203.0.113.11",
        },
        body: JSON.stringify({ text: "Story tip", source: "news" }),
      }),
    );
    expect(res.status).toBe(200);
    const json = (await res.json()) as { url: string };
    expect(json.url.startsWith(`https://wa.me/${FAKE_LINE}?`)).toBe(true);
    expect(json.url).toContain("Story");
    expect(res.headers.get("cache-control")).toContain("no-store");
  });
});
