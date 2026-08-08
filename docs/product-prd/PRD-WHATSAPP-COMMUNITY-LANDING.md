# PRD: Chennai WhatsApp Community Landing Page

**Product:** mychennaicity.in  
**Canonical URL:** `/chennai-whatsapp-group`  
**Invite (env):** `WHATSAPP_COMMUNITY_INVITE_URL`  
**Group name:** my chennai city

## 18-step implementation checklist

| # | Step | Status |
|---|------|--------|
| 1 | Landing page at `/chennai-whatsapp-group` | Done |
| 2 | Config constants + URL helpers (`src/lib/whatsapp-community.ts`) | Done |
| 3 | FAQ + full JSON-LD stack (WebPage, FAQPage, Organization, WebSite, BreadcrumbList, Speakable) | Done |
| 4 | GEO meta + custom OG image (`public/images/mychennaicity-whatsapp-community-og.svg`) | Done |
| 5 | hreflang en/ta + Tamil page `/chennai-whatsapp-group-tamil` | Done |
| 6 | Reusable CTA component (`WhatsAppCommunityCta` — banner, compact, inline) | Done |
| 7 | Homepage banner + float → landing | Done |
| 8 | News hub CTAs | Done |
| 9 | Jobs landing WhatsApp CTA | Done |
| 10 | Events banner | Done |
| 11 | Main nav links | Done |
| 12 | Footer link + prefooter mention | Done |
| 13 | About + directory page CTAs | Done |
| 14 | Unified join links (tracked `/api/community/whatsapp?utm_content=…`) | Done |
| 15 | Global float → community page (`?src=float`) | Done |
| 16 | SEO guide `/chennai-whatsapp-community-guide` | Done |
| 17 | Partner badge/embed `/whatsapp-community/partners` | Done |
| 18 | Playbook + pinned message + waitlist section on landing | Done |

## Routes (Next.js App Router)

| Page | Path |
|------|------|
| Main landing | `/chennai-whatsapp-group` |
| Tamil companion | `/chennai-whatsapp-group-tamil` |
| SEO guide | `/chennai-whatsapp-community-guide` |
| Partners | `/whatsapp-community/partners` |
| Spammers list (admins) | `/chennai-whatsapp-spammers` |

## Analytics

GA4 event on join clicks: `whatsapp_community_click` with `event_label` = hero | sticky | faq | float | etc.

## Sitemap priorities

- `/chennai-whatsapp-group` — 0.85, weekly
- `/chennai-whatsapp-group-tamil` — 0.8, weekly
- `/chennai-whatsapp-community-guide` — 0.75, monthly
- `/whatsapp-community/partners` — 0.6, yearly

## Deploy checklist

1. Set `WHATSAPP_COMMUNITY_INVITE_URL=https://chat.whatsapp.com/CnxfxABnv3YCgxhdSqEigd` on Vercel Production
2. Redeploy
3. Pin message from `dev-tools/whatsapp-community-pinned-message.txt`
4. Resubmit `https://mychennaicity.in/sitemap.xml` in Google Search Console
