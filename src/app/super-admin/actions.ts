"use server";

import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { rateLimitConsume } from "@/lib/rate-limit";
import { matchSuperAdminLogin } from "@/lib/super-admin/auth";
import { signSuperAdminSession, SUPER_ADMIN_COOKIE } from "@/lib/super-admin/session";

function clientIp(headerList: Headers): string {
  return (
    headerList.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    headerList.get("x-real-ip")?.trim() ||
    "unknown"
  );
}

function cookieOptions(maxAge: number) {
  return {
    httpOnly: true as const,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/super-admin",
    maxAge,
  };
}

export async function superAdminLoginAction(formData: FormData) {
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");
  const headerList = await headers();
  const limit = rateLimitConsume(`super-admin-login:${clientIp(headerList)}`, 8, 10 * 60 * 1000);
  if (!limit.ok) redirect("/super-admin?error=limited");

  const user = await matchSuperAdminLogin(email, password);
  if (!user) redirect("/super-admin?error=mismatch");

  const token = signSuperAdminSession(user.email);
  if (!token) redirect("/super-admin?error=config");

  const jar = await cookies();
  jar.set(SUPER_ADMIN_COOKIE, token, cookieOptions(60 * 60 * 24 * 14));
  redirect("/super-admin");
}

export async function superAdminSignOutAction() {
  const jar = await cookies();
  jar.set(SUPER_ADMIN_COOKIE, "", cookieOptions(0));
  redirect("/super-admin");
}
