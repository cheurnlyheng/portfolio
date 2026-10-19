import Link from "next/link";
import { createProjectAction } from "../actions";
import { ProjectForm } from "../ProjectForm";

export default function NewProjectPage() {
  return (
    <main className="mx-auto w-full max-w-[640px] px-5 py-14 sm:px-8">
      <Link
        href="/admin"
        className="mb-6 inline-flex text-sm font-extrabold uppercase tracking-[0.06em] text-[#17161a]/45 transition hover:text-[#2f5d4b]"
      >
        ← Back
      </Link>
      <h1 className="mb-8 font-serif text-[1.8rem] font-semibold text-[#17161a]">Add project</h1>
      <ProjectForm action={createProjectAction} submitLabel="Create project" />
    </main>
  );
}
