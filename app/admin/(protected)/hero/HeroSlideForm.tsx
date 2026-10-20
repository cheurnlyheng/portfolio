"use client";

import { useActionState, useRef, useState } from "react";
import { UploadCloud, Image as ImageIcon, Loader2, AlertCircle } from "lucide-react";
import { upload } from "@vercel/blob/client";
import type { HeroSlideFormState } from "./actions";

type HeroSlideFormValues = {
  tagline: string;
  description: string;
};

type HeroSlideFormProps = {
  action: (prevState: HeroSlideFormState | undefined, formData: FormData) => Promise<HeroSlideFormState>;
  defaultValues?: HeroSlideFormValues;
  existingImage?: string;
  submitLabel: string;
};

type ImageStatus = "idle" | "uploading" | "done" | "error";

const inputClass =
  "w-full rounded-xl border border-black/10 bg-[#fbfbfb] px-4 py-3 text-sm font-semibold text-[#10100F] focus:border-[#10100F] focus:bg-white focus:outline-hidden transition-all placeholder:text-[#10100F]/30";
const labelTextClass =
  "block text-xs font-bold uppercase tracking-wider text-[#10100F]/70 mb-2";

export function HeroSlideForm({ action, defaultValues, existingImage, submitLabel }: HeroSlideFormProps) {
  const [state, formAction, isPending] = useActionState(action, undefined);
  const [imageUrl, setImageUrl] = useState(existingImage ?? "");
  const [previewUrl, setPreviewUrl] = useState(existingImage ?? "");
  const [status, setStatus] = useState<ImageStatus>(existingImage ? "done" : "idle");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelected = async (file: File | null) => {
    if (!file) return;
    const localPreview = URL.createObjectURL(file);
    setPreviewUrl(localPreview);
    setStatus("uploading");

    try {
      const blob = await upload(file.name, file, {
        access: "public",
        handleUploadUrl: "/api/admin/upload",
      });
      setImageUrl(blob.url);
      setStatus("done");
    } catch {
      setStatus("error");
    }
  };

  return (
    <form action={formAction} className="space-y-6">
      {/* Background Image Upload Card */}
      <div className="rounded-2xl border border-black/5 bg-white p-6 sm:p-8 shadow-xs">
        <label className={labelTextClass}>Slide Background Image</label>
        <p className="mb-4 text-xs font-medium text-[#10100F]/50">
          High-resolution image for this slide in the hero rotator. Click to upload or replace.
        </p>

        <div
          className="relative aspect-video w-full max-w-xl overflow-hidden rounded-2xl border-2 border-dashed border-black/10 bg-[#f4f1ea] hover:border-black/30 transition-all cursor-pointer flex flex-col items-center justify-center group"
          role="button"
          tabIndex={0}
          onClick={() => fileInputRef.current?.click()}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") fileInputRef.current?.click();
          }}
        >
          {previewUrl ? (
            <>
              <img
                className={`h-full w-full object-cover transition-all ${
                  status === "uploading" ? "opacity-30 blur-xs" : "group-hover:scale-102"
                }`}
                src={previewUrl}
                alt=""
              />
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="rounded-full bg-white px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#10100F] shadow-sm">
                  Change Image
                </span>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center gap-2 p-6 text-center text-[#10100F]/50 group-hover:text-[#10100F] transition-colors">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white border border-black/10 shadow-xs">
                <UploadCloud className="h-5 w-5" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#10100F]">
                Click to upload slide image
              </span>
              <span className="text-[11px] text-[#10100F]/40">PNG, JPG, WEBP up to 5MB</span>
            </div>
          )}

          {status === "uploading" && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-white/80 backdrop-blur-xs">
              <Loader2 className="h-6 w-6 animate-spin text-[#10100F]" />
              <span className="text-xs font-bold uppercase tracking-wider text-[#10100F]">
                Uploading...
              </span>
            </div>
          )}

          {status === "error" && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-red-50/90 text-red-700">
              <AlertCircle className="h-6 w-6" />
              <span className="text-xs font-bold uppercase tracking-wider">
                Upload failed — click to retry
              </span>
            </div>
          )}
        </div>

        <input
          ref={fileInputRef}
          className="hidden"
          type="file"
          accept="image/*"
          onChange={(event) => {
            handleFileSelected(event.target.files?.[0] ?? null);
            event.target.value = "";
          }}
        />
        <input type="hidden" name="image" value={imageUrl} />
      </div>

      {/* Slide Copy Card */}
      <div className="rounded-2xl border border-black/5 bg-white p-6 sm:p-8 shadow-xs space-y-5">
        <div>
          <label className={labelTextClass}>Slide Tagline / Headline</label>
          <input
            className={inputClass}
            name="tagline"
            defaultValue={defaultValues?.tagline}
            placeholder="e.g. FULL-STACK DEVELOPER"
            required
          />
        </div>

        <div>
          <label className={labelTextClass}>Slide Blurb / Description</label>
          <textarea
            className={`${inputClass} min-h-[120px] resize-y`}
            name="description"
            defaultValue={defaultValues?.description}
            placeholder="One or two punchy sentences rotated in under the tagline..."
            required
          />
        </div>
      </div>

      {/* Error Feedback */}
      {state?.error && (
        <div className="flex items-center gap-2 rounded-xl bg-red-50 border border-red-200 p-4 text-xs font-bold text-red-700">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{state.error}</span>
        </div>
      )}

      {/* Submit Button */}
      <div className="flex items-center gap-4 pt-2">
        <button
          className="inline-flex items-center justify-center rounded-full bg-[#10100F] px-8 py-3.5 text-xs font-black uppercase tracking-wider text-white shadow-xs hover:bg-neutral-800 disabled:opacity-40 transition-all active:scale-95"
          type="submit"
          disabled={isPending || status === "uploading" || !imageUrl}
        >
          {status === "uploading" ? (
            <span className="flex items-center gap-2">
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
              <span>Uploading Image...</span>
            </span>
          ) : isPending ? (
            <span className="flex items-center gap-2">
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
              <span>Saving...</span>
            </span>
          ) : (
            submitLabel
          )}
        </button>
      </div>
    </form>
  );
}
