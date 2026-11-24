import type { ReactNode } from "react";
import { FreePostHandoff } from "@/components/free-posting/free-post-handoff";
import type { FreePostKind } from "@/content/free-posting";
import { viewerMayUseListingForm } from "@/lib/free-posting-access";

export async function PublicPostGate({
  kind,
  locale = "en",
  children,
}: {
  kind: FreePostKind;
  locale?: "en" | "ta";
  children: ReactNode;
}) {
  if (await viewerMayUseListingForm()) return children;
  return <FreePostHandoff kind={kind} locale={locale} />;
}
