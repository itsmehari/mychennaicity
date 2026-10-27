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
