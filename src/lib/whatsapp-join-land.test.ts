import { describe, expect, it } from "vitest";
import {
  absoluteFirstSite,
  firstLandPath,
  firstPageFromReferer,
  shouldStampFirstLand,
} from "./whatsapp-join-land";

describe("whatsapp first land", () => {
  it("keeps the first public path and a short query", () => {
    expect(firstLandPath("/chennai-whatsapp-group", "")).toBe("/chennai-whatsapp-group");
    expect(firstLandPath("/whatsapp-community/join", "?src=hero")).toBe(
      "/whatsapp-community/join?src=hero",
    );
  });

  it("drops admin, api, and off-site paths", () => {
    expect(firstLandPath("/super-admin", "")).toBeNull();
    expect(firstLandPath("/api/contact/whatsapp", "")).toBeNull();
    expect(firstLandPath("//evil.example", "")).toBeNull();
  });

  it("builds a same-site URL and a join path from the referrer", () => {
    expect(absoluteFirstSite("https://mychennaicity.in", "/chennai-whatsapp-group")).toBe(
      "https://mychennaicity.in/chennai-whatsapp-group",
    );
    expect(
      firstPageFromReferer(
        "https://mychennaicity.in/whatsapp-community/join?src=hero",
        "https://mychennaicity.in",
      ),
    ).toBe("/whatsapp-community/join?src=hero");
    expect(
      firstPageFromReferer("https://example.com/out", "https://mychennaicity.in"),
    ).toBeNull();
  });

  it("stamps only the first document view", () => {
    expect(
      shouldStampFirstLand({
        method: "GET",
        existing: undefined,
        pathname: "/chennai-whatsapp-group",
        search: "",
        prefetch: false,
        rsc: false,
        dest: "document",
      }),
    ).toBe("/chennai-whatsapp-group");
    expect(
      shouldStampFirstLand({
        method: "GET",
        existing: "/chennai-whatsapp-group",
        pathname: "/whatsapp-community/join",
        search: "?src=hero",
        prefetch: false,
        rsc: false,
        dest: "document",
      }),
    ).toBeNull();
  });
});
