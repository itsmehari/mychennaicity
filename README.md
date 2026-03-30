# mychennaicity.in

Next.js (App Router) + Neon Postgres + Vercel — city-scale local platform scaffold.

## Stack

- **Framework:** Next.js 16, React 19, TypeScript, Tailwind CSS 4
- **Database:** Neon (Postgres) via Drizzle ORM
- **Auth:** Auth.js (NextAuth v5) with Drizzle adapter
- **Analytics:** GA4 (optional env), Vercel Analytics, Speed Insights

## Quick start

```bash
npm install
cp .env.example .env.local
# Set DATABASE_URL (Neon), AUTH_SECRET (openssl rand -base64 32), AUTH_URL=http://localhost:3000 for local dev
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Description |
|--------|-------------|
| `npm run dev` | Development server |
| `npm run build` | Production build (set `AUTH_SECRET` for NextAuth compile) |
| `npm run lint` | ESLint |
| `npm run db:generate` / `db:migrate` | Drizzle migrations (when using migration files) |
| `npm run db:push` | Push schema to Neon (local env) |
| `npm run db:push:live` | Push schema using `.env.production.local` |
| `npm run db:studio` | Drizzle Studio |
| `npm run db:check` / `db:check:live` | Article counts sanity check |
| `npm run db:seed` / `db:seed:live` | Seed Chennai + articles (and related) |
| `npm run gsc:submit-sitemap` | Search Console sitemap submit (requires GSC env — see `.env.example`) |
| `npm run geo:build` | Build Chennai ward map bundle data |
| `npm run election-map:build` | Build Chennai metro+ assembly map (`public/data/election-map`) |

## Documentation

- [docs/DEPLOY.md](docs/DEPLOY.md) — GitHub, Vercel, Neon, DNS, GA4, OAuth, Search Console
- [docs/DATABASE_AND_VERCEL.md](docs/DATABASE_AND_VERCEL.md) — `DATABASE_URL`, Neon ↔ Vercel, seeds and production data workflows
- [docs/TECH_ARCHITECTURE.md](docs/TECH_ARCHITECTURE.md) — stack and layering
- [docs/MYCHENNAICITY_FEATURES.md](docs/MYCHENNAICITY_FEATURES.md) — product / route inventory
- [docs/ROUTING_PLAN.md](docs/ROUTING_PLAN.md) — App Router URL map
- [docs/FEATURE_MAP.md](docs/FEATURE_MAP.md) — legacy mapping and implementation status
- [docs/SEARCH_CONSOLE.md](docs/SEARCH_CONSOLE.md) — GSC checklist
- [docs/ADSENSE_PRE_FLIGHT.md](docs/ADSENSE_PRE_FLIGHT.md) — AdSense: content, Vercel env, GSC, mobile test, submit/review
- [MIGRATION_ANALYSIS.md](MIGRATION_ANALYSIS.md) — legacy system intelligence extraction
- [docs/](docs/) — PRD, content architecture, roadmap, admin plan

## License

Private / unlicensed unless you add a LICENSE file.
