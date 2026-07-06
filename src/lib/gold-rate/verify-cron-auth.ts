import type { NextRequest } from "next/server";

/** Vercel Cron sends Authorization: Bearer CRON_SECRET; manual runs may use ?secret=REVALIDATE_SECRET */
export function isAuthorizedCronRequest(request: NextRequest): boolean {
  const cronSecret = process.env.CRON_SECRET?.trim();
  const revalidateSecret = process.env.REVALIDATE_SECRET?.trim();

  const auth = request.headers.get("authorization");
  if (cronSecret && auth === `Bearer ${cronSecret}`) {
    return true;
  }

  const querySecret = request.nextUrl.searchParams.get("secret");
  if (revalidateSecret && querySecret === revalidateSecret) {
    return true;
  }

  return false;
}
