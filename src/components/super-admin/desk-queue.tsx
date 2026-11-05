import Link from "next/link";
import type { ReactNode } from "react";

export function DeskNotice({
  notice,
  error,
}: {
  notice: string | null;
  error: string | null;
}) {
  return (
    <>
      {notice ? (
        <p className="rounded-lg border border-emerald-300 bg-emerald-50 px-3 py-2 text-sm text-emerald-950">
          {notice}
        </p>
      ) : null}
      {error ? (
        <p className="rounded-lg border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-900">
          {error}
        </p>
      ) : null}
    </>
  );
}

export function DeskSegments({
  items,
}: {
  items: { href: string; label: string; count: number; active: boolean }[];
}) {
  return (
    <nav className="flex flex-wrap gap-2 text-sm">
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={
            item.active
              ? "rounded-full bg-zinc-900 px-3 py-1 text-white dark:bg-zinc-100 dark:text-zinc-900"
              : "rounded-full border border-zinc-300 bg-white px-3 py-1 dark:border-zinc-700 dark:bg-zinc-900"
          }
        >
          {item.label} ({item.count})
        </Link>
      ))}
    </nav>
  );
}

export function DeskLookup({
  action,
  status,
  q,
  placeholder,
  rangeLabel,
}: {
  action: string;
  status?: string;
  q: string;
  placeholder: string;
  rangeLabel: string;
}) {
  return (
    <form className="flex flex-wrap items-center gap-2" method="get" action={action}>
      {status ? <input type="hidden" name="status" value={status} /> : null}
      <input
        name="q"
        defaultValue={q}
        placeholder={placeholder}
        className="min-w-64 flex-1 rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-900"
      />
      <button
        type="submit"
        className="cursor-pointer rounded-lg bg-zinc-900 px-3 py-2 text-sm text-white dark:bg-zinc-100 dark:text-zinc-900"
      >
        Lookup
      </button>
      <p className="text-xs text-zinc-600 dark:text-zinc-400">{rangeLabel}</p>
    </form>
  );
}

export function DeskPager({
  page,
  pageCount,
  prevHref,
  nextHref,
}: {
  page: number;
  pageCount: number;
  prevHref: string | null;
  nextHref: string | null;
}) {
  if (pageCount <= 1) return null;
  return (
    <nav className="flex flex-wrap items-center gap-3 text-sm">
      {prevHref ? (
        <Link href={prevHref} className="underline">
          Previous
        </Link>
      ) : (
        <span className="text-zinc-400">Previous</span>
      )}
      <span>
        Page {page} of {pageCount}
      </span>
      {nextHref ? (
        <Link href={nextHref} className="underline">
          Next
        </Link>
      ) : (
        <span className="text-zinc-400">Next</span>
      )}
    </nav>
  );
}

/** Summary stays clickable. Actions sit beside it so they are not inside the disclosure. */
export function DeskDisclosure({
  summary,
  children,
  actions,
}: {
  summary: ReactNode;
  children?: ReactNode;
  actions?: ReactNode;
}) {
  return (
    <li className="rounded-lg border border-zinc-200 bg-white text-sm dark:border-zinc-800 dark:bg-zinc-900">
      <div className="flex flex-col gap-2 p-2 sm:flex-row sm:items-start">
        <details className="min-w-0 flex-1">
          <summary className="cursor-pointer list-none overflow-hidden [&::-webkit-details-marker]:hidden">
            {summary}
          </summary>
          {children ? (
            <div className="border-t border-zinc-200 px-1 py-3 text-xs dark:border-zinc-800">
              {children}
            </div>
          ) : null}
        </details>
        {actions ? (
          <div className="relative z-10 flex shrink-0 flex-wrap gap-1.5 sm:justify-end">{actions}</div>
        ) : null}
      </div>
    </li>
  );
}
