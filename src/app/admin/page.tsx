import { requireAdmin } from "@/lib/admin-auth";
import { readSiteContent } from "@/lib/site-content-store";
import AdminDashboard from "./admin-dashboard";
import { logoutAction } from "./actions";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  await requireAdmin();

  let content = null;
  let loadError: string | null = null;
  try {
    content = await readSiteContent();
  } catch (err) {
    loadError = err instanceof Error ? err.message : "Failed to load content.";
  }

  return (
    <main className="mx-auto min-h-svh max-w-3xl px-5 py-12 sm:px-8">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-ink-soft">Admin</p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight">
            Manage site content
          </h1>
        </div>
        <form action={logoutAction}>
          <button
            type="submit"
            className="rounded-full border border-hairline px-4 py-2 text-xs font-medium text-ink-soft transition-colors duration-200 hover:text-ink"
          >
            Log out
          </button>
        </form>
      </div>

      {loadError ? (
        <div className="mt-8 rounded-2xl border border-hairline bg-paper-alt p-6 text-sm text-ink-soft">
          <p className="font-medium text-ink">Couldn&rsquo;t load live content.</p>
          <p className="mt-2">{loadError}</p>
          <p className="mt-2">
            Make sure <code>GITHUB_TOKEN</code> (a token with write access to
            this repo) is set, and optionally <code>GITHUB_REPO</code> /{" "}
            <code>GITHUB_BRANCH</code> if they differ from the defaults.
          </p>
        </div>
      ) : (
        <div className="mt-8">
          <AdminDashboard initialContent={content!} />
        </div>
      )}
    </main>
  );
}
