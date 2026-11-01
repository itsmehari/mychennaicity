/**
 * Creates the super-admin login row and, on a local run, writes the hash into .env.local.
 * Pass SUPER_ADMIN_EMAIL plus either SUPER_ADMIN_PASSWORD_HASH or SUPER_ADMIN_PASSWORD.
 * The plain password is never printed and is not written to git.
 *
 * Dev:  SUPER_ADMIN_EMAIL=… SUPER_ADMIN_PASSWORD=… npm run db:seed:super-admin
 * Live: npm run db:seed:super-admin:live  (same env vars; uses .env.production.local for DATABASE_URL)
 */
import { config as loadEnv } from "dotenv";
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { eq, sql } from "drizzle-orm";
import { hashAdminPassword } from "../src/lib/admin-password";
import * as schema from "../src/db/schema";
import { users } from "../src/db/schema/auth";

const live = process.env.SEED_LIVE === "1" || process.argv.includes("--live");

if (live) {
  loadEnv({ path: ".env.production.local" });
} else {
  loadEnv({ path: "secrets/database.local.env" });
  loadEnv({ path: ".env.local" });
  loadEnv({ path: ".env" });
}

const databaseUrl = process.env.DATABASE_URL;
const email = process.env.SUPER_ADMIN_EMAIL?.trim().toLowerCase();
if (!databaseUrl) {
  console.error(live ? "DATABASE_URL missing (.env.production.local)." : "DATABASE_URL missing.");
  process.exit(1);
}
if (!email) {
  console.error("SUPER_ADMIN_EMAIL is missing.");
  process.exit(1);
}

const existingHash = process.env.SUPER_ADMIN_PASSWORD_HASH?.trim();
const plain = process.env.SUPER_ADMIN_PASSWORD;

function writeLocalEnv(hash: string) {
  const path = ".env.local";
  let text = existsSync(path) ? readFileSync(path, "utf8") : "";
  const set = (key: string, value: string) => {
    const line = `${key}=${value}`;
    const pattern = new RegExp(`^${key}=.*$`, "m");
    if (pattern.test(text)) text = text.replace(pattern, line);
    else text += `${text.endsWith("\n") || text.length === 0 ? "" : "\n"}${line}\n`;
  };
  set("SUPER_ADMIN_EMAIL", email!);
  set("SUPER_ADMIN_PASSWORD_HASH", hash);
  writeFileSync(path, text);
}

async function main() {
  const passwordHash =
    existingHash && existingHash.startsWith("scrypt:")
      ? existingHash
      : plain
        ? await hashAdminPassword(plain)
        : "";

  if (!passwordHash.startsWith("scrypt:")) {
    console.error("Set SUPER_ADMIN_PASSWORD or SUPER_ADMIN_PASSWORD_HASH.");
    process.exit(1);
  }

  const db = drizzle(neon(databaseUrl), { schema });
  const rows = await db
    .select({ id: users.id, role: users.role })
    .from(users)
    .where(sql`lower(${users.email}) = ${email}`)
    .limit(1);
  const existing = rows[0];

  if (!existing) {
    await db.insert(users).values({
      email,
      name: "Super admin",
      role: "super_admin",
      passwordHash,
    });
    console.log("Created super admin:", email);
  } else if (existing.role === "super_admin") {
    await db
      .update(users)
      .set({ passwordHash, updatedAt: new Date() })
      .where(eq(users.id, existing.id));
    console.log("Updated super admin hash:", email);
  } else {
    console.log(`Left existing ${existing.role} account unchanged: ${email}`);
  }

  if (!live) {
    writeLocalEnv(passwordHash);
    console.log("Wrote SUPER_ADMIN_EMAIL and SUPER_ADMIN_PASSWORD_HASH to .env.local");
  }
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : "Super admin seed failed.");
  process.exit(1);
});
