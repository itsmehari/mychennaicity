"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export function SiteSearchForm({
  className = "",
  initialQuery = "",
}: {
  className?: string;
  initialQuery?: string;
}) {
  const router = useRouter();
  const [q, setQ] = useState(initialQuery);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmed = q.trim();
    if (trimmed.length < 2) return;
    router.push(`/search?q=${encodeURIComponent(trimmed)}`);
  }

  return (
    <form
      onSubmit={onSubmit}
      className={`flex items-center gap-2 ${className}`.trim()}
      role="search"
      aria-label="Search mychennaicity.in"
    >
      <label htmlFor="site-header-search" className="sr-only">
        Search news, jobs, events
      </label>
      <input
        id="site-header-search"
        name="q"
        type="search"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search Chennai…"
        minLength={2}
        className="focus-ring hidden min-h-11 w-36 rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 py-2 text-sm text-[var(--foreground)] placeholder:text-[var(--muted)] shadow-sm transition hover:border-[var(--accent)] sm:inline-block lg:w-44"
      />
      <button
        type="submit"
        className="focus-ring hidden min-h-11 rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 py-2.5 text-sm font-semibold text-[var(--foreground)] shadow-sm transition hover:border-[var(--accent)] sm:inline-flex"
      >
        Search
      </button>
      <Link
        href="/search"
        className="focus-ring inline-flex min-h-11 min-w-11 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--surface)] text-[var(--foreground)] shadow-sm transition hover:border-[var(--accent)] sm:hidden"
        aria-label="Search the site"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden
        >
          <circle cx="11" cy="11" r="7" />
          <path d="M20 20l-3.5-3.5" />
        </svg>
      </Link>
    </form>
  );
}
