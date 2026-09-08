import Link from "next/link";
import { createProjectAction } from "../actions";
import { ProjectForm } from "../ProjectForm";

export default function NewProjectPage() {
  return (
    <main className="mx-auto w-full max-w-[640px] px-5 py-14 sm:px-8">
      <Link
        href="/admin"
        className="mb-6 inline-flex text-sm font-extrabold uppercase tracking-[0.06em] text-[#221d17]/45 transition hover:text-[#b3502b]"
      >
        ← Back
      </Link>
      <h1 className="mb-8 font-serif text-[1.8rem] font-semibold text-[#221d17]">Add project</h1>
      <ProjectForm action={createProjectAction} submitLabel="Create project" />
    </main>
  );
}
