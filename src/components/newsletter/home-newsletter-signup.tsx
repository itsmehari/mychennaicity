"use client";

import { FormEvent } from "react";
import { dispatchOpenNewsletterModal } from "@/config/newsletter-modal";

export function HomeNewsletterSignup() {
  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    dispatchOpenNewsletterModal();
  }

  return (
    <form
      className="mt-4 flex max-w-md flex-col gap-2 sm:flex-row"
      aria-label="Newsletter sign-up"
      onSubmit={onSubmit}
    >
      <label htmlFor="newsletter-email" className="sr-only">
        Email
      </label>
      <input
        id="newsletter-email"
        name="email"
        type="email"
        autoComplete="email"
        placeholder="you@example.com"
        className="flex-1 rounded-full border border-[var(--border)] bg-[var(--background)] px-4 py-2.5 text-sm text-[var(--foreground)] placeholder:text-[var(--muted)] focus:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)]"
      />
      <button
        type="submit"
        className="rounded-full bg-[var(--accent)] px-5 py-2.5 text-sm font-semibold text-[var(--accent-fg)] transition hover:bg-[var(--accent-hover)]"
      >
        Subscribe
      </button>
    </form>
  );
}
