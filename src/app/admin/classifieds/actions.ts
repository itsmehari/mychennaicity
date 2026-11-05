"use server";

import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { getDb } from "@/db/client";
import { classifiedListings, classifiedPhoneReveals } from "@/db/schema/tables";
import type { ClassifiedDeskStatus } from "@/domains/classifieds/admin";
import { revalidateListingsSurfaces } from "@/lib/revalidate-listings-surfaces";
import { requireSuperAdmin } from "@/lib/super-admin/require";
import { withDeskFlag } from "@/lib/super-admin/desk-return";

const LISTINGS = "/super-admin/classifieds";
const CONTACTS = "/super-admin/classified-phone-reveals";

function parseStatus(raw: string): ClassifiedDeskStatus | null {
  if (raw === "draft" || raw === "open" || raw === "closed") return raw;
  return null;
}

export async function setClassifiedStatus(formData: FormData) {
  await requireSuperAdmin();
  const id = String(formData.get("id") ?? "");
  const status = parseStatus(String(formData.get("status") ?? ""));
  const returnTo = String(formData.get("returnTo") ?? "");
  if (!id || !status) throw new Error("Could not update that classified.");
  const db = getDb();
  const [current] = await db
    .select({
      slug: classifiedListings.slug,
      publishedAt: classifiedListings.publishedAt,
    })
    .from(classifiedListings)
    .where(eq(classifiedListings.id, id))
    .limit(1);
  if (!current) throw new Error("That classified is no longer in the list.");
  const now = new Date();
  await db
    .update(classifiedListings)
    .set({
      status,
      publishedAt: status === "open" ? (current.publishedAt ?? now) : current.publishedAt,
      updatedAt: now,
    })
    .where(eq(classifiedListings.id, id));
  revalidateListingsSurfaces({ classifiedSlug: current.slug });
  redirect(withDeskFlag(LISTINGS, returnTo, "notice", status));
}

export async function toggleClassifiedFeatured(formData: FormData) {
  await requireSuperAdmin();
  const id = String(formData.get("id") ?? "");
  const featured = String(formData.get("featured") ?? "") === "true";
  const returnTo = String(formData.get("returnTo") ?? "");
  if (!id) throw new Error("Could not update that classified.");
  const [row] = await getDb()
    .update(classifiedListings)
    .set({ featured: !featured, updatedAt: new Date() })
    .where(eq(classifiedListings.id, id))
    .returning({ slug: classifiedListings.slug });
  if (!row) throw new Error("That classified is no longer in the list.");
  revalidateListingsSurfaces({ classifiedSlug: row.slug });
  redirect(withDeskFlag(LISTINGS, returnTo, "notice", featured ? "unfeatured" : "featured"));
}

export async function setContactFollowed(formData: FormData) {
  await requireSuperAdmin();
  const id = String(formData.get("id") ?? "");
  const clear = String(formData.get("clear") ?? "") === "true";
  const returnTo = String(formData.get("returnTo") ?? "");
  if (!id) throw new Error("Could not update that request.");
  const [row] = await getDb()
    .update(classifiedPhoneReveals)
    .set({ followedUpAt: clear ? null : new Date() })
    .where(eq(classifiedPhoneReveals.id, id))
    .returning({ id: classifiedPhoneReveals.id });
  if (!row) throw new Error("That request is no longer in the list.");
  redirect(withDeskFlag(CONTACTS, returnTo, "notice", clear ? "cleared" : "followed"));
}
