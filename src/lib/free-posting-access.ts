import { auth } from "@/auth";
import { readSuperAdminEmail } from "@/lib/super-admin/require";

/** Admin desk session, or a signed-in employer / admin account. */
export async function viewerMayUseListingForm(): Promise<boolean> {
  if (await readSuperAdminEmail()) return true;
  try {
    const session = await auth();
    const role = session?.user?.role;
    return role === "admin" || role === "employer" || role === "super_admin";
  } catch {
    return false;
  }
}
