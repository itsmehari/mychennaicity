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
  const originalEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL;
  const originalNodeEnv = process.env.NODE_ENV;

  afterEach(() => {
    if (originalEmail === undefined) {
      delete process.env.NEXT_PUBLIC_CONTACT_EMAIL;
    } else {
      process.env.NEXT_PUBLIC_CONTACT_EMAIL = originalEmail;
    }
    process.env.NODE_ENV = originalNodeEnv;
    vi.resetModules();
  });

  it("returns official inbox in production even when env is stale", async () => {
    process.env.NODE_ENV = "production";
    process.env.NEXT_PUBLIC_CONTACT_EMAIL = "old@example.com";
    vi.resetModules();
    const { getPublicContactEmail, OFFICIAL_PUBLIC_CONTACT_EMAIL } =
      await import("./env");
    expect(getPublicContactEmail()).toBe(OFFICIAL_PUBLIC_CONTACT_EMAIL);
  });

  it("returns official inbox when unset in development", async () => {
    process.env.NODE_ENV = "development";
    delete process.env.NEXT_PUBLIC_CONTACT_EMAIL;
    vi.resetModules();
    const { getPublicContactEmail, OFFICIAL_PUBLIC_CONTACT_EMAIL } =
      await import("./env");
    expect(getPublicContactEmail()).toBe(OFFICIAL_PUBLIC_CONTACT_EMAIL);
  });

  it("allows dev override when env is valid", async () => {
    process.env.NODE_ENV = "development";
    process.env.NEXT_PUBLIC_CONTACT_EMAIL = "  dev@example.com  ";
    vi.resetModules();
    const { getPublicContactEmail } = await import("./env");
    expect(getPublicContactEmail()).toBe("dev@example.com");
  });
});
