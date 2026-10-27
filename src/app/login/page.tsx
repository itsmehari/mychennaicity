import type { Metadata } from "next";
import { fullSiteTitle } from "@/lib/seo/site-titles";
import { loginAction } from "./actions";

export const metadata: Metadata = {
  title: { absolute: fullSiteTitle("Admin sign in") },
  robots: { index: false, follow: false },
};

function messageFor(error: string | undefined): string | null {
  if (error === "mismatch" || error === "CredentialsSignin") {
    return "Those details do not match. Try again.";
  }
  if (error === "limited") return "Too many tries. Wait a few minutes, then try again.";
  if (error === "missing") return "Sign-in is not set up on this server yet.";
  return null;
}

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string; error?: string }>;
}) {
  const params = await searchParams;
  const callbackUrl =
    params.callbackUrl?.startsWith("/admin") && !params.callbackUrl.startsWith("//")
      ? params.callbackUrl
      : "/admin";
  const message = messageFor(params.error);

  return (
    <main className="flex min-h-full flex-1 items-center justify-center bg-zinc-100 px-4 py-16 dark:bg-zinc-950">
      <form
        action={loginAction}
        className="w-full max-w-sm space-y-4 rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
      >
        <div>
          <h1 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
            Admin sign in
          </h1>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            Email and password for the mychennaicity.in dashboard.
          </p>
        </div>
        {message ? (
          <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-800 dark:bg-red-950 dark:text-red-200">
            {message}
          </p>
        ) : null}
        <input type="hidden" name="callbackUrl" value={callbackUrl} />
        <label className="block text-sm font-medium text-zinc-800 dark:text-zinc-200">
          Email
          <input
            name="email"
            type="email"
            autoComplete="username"
            required
            className="mt-1 w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-base text-zinc-900 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100"
          />
        </label>
        <label className="block text-sm font-medium text-zinc-800 dark:text-zinc-200">
          Password
          <input
            name="password"
            type="password"
            autoComplete="current-password"
            required
            className="mt-1 w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-base text-zinc-900 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100"
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
