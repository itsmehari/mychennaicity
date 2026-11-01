import type { Metadata } from "next";
import { cookies } from "next/headers";
import { SuperAdminDashboard } from "@/components/super-admin/dashboard-view";
import {
  loadSuperAdminSnapshot,
  parseDesk,
  type SuperAdminSnapshot,
} from "@/domains/analytics/super-admin-catalog";
import { fullSiteTitle } from "@/lib/seo/site-titles";
import { superAdminLoginAction } from "./actions";
import { readSuperAdminSession, SUPER_ADMIN_COOKIE } from "@/lib/super-admin/session";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: { absolute: fullSiteTitle("Super admin") },
  robots: { index: false, follow: false },
};

function messageFor(error: string | undefined): string | null {
  if (error === "mismatch") return "Those details do not match. Try again.";
  if (error === "limited") return "Too many tries. Wait a few minutes, then try again.";
  if (error === "config") return "Sign-in is not configured. AUTH_SECRET is missing on this server.";
  return null;
}

function LoginForm({ message }: { message: string | null }) {
  return (
    <main className="flex min-h-full flex-1 items-center justify-center px-4 py-16">
      <form
        action={superAdminLoginAction}
        className="w-full max-w-sm space-y-4 rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
      >
        <div>
          <h1 className="text-lg font-semibold">Super admin</h1>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            Sign in to see page views and call or WhatsApp clicks.
          </p>
        </div>
        {message ? (
          <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-800 dark:bg-red-950 dark:text-red-200">
            {message}
          </p>
        ) : null}
        <label className="block text-sm font-medium">
          Email
          <input
            name="email"
            type="email"
            autoComplete="username"
            required
            className="mt-1 w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-base dark:border-zinc-700 dark:bg-zinc-950"
          />
        </label>
        <label className="block text-sm font-medium">
          Password
          <input
            name="password"
            type="password"
            autoComplete="current-password"
            required
            className="mt-1 w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-base dark:border-zinc-700 dark:bg-zinc-950"
          />
        </label>
        <button
          type="submit"
          className="w-full rounded-md bg-zinc-900 px-3 py-2 text-sm font-medium text-white dark:bg-zinc-100 dark:text-zinc-900"
        >
          Sign in
        </button>
      </form>
    </main>
  );
}

export default async function SuperAdminPage({
  searchParams,
}: {
  searchParams: Promise<{ desk?: string; q?: string; error?: string }>;
}) {
  const params = await searchParams;
  const jar = await cookies();
  const session = readSuperAdminSession(jar.get(SUPER_ADMIN_COOKIE)?.value);
  if (!session) return <LoginForm message={messageFor(params.error)} />;

  let snapshot: SuperAdminSnapshot;
  try {
    snapshot = await loadSuperAdminSnapshot({
      desk: parseDesk(params.desk),
      query: params.q ?? "",
    });
  } catch {
    snapshot = {
      desk: parseDesk(params.desk),
      query: params.q ?? "",
      items: [],
      hidden: 0,
      totals: { posts: 0, views7d: 0, callClicks7d: 0, whatsappClicks7d: 0 },
      analyticsReady: false,
      databaseError: "Could not read the database.",
    };
  }

  return <SuperAdminDashboard email={session.email} snapshot={snapshot} />;
}
