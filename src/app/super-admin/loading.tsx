export default function SuperAdminLoading() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-6" aria-hidden>
      <div className="h-7 w-40 animate-pulse rounded-md bg-zinc-200 dark:bg-zinc-800" />
      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {["a", "b", "c", "d"].map((key) => (
          <div key={key} className="h-20 animate-pulse rounded-xl bg-zinc-200 dark:bg-zinc-800" />
        ))}
      </div>
      <div className="mt-6 h-64 animate-pulse rounded-xl bg-zinc-200 dark:bg-zinc-800" />
    </div>
  );
}
