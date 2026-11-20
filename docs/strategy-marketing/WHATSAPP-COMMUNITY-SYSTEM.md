# WhatsApp community system — mychennaicity.in

Portable operating document. Behaviour is identical on PHP/cPanel locality sites; this implementation is Next.js + Neon.

**Filled for this site on 16 November 2026.** Snapshot commit: `b2622ffaadf9b4ef50968ab2f24ff15a267a2b78`.

## AI operating prompt

Inventory every `wa.me`, `api.whatsapp.com`, and `chat.whatsapp.com`. Classify each element keep/fix/merge/replace/retire/hide. Report a scored audit before deleting URLs. Obey the core rules. Retrofit; do not rebuild. Indian mobiles only.

## Parameter block

| Parameter | Value | Status |
| --- | --- | --- |
| Brand | mychennaicity.in | found `src/lib/env.ts` |
| City | Chennai | found |
| Short name | my chennai city | found `WHATSAPP_COMMUNITY_GROUP_NAME` |
| Languages | English + Tamil | found |
| Official IN WhatsApp | `WHATSAPP_BUSINESS_E164` (server-only) | found env, value not in git |
| Group invite | `WHATSAPP_COMMUNITY_INVITE_URL` | found env; secret |
| Learn | `/chennai-whatsapp-group` | found |
| Learn Tamil | `/chennai-whatsapp-group-tamil` | found |
| Request | `/whatsapp-community/join` | found |
| Admin | `/super-admin` login; `/super-admin/whatsapp-join-requests` | found |
| Phone pattern | Indian mobile `91` + 10 digits 6–9 | fixed, not a parameter |
| Approval hours | 12, daytime IST 08:00–20:00 | found; owner 16 Nov 2026 |
| Member count | `WHATSAPP_COMMUNITY_MEMBER_COUNT` | hidden (unset) |
| Admin email | `SUPER_ADMIN_EMAIL` / `ADMIN_EMAIL` | found env |
| Analytics | `NEXT_PUBLIC_GA_MEASUREMENT_ID` | found env |
| Localities | `src/content/whatsapp-community/localities.ts` | found |

Phone pattern is **not** a parameter.

## Core rules

1. Admin approval is the gate.
2. Invite only in a **reply** after they message the desk. Never on the success screen or other public pages.
3. Confirmation button **Message us for the group link** is required. It opens a chat to `WHATSAPP_BUSINESS_E164`. The group link is the reply.
4. No blasting. Reply-first nudge capped at 10/day.
5. No OTP / invite rotation unless the owner asks.
6. Hidden-number fallback: display name + area, or they message the official desk.
7. No name or phone in analytics.
8. Retrofit, do not rebuild.
9. Indian mobiles only.

## Link types

`learn` · `request` · `chat` · `share` · `listing`. Helper: `src/lib/whatsapp-link.ts` (`waLink`). Invite helper: `src/lib/whatsapp-server.ts`.

One float per page, default **Request**. Join + landing hide the float.

## Join workflow

Discover → learn or request → form (IN mobile) → success + required desk message → reply with the invite → WhatsApp pending → admin matches row → welcome.

Resubmit of an **approved** number keeps approved.

## Admin E2E

Login `/super-admin` → dashboard widget pending count → queue last-4 search → Approve / Decline / Spam / Restore / Notes / capped Message (no invite) / CSV (logged). Scorecard on the queue page. Partner codes issued in `src/content/whatsapp-community/partner-codes.ts`.

SQL pack: `drizzle/0013_whatsapp_join_verifications.sql` + `drizzle/0019_whatsapp_join_attribution.sql` (applied live 16 Nov 2026).

## Events (no personal data)

`wa_cta_view`, `wa_cta_click`, `wa_share_click`, `wa_join_form_start`, `wa_join_submit_error`, `wa_join_verified` (once per session), `wa_invite_click`. Gated by `NEXT_PUBLIC_WA_FUNNEL_EVENTS_ENABLED`. Old `whatsapp_community_click` still fires.

## On-site reach

