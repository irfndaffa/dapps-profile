"use server";

import { redirect } from "next/navigation";
import { createAdminSession, verifyPassword } from "@/lib/admin-auth";

export type LoginState = { error?: string } | null;

export async function loginAction(
  _prevState: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const password = String(formData.get("password") ?? "");

  if (!process.env.ADMIN_PASSWORD) {
    return {
      error: "Admin login isn't configured yet (missing ADMIN_PASSWORD).",
    };
  }

  if (!password || !verifyPassword(password)) {
    return { error: "Incorrect password." };
  }

  await createAdminSession();
  redirect("/admin");
}
