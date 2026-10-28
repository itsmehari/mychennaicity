"use client";

import { usePathname } from "next/navigation";
import { GoogleAdSenseScripts } from "./google-adsense-scripts";

function isPaidBusinessProfilePath(pathname: string): boolean {
  const path = pathname.split("?")[0]?.replace(/\/+$/, "") || "/";
  return path === "/business-profile" || path.startsWith("/business-profile/");
}

/** Paid listing pages stay clear of Auto ads. The script is omitted on those routes. */
export function AdSensePathGate({ clientId }: { clientId: string }) {
  const pathname = usePathname() || "/";
  if (isPaidBusinessProfilePath(pathname)) return null;
  return <GoogleAdSenseScripts clientId={clientId} />;
}
