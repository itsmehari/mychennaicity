/**
 * Flagged WhatsApp join-request / spam numbers shared for other Chennai group admins.
 * Public-interest list — not a criminal finding. Update via editorial seed when new batches arrive.
 */

export type WhatsAppSpammerEntry = {
  /** E.164 digits with leading + */
  e164: string;
  /** Display as shown on WhatsApp join request */
  displayNumber: string;
  /** WhatsApp profile name if visible on the request */
  profileName: string | null;
  /** ISO country from dial code (best-effort) */
  countryHint: string;
  /** Why it was flagged */
  reason: string;
  /** Date first logged (ISO date YYYY-MM-DD, Asia/Kolkata editorial day) */
  flaggedOn: string;
  /** Batch / incident label */
  batchId: string;
};

export const WHATSAPP_SPAMMERS_LAST_UPDATED = "8 August 2026";

/** Invite-link flood against my chennai city group — admin approval queue, 8 Aug 2026. */
export const WHATSAPP_SPAMMERS_BATCH_AUG_2026_INVITE_FLOOD =
  "mychennai-invite-flood-2026-08-08";

export const WHATSAPP_SPAMMERS: WhatsAppSpammerEntry[] = [
  {
    e164: "+639750624103",
    displayNumber: "+63 975 062 4103",
    profileName: "~Gorantla Ravi",
    countryHint: "Philippines (+63)",
    reason:
      "Join request via group invite link; foreign dial code on a Chennai community invite; queued for admin rejection",
    flaggedOn: "2026-08-08",
    batchId: WHATSAPP_SPAMMERS_BATCH_AUG_2026_INVITE_FLOOD,
  },
  {
    e164: "+919717718323",
    displayNumber: "+91 97177 18323",
    profileName: null,
    countryHint: "India (+91)",
    reason:
      "Join request via group invite link; part of a simultaneous multi-number approval flood",
    flaggedOn: "2026-08-08",
    batchId: WHATSAPP_SPAMMERS_BATCH_AUG_2026_INVITE_FLOOD,
  },
  {
    e164: "+919865357143",
    displayNumber: "+91 98653 57143",
    profileName: null,
    countryHint: "India (+91)",
    reason:
      "Join request via group invite link; part of a simultaneous multi-number approval flood",
    flaggedOn: "2026-08-08",
    batchId: WHATSAPP_SPAMMERS_BATCH_AUG_2026_INVITE_FLOOD,
  },
  {
    e164: "+918903511282",
    displayNumber: "+91 89035 11282",
    profileName: null,
    countryHint: "India (+91)",
    reason:
      "Join request via group invite link; part of a simultaneous multi-number approval flood",
    flaggedOn: "2026-08-08",
    batchId: WHATSAPP_SPAMMERS_BATCH_AUG_2026_INVITE_FLOOD,
  },
  {
    e164: "+918438057309",
    displayNumber: "+91 84380 57309",
    profileName: null,
    countryHint: "India (+91)",
    reason:
      "Join request via group invite link; part of a simultaneous multi-number approval flood",
    flaggedOn: "2026-08-08",
    batchId: WHATSAPP_SPAMMERS_BATCH_AUG_2026_INVITE_FLOOD,
  },
  {
    e164: "+2347075952066",
    displayNumber: "+234 707 595 2066",
    profileName: null,
    countryHint: "Nigeria (+234)",
    reason:
      "Join request via group invite link; foreign dial code on a Chennai community invite; queued for admin rejection",
    flaggedOn: "2026-08-08",
    batchId: WHATSAPP_SPAMMERS_BATCH_AUG_2026_INVITE_FLOOD,
  },
  {
    e164: "+639454190188",
    displayNumber: "+63 945 419 0188",
    profileName: null,
    countryHint: "Philippines (+63)",
    reason:
      "Join request via group invite link; foreign dial code on a Chennai community invite; queued for admin rejection",
    flaggedOn: "2026-08-08",
    batchId: WHATSAPP_SPAMMERS_BATCH_AUG_2026_INVITE_FLOOD,
  },
  {
    e164: "+916002929675",
    displayNumber: "+91 60029 29675",
    profileName: null,
    countryHint: "India (+91)",
    reason:
      "Join request via group invite link; part of a simultaneous multi-number approval flood",
    flaggedOn: "2026-08-08",
    batchId: WHATSAPP_SPAMMERS_BATCH_AUG_2026_INVITE_FLOOD,
  },
  {
    e164: "+919867269548",
    displayNumber: "+91 98672 69548",
    profileName: null,
    countryHint: "India (+91)",
    reason:
      "Join request via group invite link; part of a simultaneous multi-number approval flood",
    flaggedOn: "2026-08-08",
    batchId: WHATSAPP_SPAMMERS_BATCH_AUG_2026_INVITE_FLOOD,
  },
];

export function formatSpammerFlaggedDate(isoDate: string): string {
  const [y, m, d] = isoDate.split("-").map(Number);
  if (!y || !m || !d) return isoDate;
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}
