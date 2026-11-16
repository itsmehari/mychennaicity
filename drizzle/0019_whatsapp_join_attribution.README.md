# WhatsApp join attribution (0019)

**Applied to production Neon on 16 November 2026** (`npm run db:whatsapp:0019:live`). Safe to run again (IF NOT EXISTS).

## What this adds

Columns on `whatsapp_join_verifications`: placement, partner_code, lang, utm_*, first_source, verified_at, declined_at. Optional enum value `waitlist`.

## Local

```
npm run db:push
```

or paste `drizzle/0019_whatsapp_join_attribution.sql` into the Neon SQL editor.

## Production

Owner go-ahead, then the usual live schema push from `docs/DATABASE_AND_VERCEL.md`. Redeploy Vercel after the columns exist.

## If the admin page 500s

1. Confirm `0013` table exists.
2. Run `0019` (additive).
3. Pending by last 4:

```sql
SELECT display_name, phone_e164, phone_last4, locality, status, created_at
FROM whatsapp_join_verifications
WHERE phone_last4 = '3210' AND status = 'submitted';
```

Rollback: leave the new columns in place (additive). Turn `NEXT_PUBLIC_WA_REACH_ENABLED` and `NEXT_PUBLIC_WA_FUNNEL_EVENTS_ENABLED` off.
