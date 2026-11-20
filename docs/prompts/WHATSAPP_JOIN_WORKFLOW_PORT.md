# Port the city WhatsApp join workflow

Paste this whole prompt into the **other** city repo (mycovai, mybanglore, or the next desk). Do not paste it back into mychennaicity.

---

You are in a city-desk repo that should match the mychennaicity.in WhatsApp join workflow as of 20 November 2026. Adapt names, localities, language, and env vars to **this** city. Do not copy Chennai’s group invite, desk phone, or Chennai-only copy.

## Do this in order

1. Audit this repo against the checklist below.
2. Write a gap list: what is already correct, what is missing, what is unsafe.
3. Write a short plan (files you will change, what you will not change).
4. Fix the gaps in this repo.
5. Verify the join page in a browser or the closest local render. Say what you could not verify.

Do not stop after the audit. Fix what this checklist requires, in this city’s stack (PHP stays PHP, Next stays Next). Do not rebuild the site.

## Checklist — the workflow that must exist

### Gate

- Every public CTA (nav, footer, float, modal, article, jobs) goes to the join form. None go to `chat.whatsapp.com` or a raw group invite.
- The form asks for WhatsApp name, Indian mobile (`91` + 10 digits starting 6–9), city area, why they are joining, an optional one-line intro, and a no-spam confirmation.
- A honeypot and an IP rate limit sit in front of the save. One row per number. An approved number stays approved on resubmit.
- The group invite lives only in server config / env. It is never in git, public HTML, JSON-LD, sitemaps, or the first outbound message.

### After submit — inbound only

- The success screen does **not** show the group invite, a QR of that invite, or a “copy invite” button.
- The required step is one button: **Message us for the group link**.
- That button opens a chat **to this city’s desk number**, with the person’s name and area already written. The line asks them to reply so we can send the link. The line does not contain `chat.whatsapp.com` or the invite.
- The person must send that chat. A human replies in the same chat with the invite, then they tap Join inside WhatsApp. Admin approval stays on inside WhatsApp.
- Do not add send scripts, auto-clickers, timers, fixed gaps, or a bank of 20 paraphrases. A human sends.

### Admin desk

- One join queue. Ready, Approved, Declined, Spam, and search filter that same list.
- **Message** on a row is rare, reply-first, and capped (about 10 a day). It is only for someone who submitted the form and never messaged the desk. The first text names them and their area and asks them to reply. No invite in that first text.
- Decline or mark spam for a crypto pitch or a number on the spammer list. Do not approve from a profile photo.

### Join page (the public page, not only the form)

Model it on a courtyard: introduction and form together.

- Say what the group is, in this city’s name.
- Three steps that match the inbound path (save details → message the desk → admin approves). Do not tell people the invite appears on the success screen.
- Expected behaviour: city-only posts, no hate or campaigning, no crypto / MLM / gambling, jobs need role + area + contact, a business may post once a week, no cold DMs, no sharing someone else’s number or photo, no Status tags of the group.
- Link to the full rules page.
- A few doors to this city’s news, jobs, events, and directory.
- English and the city’s other language. The form shows a short progress cue, a country-code prefix, and a clear submit.
- The group link is still not on this page.

### SEO, GEO, AEO

- Index the clean join URL. `noindex` success (`ok=1`), UTM, and other tracking query strings.
- Title and meta description name the city and the free moderated group.
- One visible AEO passage, about 40–80 words, that includes the full canonical join URL and the inbound step. The same facts appear in the FAQ.
- FAQ answers on the page match FAQPage JSON-LD exactly.
- GEO: region, placename, and coordinates for this city.
- One line in `llms.txt` (or this site’s equivalent) pointing at the join URL. Do not describe the invite as public.
- Canonical host is this city’s real site. No other city’s domain in the copy.

## How to audit

Search the repo for `chat.whatsapp.com`, `wa.me`, `Join on WhatsApp`, invite QR, copy-link of the invite, the join form, the success screen, and the admin message template. Read those files. Prefer the code over comments.

## Gap report, then plan, then fix

Start the gap report with a table: item, status (`present` / `partial` / `missing` / `unsafe`), file. Then the plan in a few bullets. Then implement.

When you fix:

- Keep this city’s invite and desk number in existing env or config. If a value is missing, hide the button and say so. Do not invent a link or a phone.
- Do not print secrets in the chat.
- Do not apply a production schema or deploy until the owner asks.
- After the fix, update this repo’s WhatsApp doc or agent rule so the next session does not put the invite back on the success screen.

## Done when

- A stranger can read what the group is and how to behave, fill the form, and the only next step is messaging the desk.
- The rendered join page contains no `chat.whatsapp.com`.
- The admin first message contains no invite.
- FAQ text and FAQ JSON-LD match.
- You name the files changed and what you verified.
