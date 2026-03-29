import Link from "next/link";

export default function ArticleNotFound() {
  return (
    <div className="mx-auto max-w-[1280px] px-4 py-20 text-center">
      <h1 className="text-2xl font-semibold text-[var(--foreground)]">
        Story not found
      </h1>
      <p className="mt-2 text-[var(--muted)]">
        We do not have a published story at this link.
      </p>
      <Link
        href="/chennai-local-news"
        className="mt-6 inline-block font-medium text-[var(--accent)]"
      >
        Front page
      </Link>
    </div>
  );
}
