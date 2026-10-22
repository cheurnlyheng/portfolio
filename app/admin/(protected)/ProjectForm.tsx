"use client";

import { useActionState, useRef, useState } from "react";
import { upload } from "@vercel/blob/client";
import { Plus, X, UploadCloud, CheckCircle2 } from "lucide-react";
import type { ProjectFormState } from "./actions";
import { COVER_POSITIONS, DEFAULT_COVER_POSITION, MAX_IMAGES_PER_PROJECT } from "@/lib/constants";

type ProjectFormValues = {
  title: string;
  description: string;
  date: string;
  githubUrl: string;
  liveUrl: string;
  displayMode: "BANNER" | "SPLIT";
  coverPosition: string;
};

type ProjectFormProps = {
  action: (prevState: ProjectFormState | undefined, formData: FormData) => Promise<ProjectFormState>;
  defaultValues?: ProjectFormValues;
  existingImages?: string[];
  existingMobileCover?: string | null;
  submitLabel: string;
};

type StagedImage = {
  id: string;
  previewUrl: string;
  status: "uploading" | "done" | "error";
  url?: string;
};

export function ProjectForm({
  action,
  defaultValues,
  existingImages = [],
  existingMobileCover = null,
  submitLabel,
}: ProjectFormProps) {
  const [state, formAction, isPending] = useActionState(action, undefined);
  const [removedExisting, setRemovedExisting] = useState<string[]>([]);
  const [staged, setStaged] = useState<StagedImage[]>([]);
  const [coverPosition, setCoverPosition] = useState(
    defaultValues?.coverPosition ?? DEFAULT_COVER_POSITION,
  );
  const [mobileCover, setMobileCover] = useState<{
    previewUrl: string | null;
    url: string | null;
    status: "idle" | "uploading" | "done" | "error";
    removed: boolean;
  }>({
    previewUrl: existingMobileCover,
    url: existingMobileCover,
    status: existingMobileCover ? "done" : "idle",
    removed: false,
  });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const mobileCoverInputRef = useRef<HTMLInputElement>(null);

  const visibleExisting = existingImages.filter((url) => !removedExisting.includes(url));
  const totalCount = visibleExisting.length + staged.length;
  const remainingSlots = Math.max(0, MAX_IMAGES_PER_PROJECT - totalCount);
  const isUploading = staged.some((item) => item.status === "uploading");
  const coverPreviewUrl =
    visibleExisting[0] ?? staged.find((item) => item.status === "done")?.url ?? staged[0]?.previewUrl;

  const handleMobileCoverSelected = async (fileList: FileList | null) => {
    const file = fileList?.[0];
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);
    setMobileCover({ previewUrl, url: null, status: "uploading", removed: false });

    try {
      const blob = await upload(file.name, file, {
        access: "public",
        handleUploadUrl: "/api/admin/upload",
      });
      setMobileCover({ previewUrl, url: blob.url, status: "done", removed: false });
    } catch {
      setMobileCover({ previewUrl, url: null, status: "error", removed: false });
    }
  };

  const removeMobileCover = () => {
    if (mobileCover.previewUrl && mobileCover.previewUrl.startsWith("blob:")) {
      URL.revokeObjectURL(mobileCover.previewUrl);
    }
    setMobileCover({ previewUrl: null, url: null, status: "idle", removed: true });
  };

  const handleFilesSelected = async (fileList: FileList | null) => {
    if (!fileList || remainingSlots === 0) return;
    const files = Array.from(fileList).slice(0, remainingSlots);

    for (const file of files) {
      const id = crypto.randomUUID();
      const previewUrl = URL.createObjectURL(file);
      setStaged((previous) => [...previous, { id, previewUrl, status: "uploading" }]);

      try {
        const blob = await upload(file.name, file, {
          access: "public",
          handleUploadUrl: "/api/admin/upload",
        });
        setStaged((previous) =>
          previous.map((item) => (item.id === id ? { ...item, status: "done", url: blob.url } : item)),
        );
      } catch {
        setStaged((previous) =>
          previous.map((item) => (item.id === id ? { ...item, status: "error" } : item)),
        );
      }
    }
  };

  const removeStaged = (id: string) => {
    setStaged((previous) => {
      const target = previous.find((item) => item.id === id);
      if (target) URL.revokeObjectURL(target.previewUrl);
      return previous.filter((item) => item.id !== id);
    });
  };

  const labelClass = "block text-[11px] font-bold uppercase tracking-wider text-[#10100F]/60 mb-2";
  const inputClass =
    "w-full rounded-xl border border-black/15 bg-white px-4 py-3 text-sm font-semibold text-[#10100F] placeholder:text-[#10100F]/30 focus:border-[#10100F] focus:outline-none transition-all";

  return (
    <form action={formAction} className="space-y-8">
      {/* Basic Info Card */}
      <div className="rounded-3xl border border-black/5 bg-white p-6 sm:p-8 shadow-xs space-y-6">
        <h2 className="text-xs font-black uppercase tracking-widest text-[#10100F]/50">
          General Information
        </h2>

        <div className="space-y-1.5">
          <label className={labelClass}>Project Title</label>
          <input
            className={inputClass}
            name="title"
            defaultValue={defaultValues?.title}
            placeholder="e.g. Graphites"
            required
          />
        </div>

        <div className="space-y-1.5">
          <label className={labelClass}>Description / Summary</label>
          <textarea
            className={`${inputClass} min-h-[110px] resize-y`}
            name="description"
            defaultValue={defaultValues?.description}
            placeholder="Concise description of the product, tech stack, and your role."
            required
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-1.5">
            <label className={labelClass}>Date of Completion / Launch</label>
            <input
              className={inputClass}
              type="date"
              name="date"
              defaultValue={defaultValues?.date}
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className={labelClass}>GitHub Repository URL</label>
            <input
              className={inputClass}
              type="url"
              name="githubUrl"
              defaultValue={defaultValues?.githubUrl}
              placeholder="https://github.com/cheurnlyheng/..."
              required
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className={labelClass}>Live Site URL (Optional)</label>
          <input
            className={inputClass}
            type="url"
            name="liveUrl"
            defaultValue={defaultValues?.liveUrl}
            placeholder="https://example.com"
          />
          <p className="text-[11px] text-[#10100F]/45">
            Leave blank if the project is open-source code only and not deployed.
          </p>
        </div>
      </div>

      {/* Display Mode Card */}
      <div className="rounded-3xl border border-black/5 bg-white p-6 sm:p-8 shadow-xs space-y-4">
        <div>
          <h2 className="text-xs font-black uppercase tracking-widest text-[#10100F]/50">
            Display Mode
          </h2>
          <p className="mt-1 text-xs text-[#10100F]/60">
            Choose how this project appears on the home page showcase.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-black/10 p-4 has-[:checked]:border-[#10100F] has-[:checked]:bg-black/[0.02] transition-all">
            <input
              type="radio"
              name="displayMode"
              value="BANNER"
              className="mt-1"
              defaultChecked={(defaultValues?.displayMode ?? "BANNER") === "BANNER"}
            />
            <div>
              <span className="block text-sm font-black uppercase tracking-tight text-[#10100F]">
                Banner (Full Width)
              </span>
              <span className="mt-0.5 block text-xs text-[#10100F]/50 font-medium">
                Cinematic tall section pinned on scroll like the Hero.
              </span>
            </div>
          </label>

          <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-black/10 p-4 has-[:checked]:border-[#10100F] has-[:checked]:bg-black/[0.02] transition-all">
            <input
              type="radio"
              name="displayMode"
              value="SPLIT"
              className="mt-1"
              defaultChecked={defaultValues?.displayMode === "SPLIT"}
            />
            <div>
              <span className="block text-sm font-black uppercase tracking-tight text-[#10100F]">
                Split (Side-by-Side)
              </span>
              <span className="mt-0.5 block text-xs text-[#10100F]/50 font-medium">
                Featured 2-column card edge-to-edge (max 2 active).
              </span>
            </div>
          </label>
        </div>
      </div>

      {/* Screenshots Card */}
      <div className="rounded-3xl border border-black/5 bg-white p-6 sm:p-8 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xs font-black uppercase tracking-widest text-[#10100F]/50">
              Screenshots &amp; Visuals
            </h2>
            <p className="mt-0.5 text-xs text-[#10100F]/60">
              The first image is used as the cover. Up to {MAX_IMAGES_PER_PROJECT} images.
            </p>
          </div>
          <span className="rounded-full bg-black/5 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#10100F]/60">
            {totalCount} / {MAX_IMAGES_PER_PROJECT}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {/* Existing Images */}
          {visibleExisting.map((url, idx) => (
            <div
              className="group relative aspect-video overflow-hidden rounded-2xl border border-black/10 bg-[#f4f1ea]"
              key={url}
            >
              <img className="h-full w-full object-cover object-top" src={url} alt="" />
              {idx === 0 && (
                <span className="absolute left-2 top-2 rounded-full bg-[#10100F] px-2 py-0.5 text-[9px] font-black uppercase tracking-wider text-white">
                  Cover
                </span>
              )}
              <button
                className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-black/80 text-white hover:bg-black transition-all shadow-xs"
                type="button"
                onClick={() => setRemovedExisting((previous) => [...previous, url])}
                aria-label="Remove image"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}

          {/* Staged Uploading Images */}
          {staged.map((item) => (
            <div
              className="relative aspect-video overflow-hidden rounded-2xl border border-black/10 bg-[#f4f1ea]"
              key={item.id}
            >
              <img
                className={`h-full w-full object-cover object-top ${
                  item.status === "uploading" ? "opacity-30" : ""
                }`}
                src={item.previewUrl}
                alt=""
              />
              {item.status === "uploading" && (
                <span className="absolute inset-0 flex items-center justify-center">
                  <span className="h-5 w-5 animate-spin rounded-full border-2 border-black/20 border-t-[#10100F]" />
                </span>
              )}
              {item.status === "done" && (
                <span className="absolute left-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-white">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                </span>
              )}
              <button
                className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-black/80 text-white hover:bg-black transition-all shadow-xs"
                type="button"
                onClick={() => removeStaged(item.id)}
                aria-label="Remove image"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}

          {/* Add Image Slot */}
          {remainingSlots > 0 && (
            <button
              className="flex aspect-video flex-col items-center justify-center gap-1.5 rounded-2xl border-2 border-dashed border-black/15 bg-black/[0.01] text-[#10100F]/50 hover:border-black/30 hover:bg-black/[0.03] transition-all"
              type="button"
              onClick={() => fileInputRef.current?.click()}
            >
              <UploadCloud className="h-5 w-5" />
              <span className="text-[10px] font-bold uppercase tracking-wider">
                Upload ({remainingSlots} left)
              </span>
            </button>
          )}
        </div>

        {removedExisting.map((url) => (
          <input key={url} type="hidden" name="removeImages" value={url} />
        ))}

        {staged
          .filter((item) => item.status === "done" && item.url)
          .map((item) => (
            <input key={item.id} type="hidden" name="newImageUrls" value={item.url} />
          ))}

        <input
          ref={fileInputRef}
          className="hidden"
          type="file"
          accept="image/*"
          multiple
          onChange={(event) => {
            handleFilesSelected(event.target.files);
            event.target.value = "";
          }}
        />
      </div>

      {/* Cover Positioning & Mobile Override Card */}
      <div className="rounded-3xl border border-black/5 bg-white p-6 sm:p-8 shadow-xs space-y-6">
        <div>
          <h2 className="text-xs font-black uppercase tracking-widest text-[#10100F]/50">
            Cover Framing
          </h2>
          <p className="mt-1 text-xs text-[#10100F]/60">
            The banner crops tall on screen, so pick which part of the cover image should stay
            in view. Add a separate mobile image only if the crop still doesn&apos;t work on phones.
          </p>
        </div>

        {coverPreviewUrl ? (
          <div className="flex flex-col gap-4 sm:flex-row">
            {/* Focal point preview + 3x3 grid */}
            <div className="relative aspect-[9/16] w-full max-w-[180px] shrink-0 overflow-hidden rounded-2xl border border-black/10 bg-[#f4f1ea]">
              <img
                className="h-full w-full object-cover"
                style={{ objectPosition: coverPosition }}
                src={coverPreviewUrl}
                alt=""
              />
              <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 gap-0.5 p-1.5">
                {COVER_POSITIONS.map((position) => (
                  <button
                    key={position.value}
                    type="button"
                    title={position.label}
                    aria-label={position.label}
                    onClick={() => setCoverPosition(position.value)}
                    className={`rounded-md border transition-all ${
                      coverPosition === position.value
                        ? "border-white bg-white/90 shadow-sm"
                        : "border-white/40 bg-white/0 hover:bg-white/30"
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="flex-1 space-y-1.5">
              <label className={labelClass}>Focal Point</label>
              <p className="text-xs text-[#10100F]/50 font-medium">
                This preview is shaped like a phone screen — the mobile banner crop is the
                hardest to get right. Click a cell on the image to keep that part visible.
              </p>
              <p className="text-xs font-bold text-[#10100F]/70">
                Current: {COVER_POSITIONS.find((p) => p.value === coverPosition)?.label ?? "Top Center"}
              </p>
            </div>
          </div>
        ) : (
          <p className="text-xs text-[#10100F]/45 font-medium">
            Upload a screenshot above first to set its focal point.
          </p>
        )}

        <div className="border-t border-black/5 pt-5 space-y-3">
          <div>
            <label className={labelClass}>Mobile Cover (Optional Override)</label>
            <p className="text-xs text-[#10100F]/50 font-medium">
              Leave blank to reuse the main cover with the focal point above. Only upload one if
              the crop genuinely doesn&apos;t work on small screens.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {mobileCover.previewUrl ? (
              <div className="relative aspect-[9/16] w-20 overflow-hidden rounded-xl border border-black/10 bg-[#f4f1ea]">
                <img
                  className={`h-full w-full object-cover ${
                    mobileCover.status === "uploading" ? "opacity-30" : ""
                  }`}
                  src={mobileCover.previewUrl}
                  alt=""
                />
                {mobileCover.status === "uploading" && (
                  <span className="absolute inset-0 flex items-center justify-center">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-black/20 border-t-[#10100F]" />
                  </span>
                )}
                <button
                  className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-black/80 text-white hover:bg-black transition-all shadow-xs"
                  type="button"
                  onClick={removeMobileCover}
                  aria-label="Remove mobile cover"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ) : (
              <button
                className="flex aspect-[9/16] w-20 flex-col items-center justify-center gap-1 rounded-xl border-2 border-dashed border-black/15 bg-black/[0.01] text-[#10100F]/50 hover:border-black/30 hover:bg-black/[0.03] transition-all"
                type="button"
                onClick={() => mobileCoverInputRef.current?.click()}
              >
                <UploadCloud className="h-4 w-4" />
                <span className="text-[9px] font-bold uppercase tracking-wider">Upload</span>
              </button>
            )}

            {mobileCover.status === "error" && (
              <span className="text-xs font-bold text-red-600">Upload failed, try again.</span>
            )}
          </div>

          <input
            ref={mobileCoverInputRef}
            className="hidden"
            type="file"
            accept="image/*"
            onChange={(event) => {
              handleMobileCoverSelected(event.target.files);
              event.target.value = "";
            }}
          />
        </div>

        <input type="hidden" name="coverPosition" value={coverPosition} />
        <input type="hidden" name="mobileCoverUrl" value={mobileCover.url ?? ""} />
        <input type="hidden" name="removeMobileCover" value={mobileCover.removed ? "true" : "false"} />
      </div>

      {/* Error Message */}
      {state?.error && (
        <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-4 text-xs font-bold text-red-600">
          {state.error}
        </div>
      )}

      {/* Submit Button */}
      <div className="flex items-center gap-4">
        <button
          className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-[#10100F] px-8 text-xs font-black uppercase tracking-wider text-white shadow-sm hover:bg-neutral-800 transition-all active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
          type="submit"
          disabled={isPending || isUploading}
        >
          {isUploading ? (
            <span>Uploading images...</span>
          ) : isPending ? (
            <span>Saving...</span>
          ) : (
            <span>{submitLabel}</span>
          )}
        </button>
      </div>
    </form>
  );
}
