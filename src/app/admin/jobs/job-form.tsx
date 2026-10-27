import type { EmployerRow, JobPostingRow } from "@/domains/jobs";

const EMPLOYMENT_TYPES = [
  "FULL_TIME",
  "PART_TIME",
  "CONTRACTOR",
  "INTERN",
] as const;

function toDatetimeLocal(value: Date | string | null | undefined): string {
  if (!value) return "";
  const d = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(d.getTime())) return "";
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export function JobAdminForm({
  action,
  job,
  employers,
  defaultStatus,
}: {
  action: (formData: FormData) => Promise<void>;
  job?: JobPostingRow;
  employers: Pick<EmployerRow, "id" | "name" | "slug">[];
  defaultStatus?: "draft" | "open" | "closed";
}) {
  const status = job?.status ?? defaultStatus ?? "draft";
  return (
    <form action={action} className="max-w-3xl space-y-4 text-sm">
      {job ? <input type="hidden" name="id" value={job.id} /> : null}

      <div className="grid gap-3 sm:grid-cols-2">
        <label className="block space-y-1">
          <span className="font-medium">Existing employer</span>
          <select
            name="employerId"
            defaultValue={job?.employerId ?? ""}
            className="w-full rounded border border-zinc-300 bg-white px-2 py-1.5 dark:border-zinc-700 dark:bg-zinc-900"
          >
            <option value="">— select —</option>
            {employers.map((e) => (
              <option key={e.id} value={e.id}>
                {e.name} ({e.slug})
              </option>
            ))}
          </select>
        </label>
        <label className="block space-y-1">
          <span className="font-medium">Or new employer name</span>
          <input
            name="newEmployerName"
            className="w-full rounded border border-zinc-300 bg-white px-2 py-1.5 dark:border-zinc-700 dark:bg-zinc-900"
            placeholder="Leave blank to use the select"
          />
        </label>
        <label className="block space-y-1">
          <span className="font-medium">New employer slug (optional)</span>
          <input
            name="newEmployerSlug"
            className="w-full rounded border border-zinc-300 bg-white px-2 py-1.5 dark:border-zinc-700 dark:bg-zinc-900"
          />
        </label>
        <label className="block space-y-1">
          <span className="font-medium">New employer website</span>
          <input
            name="newEmployerWebsite"
            type="url"
            className="w-full rounded border border-zinc-300 bg-white px-2 py-1.5 dark:border-zinc-700 dark:bg-zinc-900"
          />
        </label>
      </div>

      <label className="block space-y-1">
        <span className="font-medium">Title</span>
        <input
          name="title"
          required
          defaultValue={job?.title ?? ""}
          className="w-full rounded border border-zinc-300 bg-white px-2 py-1.5 dark:border-zinc-700 dark:bg-zinc-900"
        />
      </label>
      <label className="block space-y-1">
        <span className="font-medium">Slug</span>
        <input
          name="slug"
          defaultValue={job?.slug ?? ""}
          className="w-full rounded border border-zinc-300 bg-white px-2 py-1.5 dark:border-zinc-700 dark:bg-zinc-900"
          placeholder="auto from title if empty"
        />
      </label>
      <label className="block space-y-1">
        <span className="font-medium">Body (markdown)</span>
        <textarea
          name="body"
          required
          rows={14}
          defaultValue={job?.body ?? ""}
          className="w-full rounded border border-zinc-300 bg-white px-2 py-1.5 font-mono text-xs dark:border-zinc-700 dark:bg-zinc-900"
        />
      </label>

      <div className="grid gap-3 sm:grid-cols-2">
        <label className="block space-y-1">
          <span className="font-medium">Location label</span>
          <input
            name="locationLabel"
            defaultValue={job?.locationLabel ?? ""}
            className="w-full rounded border border-zinc-300 bg-white px-2 py-1.5 dark:border-zinc-700 dark:bg-zinc-900"
          />
        </label>
        <label className="block space-y-1">
          <span className="font-medium">Employment type</span>
          <select
            name="employmentType"
            defaultValue={job?.employmentType ?? "FULL_TIME"}
            className="w-full rounded border border-zinc-300 bg-white px-2 py-1.5 dark:border-zinc-700 dark:bg-zinc-900"
          >
            {EMPLOYMENT_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </label>
        <label className="block space-y-1">
          <span className="font-medium">Apply URL</span>
          <input
            name="applicationUrl"
            type="text"
            defaultValue={job?.applicationUrl ?? ""}
            className="w-full rounded border border-zinc-300 bg-white px-2 py-1.5 dark:border-zinc-700 dark:bg-zinc-900"
            placeholder="Official careers / form / WhatsApp link"
          />
        </label>
        <label className="block space-y-1">
          <span className="font-medium">Valid through</span>
          <input
            name="validThrough"
            type="datetime-local"
            defaultValue={toDatetimeLocal(job?.validThrough)}
            className="w-full rounded border border-zinc-300 bg-white px-2 py-1.5 dark:border-zinc-700 dark:bg-zinc-900"
          />
        </label>
        <label className="block space-y-1">
          <span className="font-medium">Openings</span>
          <input
            name="openingsCount"
            type="number"
            min={1}
            defaultValue={job?.openingsCount ?? 1}
            className="w-full rounded border border-zinc-300 bg-white px-2 py-1.5 dark:border-zinc-700 dark:bg-zinc-900"
          />
        </label>
        <label className="block space-y-1">
          <span className="font-medium">Remote policy</span>
          <select
            name="remotePolicy"
            defaultValue={job?.remotePolicy ?? "onsite"}
            className="w-full rounded border border-zinc-300 bg-white px-2 py-1.5 dark:border-zinc-700 dark:bg-zinc-900"
          >
            <option value="onsite">onsite</option>
            <option value="hybrid">hybrid</option>
            <option value="remote">remote</option>
          </select>
        </label>
      </div>

      <fieldset className="space-y-2 rounded border border-zinc-200 p-3 dark:border-zinc-700">
        <legend className="px-1 font-medium">Salary (optional)</legend>
        <p className="text-xs text-zinc-600 dark:text-zinc-400">
          Leave unchecked / empty unless the employer stated a band. Do not
          invent JobPosting salary.
        </p>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="salaryDisclosed"
            defaultChecked={Boolean(
              job?.salaryDisclosed &&
                job.salaryMin != null &&
                job.salaryMax != null,
            )}
          />
          <span>Disclose salary in markup (min and max required)</span>
        </label>
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="block space-y-1">
            <span>Min (INR)</span>
            <input
              name="salaryMin"
              type="number"
              min={0}
              defaultValue={job?.salaryMin ?? ""}
              className="w-full rounded border border-zinc-300 bg-white px-2 py-1.5 dark:border-zinc-700 dark:bg-zinc-900"
            />
          </label>
          <label className="block space-y-1">
            <span>Max (INR)</span>
            <input
              name="salaryMax"
              type="number"
              min={0}
              defaultValue={job?.salaryMax ?? ""}
              className="w-full rounded border border-zinc-300 bg-white px-2 py-1.5 dark:border-zinc-700 dark:bg-zinc-900"
            />
          </label>
        </div>
      </fieldset>

      <label className="block space-y-1">
        <span className="font-medium">Status</span>
        <select
          name="status"
          defaultValue={status}
          className="w-full max-w-xs rounded border border-zinc-300 bg-white px-2 py-1.5 dark:border-zinc-700 dark:bg-zinc-900"
        >
          <option value="draft">draft (unpublished)</option>
          <option value="open">open (public)</option>
          <option value="closed">closed</option>
        </select>
      </label>

      <button
        type="submit"
        className="rounded bg-zinc-900 px-3 py-1.5 text-sm font-medium text-white dark:bg-zinc-100 dark:text-zinc-900"
      >
        {job ? "Save job" : "Create job"}
      </button>
    </form>
  );
}
