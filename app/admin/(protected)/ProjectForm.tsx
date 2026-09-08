"use client";

import { useActionState } from "react";
import type { ProjectFormState } from "./actions";

type ProjectFormValues = {
  title: string;
  description: string;
  date: string;
  githubUrl: string;
  liveUrl: string;
};

type ProjectFormProps = {
  action: (prevState: ProjectFormState | undefined, formData: FormData) => Promise<ProjectFormState>;
  defaultValues?: ProjectFormValues;
  submitLabel: string;
};

const labelClass = "grid gap-[6px]";
const labelTextClass = "text-[0.8rem] font-extrabold uppercase tracking-[0.08em] text-[#221d17]/45";
const fieldClass =
  "w-full border-b-2 border-[#221d17]/20 bg-transparent px-0.5 py-2 font-bold text-[#221d17] outline-0 transition placeholder:text-[#221d17]/30 focus:border-[#b3502b]";

export function ProjectForm({ action, defaultValues, submitLabel }: ProjectFormProps) {
  const [state, formAction, isPending] = useActionState(action, undefined);

  return (
    <form action={formAction} className="grid gap-6">
      <label className={labelClass}>
        <span className={labelTextClass}>Title</span>
        <input
          className={fieldClass}
          name="title"
          defaultValue={defaultValues?.title}
          placeholder="My Awesome Project"
          required
        />
      </label>

      <label className={labelClass}>
        <span className={labelTextClass}>Description</span>
        <textarea
          className={`${fieldClass} min-h-[110px] resize-y`}
          name="description"
          defaultValue={defaultValues?.description}
          placeholder="What it does, and what you used to build it."
          required
        />
      </label>

      <div className="grid gap-6 sm:grid-cols-2">
        <label className={labelClass}>
          <span className={labelTextClass}>Date</span>
          <input
            className={fieldClass}
            type="date"
            name="date"
            defaultValue={defaultValues?.date}
            required
          />
        </label>

        <label className={labelClass}>
          <span className={labelTextClass}>GitHub URL</span>
          <input
            className={fieldClass}
            type="url"
            name="githubUrl"
            defaultValue={defaultValues?.githubUrl}
            placeholder="https://github.com/..."
            required
          />
        </label>
      </div>

      <label className={labelClass}>
        <span className={labelTextClass}>Live site URL (optional)</span>
        <input
          className={fieldClass}
          type="url"
          name="liveUrl"
          defaultValue={defaultValues?.liveUrl}
          placeholder="Leave blank if it isn't deployed yet"
        />
      </label>

      {state?.error ? (
        <p className="m-0 border-l-2 border-[#b3502b] bg-[#b3502b]/10 px-3.5 py-2.5 text-[0.9rem] font-bold text-[#8f3f22]">
          {state.error}
        </p>
      ) : null}

      <button
        className="mt-1 inline-flex min-h-[46px] w-fit items-center justify-center rounded-full bg-[#221d17] px-7 font-extrabold text-[#f6f1e6] transition hover:bg-[#b3502b] disabled:cursor-not-allowed disabled:opacity-60"
        type="submit"
        disabled={isPending}
      >
        {isPending ? "Saving..." : submitLabel}
      </button>
    </form>
  );
}
