import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { createProjectAction } from "../actions";
import { ProjectForm } from "../ProjectForm";

export default function NewProjectPage() {
  return (
    <main className="mx-auto w-full max-w-[860px] px-5 sm:px-8">
      <div className="mb-6">
        <Link
          href="/admin"
          className="inline-flex items-center gap-1.5 rounded-full border border-black/10 bg-white px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-[#10100F] shadow-xs hover:border-black/30 transition-all"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to Projects</span>
        </Link>
      </div>

      <div className="mb-8">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-black/5 border border-black/5 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[#10100F]/70">
          NEW PROJECT
        </span>
        <h1 className="mt-2 text-3xl sm:text-4xl font-black uppercase tracking-tight text-[#10100F]">
          Add New Project
        </h1>
      </div>

      <ProjectForm action={createProjectAction} submitLabel="Publish Project" />
    </main>
  );
}
