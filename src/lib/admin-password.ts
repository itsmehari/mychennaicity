import { randomBytes, scrypt as scryptCb, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";
import { neon } from "@neondatabase/serverless";

const scrypt = promisify(scryptCb);

const SCRYPT_N = 16384;
const SCRYPT_R = 8;
const SCRYPT_P = 1;
const KEY_LEN = 32;

/** scrypt$N$r$p$saltHex$keyHex — store this, never the password. */
export async function hashAdminPassword(password: string): Promise<string> {
  const salt = randomBytes(16);
  const key = (await scrypt(password, salt, KEY_LEN, {
    N: SCRYPT_N,
    r: SCRYPT_R,
    p: SCRYPT_P,
  })) as Buffer;
  return `scrypt:${SCRYPT_N}:${SCRYPT_R}:${SCRYPT_P}:${salt.toString("hex")}:${key.toString("hex")}`;
}

export async function verifyAdminPassword(
  password: string,
  stored: string,
): Promise<boolean> {
  const parts = stored.includes(":") ? stored.split(":") : stored.split("$");
  if (parts.length !== 6 || parts[0] !== "scrypt") return false;
  const n = Number(parts[1]);
  const r = Number(parts[2]);
  const p = Number(parts[3]);
  if (!Number.isFinite(n) || !Number.isFinite(r) || !Number.isFinite(p)) return false;
  if (n < 16384 || n > 262144 || r < 1 || p < 1) return false;
  const salt = Buffer.from(parts[4], "hex");
  const expected = Buffer.from(parts[5], "hex");
  if (salt.length < 8 || expected.length !== KEY_LEN) return false;
  const key = (await scrypt(password, salt, expected.length, { N: n, r, p })) as Buffer;
  if (key.length !== expected.length) return false;
  return timingSafeEqual(key, expected);
}

export type AdminLoginUser = {
  id: string;
  email: string;
  name: string;
  role: "admin";
};

/** Env hash first, then the production `user.password_hash` row. */
export async function matchAdminLogin(
  email: string,
  password: string,
): Promise<AdminLoginUser | null> {
  const normalized = email.trim().toLowerCase();
  if (!normalized || !password) return null;

  const envEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const envHash = process.env.ADMIN_PASSWORD_HASH?.trim();
  if (
    envEmail &&
    envHash &&
    normalized === envEmail &&
    (await verifyAdminPassword(password, envHash))
  ) {
    return { id: "site-admin", email: normalized, name: "Admin", role: "admin" };
  }

  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) return null;
  try {
    const sql = neon(databaseUrl);
    const rows = await sql`
      select id, email, name, role, password_hash
      from "user"
      where lower(email) = ${normalized}
      limit 1
    `;
    const row = rows[0] as
      | {
          id?: string;
          email?: string;
          name?: string | null;
          role?: string | null;
          password_hash?: string | null;
        }
      | undefined;
    if (!row?.id || !row.email || !row.password_hash) return null;
    if (row.role !== "admin") return null;
    if (!(await verifyAdminPassword(password, row.password_hash))) return null;
    return {
      id: row.id,
      email: row.email,
      name: row.name?.trim() || "Admin",
      role: "admin",
    };
  } catch {
    return null;
  }
}
