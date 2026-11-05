"use server";

import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { getDb } from "@/db/client";
import { events } from "@/db/schema/tables";
import type { EventDeskStatus } from "@/domains/events/admin";
import { revalidateListingsSurfaces } from "@/lib/revalidate-listings-surfaces";
import { requireSuperAdmin } from "@/lib/super-admin/require";
import { withDeskFlag } from "@/lib/super-admin/desk-return";

const PATH = "/super-admin/events";

function parseStatus(raw: string): EventDeskStatus | null {
  if (raw === "draft" || raw === "scheduled" || raw === "cancelled" || raw === "completed") {
    return raw;
  }
  return null;
}

export async function setEventStatus(formData: FormData) {
  await requireSuperAdmin();
  const id = String(formData.get("id") ?? "");
  const status = parseStatus(String(formData.get("status") ?? ""));
  const returnTo = String(formData.get("returnTo") ?? "");
  if (!id || !status) throw new Error("Could not update that event.");
  const [row] = await getDb()
    .update(events)
    .set({ status, updatedAt: new Date() })
    .where(eq(events.id, id))
    .returning({ slug: events.slug });
  if (!row) throw new Error("That event is no longer in the list.");
  revalidateListingsSurfaces({ eventSlug: row.slug });
  redirect(withDeskFlag(PATH, returnTo, "notice", status));
}

export async function toggleEventFeatured(formData: FormData) {
  await requireSuperAdmin();
  const id = String(formData.get("id") ?? "");
  const featured = String(formData.get("featured") ?? "") === "true";
  const returnTo = String(formData.get("returnTo") ?? "");
  if (!id) throw new Error("Could not update that event.");
  const [row] = await getDb()
    .update(events)
    .set({ featured: !featured, updatedAt: new Date() })
    .where(eq(events.id, id))
    .returning({ slug: events.slug });
  if (!row) throw new Error("That event is no longer in the list.");
  revalidateListingsSurfaces({ eventSlug: row.slug });
  redirect(withDeskFlag(PATH, returnTo, "notice", featured ? "unfeatured" : "featured"));
}
