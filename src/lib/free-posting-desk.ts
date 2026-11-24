/**
 * Server-only. Builds wa.me links for free posting.
 * Import from server components and tests, not from client components.
 */

import {
  FREE_POST_KINDS,
  type FreePostKind,
  freePostStarter,
} from "@/content/free-posting";
import { buildWaMeRedirectUrl } from "@/lib/whatsapp-server";

export function buildFreePostHref(kind: FreePostKind): string | null {
  return buildWaMeRedirectUrl(freePostStarter(kind));
}

export function buildFreePostHrefs(): Record<FreePostKind, string | null> {
  const hrefs = {} as Record<FreePostKind, string | null>;
  for (const kind of FREE_POST_KINDS) {
    hrefs[kind] = buildFreePostHref(kind);
  }
  return hrefs;
}
