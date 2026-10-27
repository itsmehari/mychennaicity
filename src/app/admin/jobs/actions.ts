"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { and, eq, ne } from "drizzle-orm";
import { auth } from "@/auth";
import { getDb } from "@/db/client";
import { cities, employers, jobPostings } from "@/db/schema/tables";
import { closeStaleOpenJobPostings } from "@/domains/jobs/admin";
import { CHENNAI_CITY_SLUG } from "@/domains/jobs/queries";
import { revalidateListingsSurfaces } from "@/lib/revalidate-listings-surfaces";

type JobStatus = "draft" | "open" | "closed";

async function requireAdmin() {
  const session = await auth();
  if (!session?.user) {
    throw new Error("Sign in required");
  }
}

function slugify(input: string): string {
  const slug = input
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
  return slug || "job";
}

function parseStatus(raw: string): JobStatus | null {
  if (raw === "draft" || raw === "open" || raw === "closed") return raw;
  return null;
}

function parseOptionalInt(raw: FormDataEntryValue | null): number | null {
  const s = String(raw ?? "").trim();
  if (!s) return null;
  const n = Number.parseInt(s, 10);
  return Number.isFinite(n) ? n : null;
}

function parseOptionalDate(raw: FormDataEntryValue | null): Date | null {
  const s = String(raw ?? "").trim();
  if (!s) return null;
  const d = new Date(s);
  return Number.isNaN(d.getTime()) ? null : d;
}

async function chennaiCityId(): Promise<string> {
  const db = getDb();
  const [row] = await db
    .select({ id: cities.id })
    .from(cities)
    .where(eq(cities.slug, CHENNAI_CITY_SLUG))
    .limit(1);
  if (!row) throw new Error("Chennai city row missing — seed cities first.");
  return row.id;
}

async function resolveEmployerId(formData: FormData): Promise<string> {
  const db = getDb();
  const existingId = String(formData.get("employerId") ?? "").trim();
  const newName = String(formData.get("newEmployerName") ?? "").trim();
  if (newName) {
    const newSlugRaw = String(formData.get("newEmployerSlug") ?? "").trim();
    const slug = slugify(newSlugRaw || newName);
    const websiteUrl =
      String(formData.get("newEmployerWebsite") ?? "").trim() || null;
    const [found] = await db
      .select({ id: employers.id })
      .from(employers)
      .where(eq(employers.slug, slug))
      .limit(1);
    if (found) return found.id;
    const [ins] = await db
      .insert(employers)
      .values({
        name: newName,
        slug,
        websiteUrl,
        verified: false,
      })
      .returning({ id: employers.id });
    return ins.id;
  }
  if (!existingId) {
    throw new Error("Pick an employer or enter a new employer name.");
  }
  return existingId;
}

function fieldsFromForm(formData: FormData) {
  const title = String(formData.get("title") ?? "").trim();
  const slugRaw = String(formData.get("slug") ?? "").trim();
  const body = String(formData.get("body") ?? "").trim();
  if (!title || !body) {
    throw new Error("Title and body are required.");
  }
  const salaryMin = parseOptionalInt(formData.get("salaryMin"));
  const salaryMax = parseOptionalInt(formData.get("salaryMax"));
  const salaryDisclosed = String(formData.get("salaryDisclosed") ?? "") === "on";
  const disclosed =
    salaryDisclosed && salaryMin != null && salaryMax != null;
  return {
    title,
    slug: slugify(slugRaw || title),
    body,
    locationLabel: String(formData.get("locationLabel") ?? "").trim() || null,
    salaryMin: disclosed ? salaryMin : null,
    salaryMax: disclosed ? salaryMax : null,
    salaryDisclosed: disclosed,
    remotePolicy: String(formData.get("remotePolicy") ?? "onsite").trim() || "onsite",
    openingsCount: parseOptionalInt(formData.get("openingsCount")) ?? 1,
    validThrough: parseOptionalDate(formData.get("validThrough")),
    applicationUrl: String(formData.get("applicationUrl") ?? "").trim() || null,
    employmentType:
      String(formData.get("employmentType") ?? "").trim() || null,
  };
}

function bustJobSurfaces(slug: string) {
  revalidatePath("/admin/jobs");
  revalidateListingsSurfaces({ jobSlug: slug });
}

export async function setJobStatus(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const status = parseStatus(String(formData.get("status") ?? ""));
  if (!id || !status) return;
  const db = getDb();
  const [current] = await db
    .select({ slug: jobPostings.slug, publishedAt: jobPostings.publishedAt })
    .from(jobPostings)
    .where(eq(jobPostings.id, id))
    .limit(1);
  if (!current) return;
  const now = new Date();
  await db
    .update(jobPostings)
    .set({
      status,
      publishedAt:
        status === "open" ? (current.publishedAt ?? now) : current.publishedAt,
      updatedAt: now,
    })
    .where(eq(jobPostings.id, id));
  bustJobSurfaces(current.slug);
}

export async function closeStaleJobsAction() {
  await requireAdmin();
  await closeStaleOpenJobPostings();
  revalidatePath("/admin/jobs");
  revalidateListingsSurfaces();
}

export async function createJob(formData: FormData) {
  await requireAdmin();
  const fields = fieldsFromForm(formData);
  const status = parseStatus(String(formData.get("status") ?? "draft")) ?? "draft";
  const employerId = await resolveEmployerId(formData);
  const cityId = await chennaiCityId();
  const db = getDb();
  const [clash] = await db
    .select({ id: jobPostings.id })
    .from(jobPostings)
    .where(and(eq(jobPostings.cityId, cityId), eq(jobPostings.slug, fields.slug)))
    .limit(1);
  const slug = clash ? `${fields.slug}-${Date.now().toString(36)}` : fields.slug;
  const now = new Date();
  const [ins] = await db
    .insert(jobPostings)
    .values({
      employerId,
      cityId,
      ...fields,
      slug,
      status,
      publishedAt: status === "open" ? now : null,
      updatedAt: now,
    })
    .returning({ id: jobPostings.id });
  bustJobSurfaces(slug);
  redirect(`/admin/jobs/${ins.id}`);
}

export async function updateJob(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (!id) throw new Error("Missing job id");
  const fields = fieldsFromForm(formData);
  const status = parseStatus(String(formData.get("status") ?? "draft")) ?? "draft";
  const employerId = await resolveEmployerId(formData);
  const cityId = await chennaiCityId();
  const db = getDb();
  const [current] = await db
    .select({
      slug: jobPostings.slug,
      publishedAt: jobPostings.publishedAt,
    })
    .from(jobPostings)
    .where(eq(jobPostings.id, id))
    .limit(1);
  if (!current) throw new Error("Job not found");
  const [clash] = await db
    .select({ id: jobPostings.id })
    .from(jobPostings)
    .where(
      and(
        eq(jobPostings.cityId, cityId),
        eq(jobPostings.slug, fields.slug),
        ne(jobPostings.id, id),
      ),
    )
    .limit(1);
  if (clash) {
    throw new Error(`Slug already in use: ${fields.slug}`);
  }
  const now = new Date();
  await db
    .update(jobPostings)
    .set({
      employerId,
      ...fields,
      status,
      publishedAt:
        status === "open" ? (current.publishedAt ?? now) : current.publishedAt,
      updatedAt: now,
    })
    .where(eq(jobPostings.id, id));
  bustJobSurfaces(fields.slug);
  if (current.slug !== fields.slug) {
    revalidatePath(`/chennai-jobs/${current.slug}`);
  }
  redirect(`/admin/jobs/${id}`);
}
