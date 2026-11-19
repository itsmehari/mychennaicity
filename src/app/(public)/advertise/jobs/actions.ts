"use server";

import { headers } from "next/headers";
import { and, eq } from "drizzle-orm";
import { getDb } from "@/db/client";
import { cities, employers, jobPostings } from "@/db/schema/tables";
import { clientIpFromHeaders } from "@/lib/analytics-ip-exclusion";
import { rateLimitConsume } from "@/lib/rate-limit";

export type JobDraftState = {
  ok: boolean;
  message: string;
};

function stripTags(value: string): string {
  return value.replace(/<[^>]*>/g, "").trim();
}

function slugify(input: string): string {
  const base = input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 60);
  return base || "chennai-job";
}

function applyChannel(url: string, email: string, phone: string): string | null {
  if (url) return url;
  if (email) return `mailto:${email}`;
  const digits = phone.replace(/\D/g, "");
  if (digits.length >= 10) return `tel:+${digits.length === 10 ? `91${digits}` : digits}`;
  return null;
}

export async function submitEmployerJobDraft(
  _prev: JobDraftState | null,
  formData: FormData,
): Promise<JobDraftState> {
  if (stripTags(String(formData.get("company") ?? ""))) {
    return { ok: true, message: "Received. An editor will review it before it goes public." };
  }
  if (String(formData.get("consent") ?? "") !== "on") {
    return { ok: false, message: "Confirm that you can advertise this vacancy." };
  }

  const employerName = stripTags(String(formData.get("employerName") ?? ""));
  const contactName = stripTags(String(formData.get("contactName") ?? ""));
  const email = stripTags(String(formData.get("email") ?? ""));
  const phone = stripTags(String(formData.get("phone") ?? ""));
  const title = stripTags(String(formData.get("title") ?? ""));
  const locationLabel = stripTags(String(formData.get("locationLabel") ?? ""));
  const description = stripTags(String(formData.get("description") ?? ""));
  const qualifications = stripTags(String(formData.get("qualifications") ?? ""));
  const applyUrl = stripTags(String(formData.get("applyUrl") ?? ""));
  const employmentType = stripTags(String(formData.get("employmentType") ?? ""));
  const remotePolicy = stripTags(String(formData.get("remotePolicy") ?? "onsite"));
  const salaryUnitRaw = stripTags(String(formData.get("salaryUnit") ?? ""));
  const disclose = String(formData.get("salaryDisclosed") ?? "") === "on";
  const salaryMin = Number.parseInt(String(formData.get("salaryMin") ?? ""), 10);
  const salaryMax = Number.parseInt(String(formData.get("salaryMax") ?? ""), 10);
  const openings = Number.parseInt(String(formData.get("openingsCount") ?? ""), 10);
  const validRaw = stripTags(String(formData.get("validThrough") ?? ""));

  if (employerName.length < 2 || title.length < 4 || locationLabel.length < 3) {
    return { ok: false, message: "Add the employer, the role title, and the Chennai location." };
  }
  if (description.length < 40) {
    return { ok: false, message: "Describe the role in at least 40 characters." };
  }
  if (applyUrl && !/^https?:\/\//i.test(applyUrl)) {
    return { ok: false, message: "The apply link must start with http:// or https://." };
  }
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, message: "That email address does not look usable." };
  }
  const applicationUrl = applyChannel(applyUrl, email, phone);
  if (!applicationUrl) {
    return {
      ok: false,
      message: "Add an apply link, an email, or a phone number candidates can use.",
    };
  }

  const headerList = await headers();
  const ip = clientIpFromHeaders(headerList) ?? "unknown";
  const limit = rateLimitConsume(`job-draft:${ip}`, 5, 60 * 60 * 1000);
  if (!limit.ok) {
    return {
      ok: false,
      message: `Too many submissions from this network. Try again in ${limit.retryAfterSec} seconds.`,
    };
  }

  const salaryUnit = salaryUnitRaw === "MONTH" || salaryUnitRaw === "YEAR" ? salaryUnitRaw : null;
  const salaryOk =
    disclose &&
    Number.isFinite(salaryMin) &&
    Number.isFinite(salaryMax) &&
    salaryMin >= 0 &&
    salaryMax >= salaryMin;
  let validThrough: Date | null = null;
  if (validRaw) {
    const iso = validRaw.length === 16 ? `${validRaw}+05:30` : validRaw;
    const parsed = new Date(iso);
    if (Number.isNaN(parsed.getTime())) {
      return { ok: false, message: "The closing date could not be read." };
    }
    validThrough = parsed;
  }

  const db = getDb();
  const [city] = await db
    .select({ id: cities.id })
    .from(cities)
    .where(eq(cities.slug, "chennai"))
    .limit(1);
  if (!city) return { ok: false, message: "The jobs desk is unavailable. Use WhatsApp instead." };

  const employerSlug = slugify(employerName);
  const [existingEmployer] = await db
    .select({ id: employers.id })
    .from(employers)
    .where(eq(employers.slug, employerSlug))
    .limit(1);
  let employerId = existingEmployer?.id;
  if (!employerId) {
    const [created] = await db
      .insert(employers)
      .values({
        name: employerName,
        slug: employerSlug,
        verified: false,
      })
      .returning({ id: employers.id });
    employerId = created.id;
  }

  let slug = slugify(title);
  const [clash] = await db
    .select({ id: jobPostings.id })
    .from(jobPostings)
    .where(and(eq(jobPostings.cityId, city.id), eq(jobPostings.slug, slug)))
    .limit(1);
  if (clash) slug = `${slug}-${Date.now().toString(36)}`;

  const workMode = ["onsite", "hybrid", "remote"].includes(remotePolicy)
    ? remotePolicy
    : "onsite";
  const employment =
    ["FULL_TIME", "PART_TIME", "CONTRACTOR", "INTERN"].includes(employmentType)
      ? employmentType
      : null;
  const body = [
    description,
    qualifications ? `\n\n**Qualifications:** ${qualifications}` : "",
    contactName ? `\n\n**Contact person:** ${contactName}` : "",
    email ? `\n\n**Employer email:** ${email}` : "",
    phone ? `\n\n**Employer phone:** ${phone}` : "",
    "\n\n_Submitted via /advertise/jobs — draft until an editor publishes it._",
  ].join("");

  await db.insert(jobPostings).values({
    employerId,
    cityId: city.id,
    slug,
    title,
    body,
    locationLabel,
    salaryMin: salaryOk ? salaryMin : null,
    salaryMax: salaryOk ? salaryMax : null,
    salaryDisclosed: salaryOk,
    salaryUnit: salaryOk ? salaryUnit : null,
    remotePolicy: workMode,
    openingsCount: Number.isFinite(openings) && openings > 0 ? openings : 1,
    status: "draft",
    validThrough,
    publishedAt: null,
    applicationUrl,
    employmentType: employment,
    schemaEligible: true,
  });

  return {
    ok: true,
    message:
      "Received as a draft. It will not appear on the public board until an editor checks it. WhatsApp is still available if you need to send a poster.",
  };
}
