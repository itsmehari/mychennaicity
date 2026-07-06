/**
 * Trigger production gold-rate cron manually (same as Vercel schedule).
 * Requires REVALIDATE_SECRET in .env.production.local (matches Vercel).
 *
 *   npm run gold-rate:sync:live
 */
import { config as loadEnv } from "dotenv";

loadEnv({ path: ".env.production.local" });
loadEnv({ path: ".env.local" });

async function main() {
  const secret = process.env.REVALIDATE_SECRET?.trim();
  const site = (
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://mychennaicity.in"
  ).replace(/\/$/, "");

  if (!secret) {
    console.error(
      "REVALIDATE_SECRET missing — add to .env.production.local (must match Vercel env).",
    );
    process.exit(1);
  }

  const url = `${site}/api/cron/gold-rate?secret=${encodeURIComponent(secret)}`;
  const res = await fetch(url);
  const body = await res.text();
  console.log("[gold-rate:sync:live]", res.status, body);

  if (!res.ok) process.exit(1);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
