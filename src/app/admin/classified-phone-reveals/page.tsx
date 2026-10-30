import Link from "next/link";
import { desc, eq } from "drizzle-orm";
import { auth } from "@/auth";
import { getDb } from "@/db/client";
import { classifiedListings, classifiedPhoneReveals } from "@/db/schema/tables";
import { formatIndianMobile } from "@/lib/classifieds/phone-gate";
import { chennaiClassifiedDetailPath } from "@/lib/routes/chennai-classifieds";

export const dynamic = "force-dynamic";

function whenLabel(date: Date): string {
  return new Intl.DateTimeFormat("en-IN", {
    timeZone: "Asia/Kolkata",
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

export default async function ClassifiedPhoneRevealsPage() {
  const session = await auth();
  if (!session?.user) {
    return (
      <p className="text-sm">
        <Link href="/api/auth/signin" className="underline">
          Sign in
        </Link>{" "}
        to see classified contact requests.
      </p>
    );
  }

  const db = getDb();
  const rows = await db
    .select({
      id: classifiedPhoneReveals.id,
      name: classifiedPhoneReveals.enquirerName,
      phone: classifiedPhoneReveals.enquirerPhone,
      createdAt: classifiedPhoneReveals.createdAt,
      title: classifiedListings.title,
      slug: classifiedListings.slug,
    })
    .from(classifiedPhoneReveals)
    .innerJoin(
      classifiedListings,
      eq(classifiedListings.id, classifiedPhoneReveals.listingId),
    )
    .orderBy(desc(classifiedPhoneReveals.createdAt))
    .limit(200);

  return (
    <div className="space-y-4">
      <p className="text-sm">
        <Link href="/admin" className="underline">
          Admin home
        </Link>
      </p>
      <h1 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
        Classified contact requests
      </h1>
      <p className="text-sm text-zinc-600 dark:text-zinc-400">
        Name and mobile saved when someone asks for a hidden classified contact.
        {rows.length === 200 ? " Showing the latest 200." : ""}
      </p>
      {rows.length === 0 ? (
        <p className="text-sm text-zinc-600 dark:text-zinc-400">No requests yet.</p>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-zinc-200 bg-white dark:border-zinc-700 dark:bg-zinc-900">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b border-zinc-200 text-xs uppercase tracking-wide text-zinc-500 dark:border-zinc-700">
              <tr>
                <th className="px-3 py-2 font-medium">When</th>
                <th className="px-3 py-2 font-medium">Name</th>
                <th className="px-3 py-2 font-medium">Mobile</th>
                <th className="px-3 py-2 font-medium">Ad</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id} className="border-b border-zinc-100 last:border-0 dark:border-zinc-800">
                  <td className="whitespace-nowrap px-3 py-2">{whenLabel(row.createdAt)}</td>
                  <td className="px-3 py-2">{row.name?.trim() || "—"}</td>
                  <td className="whitespace-nowrap px-3 py-2">
                    <a className="underline" href={`tel:+91${row.phone}`}>
                      {formatIndianMobile(row.phone)}
                    </a>
                  </td>
                  <td className="px-3 py-2">
                    <Link className="underline" href={chennaiClassifiedDetailPath(row.slug)}>
                      {row.title}
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
