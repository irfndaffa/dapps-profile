"use client";

import { useActionState } from "react";
import { loginAction, type LoginState } from "./actions";

const initialState: LoginState = null;

export default function LoginForm() {
  const [state, formAction, isPending] = useActionState(
    loginAction,
    initialState,
  );

  return (
    <form action={formAction} className="w-full max-w-xs">
      <label htmlFor="password" className="text-sm font-medium text-ink-soft">
        Admin password
      </label>
      <input
        id="password"
        name="password"
        type="password"
        required
        autoFocus
        autoComplete="current-password"
        className="mt-2 w-full rounded-xl border border-hairline bg-paper px-4 py-2.5 text-sm text-ink outline-none transition-colors duration-200 focus:border-accent"
      />
      {state?.error ? (
        <p className="mt-2 text-sm text-red-600" role="alert">
          {state.error}
        </p>
      ) : null}
      <button
        type="submit"
        disabled={isPending}
        className="mt-5 w-full rounded-full bg-accent px-6 py-2.5 text-sm font-medium text-white transition-[background-color,opacity] duration-200 hover:bg-accent-hover disabled:opacity-60"
      >
        {isPending ? "Checking…" : "Log in"}
      </button>
    </form>
  );
}
