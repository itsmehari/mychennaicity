import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { SuperAdminShell } from "@/components/super-admin/shell";
import { readSuperAdminEmail } from "@/lib/super-admin/require";
import { fullSiteTitle } from "@/lib/seo/site-titles";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: fullSiteTitle("Super admin") },
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function SuperAdminLayout({ children }: { children: React.ReactNode }) {
  const email = await readSuperAdminEmail();
  const path = (await headers()).get("x-mcc-path") ?? "";
  if (!email) {
    if (path.startsWith("/super-admin/") || path.startsWith("/admin")) {
      redirect("/super-admin");
    }
    return (
      <div className="min-h-screen bg-zinc-100 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
        {children}
      </div>
    );
  }
  return <SuperAdminShell email={email}>{children}</SuperAdminShell>;
}
