import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { readSuperAdminSession, SUPER_ADMIN_COOKIE } from "./session";

export async function readSuperAdminEmail(): Promise<string | null> {
  const jar = await cookies();
  return readSuperAdminSession(jar.get(SUPER_ADMIN_COOKIE)?.value)?.email ?? null;
}

/** Mutations. Throws when the desk cookie is missing. */
export async function requireSuperAdmin(): Promise<{ email: string }> {
  const email = await readSuperAdminEmail();
  if (!email) throw new Error("Sign in required");
  return { email };
}

/** Pages under the desk. Sends a missing session back to the sign-in form. */
export async function requireSuperAdminPage(): Promise<{ email: string }> {
  const email = await readSuperAdminEmail();
  if (!email) redirect("/super-admin");
  return { email };
}
