import { sql } from "drizzle-orm";
import { getDb } from "@/db/client";
import { users } from "@/db/schema/auth";
import { verifyAdminPassword } from "@/lib/admin-password";

/** Env hash first, then a `user` row with role `super_admin`. */
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

  if (!process.env.DATABASE_URL) return null;
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
    if (!row?.email || !row.passwordHash || row.role !== "super_admin") return null;
    if (!(await verifyAdminPassword(password, row.passwordHash))) return null;
    return { email: row.email.trim().toLowerCase() };
  } catch {
    return null;
  }
}
