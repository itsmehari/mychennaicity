"use client";

import { useId, useState } from "react";
import { formatIndianMobile } from "@/lib/classifieds/phone-gate";
import { employerCallTelHref } from "@/lib/jobs/job-call-phone";

type ListingKind = "job" | "job_seeker";

export function JobCallGate({
  slug,
  kind,
  tamil = false,
  compact = false,
}: {
  slug: string;
  kind: ListingKind;
  tamil?: boolean;
  compact?: boolean;
}) {
  const baseId = useId();
  const [phone, setPhone] = useState("");
  const [employerPhone, setEmployerPhone] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setPending(true);
    try {
      const res = await fetch("/api/jobs/call-access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, phone, kind }),
      });
      const data = (await res.json()) as { phone?: string; error?: string };
      if (!res.ok || !data.phone) {
        setError(data.error || "Could not save your number. Try again.");
        return;
      }
      setEmployerPhone(data.phone);
    } catch {
      setError("Could not save your number. Try again.");
    } finally {
      setPending(false);
    }
  }

  const btnPrimary = compact
    ? "mcc-jobs-hub__job-btn mcc-jobs-hub__job-btn--primary mcc-jobs-detail__cta w-full"
    : "inline-flex w-full items-center justify-center rounded-xl bg-[var(--accent)] px-5 py-3.5 text-sm font-semibold text-[var(--accent-fg)]";

  const btnGhost = compact
    ? "mcc-jobs-hub__job-btn mcc-jobs-hub__job-btn--ghost mcc-jobs-detail__cta w-full"
    : "inline-flex w-full items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--surface)] px-5 py-3.5 text-sm font-semibold text-[var(--foreground)]";

  if (employerPhone) {
    const pretty = formatIndianMobile(employerPhone);
    return (
      <div className="flex flex-col gap-2">
        <p className="text-sm text-[var(--muted)]">
          {tamil
            ? "உங்கள் மொபைல் சேமிக்கப்பட்டது. அழைக்க தட்டவும்."
            : "Your mobile is saved with this listing. Tap to call."}
        </p>
        <a
          href={employerCallTelHref(employerPhone)}
          data-engagement="call"
          className={btnPrimary}
        >
          {tamil ? `அழைக்க ${pretty}` : `Call ${pretty}`}
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-2">
      <p className="text-sm text-[var(--muted)]">
        {tamil
          ? "அழைப்பு பொத்தானைத் திறக்க உங்கள் 10 இலக்க மொபைல் எண்ணைப் பதிவு செய்யுங்கள்."
          : "Enter your 10-digit mobile to unlock the call button. We store it with this listing."}
      </p>
      <label className="sr-only" htmlFor={`${baseId}-phone`}>
        {tamil ? "உங்கள் மொபைல்" : "Your mobile number"}
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
        placeholder={tamil ? "10 இலக்க மொபைல்" : "10-digit mobile"}
        className="w-full rounded-xl border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-sm text-[var(--foreground)]"
      />
      {error ? <p className="text-sm text-red-700">{error}</p> : null}
      <button type="submit" disabled={pending} className={btnGhost}>
        {pending
          ? tamil
            ? "சேமிக்கிறது…"
            : "Saving…"
          : tamil
            ? "அழைப்பைத் திற"
            : "Show call button"}
      </button>
    </form>
  );
}
