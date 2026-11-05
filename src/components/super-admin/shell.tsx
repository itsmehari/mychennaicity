import { Suspense, type ReactNode } from "react";
import { superAdminSignOutAction } from "@/app/super-admin/actions";
import { DeskActionForm } from "./desk-action-form";
import { SuperAdminNav } from "./nav";

export function SuperAdminShell({
  email,
  children,
}: {
  email: string;
  children: ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-zinc-100 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
      <aside className="sticky top-0 hidden h-screen w-56 shrink-0 flex-col border-r border-zinc-200 bg-white px-3 py-4 dark:border-zinc-800 dark:bg-zinc-900 md:flex">
        <p className="px-3 text-sm font-semibold tracking-tight">City desk</p>
        <p className="px-3 text-xs text-zinc-500">mychennaicity.in</p>
        <div className="mt-6">
          <Suspense fallback={null}>
            <SuperAdminNav />
          </Suspense>
        </div>
      </aside>
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-20 flex items-center justify-between gap-3 border-b border-zinc-200 bg-white/95 px-4 py-3 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/95">
          <p className="text-sm font-semibold md:hidden">City desk</p>
          <p className="hidden text-sm text-zinc-500 md:block">Signed in</p>
          <div className="flex items-center gap-3">
            <p className="max-w-[14rem] truncate text-sm text-zinc-600 dark:text-zinc-300">{email}</p>
            <DeskActionForm action={superAdminSignOutAction}>
              <button
                type="submit"
                className="cursor-pointer rounded-md border border-zinc-300 px-2.5 py-1 text-xs font-medium hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-900"
              >
                Sign out
              </button>
            </DeskActionForm>
          </div>
        </header>
        <div className="overflow-x-auto border-b border-zinc-200 bg-white px-3 py-2 dark:border-zinc-800 dark:bg-zinc-950 md:hidden">
          <Suspense fallback={null}>
            <SuperAdminNav compact />
          </Suspense>
        </div>
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
}
