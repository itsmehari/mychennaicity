"use client";

import { useState } from "react";
import { formatIndianMobile } from "@/lib/classifieds/phone-gate";

export function ClassifiedPhoneGate({ slug }: { slug: string }) {
  const [phone, setPhone] = useState("");
  const [revealed, setRevealed] = useState<string | null>(null);
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
        body: JSON.stringify({ slug, phone }),
      });
      const data = (await res.json()) as { phone?: string; error?: string };
      if (!res.ok || !data.phone) {
        setError(data.error || "Could not show the number. Try again.");
        return;
      }
      setRevealed(data.phone);
    } catch {
      setError("Could not show the number. Try again.");
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

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-3">
      <p className="text-sm leading-relaxed text-[var(--muted)]">
        The poster&apos;s number stays hidden until you share yours. We store
        the number you enter with this ad.
      </p>
      <label className="text-xs font-medium text-[var(--foreground)]" htmlFor={`reveal-${slug}`}>
        Your mobile number
      </label>
      <input
        id={`reveal-${slug}`}
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
        {pending ? "Checking…" : "Show contact number"}
      </button>
    </form>
  );
}
