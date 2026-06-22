import { describe, expect, it, vi } from "vitest";
import {
  buildResumeDoctorStripUrl,
  selectResumeDoctorStripVariant,
} from "@/lib/partners/resumedoctor-strip";

describe("buildResumeDoctorStripUrl", () => {
  it("adds UTMs with variant id as content", () => {
    const url = buildResumeDoctorStripUrl("before-apply");
    expect(url).toContain("utm_source=mychennaicity");
    expect(url).toContain("utm_medium=job-detail");
    expect(url).toContain("utm_campaign=resumedoctor_strip");
    expect(url).toContain("utm_content=before-apply");
    expect(url.startsWith("https://www.resumedoctor.in/")).toBe(true);
  });

  it("uses try URL for secondary path", () => {
    const url = buildResumeDoctorStripUrl("job-seeker-secondary", "/try");
    expect(url.startsWith("https://www.resumedoctor.in/try")).toBe(true);
    expect(url).toContain("utm_content=job-seeker-secondary");
  });
});

describe("selectResumeDoctorStripVariant", () => {
  it("always returns job-seeker copy on seeker pages", () => {
    for (let i = 0; i < 20; i++) {
      const v = selectResumeDoctorStripVariant({ audience: "job-seeker" });
      expect(v.id).toBe("job-seeker");
    }
  });

  it("never returns whatsapp-link when apply is not WhatsApp", () => {
    vi.spyOn(crypto, "getRandomValues").mockImplementation((arr) => {
      (arr as Uint32Array)[0] = 0;
      return arr;
    });
    const v = selectResumeDoctorStripVariant({
      audience: "employer-job",
      isWhatsAppApply: false,
    });
    expect(v.id).not.toBe("whatsapp-link");
    vi.restoreAllMocks();
  });

  it("can return whatsapp-link when apply is WhatsApp", () => {
    vi.spyOn(crypto, "getRandomValues").mockImplementation((arr) => {
      (arr as Uint32Array)[0] = 0;
      return arr;
    });
    const v = selectResumeDoctorStripVariant({
      audience: "employer-job",
      isWhatsAppApply: true,
    });
    expect(v.id).toBe("whatsapp-link");
    vi.restoreAllMocks();
  });
});
