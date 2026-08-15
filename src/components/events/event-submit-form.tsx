"use client";

import { useActionState } from "react";
import {
  submitChennaiEvent,
  type EventSubmitState,
} from "@/app/(public)/chennai-local-events/submit/actions";

const initial: EventSubmitState = { ok: false, message: "" };

export function EventSubmitForm() {
  const [state, action, pending] = useActionState(submitChennaiEvent, initial);

  return (
    <form action={action} className="not-prose mt-6 space-y-4">
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden
      />
      <label className="block text-xs font-semibold text-[var(--foreground)]">
        Event title
        <input
          required
          name="title"
          minLength={8}
          className="mt-1 w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm"
        />
      </label>
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="block text-xs font-semibold text-[var(--foreground)]">
          Starts (IST)
          <input
            required
            type="datetime-local"
            name="startsAt"
            className="mt-1 w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm"
          />
        </label>
        <label className="block text-xs font-semibold text-[var(--foreground)]">
          Locality
          <input
            name="locality"
            placeholder="Adyar, T Nagar…"
            className="mt-1 w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm"
          />
        </label>
      </div>
      <label className="block text-xs font-semibold text-[var(--foreground)]">
        Venue name
        <input
          name="venueName"
          className="mt-1 w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm"
        />
      </label>
      <label className="block text-xs font-semibold text-[var(--foreground)]">
        Description
        <textarea
          required
          name="description"
          minLength={40}
          rows={6}
          className="mt-1 w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm"
        />
      </label>
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="block text-xs font-semibold text-[var(--foreground)]">
          Organiser contact (phone / email)
          <input
            name="contact"
            className="mt-1 w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm"
          />
        </label>
        <label className="block text-xs font-semibold text-[var(--foreground)]">
          Tickets / RSVP URL
          <input
            name="website"
            type="url"
            className="mt-1 w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm"
          />
        </label>
      </div>
      <button
        type="submit"
        disabled={pending}
        className="rounded-lg bg-[var(--accent)] px-4 py-2 text-sm font-bold text-[var(--background)] disabled:opacity-60"
      >
        {pending ? "Sending…" : "Submit for review"}
      </button>
      {state.message ? (
        <p
          className={
            state.ok
              ? "text-sm text-[var(--foreground)]"
              : "text-sm text-red-700 dark:text-red-400"
          }
        >
          {state.message}
        </p>
      ) : null}
    </form>
  );
}
