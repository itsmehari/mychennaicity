import { describe, expect, it } from "vitest";
import type { PublicEventRow } from "@/domains/events";
import {
  buildGoogleCalendarUrl,
  buildMapsSearchUrl,
  extractOrganizerFromDescription,
  splitDescriptionIntro,
} from "./event-detail-helpers";

const baseEvent = {
  id: "1",
  cityId: "c",
  slug: "test-event",
  title: "Sample Chennai Meetup",
  description: "**Acme Chennai** presents a networking evening.",
  startsAt: new Date("2026-06-01T12:30:00.000Z"),
  endsAt: new Date("2026-06-01T16:00:00.000Z"),
  allDay: false,
  venueName: "ITC Grand Chola",
  venueAddress: "GST Road, Guindy, Chennai",
  localityLabel: "Guindy",
  status: "scheduled" as const,
  featured: false,
  presentationKey: null,
  contentRef: null,
  createdAt: new Date(),
  updatedAt: new Date(),
} satisfies PublicEventRow;

describe("extractOrganizerFromDescription", () => {
  it("reads bold presents line", () => {
    expect(extractOrganizerFromDescription(baseEvent.description)).toBe(
      "Acme Chennai",
    );
  });

  it("reads labelled organiser", () => {
    expect(
      extractOrganizerFromDescription("**Organiser:** Lions Council of India"),
    ).toBe("Lions Council of India");
  });
});

describe("buildMapsSearchUrl", () => {
  it("encodes venue and address", () => {
    const url = buildMapsSearchUrl(baseEvent);
    expect(url).toContain("google.com/maps/search");
    expect(url).toContain(encodeURIComponent("ITC Grand Chola"));
  });

  it("returns null without any location signal", () => {
    expect(
      buildMapsSearchUrl({
        ...baseEvent,
        venueName: null,
        venueAddress: null,
        localityLabel: null,
      }),
    ).toBeNull();
  });
});

describe("buildGoogleCalendarUrl", () => {
  it("includes IST calendar params", () => {
    const url = buildGoogleCalendarUrl(baseEvent);
    expect(url).toContain("calendar.google.com");
    expect(url).toContain("ctz=Asia%2FKolkata");
    expect(url).toMatch(/text=Sample(\+|%20)Chennai(\+|%20)Meetup/);
  });
});

describe("splitDescriptionIntro", () => {
  it("splits on first blank line", () => {
    const { intro, rest } = splitDescriptionIntro("First para.\n\nSecond para.");
    expect(intro).toBe("First para.");
    expect(rest).toBe("Second para.");
  });
});
