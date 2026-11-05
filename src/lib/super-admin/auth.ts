import { sql } from "drizzle-orm";
import { getDb } from "@/db/client";
import { users } from "@/db/schema/auth";
import { matchAdminLogin, verifyAdminPassword } from "@/lib/admin-password";

/**
 * One desk login.
 * Super-admin env hash, then a `super_admin` user row, then the existing admin email and hash.
 */
export async function matchSuperAdminLogin(
  email: string,
  password: string,
): Promise<{ email: string } | null> {
  const normalized = email.trim().toLowerCase();
  if (!normalized || !password || password.length > 200) return null;

  const envEmail = process.env.SUPER_ADMIN_EMAIL?.trim().toLowerCase();
  const envHash = process.env.SUPER_ADMIN_PASSWORD_HASH?.trim();
  if (
    envEmail &&
    envHash &&
    normalized === envEmail &&
    (await verifyAdminPassword(password, envHash))
  ) {
    return { email: normalized };
  }

  if (process.env.DATABASE_URL) {
    try {
      const db = getDb();
      const rows = await db
        .select({
          email: users.email,
          role: users.role,
          passwordHash: users.passwordHash,
        })
        .from(users)
        .where(sql`lower(${users.email}) = ${normalized}`)
        .limit(1);
      const row = rows[0];
      if (row?.role === "super_admin") {
        if (!row.email || !row.passwordHash) return null;
        if (!(await verifyAdminPassword(password, row.passwordHash))) return null;
        return { email: row.email.trim().toLowerCase() };
      }
    } catch {
      // Admin env login can still succeed when the user table is unavailable.
    }
  }

  const admin = await matchAdminLogin(normalized, password);
  if (admin?.email) return { email: admin.email.trim().toLowerCase() };
  return null;
}
