"use client";

import { useId, useState } from "react";
import { formatIndianMobile } from "@/lib/classifieds/phone-gate";

export function ClassifiedPhoneGate({
  slug,
  mode,
}: {
  slug: string;
  /** reveal: a poster number is stored and returned after the request is saved. */
  mode: "reveal" | "request";
}) {
  const baseId = useId();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [revealed, setRevealed] = useState<string | null>(null);
  const [requested, setRequested] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setPending(true);
    try {
      const res = await fetch("/api/classifieds/reveal-phone", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, name, phone }),
      });
      const data = (await res.json()) as {
        phone?: string;
        requested?: boolean;
        error?: string;
      };
      if (!res.ok) {
        setError(data.error || "Could not save the request. Try again.");
        return;
      }
      if (data.phone) {
        setRevealed(data.phone);
        return;
      }
      if (data.requested || mode === "request") {
        setRequested(true);
        return;
      }
      setError(data.error || "Could not show the number. Try again.");
    } catch {
      setError("Could not save the request. Try again.");
    } finally {
      setPending(false);
    }
  }

  if (revealed) {
    const pretty = formatIndianMobile(revealed);
    return (
      <div className="flex flex-col gap-3">
        <p className="text-sm leading-relaxed text-[var(--muted)]">
          Contact number
        </p>
        <a
          href={`tel:+91${revealed}`}
          className="inline-flex w-full items-center justify-center rounded-xl bg-[var(--accent)] px-5 py-3.5 text-sm font-semibold text-[var(--accent-fg)]"
        >
          Call {pretty}
        </a>
        <a
          href={`https://wa.me/91${revealed}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex w-full items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--surface)] px-5 py-3.5 text-sm font-semibold text-[var(--foreground)]"
        >
          WhatsApp {pretty}
        </a>
      </div>
    );
  }

  if (requested) {
    return (
      <p className="text-sm leading-relaxed text-[var(--foreground)]">
        Request saved. Your name and mobile are stored for this ad.
      </p>
    );
  }

  return (
    <form
      method="post"
      action="/api/classifieds/reveal-phone"
      onSubmit={onSubmit}
      className="flex flex-col gap-3"
    >
      <p className="text-sm leading-relaxed text-[var(--muted)]">
        {mode === "reveal"
          ? "The poster’s number stays hidden until you share your name and mobile. We store both with this ad."
          : "Share your name and mobile. We store both with this ad so the poster can see who asked."}
      </p>
      <input type="hidden" name="slug" value={slug} />
      <label className="text-xs font-medium text-[var(--foreground)]" htmlFor={`${baseId}-name`}>
        Your name
      </label>
      <input
        id={`${baseId}-name`}
        name="name"
        type="text"
        autoComplete="name"
        required
        minLength={2}
        maxLength={80}
        value={name}
        onChange={(ev) => setName(ev.target.value)}
        placeholder="Name"
        className="w-full rounded-xl border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-sm text-[var(--foreground)]"
      />
      <label className="text-xs font-medium text-[var(--foreground)]" htmlFor={`${baseId}-phone`}>
        Your mobile number
      </label>
      <input
        id={`${baseId}-phone`}
        name="phone"
        type="tel"
        inputMode="numeric"
        autoComplete="tel"
        required
        value={phone}
        onChange={(ev) => setPhone(ev.target.value)}
        placeholder="10-digit mobile"
        className="w-full rounded-xl border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-sm text-[var(--foreground)]"
      />
      {error ? <p className="text-sm text-red-700">{error}</p> : null}
      <button
        type="submit"
        disabled={pending}
        className="inline-flex w-full items-center justify-center rounded-xl bg-[var(--accent)] px-5 py-3.5 text-sm font-semibold text-[var(--accent-fg)] disabled:opacity-60"
      >
        {pending ? "Saving…" : mode === "reveal" ? "Show contact number" : "Send request"}
      </button>
    </form>
  );
}
