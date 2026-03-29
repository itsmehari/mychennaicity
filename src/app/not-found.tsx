import type { Metadata } from "next";
import Link from "next/link";
import { AlertBar } from "@/components/site/alert-bar";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <>
      <AlertBar />
      <SiteHeader />
      <main className="flex-1">
        <div className="mx-auto max-w-[720px] px-4 py-20 sm:px-6 lg:px-8">
          <p className="type-eyebrow text-[var(--accent)]">404</p>
          <h1 className="type-display mt-2 text-3xl text-[var(--foreground)] sm:text-4xl">
            This page isn&apos;t here
          </h1>
          <p className="type-lede mt-4 text-sm leading-relaxed text-[var(--muted)]">
            The URL may have changed or the story may have moved. Try the news
            news section, the area map on the home page, or a topic below.
          </p>
          <ul className="mt-10 space-y-3 text-sm font-medium">
            <li>
              <Link
                href="/chennai-local-news"
                className="text-[var(--accent)] underline-offset-4 hover:underline"
              >
                Chennai local news
              </Link>
            </li>
            <li>
              <Link
                href="/#areas"
                className="text-[var(--accent)] underline-offset-4 hover:underline"
              >
                Interactive area map (home)
              </Link>
            </li>
            <li>
              <Link
                href="/chennai-jobs"
                className="text-[var(--accent)] underline-offset-4 hover:underline"
              >
                Jobs
              </Link>
            </li>
            <li>
              <Link
                href="/directory"
                className="text-[var(--accent)] underline-offset-4 hover:underline"
              >
                Directory
              </Link>
            </li>
            <li>
              <Link
                href="/"
                className="text-[var(--accent)] underline-offset-4 hover:underline"
              >
                Home
              </Link>
            </li>
          </ul>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
