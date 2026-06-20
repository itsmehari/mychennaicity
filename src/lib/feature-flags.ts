/**
 * Public feature toggles (NEXT_PUBLIC_*). Defaults favour AdSense / policy review readiness.
 */

function envFlag(name: string, defaultValue = false): boolean {
  const raw = process.env[name]?.trim().toLowerCase();
  if (raw === undefined || raw === "") return defaultValue;
  return raw === "1" || raw === "true" || raw === "yes";
}

/** Auto-open newsletter modal on home, articles, jobs, events. Off by default before AdSense approval. */
export function isNewsletterAutoModalEnabled(): boolean {
  return envFlag("NEXT_PUBLIC_NEWSLETTER_AUTO_MODAL", false);
}

/** Render Google AdSense display units when client id + slot id are configured. */
export function isAdSenseDisplayEnabled(): boolean {
  const clientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID?.trim() ?? "";
  return clientId.length > 0;
}
