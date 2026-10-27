import { NextRequest } from "next/server";
import { describe, expect, it } from "vitest";
import { GET } from "./route";

describe("GET /api/community/whatsapp", () => {
  it("sends old invite links to the join form", () => {
    const res = GET(
      new NextRequest(
        "https://mychennaicity.in/api/community/whatsapp?utm_content=hero",
      ),
    );
    const location = res.headers.get("location") ?? "";
    expect(location).toContain("/whatsapp-community/join");
    expect(location).toContain("src=hero");
    expect(location).not.toMatch(/whatsapp\.com/);
  });
});
