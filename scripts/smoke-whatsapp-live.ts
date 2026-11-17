/**
 * Production smoke checks for WhatsApp community URLs.
 * Usage: npx tsx scripts/smoke-whatsapp-live.ts
 * Optional: SMOKE_BASE_URL=https://mychennaicity.in
 */

const base = (process.env.SMOKE_BASE_URL || "https://mychennaicity.in").replace(/\/$/, "");

const paths = [
  "/whatsapp-community/join",
  "/chennai-whatsapp-group",
  "/chennai-whatsapp-group-tamil",
  "/super-admin/whatsapp-join-requests",
] as const;

const forbidden = ["chat.whatsapp.com", "WHATSAPP_COMMUNITY_INVITE_URL"];

async function head(path: string): Promise<{ status: number; robots?: string | null }> {
  const res = await fetch(`${base}${path}`, { method: "HEAD", redirect: "follow" });
  return { status: res.status, robots: res.headers.get("x-robots-tag") };
}

async function body(path: string): Promise<string> {
  const res = await fetch(`${base}${path}`, { redirect: "follow" });
  return res.text();
}

async function main() {
  let failed = false;
  console.log(`Smoke base: ${base}`);

  for (const path of paths) {
    const { status, robots } = await head(path);
    const ok = status === 200 || (path.includes("super-admin") && (status === 307 || status === 401));
    console.log(`${ok ? "OK" : "FAIL"} HEAD ${path} → ${status}${robots ? ` (X-Robots-Tag: ${robots})` : ""}`);
    if (!ok) failed = true;
  }

  const joinHtml = await body("/whatsapp-community/join");
  for (const needle of forbidden) {
    if (joinHtml.includes(needle)) {
      console.log(`FAIL join HTML contains forbidden: ${needle}`);
      failed = true;
    }
  }
  if (!joinHtml.toLowerCase().includes("waitlist") && !joinHtml.toLowerCase().includes("request")) {
    console.log("WARN join HTML: expected waitlist or request copy (accepting may be on)");
  }

  const joinQuery = await head("/whatsapp-community/join?ok=1");
  if (joinQuery.robots?.toLowerCase().includes("noindex")) {
    console.log("OK join query X-Robots-Tag noindex");
  } else {
    console.log("FAIL join query missing X-Robots-Tag noindex");
    failed = true;
  }

  if (failed) process.exit(1);
  console.log("All WhatsApp smoke checks passed.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});