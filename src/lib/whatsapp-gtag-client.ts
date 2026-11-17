"use client";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

type WaGtagParams = Record<string, string | number | boolean>;

const pending: { name: string; params: WaGtagParams }[] = [];
let retryTimer: ReturnType<typeof setInterval> | null = null;

function trySend(name: string, params: WaGtagParams): boolean {
  if (typeof window === "undefined" || typeof window.gtag !== "function") {
    return false;
  }
  window.gtag("event", name, {
    event_category: "whatsapp_community",
    ...params,
  });
  return true;
}

/** Queue GA4 WhatsApp funnel events until gtag is ready (race with layout scripts). */
export function waGtagEvent(name: string, params: WaGtagParams = {}): void {
  if (typeof window === "undefined") return;
  if (trySend(name, params)) return;

  pending.push({ name, params });
  if (retryTimer != null) return;

  let attempts = 0;
  retryTimer = setInterval(() => {
    attempts += 1;
    const leftover: typeof pending = [];
    while (pending.length > 0) {
      const item = pending.shift()!;
      if (!trySend(item.name, item.params)) leftover.push(item);
    }
    pending.push(...leftover);
    if (pending.length === 0 || attempts >= 24) {
      if (retryTimer != null) clearInterval(retryTimer);
      retryTimer = null;
    }
  }, 500);
}