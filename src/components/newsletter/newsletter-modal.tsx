"use client";

import Image from "next/image";
import { useEffect, useId, useRef } from "react";

/** Same hero asset as `HomeExploreChennai` (Explore section). */
const MODAL_HERO_IMAGE = "/images/explore-chennai-madras-high-court.jpg";

type Props = {
  open: boolean;
  onClose: () => void;
  onDismissPersist: () => void;
  onSubscribeSuccess: () => void;
};

export function NewsletterModal({
  open,
  onClose,
  onDismissPersist,
  onSubscribeSuccess,
}: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const descId = useId();

  useEffect(() => {
    const el = dialogRef.current;
    if (!el) return;
    if (open) {
      if (!el.open) el.showModal();
    } else if (el.open) {
      el.close();
    }
  }, [open]);

  const handleClose = (persist: boolean) => {
    if (persist) onDismissPersist();
    onClose();
  };

  return (
    <dialog
      ref={dialogRef}
      className="newsletter-modal m-auto max-h-[min(92vh,640px)] w-[min(calc(100vw-1.5rem),440px)] overflow-hidden rounded-3xl border-0 bg-[var(--surface)] p-0 text-[var(--foreground)] shadow-[0_32px_80px_-20px_rgba(0,0,0,0.45)] backdrop:bg-black/55 backdrop:backdrop-blur-[2px]"
      aria-labelledby={titleId}
      aria-describedby={descId}
      onCancel={(e) => {
        e.preventDefault();
        handleClose(true);
      }}
      onClick={(e) => {
        if (e.target === dialogRef.current) handleClose(true);
      }}
    >
      <div className="flex max-h-[inherit] flex-col">
        <div className="relative aspect-[5/3] w-full shrink-0 bg-[var(--border)]">
          <Image
            src={MODAL_HERO_IMAGE}
            alt="Madras High Court building, Chennai"
            fill
            className="object-cover"
            sizes="440px"
            priority={open}
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent"
            aria-hidden
          />
          <button
            type="button"
            className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-[color-mix(in_srgb,var(--surface)_92%,transparent)] text-lg font-light text-[var(--foreground)] shadow-md ring-1 ring-[var(--border)] transition hover:bg-[var(--surface)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
            aria-label="Close newsletter dialog"
            onClick={() => handleClose(true)}
          >
            ×
          </button>
        </div>

        <div className="flex flex-col gap-4 bg-[color-mix(in_srgb,var(--surface)_88%,var(--accent)_8%)] px-6 pb-6 pt-5">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--accent)]">
              Chennai digest
            </p>
            <h2
              id={titleId}
              className="type-display mt-2 text-xl font-bold leading-snug tracking-tight sm:text-2xl"
            >
              Subscribe for weekly Chennai updates
            </h2>
            <p
              id={descId}
              className="type-lede mt-2 text-sm leading-relaxed text-[var(--muted)]"
            >
              Jobs, civic deadlines, weekend events — one concise email when we
              launch delivery. No spam.
            </p>
          </div>

          <form
            className="relative flex items-center gap-0"
            onSubmit={(e) => {
              e.preventDefault();
              const fd = new FormData(e.currentTarget);
              const email = String(fd.get("email") ?? "").trim();
              if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                return;
              }
              onSubscribeSuccess();
              onClose();
            }}
          >
            <label htmlFor="newsletter-modal-email" className="sr-only">
              Email address
            </label>
            <input
              id="newsletter-modal-email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="Enter your email"
              required
              className="min-w-0 flex-1 rounded-full border border-[var(--border)] bg-[var(--background)] py-3 pl-4 pr-14 text-sm text-[var(--foreground)] placeholder:text-[var(--muted)] shadow-inner focus:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)]"
            />
            <button
              type="submit"
              className="absolute right-1 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-[var(--accent)] text-[var(--accent-fg)] shadow-md transition hover:bg-[var(--accent-hover)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
              aria-label="Subscribe"
              title="Subscribe"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <path d="M22 2 11 13" />
                <path d="M22 2 15 22l-4-9-9-4 20-7z" />
              </svg>
            </button>
          </form>

          <p className="text-center text-xs text-[var(--muted)]">
            We don&apos;t spam — same promise as the home page newsletter block.
          </p>
        </div>
      </div>
    </dialog>
  );
}
