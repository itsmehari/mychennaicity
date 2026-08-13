# Site modal system (MCC)

Portable five-piece architecture adapted from MyOMR — **city goals**, not OMR hiring.

| Piece | Location |
|-------|----------|
| Config (campaigns + policy) | `src/config/site-modals/` |
| Shell | `src/components/site-modals/campaign-modal-shell.tsx` |
| Orchestrator + controller | `src/components/site-modals/site-modal-orchestrator.tsx` |
| Content pool mapper | `src/components/site-modals/content-pool.ts` |
| Analytics | `src/components/site-modals/site-modal-analytics.ts` |
| Mount | `src/app/(public)/layout.tsx` → `<SiteModalHost />` |
| CSS | `src/components/site-modals/site-modal.css` |

## Product goals (current)

1. **Primary conversion:** WhatsApp community join  
2. **Secondary (rotation):** Top city news · Newsletter · Civic BWG readiness · **Chennai today** desk  
3. **Auto-pop:** Homepage only (`autoHomeOnly`)  
4. **Never interrupt:** contact, legal, WhatsApp landings, BWG checklist, boundary feedback, admin/api  

## Trigger contract

```html
<button data-site-cta="newsletter">…</button>
<a data-site-cta="whatsapp" href="/chennai-whatsapp-group">…</a>
<a data-site-cta="top-story" href="/chennai-local-news">…</a>
<a data-site-cta="civic" href="…">…</a>
<a data-site-cta="events" href="…">…</a>
<a data-site-cta="today" href="/chennai-today">…</a>
```

Or `dispatchOpenSiteModal("whatsapp")` / `dispatchOpenSiteModal("today")` from `@/components/site-modals`.

## Policy defaults

| Setting | Value |
|---------|--------|
| First visit delay | 1.5s |
| Rotation interval | 3 min (only while under cap) |
| Max auto shows / session | **2** |
| Storage | `sessionStorage` keys `mcc_site_modal_*` |
| Feature flag | `NEXT_PUBLIC_SITE_MODAL_AUTO` (default **false**) |

Prefer enabling `SITE_MODAL_AUTO` and leaving `NEWSLETTER_AUTO_MODAL` off — newsletter is a rotation slot that opens the existing newsletter `<dialog>`.

## Analytics

`modal_view` · `modal_cta_click` · `modal_dismiss` (GA4 via `gtag`, category `site_modal`).
