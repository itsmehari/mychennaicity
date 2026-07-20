import Link from "next/link";
import type { ReactNode } from "react";
import { AdvertisePanel } from "@/components/ads";
import {
  interiorMainClassName,
  PageBreadcrumbs,
  type BreadcrumbItem,
} from "@/components/site/interior-chrome";

export function CivicToolPageShell({
  eyebrow,
  title,
  description,
  breadcrumbs,
  children,
  showAdvertise = true,
}: {
  eyebrow: string;
  title: string;
  description: string;
  breadcrumbs: BreadcrumbItem[];
  children: ReactNode;
  /** Local advertising panel below the tool (default on). */
  showAdvertise?: boolean;
}) {
  return (
    <div className={interiorMainClassName}>
      <PageBreadcrumbs items={breadcrumbs} />
      <p className="type-eyebrow text-[var(--accent)]">{eyebrow}</p>
      <h1 className="type-display mt-2 text-3xl text-[var(--foreground)] sm:text-4xl">
        {title}
      </h1>
      <p className="type-lede mt-3 max-w-3xl text-sm leading-relaxed text-[var(--muted)] sm:text-base">
        {description}
      </p>
      <div className="mt-8">{children}</div>
      {showAdvertise ? (
        <AdvertisePanel
          variant="civic"
          layout="section"
          className="mt-10"
          source="civic_tools_page"
        />
      ) : null}
      <p className="mt-10 text-center text-xs text-[var(--muted)]">
        <Link href="/civic-tools" className="text-[var(--accent)] hover:underline">
          ← All civic tools
        </Link>
      </p>
    </div>
  );
}
