/**
 * Optional live-seed hook: POST /api/revalidate/news to bust Vercel route cache.
 * Home and news hub already read Neon on every request; this helps edge HTML refresh immediately.
 */
export async function revalidateNewsAfterSeed(options?: {
  slug?: string;
  label?: string;
}): Promise<void> {
  const label = options?.label ?? "seed";
  const secret = process.env.REVALIDATE_SECRET?.trim();
  const site = (
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://mychennaicity.in"
  ).replace(/\/$/, "");

  if (!secret) {
    console.log(
      `[${label}] REVALIDATE_SECRET not set — skipped route revalidate (home/news lists read DB live).`,
    );
    return;
  }

  const params = new URLSearchParams({ secret });
  const slug = options?.slug?.trim();
  if (slug) params.set("slug", slug);

  const url = `${site}/api/revalidate/news?${params.toString()}`;
  try {
    const res = await fetch(url, { method: "POST" });
    const body = await res.text();
    console.log(`[${label}] Cache revalidate:`, res.status, body);
    if (!res.ok) {
      console.warn(
        `[${label}] Revalidate failed — check REVALIDATE_SECRET on Vercel matches local .env.production.local`,
      );
    }
  } catch (err) {
    console.warn(`[${label}] Revalidate request failed:`, err);
  }
}
