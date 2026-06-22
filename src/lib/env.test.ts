import { afterEach, describe, expect, it, vi } from "vitest";

describe("getSiteUrl", () => {
  const originalUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const originalNodeEnv = process.env.NODE_ENV;
  const originalVercelEnv = process.env.VERCEL_ENV;

  afterEach(() => {
    if (originalUrl === undefined) {
      delete process.env.NEXT_PUBLIC_SITE_URL;
    } else {
      process.env.NEXT_PUBLIC_SITE_URL = originalUrl;
    }
    process.env.NODE_ENV = originalNodeEnv;
    if (originalVercelEnv === undefined) {
      delete process.env.VERCEL_ENV;
    } else {
      process.env.VERCEL_ENV = originalVercelEnv;
    }
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

  it("always returns .in on Vercel production even if env says .com", async () => {
    process.env.NEXT_PUBLIC_SITE_URL = "https://www.mychennaicity.com";
    process.env.VERCEL_ENV = "production";
    vi.resetModules();
    const { getSiteUrl } = await import("./env");
    expect(getSiteUrl()).toBe("https://mychennaicity.in");
  });

  it("rejects .com hostnames in a local production build", async () => {
    process.env.NEXT_PUBLIC_SITE_URL = "https://mychennaicity.com";
    process.env.NODE_ENV = "production";
    delete process.env.VERCEL_ENV;
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

describe("orgSameAsUrls", () => {
  const original = process.env.NEXT_PUBLIC_ORG_SAME_AS;
  const originalNodeEnv = process.env.NODE_ENV;

  afterEach(() => {
    if (original === undefined) {
      delete process.env.NEXT_PUBLIC_ORG_SAME_AS;
    } else {
      process.env.NEXT_PUBLIC_ORG_SAME_AS = original;
    }
    process.env.NODE_ENV = originalNodeEnv;
    vi.resetModules();
  });

  it("includes official profiles when env is unset", async () => {
    delete process.env.NEXT_PUBLIC_ORG_SAME_AS;
    vi.resetModules();
    const { orgSameAsUrls, OFFICIAL_ORG_SAME_AS_URLS } = await import("./env");
    expect(orgSameAsUrls()).toEqual([...OFFICIAL_ORG_SAME_AS_URLS]);
  });

  it("merges extra profiles from env without duplicates", async () => {
    process.env.NEXT_PUBLIC_ORG_SAME_AS =
      "https://www.youtube.com/@mychennaicity,https://www.instagram.com/mychennaicityportal/";
    vi.resetModules();
    const { orgSameAsUrls } = await import("./env");
    expect(orgSameAsUrls()).toEqual([
      "https://www.instagram.com/mychennaicityportal/",
      "https://x.com/my_chennaicity",
      "https://www.youtube.com/@mychennaicity",
    ]);
  });
});

describe("getOrgSocialLinks", () => {
  afterEach(() => {
    delete process.env.NEXT_PUBLIC_ORG_SAME_AS;
    vi.resetModules();
  });

  it("labels official social profiles", async () => {
    vi.resetModules();
    const { getOrgSocialLinks } = await import("./env");
    const links = getOrgSocialLinks();
    expect(links.some((l) => l.label === "Instagram")).toBe(true);
    expect(links.some((l) => l.href.includes("instagram.com/mychennaicityportal"))).toBe(
      true,
    );
    expect(links.some((l) => l.label === "X / Twitter")).toBe(true);
    expect(links.some((l) => l.href.includes("x.com/my_chennaicity"))).toBe(true);
  });
});
