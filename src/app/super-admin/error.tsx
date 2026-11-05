"use client";

export default function SuperAdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="mx-auto w-full max-w-lg px-4 py-10">
      <h1 className="text-lg font-semibold">The desk could not finish that</h1>
      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
        {error.message || "Something went wrong. Try again."}
      </p>
      <button
        type="button"
        onClick={reset}
        className="mt-4 cursor-pointer rounded-md bg-zinc-900 px-3 py-1.5 text-sm font-medium text-white dark:bg-zinc-100 dark:text-zinc-900"
      >
        Try again
      </button>
    </div>
  );
}
