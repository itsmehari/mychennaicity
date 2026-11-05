import type { WhatsappJoinStatus } from "@/lib/whatsapp-join";

const QUEUE_PATH = "/super-admin/whatsapp-join-requests";
const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export function parseWhatsappJoinStatus(raw: string): WhatsappJoinStatus | null {
  if (raw === "submitted" || raw === "approved" || raw === "declined" || raw === "spam") {
    return raw;
  }
  return null;
}

export function isWhatsappJoinId(raw: string): boolean {
  return UUID_RE.test(raw);
}

/** Only the queue page may be the post-save redirect. */
export function safeWhatsappQueueReturn(raw: string): string {
  const text = raw.trim();
  if (
    !text.startsWith("/") ||
    text.startsWith("//") ||
    text.includes("\\") ||
    text.includes("://")
  ) {
    return QUEUE_PATH;
  }
  try {
    const url = new URL(text, "https://mychennaicity.in");
    if (url.origin !== "https://mychennaicity.in") return QUEUE_PATH;
    if (url.pathname !== QUEUE_PATH) return QUEUE_PATH;
    return `${url.pathname}${url.search}`;
  } catch {
    return QUEUE_PATH;
  }
}

export function withQueueFlag(
  returnTo: string,
  key: "notice" | "error",
  value: string,
): string {
  const url = new URL(safeWhatsappQueueReturn(returnTo), "https://mychennaicity.in");
  url.searchParams.delete("notice");
  url.searchParams.delete("error");
  url.searchParams.set(key, value.slice(0, 40));
  return `${url.pathname}${url.search}`;
}
