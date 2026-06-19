/**
 * Optional live-seed hook: POST /api/revalidate/listings to bust sitemap + hub cache.
 */
export async function revalidateListingsAfterSeed(options?: {
  jobSlug?: string;
  eventSlug?: string;
  directoryType?: string;
  directorySlug?: string;
  label?: string;
}): Promise<void> {
  const label = options?.label ?? "listing-seed";
  const secret = process.env.REVALIDATE_SECRET?.trim();
  const site = (
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://mychennaicity.in"
  ).replace(/\/$/, "");

  if (!secret) {
    console.log(
      `[${label}] REVALIDATE_SECRET not set — skipped listings revalidate (sitemap is force-dynamic after deploy).`,
    );
    return;
  }

  const params = new URLSearchParams({ secret });
  const jobSlug = options?.jobSlug?.trim();
  const eventSlug = options?.eventSlug?.trim();
  const directoryType = options?.directoryType?.trim();
  const directorySlug = options?.directorySlug?.trim();
  if (jobSlug) params.set("jobSlug", jobSlug);
  if (eventSlug) params.set("eventSlug", eventSlug);
  if (directoryType) params.set("directoryType", directoryType);
  if (directorySlug) params.set("directorySlug", directorySlug);

  const url = `${site}/api/revalidate/listings?${params.toString()}`;
  try {
    const res = await fetch(url, { method: "POST" });
    const body = await res.text();
    console.log(`[${label}] Listings revalidate:`, res.status, body);
    if (!res.ok) {
      console.warn(
        `[${label}] Revalidate failed — check REVALIDATE_SECRET on Vercel matches local .env.production.local`,
      );
    }
  } catch (err) {
    console.warn(`[${label}] Revalidate request failed:`, err);
  }
}
