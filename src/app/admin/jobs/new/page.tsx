import Link from "next/link";
import { createJob } from "@/app/admin/jobs/actions";
import { JobAdminForm } from "@/app/admin/jobs/job-form";
import { DeskPageHeader, deskGhostButton } from "@/components/super-admin/desk-ui";
import { listEmployersForAdmin } from "@/domains/jobs";

export const dynamic = "force-dynamic";

export default async function AdminNewJobPage() {

  let employers: Awaited<ReturnType<typeof listEmployersForAdmin>> = [];
  try {
    employers = await listEmployersForAdmin();
  } catch (err) {
    return (
      <p className="p-4 text-sm text-red-700">
        Could not load employers: {err instanceof Error ? err.message : "db error"}
      </p>
    );
  }

  return (
    <div className="mx-auto w-full max-w-6xl space-y-4 px-4 py-6">
      <DeskPageHeader
        title="New job"
        actions={
          <Link href="/super-admin/jobs" className={deskGhostButton}>
            Back to jobs
          </Link>
        }
      />
      <div className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <JobAdminForm action={createJob} employers={employers} defaultStatus="draft" />
      </div>
    </div>
  );
}
