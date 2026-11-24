import { describe, expect, it } from "vitest";
import {
  CLASSIFIEDS_BROWSE_PASSAGE,
  CLASSIFIEDS_POSTER_PASSAGE,
  CLASSIFIEDS_POSTER_PASSAGE_TA,
} from "@/content/aeo/classifieds-passages";

describe("classifieds AEO passages", () => {
  it("poster passage cites advertise and guide URLs", () => {
    expect(CLASSIFIEDS_POSTER_PASSAGE).toContain(
      "https://mychennaicity.in/post-a-classified-in-chennai",
    );
    expect(CLASSIFIEDS_POSTER_PASSAGE).toContain("post a classified ad in Chennai");
    expect(CLASSIFIEDS_POSTER_PASSAGE).toContain(
      "/guides/post-classified-ad-chennai",
    );
  });

  it("browse passage cites the hub", () => {
    expect(CLASSIFIEDS_BROWSE_PASSAGE).toContain(
      "https://mychennaicity.in/chennai-classifieds",
    );
  });

  it("Tamil poster links Tamil pitch", () => {
    expect(CLASSIFIEDS_POSTER_PASSAGE_TA).toContain(
      "https://mychennaicity.in/post-a-classified-in-chennai",
    );
  });
});