Registry: `config/whatsapp/placements.json`. Component: `WhatsAppPlacementCta`. Cookie `wa_join_state=verified` (180 days). Dismiss cookie 14 days. Flag `NEXT_PUBLIC_WA_REACH_ENABLED` default off. Weekly digest `/whatsapp-community/this-week`. Member invite shares the **learn** URL, never the invite.

## Adapters

**PHP / MySQL / cPanel:** not this repo. Equal behaviour: `define()` config, mysqli, phpMyAdmin SQL, session login, vanilla JS.

**Next.js (this repo):** env vars, server action submit, httpOnly unlock cookie, `wa_join_state` cookie, Drizzle/Neon, `/super-admin` queue.

## Feature switches

| Switch | Default | Meaning |
| --- | --- | --- |
| `NEXT_PUBLIC_WA_REACH_ENABLED` | off | New contextual slots, QR, suppression, neighbour invite |
| `NEXT_PUBLIC_WA_FUNNEL_EVENTS_ENABLED` | off | New GA4 event names |
| `WHATSAPP_COMMUNITY_ACCEPTING` | unused | The form always records a request and shows the invite after submit. The desk still approves in WhatsApp |

## Retrofit protocol

Stages 1–6 as in the merged plan. Decision log for this site:

| Element | Decision | Evidence | Redirect |
| --- | --- | --- | --- |
| `/whatsapp-community/join` | Keep and Fix | Live join path | none |
| `/chennai-whatsapp-group` | Keep and Fix | SEO landing | none |
| `/chennai-whatsapp-group-tamil` | Fix (parity) | Language variant | none |
| `/chennai-whatsapp-community-guide` | Fix in place | Thin guide | none |
| `/whatsapp-community/partners` | Fix | Partner kit | none |
| `/whatsapp-community/this-week` | Add | Fresh proof | n/a |
| `/chennai-whatsapp-spammers` | Hide | Internal list | none (URL kept, noindex, out of sitemap) |
| `/api/community/whatsapp` | Keep redirect | Old invite hop | 302 to join form |
| Float | Keep and Fix | One Request float | n/a |
| Nav + footer Join | Keep | Already live | n/a |
| Site modal WhatsApp | Keep | Flag `NEXT_PUBLIC_SITE_MODAL_AUTO` | n/a |
| Admin Message | Fix | Reply-first, no invite | n/a |
| Bengaluru page invite | Keep | Other city, dedicated URL | none |
| MyCovai leaked `Eixz1mmURuFLvnNZzCfGDi` | N/A | Not on this site | n/a |
| Staging nav package | N/A | Nav already live | n/a |

## Invite rotation runbook (owner)

1. In WhatsApp, reset the group invite.
2. Put the new URL in Vercel `WHATSAPP_COMMUNITY_INVITE_URL`.
3. Redeploy. Do not print the new link on the site.
4. Leave admin approval on. A forwarded old invite still hits pending.

## Gap status (Chennai, 17 Nov 2026)

| Gap / item | Status |
| --- | --- |
| Join query noindex + `X-Robots-Tag` | Shipped |
| gtag funnel queue | Shipped |
| Proof strip + DB timeout | Shipped |
| Home hero + article end placements (registry) | Wired; flag off until owner sets `NEXT_PUBLIC_WA_REACH_ENABLED` |
| Reach session cap (2 / session) | Shipped |
| Smoke `npm run smoke:whatsapp:live` | Shipped |
| Article invite audit script | Shipped |
| Retention cron (`/api/cron/whatsapp-join-retention`, 1st 03:30 UTC) | Shipped; confirm `CRON_SECRET` on Vercel |
| Partner code admin UI | File-based (`partner-codes.ts`) |
| Weekly digest editor workflow | Route exists; content manual |
| 7-day admin onboarding UI | Playbook + welcome txt only |
| Modal vs reach frequency (shared cap) | Site modal cap 2; reach placements cap 2 — separate systems |

## Executor / stop conditions

Stop for live DB, production deploy, invite changes, or removing a public URL with traffic. Coverage IDs `R1–R9`, `A1–A6`, `S1–S6`, gaps 1–53 live in the plan file `whatsapp_community_system_8e181ac0.plan.md`. Legacy product PRD: `docs/archive/whatsapp-community-PRD-superseded.md`.
