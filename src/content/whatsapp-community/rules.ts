/** Group rules — published on landing page and pinned in WhatsApp. */
export const WHATSAPP_COMMUNITY_RULES: string[] = [
  "Chennai-relevant posts only",
  "Be respectful — no hate, harassment, communal/political campaigning",
  "No spam: MLM, gambling, adult, crypto schemes",
  "Verify before forwarding — no unverified viral forwards",
  "Jobs: role + area + contact; max one repost/week per vacancy",
  "Business promos: Chennai-relevant only; max once/week per business",
  "No cold-selling in DMs",
  "Protect privacy — don't share others' numbers/photos without consent",
  "Civic posts with location; no naming-and-shaming",
  "English, Tamil, Tanglish welcome",
  "Admins may warn/remove without notice",
  "Official group only via mychennaicity.in or links we publish",
  "Admins: reject invite-flood numbers listed on mychennaicity.in/chennai-whatsapp-spammers",
  "No Status tags of this group or its members, and do not add this group to your Status audience",
  "No group calls, @everyone, group Events, or member polls — they notify every phone",
  "Do not message @Meta AI in the group",
  "No UPI collect requests, payment QR codes, or \"request money\"",
  "No view-once media. Do not share another person's live location",
  "Do not add members, copy the member list, or attach this group to a Community, Channel, or broadcast",
  "Admins never ask for an OTP, PIN, or QR scan — including after a WhatsApp update",
  "Do not edit a job, price, or phone number after people have used it; post a correction",
];

/**
 * Status mentions notify people who never agreed. Admins cannot delete
 * another member's Status. Kept beside the checklist so that limit is explicit.
 */
export const WHATSAPP_STATUS_TAG_RULE = {
  title: "Status tags",
  body: "Do not mention this group or any member in your WhatsApp Status, and do not add this group to your Status audience. A mention notifies people who did not agree to it. Only the person who posted that Status can delete it. Admins cannot remove someone else's tag, and posting more statuses does not delete it. If you are asked, delete that Status yourself.",
};

/** Buttons that ping the whole group or expose a member. Same facts as the checklist, with the limit spelled out. */
export const WHATSAPP_FEATURE_LIMITS: { title: string; body: string }[] = [
  {
    title: "Calls, @everyone, Events, polls",
    body: "A group voice or video call rings everyone. @everyone, a WhatsApp group Event, and a poll each send a notification to every member. Leave those to an admin, and only for a real Chennai notice.",
  },
  {
    title: "@Meta AI",
    body: "Do not mention Meta AI in the group. The reply is posted to every member.",
  },
  {
    title: "Payments",
    body: "No UPI collect requests, \"request money\", payment links, or QR codes. Confirm any real collection outside the group.",
  },
  {
    title: "View once and live location",
    body: "View-once photos and videos cannot be checked after they disappear. Share your own live location only while you are asking for help, then turn it off. Never share someone else's.",
  },
  {
    title: "Adding people and other WhatsApp surfaces",
    body: "Do not add members yourself. Send them to the join form. Do not export the member list, and do not add this group to another Community, Channel, or broadcast.",
  },
  {
    title: "App updates and \"verify your account\"",
    body: "A new WhatsApp feature, a security-code change, or an app update is never a reason to ask for an OTP, PIN, or QR code. Admins will not ask. Treat that message as a scam.",
  },
  {
    title: "Edited messages",
    body: "Do not edit a job, price, or phone number after people have acted on it. Send a new message with the correction.",
  },
];
