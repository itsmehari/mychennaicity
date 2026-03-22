import Link from "next/link";
import { auth } from "@/auth";
import { signOutAction } from "./actions";

export default async function AdminHome() {
  const session = await auth();

  return (
    <div className="space-y-4">
      <p className="text-sm text-zinc-600 dark:text-zinc-400">
        Admin area. See{" "}
        <span className="font-medium text-zinc-800 dark:text-zinc-200">
          docs/ADMIN_SYSTEM_PLAN.md
        </span>{" "}
        and{" "}
        <span className="font-medium text-zinc-800 dark:text-zinc-200">
          docs/DEPLOY.md
        </span>
        .
      </p>
      {session?.user ? (
        <div className="rounded-lg border border-zinc-200 bg-white p-4 text-sm dark:border-zinc-700 dark:bg-zinc-900">
          <p className="font-medium text-zinc-900 dark:text-zinc-100">
            Signed in as {session.user.email ?? session.user.name ?? "user"}
          </p>
          <p className="mt-1 text-zinc-600 dark:text-zinc-400">
            Role: {session.user.role ?? "reader"}
          </p>
          <form className="mt-3" action={signOutAction}>
            <button
              type="submit"
              className="text-sm text-zinc-700 underline dark:text-zinc-300"
            >
              Sign out
            </button>
          </form>
        </div>
      ) : (
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          <Link
            href="/api/auth/signin"
            className="font-medium text-zinc-900 underline dark:text-zinc-100"
          >
            Sign in
          </Link>{" "}
          (configure OAuth in Vercel and docs/DEPLOY.md).
        </p>
      )}
    </div>
  );
}
