# WhatsApp group — Chennai join gate

**Canonical record.** When anyone asks how the city WhatsApp group, the join form, or the admin queue works, read this file first.

**Public site:** https://mychennaicity.in  
**Last updated:** 18 November 2026  
**System (portable):** `docs/strategy-marketing/WHATSAPP-COMMUNITY-SYSTEM.md`  
**Weekly ops:** `docs/strategy-marketing/WHATSAPP-COMMUNITY-PLAYBOOK.md`

## What the group is

**my chennai city** is one city-wide WhatsApp group. Admin approval stays on inside WhatsApp. This website cannot approve a join. It collects a name, an Indian mobile, and a Chennai area so a human can match that row to WhatsApp’s pending requests.

Join rows live in `whatsapp_join_verifications`. They are not articles.

## URLs

| What | URL |
|------|-----|
| **Share this (public join)** | https://mychennaicity.in/whatsapp-community/join |
| Rules / SEO landing | https://mychennaicity.in/chennai-whatsapp-group |
| Tamil rules page | https://mychennaicity.in/chennai-whatsapp-group-tamil |
| Guide | https://mychennaicity.in/chennai-whatsapp-community-guide |
| Partners (RWAs, colleges) | https://mychennaicity.in/whatsapp-community/partners |
| **Admin lookup** | https://mychennaicity.in/super-admin/whatsapp-join-requests |
| Invite | `WHATSAPP_COMMUNITY_INVITE_URL` only. Shown after a successful submit. Never in the admin Message text. |
| This week | https://mychennaicity.in/whatsapp-community/this-week |
| Bengaluru WhatsApp community group | https://mychennaicity.in/community/mybangalore-whatsapp-community-group — operator-supplied invite for MyBangalore.in only. Do not put that link in the Chennai nav, footer, float, or join form. |

Helper for every public CTA: `whatsappCommunityJoinHref()` in `src/lib/whatsapp-community.ts`.

Links pasted **inside** the group later use `withWhatsappGroupShareUtms()` (`utm_source=whatsapp&utm_medium=group&utm_campaign=community_share`). That helper does not build the invite.

## Decision log

| Decision | Choice | Why |
|----------|--------|-----|
| Public CTA destination | `/whatsapp-community/join` | Strangers should not skip the list |
| When the invite is shown | Only after a successful submit, for 24 hours in an httpOnly cookie | The gate is the product |
| OTP / SMS | No | Not requested |
| Invite value | Env `WHATSAPP_COMMUNITY_INVITE_URL` | Do not invent or rotate a link. If it is empty, hide Join on WhatsApp |
| Languages | English / Tamil on the same join page | Mobile-first |
| Storage | `whatsapp_join_verifications` | Not `articles` |
| Repeat number | Update contact fields; if already `approved`, keep that status | One row per `phone_e164` |
| Spam | `src/content/whatsapp-community/spammers.ts`, plus status `spam` | Rejected on submit and on resubmit |
| Mail | No outbound mailer in this repo | Saving the row does not wait on email |
| Old `/api/community/whatsapp` | Redirects to the form | It used to send people straight to the invite |
| Status tags and new WhatsApp buttons | Forbidden until the rules page allows them | A mention notifies members. Admins cannot delete another person’s Status. See the playbook |
| Invite after the form (18 Nov 2026) | Shown after every successful submit | The accepting switch no longer files a waitlist or hides the invite. Approve, decline, message, and spam stay on the desk |
| Approval wait | 12 hours, daytime IST 08:00–20:00 | Owner: desk hours |

## Operator steps

1. Someone opens the join form from the nav, footer, float, modal, or a page CTA.
2. They submit name, +91 mobile, Chennai area, an intent chip, an optional intro, and the no-spam checkbox. Server Actions check the origin (this site’s CSRF). A honeypot and an IP rate limit sit in front of the save.
3. One row is stored. The success screen shows **Join on WhatsApp** and a QR (hidden under 420px) when the invite env var is set.
4. They tap Join in WhatsApp. **Leave admin approval on.**
5. Open **WhatsApp join requests**. The row number is the order the request was first saved. The intro is on the row; if they left it blank, the row shows the intent chip. Search the full number or the last 4 digits. The queue pages 50 at a time. Click a row for the phone as typed, source, approval, last nudge, IP hash, browser, and a note you can save. **Copy** puts the formatted number on the clipboard. Approve, Decline, Spam, and Save note are ordinary form posts (they reload this list). They do not depend on a client Server Action.
   - Match → approve in WhatsApp, then **Approve** here (`approved_at`, `approved_by`). The row leaves Ready and the page says “Marked approved.”
   - No match, spam list, or a crypto pitch → decline in WhatsApp and **Decline** or **Spam** here. Do not trust a family photo.
6. If they never tapped Join, **Message** on a Ready row older than the approval wait is a rare human nudge: name and area, ask them to reply, no invite. Cap 10 a day. See **Account safety** below.
7. The same number submitted again updates contact fields. An **approved** member stays approved.
8. If WhatsApp hid the number, match the form display name plus area, or ask them to message the official desk from that account. Never approve on a profile photo.

## Account safety (16 November 2026)

The product path is already inbound. After the form, the success screen shows **Join on WhatsApp**. The person taps the invite and requests to join. Leave that as the default. WhatsApp treats a reply to someone who wrote first as an ordinary chat. A first message from us to a number that is not in contacts, sent to many people the same day, is the pattern that draws a temporary or permanent ban.

**Message** on a Ready row is the risky path. `whatsappJoinFollowupMessage()` is reply-first and does **not** include the invite. Twenty identical first messages in a day, to numbers that have not saved ours, still look like a spam bot. A browser script, auto-clicker, or fixed gap (including something like 1.2 seconds) on a personal WhatsApp account is outside WhatsApp’s terms and is easy for timing checks to see. One or two people who filled the form and later tap Report or Block are enough to restrict the account. Consent on the form does not cancel that.

Rules for this repo and for the phone:

1. Do not add send scripts, clickers, queues that fire on a timer, or spintax engines. A human opens WhatsApp and types.
2. Prefer the success-screen Join button. Use **Message** only when that person never tapped Join.
3. When a human does nudge: write a fresh line that uses the name and Chennai area already on the row. Ask them to reply before pasting the invite. Send a handful, pause a long while, and vary the gap. The WhatsApp Business app on the phone is the right app for this small outreach; a personal account is the one that gets flagged first.
4. The safer product change, if the owner asks for it later: the confirmation page offers “Tap here to get your WhatsApp group link”, that button opens `wa.me` to our number, and we answer the incoming chat (a Quick Reply on WhatsApp Business is enough). We then only reply. Do not build that until the owner asks.

## Apply the table

Review `drizzle/0013_whatsapp_join_verifications.sql`, then apply it with this repo’s usual schema push. Do not push production until the owner asks. The file is safe to run once (`IF NOT EXISTS`, including `last_contacted_at`).

Attribution / waitlist extras: `drizzle/0019_whatsapp_join_attribution.sql`. **Do not apply 0019 live until the owner says so.** Join still saves without it.

## Try one number without approving it

Use a real mobile you control, for example `90000 14826` only if you accept that it will be stored. Submit it from `/whatsapp-community/join`, confirm one row, submit again and confirm the same row updated, then mark it **Declined** in the admin queue. Do not click Approve.

A number on the spammers list, such as `97177 18323`, must be rejected and must not reveal the invite.
