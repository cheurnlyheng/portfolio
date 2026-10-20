"use client";

import { useActionState } from "react";
import Link from "next/link";
import { loginAction, type LoginState } from "./actions";

const initialState: LoginState = {};

export default function AdminLoginPage() {
  const [state, formAction, isPending] = useActionState(loginAction, initialState);

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#fbfbfb] px-5 py-12 selection:bg-[#10100F] selection:text-white">
      <div className="w-full max-w-[420px]">
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#10100F]/50 hover:text-[#10100F] transition-colors"
          >
            ← Back to portfolio
          </Link>
        </div>

        <form
          action={formAction}
          className="rounded-3xl border border-black/5 bg-white p-8 sm:p-10 shadow-xs space-y-6"
        >
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-black/5 border border-black/5 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[#10100F]/70">
              ADMIN PANEL
            </span>
            <h1 className="mt-3 text-3xl font-black uppercase tracking-tight text-[#10100F]">
              Sign In
            </h1>
            <p className="mt-1 text-xs text-[#10100F]/60 font-medium">
              Enter your master password to manage projects and slides.
            </p>
          </div>

          <div className="space-y-1.5">
            <label className="block text-[10px] font-bold uppercase tracking-widest text-[#10100F]/60">
              Password
            </label>
            <input
              className="w-full rounded-xl border border-black/15 bg-[#fbfbfb] px-4 py-3 text-sm font-semibold text-[#10100F] placeholder:text-[#10100F]/30 focus:border-[#10100F] focus:bg-white focus:outline-none transition-all"
              type="password"
              name="password"
              placeholder="••••••••••••"
              autoFocus
              required
            />
          </div>

          {state.error && (
            <p className="rounded-xl border border-red-500/20 bg-red-500/5 p-3 text-xs font-bold text-red-600">
              {state.error}
            </p>
          )}

          <button
            className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#10100F] px-6 py-3.5 text-xs font-black uppercase tracking-wider text-white shadow-sm hover:bg-neutral-800 transition-all active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
            type="submit"
            disabled={isPending}
          >
            {isPending ? (
              <span className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
            ) : null}
            <span>{isPending ? "Signing in..." : "Sign in →"}</span>
          </button>
        </form>
      </div>
    </main>
  );
}
