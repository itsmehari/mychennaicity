/** Shared editorial chrome for reach / evergreen guide pages. */

import Link from "next/link";
import {
  InteriorCrossNav,
  PageBreadcrumbs,
  interiorMainClassName,
} from "@/components/site/interior-chrome";
import { HubCommunityStrip } from "@/components/community/hub-community-strip";

type Crumb = { label: string; href?: string };

export function ReachGuideShell({
  crumbs,
  eyebrow,
  title,
  dek,
  children,
  related,
}: {
  crumbs: Crumb[];
  eyebrow: string;
  title: string;
  dek: string;
  children: React.ReactNode;
  related?: { href: string; label: string }[];
}) {
  return (
    <div className={interiorMainClassName}>
      <PageBreadcrumbs items={crumbs} />
      <header className="mt-6 max-w-3xl">
        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--accent)]">
          {eyebrow}
        </p>
        <h1 className="type-display mt-2 text-3xl font-bold tracking-tight text-[var(--foreground)] sm:text-4xl">
          {title}
        </h1>
        <p className="type-lede mt-3 text-base leading-relaxed text-[var(--muted)]">
          {dek}
        </p>
      </header>

      <HubCommunityStrip className="mt-6" />

      <article className="prose prose-sm mt-10 max-w-3xl text-[var(--muted)] prose-p:leading-relaxed prose-headings:text-[var(--foreground)] prose-strong:text-[var(--foreground)] prose-a:text-[var(--accent)]">
        {children}
      </article>

      {related && related.length > 0 ? (
        <aside className="mt-12 max-w-3xl rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5">
          <h2 className="text-sm font-bold text-[var(--foreground)]">Related on mychennaicity.in</h2>
          <ul className="mt-3 space-y-2 text-sm">
            {related.map((r) => (
              <li key={r.href}>
                <Link href={r.href} className="font-semibold text-[var(--accent)] hover:underline">
                  {r.label}
                </Link>
              </li>
            ))}
          </ul>
        </aside>
      ) : null}

      <InteriorCrossNav className="mt-14" />
    </div>
  );
}
