import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import LoginForm from "./login-form";

export const dynamic = "force-dynamic";

export default async function AdminLoginPage() {
  if (await isAdminAuthenticated()) {
    redirect("/admin");
  }

  return (
    <main className="flex min-h-svh flex-col items-center justify-center px-5">
      <p className="text-sm font-medium text-ink-soft">Admin</p>
      <h1 className="mt-2 text-2xl font-semibold tracking-tight">
        Sign in to manage this site
      </h1>
      <div className="mt-8">
        <LoginForm />
      </div>
    </main>
  );
}
