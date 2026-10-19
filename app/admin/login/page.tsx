"use client";

import { useActionState } from "react";
import { loginAction, type LoginState } from "./actions";

const initialState: LoginState = {};

export default function AdminLoginPage() {
  const [state, formAction, isPending] = useActionState(loginAction, initialState);

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#faf9f6] px-5">
      <form
        action={formAction}
        className="grid w-full max-w-[380px] gap-6 border border-[#17161a]/12 bg-[#ffffff] px-7 py-9"
      >
        <div>
          <p className="mb-2 text-[0.78rem] font-extrabold uppercase tracking-[0.14em] text-[#2f5d4b]">
            Admin
          </p>
          <h1 className="font-serif text-[1.6rem] font-semibold text-[#17161a]">Sign in</h1>
        </div>

        <label className="grid gap-[6px]">
          <span className="text-[0.8rem] font-extrabold uppercase tracking-[0.08em] text-[#17161a]/45">
            Password
          </span>
          <input
            className="w-full border-b-2 border-[#17161a]/20 bg-transparent px-0.5 py-2 font-bold text-[#17161a] outline-0 transition focus:border-[#2f5d4b]"
            type="password"
            name="password"
            autoFocus
            required
          />
        </label>

        {state.error ? (
          <p className="m-0 border-l-2 border-[#2f5d4b] bg-[#2f5d4b]/10 px-3.5 py-2.5 text-[0.9rem] font-bold text-[#1c3f32]">
            {state.error}
          </p>
        ) : null}

        <button
          className="mt-1 inline-flex min-h-[46px] items-center justify-center rounded-full bg-[#17161a] px-6 font-extrabold text-[#faf9f6] transition hover:bg-[#2f5d4b] disabled:cursor-not-allowed disabled:opacity-60"
          type="submit"
          disabled={isPending}
        >
          {isPending ? "Signing in..." : "Sign in"}
        </button>
      </form>
    </main>
  );
}
