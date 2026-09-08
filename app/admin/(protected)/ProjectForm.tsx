"use client";

import { useActionState, useState } from "react";
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
  existingImages?: string[];
  submitLabel: string;
};

const labelClass = "grid gap-[6px]";
const labelTextClass = "text-[0.8rem] font-extrabold uppercase tracking-[0.08em] text-[#221d17]/45";
const fieldClass =
  "w-full border-b-2 border-[#221d17]/20 bg-transparent px-0.5 py-2 font-bold text-[#221d17] outline-0 transition placeholder:text-[#221d17]/30 focus:border-[#b3502b]";

export function ProjectForm({
  action,
  defaultValues,
  existingImages = [],
  submitLabel,
}: ProjectFormProps) {
  const [state, formAction, isPending] = useActionState(action, undefined);
  const [previews, setPreviews] = useState<string[]>([]);

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

      <div className={labelClass}>
        <span className={labelTextClass}>Images</span>

        {existingImages.length > 0 ? (
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
            {existingImages.map((url) => (
              <label
                className="group relative block cursor-pointer overflow-hidden rounded-lg border border-[#221d17]/15"
                key={url}
              >
                <input className="peer sr-only" type="checkbox" name="removeImages" value={url} />
                <img
                  className="aspect-square w-full object-cover transition peer-checked:opacity-30"
                  src={url}
                  alt=""
                />
                <span className="pointer-events-none absolute inset-0 hidden items-center justify-center bg-[#221d17]/55 text-[0.7rem] font-extrabold uppercase tracking-wide text-white peer-checked:flex">
                  Remove
                </span>
              </label>
            ))}
          </div>
        ) : null}

        <input
          className="text-sm font-semibold text-[#221d17]/70 file:mr-3 file:rounded-full file:border-0 file:bg-[#221d17] file:px-4 file:py-2 file:text-sm file:font-extrabold file:text-[#f6f1e6] file:transition hover:file:bg-[#b3502b]"
          type="file"
          name="newImages"
          accept="image/*"
          multiple
          onChange={(event) => {
            previews.forEach((url) => URL.revokeObjectURL(url));
            const files = event.target.files ? Array.from(event.target.files) : [];
            setPreviews(files.map((file) => URL.createObjectURL(file)));
          }}
        />
        <p className="m-0 text-xs font-semibold text-[#221d17]/40">
          {existingImages.length > 0 ? "Click an existing image to remove it. " : ""}
          A few real screenshots work best.
        </p>

        {previews.length > 0 ? (
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
            {previews.map((url) => (
              <img
                className="aspect-square w-full rounded-lg border border-[#221d17]/15 object-cover"
                src={url}
                alt=""
                key={url}
              />
            ))}
          </div>
        ) : null}
      </div>

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
