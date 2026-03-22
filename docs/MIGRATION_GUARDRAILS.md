# Migration guardrails

## Do not

- Copy **MyOMR** (or reference) **branding**, logos, color campaigns, or marketing copy.
- Import **OMR** locality lists, slugs, or SEO keyword blocks.
- Port **PHP** include patterns, `.htaccess` rules as-is, or cPanel-only assumptions.
- Use **shared hosting** limits as design constraints (e.g. “no long requests”) — use platform-native solutions.
- Create **monolithic** `index` files that `require` half the codebase.

## Do

- Treat the reference repo as a **case study** for workflows and failure modes.
- Use **environment variables** for all secrets and third-party IDs.
- Keep **one** admin and **one** content pipeline until scale forces split.
- Add **city_id** early for multi-city.
- Document **assumptions** in PRs when schema or SEO behavior changes.

## Code review checklist (abbreviated)

- [ ] No legacy domain or corridor strings in user-visible defaults
- [ ] Canonical + sitemap alignment for new routes
- [ ] Prepared/parameterized queries only (Drizzle satisfies this)
- [ ] PII fields gated and logged appropriately
