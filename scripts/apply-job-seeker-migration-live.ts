import { config as loadEnv } from "dotenv";
import { neon } from "@neondatabase/serverless";
import { readFileSync } from "fs";

loadEnv({ path: ".env.production.local" });

const url = process.env.DATABASE_URL;
if (!url) {
  console.error("DATABASE_URL missing in .env.production.local");
  process.exit(1);
}

const sql = neon(url);
const migration = readFileSync("drizzle/0006_job_seeker_posts.sql", "utf8");
const statements = migration
  .split("--> statement-breakpoint")
  .map((s) => s.trim())
  .filter(Boolean);

async function main() {
  for (const stmt of statements) {
    console.log("Running:", stmt.slice(0, 72).replace(/\n/g, " "));
    await sql.query(stmt);
  }
  console.log("Migration applied.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
