"use client";

import { useActionState, useRef, useState } from "react";
import type { ProjectFormState } from "./actions";
import { MAX_IMAGES_PER_PROJECT } from "@/lib/constants";

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

type StagedImage = { file: File; previewUrl: string };

const labelClass = "grid gap-[6px]";
const labelTextClass = "text-[0.8rem] font-extrabold uppercase tracking-[0.08em] text-[#221d17]/45";
const fieldClass =
  "w-full border-b-2 border-[#221d17]/20 bg-transparent px-0.5 py-2 font-bold text-[#221d17] outline-0 transition placeholder:text-[#221d17]/30 focus:border-[#b3502b]";
const removeButtonClass =
  "absolute right-1.5 top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-[#221d17]/75 text-sm font-bold leading-none text-[#f6f1e6] transition hover:bg-[#b3502b]";

export function ProjectForm({
  action,
  defaultValues,
  existingImages = [],
  submitLabel,
}: ProjectFormProps) {
  const [state, formAction, isPending] = useActionState(action, undefined);
  const [removedExisting, setRemovedExisting] = useState<string[]>([]);
  const [staged, setStaged] = useState<StagedImage[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const visibleExisting = existingImages.filter((url) => !removedExisting.includes(url));
  const totalCount = visibleExisting.length + staged.length;
  const remainingSlots = Math.max(0, MAX_IMAGES_PER_PROJECT - totalCount);

  const syncFileInput = (files: File[]) => {
    const dataTransfer = new DataTransfer();
    files.forEach((file) => dataTransfer.items.add(file));
    if (fileInputRef.current) {
      fileInputRef.current.files = dataTransfer.files;
    }
  };

  const handleFilesSelected = (fileList: FileList | null) => {
    if (!fileList || remainingSlots === 0) return;
    const incoming = Array.from(fileList)
      .slice(0, remainingSlots)
      .map((file) => ({ file, previewUrl: URL.createObjectURL(file) }));

    setStaged((previous) => {
      const next = [...previous, ...incoming];
      syncFileInput(next.map((item) => item.file));
      return next;
    });
  };

  const removeStaged = (index: number) => {
    setStaged((previous) => {
      URL.revokeObjectURL(previous[index].previewUrl);
      const next = previous.filter((_, i) => i !== index);
      syncFileInput(next.map((item) => item.file));
      return next;
    });
  };

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
        <div className="flex items-center justify-between">
          <span className={labelTextClass}>Images</span>
          <span className="text-xs font-bold text-[#221d17]/40">
            {totalCount} / {MAX_IMAGES_PER_PROJECT}
          </span>
        </div>

        <div className="grid grid-cols-3 gap-3 sm:grid-cols-5">
          {visibleExisting.map((url) => (
            <div className="relative aspect-square overflow-hidden rounded-lg border border-[#221d17]/15" key={url}>
              <img className="h-full w-full object-cover" src={url} alt="" />
              <button
                className={removeButtonClass}
                type="button"
                onClick={() => setRemovedExisting((previous) => [...previous, url])}
                aria-label="Remove image"
              >
                ×
              </button>
            </div>
          ))}

          {staged.map((item, index) => (
            <div
              className="relative aspect-square overflow-hidden rounded-lg border border-[#221d17]/15"
              key={item.previewUrl}
            >
              <img className="h-full w-full object-cover" src={item.previewUrl} alt="" />
              <button
                className={removeButtonClass}
                type="button"
                onClick={() => removeStaged(index)}
                aria-label="Remove image"
              >
                ×
              </button>
            </div>
          ))}

          {remainingSlots > 0 ? (
            <button
              className="flex aspect-square flex-col items-center justify-center gap-1 rounded-lg border border-dashed border-[#221d17]/25 text-[#221d17]/45 transition hover:border-[#b3502b]/50 hover:text-[#b3502b]"
              type="button"
              onClick={() => fileInputRef.current?.click()}
            >
              <span className="text-xl leading-none">+</span>
              <span className="text-[0.65rem] font-extrabold uppercase tracking-wide">Add</span>
            </button>
          ) : null}
        </div>

        {removedExisting.map((url) => (
          <input key={url} type="hidden" name="removeImages" value={url} />
        ))}

        <input
          ref={fileInputRef}
          className="hidden"
          type="file"
          name="newImages"
          accept="image/*"
          multiple
          onChange={(event) => handleFilesSelected(event.target.files)}
        />

        <p className="m-0 text-xs font-semibold text-[#221d17]/40">
          Up to {MAX_IMAGES_PER_PROJECT} screenshots. Click × to remove one.
        </p>
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
