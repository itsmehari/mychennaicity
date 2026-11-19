import { config as loadEnv } from "dotenv";
import { neon } from "@neondatabase/serverless";
import { readFileSync } from "fs";

const live = process.argv.includes("--live");
loadEnv({ path: live ? ".env.production.local" : ".env.local" });

const url = process.env.DATABASE_URL;
if (!url) {
  console.error(
    live
      ? "DATABASE_URL missing in .env.production.local"
      : "DATABASE_URL missing in .env.local",
  );
  process.exit(1);
}

const sql = neon(url);
const migration = readFileSync(
  "drizzle/0020_job_salary_unit_schema_eligible.sql",
  "utf8",
);
const statements = migration
  .split("\n")
  .map((line) => line.trim())
  .filter((line) => line && !line.startsWith("--"));

async function main() {
  for (const stmt of statements) {
    console.log("Running:", stmt.slice(0, 90));
    await sql.query(stmt);
  }
  console.log(live ? "Production columns ready." : "Local columns ready.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
