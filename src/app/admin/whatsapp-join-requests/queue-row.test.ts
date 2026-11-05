import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import { WhatsappJoinQueueRow, type WhatsappJoinQueueRowData } from "./queue-row";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ refresh: () => undefined }),
}));

const row: WhatsappJoinQueueRowData = {
  id: "6f1e3c2a-9b7d-4e8a-8c1d-2a4b6c8d0e1f",
  requestNo: 48,
  stamp: "4 Nov, 13:27",
  displayName: "Durai",
  headline: "Looking for work",
  phoneDisplay: "+91 63805 73609",
  phoneLast4: "3609",
  locality: "Velachery",
  status: "submitted",
  onSpamList: false,
  messageUrl: "https://wa.me/916380573609?text=Hi",
  returnTo: "/super-admin/whatsapp-join-requests?status=submitted",
  intentLabel: "Jobs",
  intro: "Looking for work",
  phoneRaw: "6380573609",
  source: "join-page",
  createdStamp: "4 Nov, 13:27",
  updatedStamp: "4 Nov, 13:27",
  approved: "—",
  lastNudge: "—",
  notes: "",
  ipHash: "",
  userAgent: "",
};

describe("whatsapp queue row", () => {
  it("posts Approve, Decline, Spam, and Message outside the row disclosure", () => {
    const html = renderToStaticMarkup(createElement(WhatsappJoinQueueRow, { row }));
    expect(html).toContain('action="/super-admin/whatsapp-join-requests/status"');
    expect(html).toContain('action="/super-admin/whatsapp-join-requests/message"');
    expect(html).toContain('target="_blank"');
    expect(html).toContain('value="approved"');
    expect(html).toContain('value="declined"');
    expect(html).toContain('value="spam"');
    expect(html).toContain(">Approve<");
    expect(html).toContain(">Message<");
    const detailsEnd = html.indexOf("</details>");
    const statusAt = html.indexOf('action="/super-admin/whatsapp-join-requests/status"');
    const messageAt = html.indexOf('action="/super-admin/whatsapp-join-requests/message"');
    expect(detailsEnd).toBeGreaterThan(0);
    expect(statusAt).toBeGreaterThan(detailsEnd);
    expect(messageAt).toBeGreaterThan(detailsEnd);
  });
});
