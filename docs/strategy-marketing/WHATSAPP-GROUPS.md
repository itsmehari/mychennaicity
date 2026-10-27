# WhatsApp group — Chennai join gate

**Canonical record.** When anyone asks how the city WhatsApp group, the join form, or the admin queue works, read this file first.

**Public site:** https://mychennaicity.in  
**Last updated:** 27 October 2026  
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
| **Admin lookup** | https://mychennaicity.in/admin/whatsapp-join-requests |
| Invite | `WHATSAPP_COMMUNITY_INVITE_URL` only. Shown after a successful submit, and inside the admin Message link. |

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
| Repeat number | Update that row and set status back to `submitted` | One row per `phone_e164` |
| Spam | `src/content/whatsapp-community/spammers.ts`, plus status `spam` | Rejected on submit and on resubmit |
| Mail | No outbound mailer in this repo | Saving the row does not wait on email |
| Old `/api/community/whatsapp` | Redirects to the form | It used to send people straight to the invite |

## Operator steps

1. Someone opens the join form from the nav, footer, float, modal, or a page CTA.
2. They submit name, +91 mobile, Chennai area, an intent chip, an optional intro, and the no-spam checkbox. Server Actions check the origin (this site’s CSRF). A honeypot and an IP rate limit sit in front of the save.
3. One row is stored. The success screen shows **Join on WhatsApp** and a QR (hidden under 420px) when the invite env var is set.
4. They tap Join in WhatsApp. **Leave admin approval on.**
5. Open **WhatsApp join requests**. Search the full number or the last 4 digits.
   - Match → approve in WhatsApp, then **Approve** here (`approved_at`, `approved_by`).
   - No match, spam list, or a crypto pitch → decline in WhatsApp and **Decline** or **Spam** here. Do not trust a family photo.
6. If they never tapped Join, use **Message** on a Ready row. That opens `wa.me` in a new tab with the Ready line and `utm_content=admin-nudge`, and stamps `last_contacted_at`.
7. The same number submitted again updates the row and returns it to Ready. It does not insert a second row.

## Apply the table

Review `drizzle/0013_whatsapp_join_verifications.sql`, then apply it with this repo’s usual schema push. Do not push production until the owner asks. The file is safe to run once (`IF NOT EXISTS`, including `last_contacted_at`).

## Try one number without approving it

Use a real mobile you control, for example `90000 14826` only if you accept that it will be stored. Submit it from `/whatsapp-community/join`, confirm one row, submit again and confirm the same row updated, then mark it **Declined** in the admin queue. Do not click Approve.

A number on the spammers list, such as `97177 18323`, must be rejected and must not reveal the invite.
