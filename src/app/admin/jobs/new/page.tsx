import Link from "next/link";
import { auth } from "@/auth";
import { createJob } from "@/app/admin/jobs/actions";
import { JobAdminForm } from "@/app/admin/jobs/job-form";
import { listEmployersForAdmin } from "@/domains/jobs";

export const dynamic = "force-dynamic";

export default async function AdminNewJobPage() {
  const session = await auth();
  if (!session?.user) {
    return (
      <p className="text-sm">
        <Link href="/api/auth/signin" className="underline">
          Sign in
        </Link>{" "}
        to create a job.
      </p>
    );
  }

  let employers: Awaited<ReturnType<typeof listEmployersForAdmin>> = [];
  try {
    employers = await listEmployersForAdmin();
  } catch (err) {
    return (
      <p className="text-sm text-red-700">
        Could not load employers:{" "}
        {err instanceof Error ? err.message : "db error"}
      </p>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-baseline justify-between gap-3">
        <h1 className="text-lg font-semibold">New job</h1>
        <Link href="/admin/jobs" className="text-sm underline">
          Back to jobs
        </Link>
      </div>
      <JobAdminForm
        action={createJob}
        employers={employers}
        defaultStatus="draft"
      />
    </div>
  );
}
