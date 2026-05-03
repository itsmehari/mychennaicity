import { afterEach, describe, expect, it, vi } from "vitest";

describe("getSiteUrl", () => {
  const originalUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const originalNodeEnv = process.env.NODE_ENV;

  afterEach(() => {
    if (originalUrl === undefined) {
      delete process.env.NEXT_PUBLIC_SITE_URL;
    } else {
      process.env.NEXT_PUBLIC_SITE_URL = originalUrl;
    }
    process.env.NODE_ENV = originalNodeEnv;
    vi.resetModules();
  });

  it("defaults when unset", async () => {
    delete process.env.NEXT_PUBLIC_SITE_URL;
    vi.resetModules();
    const { getSiteUrl } = await import("./env");
    expect(getSiteUrl()).toBe("https://mychennaicity.in");
  });

  it("trims and strips trailing slashes", async () => {
    process.env.NEXT_PUBLIC_SITE_URL = "  https://example.com/path/  ";
    vi.resetModules();
    const { getSiteUrl } = await import("./env");
    expect(getSiteUrl()).toBe("https://example.com");
  });

  it("upgrades http to https in production", async () => {
    process.env.NEXT_PUBLIC_SITE_URL = "http://mychennaicity.in";
    process.env.NODE_ENV = "production";
    vi.resetModules();
    const { getSiteUrl } = await import("./env");
    expect(getSiteUrl()).toBe("https://mychennaicity.in");
  });
});

describe("getPublicContactEmail", () => {
  const original = process.env.NEXT_PUBLIC_CONTACT_EMAIL;

  afterEach(() => {
    if (original === undefined) {
      delete process.env.NEXT_PUBLIC_CONTACT_EMAIL;
    } else {
      process.env.NEXT_PUBLIC_CONTACT_EMAIL = original;
    }
    vi.resetModules();
  });

  it("returns null when unset", async () => {
    delete process.env.NEXT_PUBLIC_CONTACT_EMAIL;
    vi.resetModules();
    const { getPublicContactEmail } = await import("./env");
    expect(getPublicContactEmail()).toBeNull();
  });

  it("returns null for invalid value", async () => {
    process.env.NEXT_PUBLIC_CONTACT_EMAIL = "not-an-email";
    vi.resetModules();
    const { getPublicContactEmail } = await import("./env");
    expect(getPublicContactEmail()).toBeNull();
  });

  it("trims valid email", async () => {
    process.env.NEXT_PUBLIC_CONTACT_EMAIL = "  hello@mychennaicity.in  ";
    vi.resetModules();
    const { getPublicContactEmail } = await import("./env");
    expect(getPublicContactEmail()).toBe("hello@mychennaicity.in");
  });
});
