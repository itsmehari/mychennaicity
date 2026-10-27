"use server";

import { AuthError } from "next-auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { signIn } from "@/auth";
import { rateLimitConsume } from "@/lib/rate-limit";

function safeAdminPath(raw: FormDataEntryValue | null): string {
  const value = String(raw ?? "");
  if (!value.startsWith("/admin") || value.startsWith("//") || value.includes("\\")) {
    return "/admin";
  }
  return value;
}

function clientIp(headerList: Headers): string {
  return (
    headerList.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    headerList.get("x-real-ip")?.trim() ||
    "unknown"
  );
}

export async function loginAction(formData: FormData) {
  const callbackUrl = safeAdminPath(formData.get("callbackUrl"));
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");
  const fail = (code: "mismatch" | "limited" | "missing") => {
    const url = new URL("/login", "https://mychennaicity.in");
    url.searchParams.set("error", code);
    url.searchParams.set("callbackUrl", callbackUrl);
    redirect(`${url.pathname}${url.search}`);
  };

  if (
    !process.env.ADMIN_EMAIL?.trim() &&
    !process.env.ADMIN_PASSWORD_HASH?.trim() &&
    !process.env.DATABASE_URL
  ) {
    fail("missing");
  }
  if (!email || !password) fail("mismatch");

  const headerList = await headers();
  const limit = rateLimitConsume(`admin-login:${clientIp(headerList)}`, 8, 10 * 60 * 1000);
  if (!limit.ok) fail("limited");

  try {
    await signIn("credentials", { email, password, redirectTo: callbackUrl });
  } catch (error) {
    if (error instanceof AuthError) fail("mismatch");
    throw error;
  }
}
