# WhatsApp Community Playbook — Chennai

**Group:** my chennai city  
**Join form (share this):** https://mychennaicity.in/whatsapp-community/join  
**Rules:** https://mychennaicity.in/chennai-whatsapp-group  
**Decision log:** `docs/strategy-marketing/WHATSAPP-GROUPS.md`  
**Scope:** One city-wide group (not per-topic splinters)

## Weekly share cadence

| Day | Where | What to share |
|-----|--------|----------------|
| Monday | News hub, then the group | One civic or mobility story. Paste the story URL with `utm_source=whatsapp&utm_medium=group&utm_campaign=community_share` |
| Wednesday | Jobs hub, then the group | One or two verified Chennai roles, same UTM tags |
| Friday | Events hub, then the group | Weekend picks, same UTM tags |
| Sunday | Group pin | Rules reminder. Link the rules page and the join form. Do not paste the group invite |

Public posts, bios, and partner sites use the **join form**, not the invite.

## Pinned group rules

Use `dev-tools/whatsapp-community-pinned-message.txt`.

- Chennai-relevant posts only: news, jobs, events, civic notes, neighbour help
- No investment, crypto, gambling, or hate
- Jobs need a role, an area, and a contact. One repost a week per vacancy
- A business may post once a week, and only if it is relevant to Chennai
- No cold DMs
- English, Tamil, and Tanglish are welcome
- No Status tags of this group or its members. No group calls, @everyone, UPI collect requests, or @Meta AI

## Status tags and new WhatsApp buttons

November 2026: a member was mentioned in other people’s Status via this group and asked for the tag to be removed. WhatsApp notifies members when someone mentions the group. Admins cannot delete another person’s Status. Posting more statuses does not delete the tag.

When someone asks:

1. If we posted it, delete that Status now.
2. Message the person who posted it and ask them to delete it. Do not send the tagged member to chase other members as the first reply.
3. Do not say the tag will clear after more statuses are posted. That is not removal.
4. Reply in one plain sentence: we deleted our Status, and we have asked the people who posted the others to delete theirs. Do not open by restating their request.
5. Point them at the rules on https://mychennaicity.in/chennai-whatsapp-group

If WhatsApp ships a control that notifies every member, adds people without the join form, or exposes a name, photo, number, or location, leave it unused until the rules page names it. Current blocks: Status mentions and Status audience, group calls, @everyone, group Events, member polls, @Meta AI, UPI collect requests, view-once media, another person’s live location, Communities / Channels / broadcasts, copying the member list, OTP / PIN / QR “verification” after an app update, and editing a job or phone number after people have used it.

## When the group is full

1. WhatsApp stops accepting new members on the invite.
2. Keep the public join form. It becomes the waitlist. Do not paste the invite on the homepage, news, footer, or the rules page.
3. Tell people who submit that the group is full and that the queue is the waitlist. Email from the contact page if you need a 1:1 reply. The desk WhatsApp on `/contact` is separate from the group invite.
4. Open an overflow group only after the rules page says so, and still collect the form before sharing that invite.

## Moderation lookup

1. WhatsApp shows a pending request.
2. Search `/admin/whatsapp-join-requests` by the last 4 digits.
3. Approve in WhatsApp and in the queue, or decline both.
4. If there is no row, they have not used the form. Do not approve them from a profile photo.

## 1:1 desk vs group

- **Group:** `/whatsapp-community/join` → success screen → env invite.
- **Desk:** a click POSTs to `/api/contact/whatsapp`. A normal visit to that address returns to `/contact` and does not reveal the desk number.
