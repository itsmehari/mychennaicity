"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

type Item = {
  href: string;
  label: string;
  group: "Measure" | "Publish";
  active: (pathname: string, desk: string) => boolean;
};

const items: Item[] = [
  {
    href: "/super-admin",
    label: "Overview",
    group: "Measure",
    active: (pathname, desk) => pathname === "/super-admin" && desk === "overview",
  },
  {
    href: "/super-admin?desk=news",
    label: "News",
    group: "Measure",
    active: (pathname, desk) =>
      (pathname === "/super-admin" && desk === "news") || pathname.startsWith("/super-admin/news/"),
  },
  {
    href: "/super-admin?desk=jobs",
    label: "Job views",
    group: "Measure",
    active: (pathname, desk) =>
      (pathname === "/super-admin" && desk === "jobs") ||
      pathname.startsWith("/super-admin/job/") ||
      pathname.startsWith("/super-admin/job-seeker/"),
  },
  {
    href: "/super-admin?desk=events",
    label: "Events",
    group: "Measure",
    active: (pathname, desk) =>
      (pathname === "/super-admin" && desk === "events") ||
      pathname.startsWith("/super-admin/event/"),
  },
  {
    href: "/super-admin?desk=classifieds",
    label: "Classified views",
    group: "Measure",
    active: (pathname, desk) =>
      (pathname === "/super-admin" && desk === "classifieds") ||
      pathname.startsWith("/super-admin/classified/"),
  },
  {
    href: "/super-admin?desk=banners",
    label: "Banner ads",
    group: "Measure",
    active: (pathname, desk) =>
      (pathname === "/super-admin" && desk === "banners") ||
      pathname.startsWith("/super-admin/banner/"),
  },
  {
    href: "/super-admin/articles",
    label: "Articles",
    group: "Publish",
    active: (pathname) =>
      pathname === "/super-admin/articles" || pathname.startsWith("/super-admin/articles/"),
  },
  {
    href: "/super-admin/jobs",
    label: "Job listings",
    group: "Publish",
    active: (pathname) =>
      pathname === "/super-admin/jobs" || pathname.startsWith("/super-admin/jobs/"),
  },
  {
    href: "/super-admin/events",
    label: "Event listings",
    group: "Publish",
    active: (pathname) =>
      pathname === "/super-admin/events" || pathname.startsWith("/super-admin/events/"),
  },
  {
    href: "/super-admin/classifieds",
    label: "Classifieds",
    group: "Publish",
    active: (pathname) =>
      pathname === "/super-admin/classifieds" || pathname.startsWith("/super-admin/classifieds/"),
  },
  {
    href: "/super-admin/whatsapp-join-requests",
    label: "WhatsApp queue",
    group: "Publish",
    active: (pathname) => pathname.startsWith("/super-admin/whatsapp-join-requests"),
  },
  {
    href: "/super-admin/classified-phone-reveals",
    label: "Contact requests",
    group: "Publish",
    active: (pathname) => pathname.startsWith("/super-admin/classified-phone-reveals"),
  },
  {
    href: "/super-admin/job-call-requests",
    label: "Job call requests",
    group: "Publish",
    active: (pathname) => pathname.startsWith("/super-admin/job-call-requests"),
  },
];

function linkClass(on: boolean, compact: boolean): string {
  const shape = compact ? "shrink-0 rounded-full px-3 py-1 text-sm" : "rounded-lg px-3 py-2 text-sm";
  return on
    ? `${shape} bg-zinc-900 font-medium text-white dark:bg-zinc-100 dark:text-zinc-900`
    : `${shape} text-zinc-700 hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-800`;
}

export function SuperAdminNav({ compact = false }: { compact?: boolean }) {
  const pathname = usePathname();
  const desk = useSearchParams().get("desk") ?? "overview";
  const groups = compact ? (["Measure", "Publish"] as const) : (["Measure", "Publish"] as const);

  if (compact) {
    return (
      <div className="flex gap-4">
        {groups.map((group) => (
          <div key={group} className="flex items-center gap-1.5">
            <span className="pr-1 text-[10px] font-semibold uppercase tracking-wide text-zinc-400">
              {group}
            </span>
            {items
              .filter((item) => item.group === group)
              .map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={item.active(pathname, desk) ? "page" : undefined}
                  className={linkClass(item.active(pathname, desk), true)}
                >
                  {item.label}
                </Link>
              ))}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5">
      {groups.map((group) => (
        <div key={group}>
          <p className="px-3 text-[11px] font-semibold uppercase tracking-wide text-zinc-400">
            {group}
          </p>
          <div className="mt-1 flex flex-col gap-0.5">
            {items
              .filter((item) => item.group === group)
              .map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={item.active(pathname, desk) ? "page" : undefined}
                  className={linkClass(item.active(pathname, desk), false)}
                >
                  {item.label}
                </Link>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}
