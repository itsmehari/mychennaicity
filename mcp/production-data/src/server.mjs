/**
 * MCP server: production DB check / seed / schema push for mychennaicity.
 *
 * Configure in Cursor with env:
 *   MYCITY_DATABASE_URL  — production Neon pooled URI (recommended name)
 *   DATABASE_URL         — fallback if MYCITY_DATABASE_URL unset
 *   MYCITY_REPO_ROOT     — optional; defaults to two levels above this file (repo root)
 *
 * Install: cd mcp/production-data && npm install
 * Run:    node src/server.mjs   (Cursor runs this via MCP config)
 */
import { spawnSync } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { neon } from "@neondatabase/serverless";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import * as z from "zod";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DEFAULT_REPO_ROOT = join(__dirname, "..", "..");

function repoRoot() {
  return process.env.MYCITY_REPO_ROOT?.trim() || DEFAULT_REPO_ROOT;
}

function databaseUrl() {
  const u = process.env.MYCITY_DATABASE_URL?.trim() || process.env.DATABASE_URL?.trim();
  return u || "";
}

function maskHost(url) {
  return url.replace(/:([^:@/]+)@/, ":****@");
}

function textResult(body) {
  return { content: [{ type: "text", text: body }] };
}

function runNpmScript(script, { timeoutMs = 180_000 } = {}) {
  const cwd = repoRoot();
  const npmCmd = process.platform === "win32" ? "npm.cmd" : "npm";
  const db = databaseUrl();
  if (!db) {
    return {
      ok: false,
      stdout: "",
      stderr:
        "No DATABASE_URL. Set MYCITY_DATABASE_URL (or DATABASE_URL) on this MCP server in Cursor settings.",
      status: 1,
    };
  }
  const r = spawnSync(npmCmd, ["run", script], {
    cwd,
    env: { ...process.env, DATABASE_URL: db },
    encoding: "utf8",
    timeout: timeoutMs,
    maxBuffer: 20 * 1024 * 1024,
    shell: false,
  });
  return {
    ok: r.status === 0,
    stdout: r.stdout || "",
    stderr: r.stderr || "",
    status: r.status ?? 1,
    error: r.error?.message,
  };
}

async function quickSqlPing() {
  const url = databaseUrl();
  if (!url) {
    return { ok: false, message: "Missing MYCITY_DATABASE_URL or DATABASE_URL" };
  }
  const sql = neon(url);
  try {
    const rows = await sql`select current_database() as db, current_user as role`;
    return { ok: true, rows };
  } catch (e) {
    return { ok: false, message: e instanceof Error ? e.message : String(e) };
  }
}

const mcpServer = new McpServer({
  name: "mychennaicity-production-data",
  version: "1.0.0",
  instructions: `mychennaicity production Neon helpers. Requires MYCITY_DATABASE_URL (or DATABASE_URL) in MCP server environment. Repo root defaults to ${DEFAULT_REPO_ROOT}; override with MYCITY_REPO_ROOT if needed. Destructive tools require explicit acknowledgement strings.`,
});

mcpServer.registerTool(
  "mycity_production_config",
  {
    description:
      "Show resolved repo root and database host (password masked). Does not connect to the DB.",
  },
  async () => {
    const url = databaseUrl();
    const root = repoRoot();
    const lines = [
      `MYCITY_REPO_ROOT: ${root}`,
      url ? `Database target: ${maskHost(url)}` : "Database URL: (not set — set MYCITY_DATABASE_URL)",
    ];
    return textResult(lines.join("\n"));
  },
);

mcpServer.registerTool(
  "mycity_production_sql_ping",
  {
    description: "Run a trivial SQL query (current_database) to verify credentials reach Neon.",
  },
  async () => {
    const r = await quickSqlPing();
    if (!r.ok) {
      return textResult(`Error: ${r.message}`);
    }
    return textResult(JSON.stringify(r.rows, null, 2));
  },
);

mcpServer.registerTool(
  "mycity_production_article_check",
  {
    description:
      "Runs the repo script db:check:live — Chennai city + published article counts (uses npm run db:check:live).",
  },
  async () => {
    const out = runNpmScript("db:check:live", { timeoutMs: 120_000 });
    const parts = [out.stdout, out.stderr].filter(Boolean).join("\n---\n");
    if (!out.ok) {
      return textResult(`Exit ${out.status}${out.error ? ` (${out.error})` : ""}\n\n${parts || "(no output)"}`);
    }
    return textResult(parts || "OK (no stdout)");
  },
);

mcpServer.registerTool(
  "mycity_production_seed",
  {
    description:
      "Runs npm run db:seed:live (idempotent upserts). MUST pass acknowledge exactly SEED_PRODUCTION.",
    inputSchema: {
      acknowledge: z
        .literal("SEED_PRODUCTION")
        .describe('Type exactly SEED_PRODUCTION to confirm writing to production'),
    },
  },
  async () => {
    const out = runNpmScript("db:seed:live", { timeoutMs: 300_000 });
    const parts = [out.stdout, out.stderr].filter(Boolean).join("\n---\n");
    if (!out.ok) {
      return textResult(`Exit ${out.status}${out.error ? ` (${out.error})` : ""}\n\n${parts || "(no output)"}`);
    }
    return textResult(parts || "Seed finished.");
  },
);

mcpServer.registerTool(
  "mycity_production_schema_push",
  {
    description:
      "Runs drizzle-kit push against production (can alter schema). MUST pass acknowledge exactly PUSH_PRODUCTION_SCHEMA.",
    inputSchema: {
      acknowledge: z
        .literal("PUSH_PRODUCTION_SCHEMA")
        .describe("Type exactly PUSH_PRODUCTION_SCHEMA to confirm schema push to production"),
    },
  },
  async () => {
    const out = runNpmScript("db:push:production-env", { timeoutMs: 180_000 });
    const parts = [out.stdout, out.stderr].filter(Boolean).join("\n---\n");
    if (!out.ok) {
      return textResult(`Exit ${out.status}${out.error ? ` (${out.error})` : ""}\n\n${parts || "(no output)"}`);
    }
    return textResult(parts || "Push finished.");
  },
);

async function main() {
  const transport = new StdioServerTransport();
  await mcpServer.connect(transport);
}

main().catch((err) => {
  console.error("[mychennaicity-production-data]", err);
  process.exit(1);
});
