import Link from "next/link";
import { notFound } from "next/navigation";
import { auth } from "@/auth";
import { updateJob } from "@/app/admin/jobs/actions";
import { JobAdminForm } from "@/app/admin/jobs/job-form";
import { getAdminJobById, listEmployersForAdmin } from "@/domains/jobs";

export const dynamic = "force-dynamic";

export default async function AdminEditJobPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth();
  if (!session?.user) {
    return (
      <p className="text-sm">
        <Link href="/api/auth/signin" className="underline">
          Sign in
        </Link>{" "}
        to edit jobs.
      </p>
    );
  }

  const { id } = await params;
  let row: Awaited<ReturnType<typeof getAdminJobById>> = null;
  let employers: Awaited<ReturnType<typeof listEmployersForAdmin>> = [];
  try {
    [row, employers] = await Promise.all([
      getAdminJobById(id),
      listEmployersForAdmin(),
    ]);
  } catch (err) {
    return (
      <p className="text-sm text-red-700">
        Could not load job: {err instanceof Error ? err.message : "db error"}
      </p>
    );
  }
  if (!row) notFound();

  return (
    <div className="space-y-4">
      <div className="flex items-baseline justify-between gap-3">
        <h1 className="text-lg font-semibold">Edit job</h1>
        <Link href="/admin/jobs" className="text-sm underline">
          Back to jobs
        </Link>
      </div>
      <p className="text-xs text-zinc-600 dark:text-zinc-400">
        Slug: {row.job.slug} · employer: {row.employer.name}
      </p>
      <JobAdminForm
        action={updateJob}
        job={row.job}
        employers={employers}
      />
    </div>
  );
}
