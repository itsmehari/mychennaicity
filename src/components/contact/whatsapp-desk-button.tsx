"use client";

import { useState, type ReactNode } from "react";

/**
 * Opens the desk chat only after a click.
 * The phone number is not a prop, not rendered, and not stored in this file.
 */
export function WhatsAppDeskButton({
  text,
  source,
  className,
  children,
}: {
  text?: string;
  source?: string;
  className?: string;
  children: ReactNode;
}) {
  const [pending, setPending] = useState(false);
  const [failed, setFailed] = useState(false);

  async function openChat() {
    if (pending) return;
    setPending(true);
    setFailed(false);
    try {
      const res = await fetch("/api/contact/whatsapp", {
        method: "POST",
        credentials: "same-origin",
        cache: "no-store",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: text ?? "", source: source ?? "" }),
      });
      if (!res.ok) {
        setFailed(true);
        return;
      }
      const data = (await res.json()) as { url?: unknown };
      const url = typeof data.url === "string" ? data.url : "";
      let parsed: URL;
      try {
        parsed = new URL(url);
      } catch {
        setFailed(true);
        return;
      }
      const allowed =
        parsed.protocol === "https:" &&
        (parsed.hostname === "wa.me" || parsed.hostname === "api.whatsapp.com");
      if (!allowed) {
        setFailed(true);
        return;
      }
      window.location.assign(parsed.toString());
    } catch {
      setFailed(true);
    } finally {
      setPending(false);
    }
  }

  return (
    <>
      <button
        type="button"
        className={className}
        data-whatsapp-desk=""
        aria-busy={pending || undefined}
        onClick={() => {
          void openChat();
        }}
      >
        {children}
      </button>
      {failed ? (
        <span className="mcc-wa-desk-error" role="alert">
          Could not open WhatsApp. Try again.
        </span>
      ) : null}
    </>
  );
}
