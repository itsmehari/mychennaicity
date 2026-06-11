import { describe, expect, it } from "vitest";
import type { PublicEventRow } from "@/domains/events";
import {
  buildHubCardFromDb,
  buildHubCardFromMock,
  formatEventDateBadge,
} from "./event-hub-helpers";

const sampleEvent = {
  id: "1",
  cityId: "c",
  slug: "mylapore-panguni-festival-kapaleeshwarar-2026",
  title: "Mylapore Panguni Festival 2026",
  description: "Temple utsavam at Kapaleeshwarar Temple",
  startsAt: new Date("2026-03-22T06:30:00.000Z"),
  endsAt: new Date("2026-04-12T18:30:00.000Z"),
  allDay: true,
  venueName: "Kapaleeshwarar Temple",
  venueAddress: "Mylapore",
  localityLabel: "Mylapore",
  status: "scheduled" as const,
  featured: true,
  presentationKey: "festival_rich",
  contentRef: "mylapore-kapali-panguni-2026",
  createdAt: new Date(),
  updatedAt: new Date(),
} satisfies PublicEventRow;

describe("formatEventDateBadge", () => {
  it("formats short weekday date in IST", () => {
    const badge = formatEventDateBadge(new Date("2026-06-01T12:30:00.000Z"));
    expect(badge).toMatch(/Jun/);
  });
});

describe("buildHubCardFromDb", () => {
  it("tags festivals and resolves rich images when available", () => {
    const card = buildHubCardFromDb(sampleEvent);
    expect(card.tags).toContain("festivals");
    expect(card.imageSrc).toContain("pbs.twimg.com");
    expect(card.href).toContain(sampleEvent.slug);
  });

  it("resolves self-hosted poster images for standard events", () => {
    const card = buildHubCardFromDb({
      ...sampleEvent,
      slug: "tote-bag-paint-and-play-thinnai-porur-june-2026",
      title: "Tote Bag Paint & Play",
      presentationKey: null,
      contentRef: null,
    });
    expect(card.imageSrc).toBe(
      "/images/events/tote-bag-paint-and-play-thinnai-porur-june-2026.jpg",
    );
  });
});

describe("buildHubCardFromMock", () => {
  it("marks external ticket events", () => {
    const card = buildHubCardFromMock(
      {
        title: "Candlelight — Best of Bollywood",
        when: "Sun 12 Apr 2026",
        where: "Museum Theatre, Egmore",
        href: "https://example.com/tickets",
        external: true,
      },
      2,
    );
    expect(card.external).toBe(true);
    expect(card.statusLabel).toContain("Tickets");
    expect(card.tags).toContain("culture");
  });
});
