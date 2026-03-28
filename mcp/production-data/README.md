# MCP: mychennaicity production data

Stdio MCP server so Cursor (or any MCP client) can **check**, **seed**, or **schema-push** the **production** Neon database using credentials you set **only in MCP config** — no `vercel login` on the machine for routine seeding.

## Install

```bash
cd mcp/production-data
npm install
```

## Cursor setup

**Settings → MCP → Add server** (JSON shape depends on your Cursor version). Example:

```json
{
  "mcpServers": {
    "mychennaicity-production-data": {
      "command": "node",
      "args": ["E:/OneDrive/_mychennaicity/mcp/production-data/src/server.mjs"],
      "env": {
        "MYCITY_DATABASE_URL": "postgresql://...your production pooled URI...",
        "MYCITY_REPO_ROOT": "E:/OneDrive/_mychennaicity"
      }
    }
  }
}
```

- **`MYCITY_DATABASE_URL`**: production Neon **pooled** `DATABASE_URL` (same value as Vercel Production).
- **`MYCITY_REPO_ROOT`**: absolute path to the **repo root** (where `package.json` with `db:seed:live` lives). If omitted, the server assumes the repo is **two directories above** `src/server.mjs` (works when this folder stays at `mcp/production-data`).

You can use **`DATABASE_URL`** instead of `MYCITY_DATABASE_URL` if you prefer.

## Tools

| Tool | Purpose |
|------|--------|
| `mycity_production_config` | Shows resolved repo root + masked DB host (no DB call). |
| `mycity_production_sql_ping` | `SELECT current_database()` via Neon (sanity check). |
| `mycity_production_article_check` | Runs `npm run db:check:live`. |
| `mycity_production_seed` | Runs `npm run db:seed:live`. Requires `acknowledge: "SEED_PRODUCTION"`. |
| `mycity_production_schema_push` | Runs `npm run db:push:production-env` (Drizzle push; `--force`, uses env `DATABASE_URL` only — no `.env.production.local`). Requires `acknowledge: "PUSH_PRODUCTION_SCHEMA"`. |

Seeding and schema push reuse the same scripts as local development; they are **idempotent** for the bundled seed content but schema push can still be destructive if the schema changes — use with care.

## Security

- Do **not** commit URIs or paste them into chat logs.
- Rotate Neon passwords if exposed.
- Restrict who can enable this MCP server on a machine (it holds production DB access).

## Troubleshooting

- **`No DATABASE_URL`**: set `MYCITY_DATABASE_URL` or `DATABASE_URL` on the MCP server env block.
- **Wrong database**: confirm the URI matches **Vercel → Production → DATABASE_URL** (often the Vercel-linked Neon project, not a separate dev project).
- **npm not found**: ensure `node`/`npm` are on `PATH` for the process that starts Cursor.
