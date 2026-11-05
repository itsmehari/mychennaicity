import Link from "next/link";
import { notFound } from "next/navigation";
import { updateJob } from "@/app/admin/jobs/actions";
import { JobAdminForm } from "@/app/admin/jobs/job-form";
import { DeskPageHeader, deskGhostButton } from "@/components/super-admin/desk-ui";
import { getAdminJobById, listEmployersForAdmin } from "@/domains/jobs";

export const dynamic = "force-dynamic";

export default async function AdminEditJobPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  let row: Awaited<ReturnType<typeof getAdminJobById>> = null;
  let employers: Awaited<ReturnType<typeof listEmployersForAdmin>> = [];
  try {
    [row, employers] = await Promise.all([getAdminJobById(id), listEmployersForAdmin()]);
  } catch (err) {
    return (
      <p className="p-4 text-sm text-red-700">
        Could not load job: {err instanceof Error ? err.message : "db error"}
      </p>
    );
  }
  if (!row) notFound();

  return (
    <div className="mx-auto w-full max-w-6xl space-y-4 px-4 py-6">
      <DeskPageHeader
        title="Edit job"
        lede={`Slug: ${row.job.slug} · employer: ${row.employer.name}`}
        actions={
          <Link href="/super-admin/jobs" className={deskGhostButton}>
            Back to jobs
          </Link>
        }
      />
      <div className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <JobAdminForm action={updateJob} job={row.job} employers={employers} />
      </div>
    </div>
  );
}
