export default function Home() {
  return (
    <main className="mx-auto flex max-w-3xl flex-col gap-6 px-4 py-16">
      <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
        mychennaicity.in
      </h1>
      <p className="leading-relaxed text-zinc-600 dark:text-zinc-400">
        City-scale local platform scaffold. Product and migration intelligence live in{" "}
        <code className="rounded bg-zinc-100 px-1.5 py-0.5 text-sm dark:bg-zinc-800">
          MIGRATION_ANALYSIS.md
        </code>{" "}
        and{" "}
        <code className="rounded bg-zinc-100 px-1.5 py-0.5 text-sm dark:bg-zinc-800">
          docs/
        </code>
        .
      </p>
    </main>
  );
}
