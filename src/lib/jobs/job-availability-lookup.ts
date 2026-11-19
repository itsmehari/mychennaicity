import { neon } from "@neondatabase/serverless";
import { classifyJobAvailability } from "@/lib/jobs/job-availability";

/** Edge-safe lookup used before a closed vacancy is served as 410. */
export async function lookupJobAvailability(
  slug: string,
): Promise<"open" | "gone" | "missing"> {
  const url = process.env.DATABASE_URL;
  if (!url) return "missing";
  try {
    const sql = neon(url);
    const rows = await sql`
      select jp.status, jp.valid_through, jp.published_at
      from job_postings jp
      inner join cities c on c.id = jp.city_id
      where c.slug = 'chennai' and jp.slug = ${slug}
      limit 1
    `;
    const row = rows[0] as
      | {
          status?: string;
          valid_through?: string | null;
          published_at?: string | null;
        }
      | undefined;
    if (!row?.status) return "missing";
    return classifyJobAvailability({
      status: row.status,
      validThrough: row.valid_through ?? null,
      publishedAt: row.published_at ?? null,
    });
  } catch (error) {
    console.error("job availability lookup", error);
    return "missing";
  }
}
