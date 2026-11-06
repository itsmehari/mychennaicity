import type { ReactNode } from "react";

export const deskGhostButton =
  "inline-flex items-center rounded-md border border-zinc-300 bg-white px-2.5 py-1 text-xs font-medium text-zinc-800 hover:bg-zinc-50 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800";

export const deskSolidButton =
  "inline-flex items-center rounded-md bg-zinc-900 px-3 py-1.5 text-xs font-medium text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white";

export function DeskPageHeader({
  title,
  lede,
  actions,
}: {
  title: string;
  lede?: string;
  actions?: ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-3">
      <div className="min-w-0">
        <h1 className="text-xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
          {title}
        </h1>
        {lede ? (
          <p className="mt-1 max-w-3xl text-sm leading-6 text-zinc-600 dark:text-zinc-400">
            {lede}
          </p>
        ) : null}
      </div>
      {actions ? <div className="flex flex-wrap items-center gap-2">{actions}</div> : null}
    </div>
  );
}

export function DeskTable({ children }: { children: ReactNode }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      {children}
    </div>
  );
}

export function statusPill(status: string): string {
  const base = "inline-flex rounded-full px-2 py-0.5 text-xs font-medium capitalize";
  if (
    status === "published" ||
    status === "open" ||
    status === "approved" ||
    status === "scheduled"
  ) {
    return `${base} bg-emerald-50 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200`;
  }
  if (
    status === "closed" ||
    status === "declined" ||
    status === "spam" ||
    status === "archived" ||
    status === "cancelled" ||
    status === "completed" ||
    status === "expired"
  ) {
    return `${base} bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300`;
  }
  return `${base} bg-amber-50 text-amber-900 dark:bg-amber-950 dark:text-amber-100`;
}
