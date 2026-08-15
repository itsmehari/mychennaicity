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
    <div className={`flex items-center ${className}`.trim()}>
      <form
        onSubmit={onSubmit}
        className="relative hidden lg:block"
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
          className="focus-ring min-h-11 w-40 rounded-full border border-[var(--border)] bg-[var(--surface)] py-2 pl-4 pr-11 text-sm text-[var(--foreground)] placeholder:text-[var(--muted)] shadow-sm transition hover:border-[var(--accent)] xl:w-52"
        />
        <button
          type="submit"
          className="focus-ring absolute right-1 top-1/2 inline-flex h-9 w-9 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full text-[var(--muted)] transition hover:bg-[color-mix(in_srgb,var(--accent)_10%,transparent)] hover:text-[var(--accent)]"
          aria-label="Search"
        >
          <SearchIcon />
        </button>
      </form>
      <Link
        href="/search"
        className="focus-ring inline-flex min-h-11 min-w-11 cursor-pointer items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--surface)] text-[var(--foreground)] shadow-sm transition hover:border-[var(--accent)] lg:hidden"
        aria-label="Search the site"
      >
        <SearchIcon />
      </Link>
    </div>
  );
}

function SearchIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden
    >
      <circle cx="11" cy="11" r="7" />
      <path d="M20 20l-3.5-3.5" />
    </svg>
  );
}
