import type { Metadata } from "next";
import { fullSiteTitle } from "@/lib/seo/site-titles";

export const metadata: Metadata = {
  title: { absolute: fullSiteTitle("Super admin") },
  robots: { index: false, follow: false },
};

export default function SuperAdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-full bg-zinc-100 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
      {children}
    </div>
  );
}
