import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { updateProjectAction } from "../../actions";
import { ProjectForm } from "../../ProjectForm";

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = await prisma.project.findUnique({ where: { id } });

  if (!project) {
    notFound();
  }

  const updateWithId = updateProjectAction.bind(null, project.id);

  return (
    <main className="mx-auto w-full max-w-[640px] px-5 py-14 sm:px-8">
      <Link
        href="/admin"
        className="mb-6 inline-flex text-sm font-extrabold uppercase tracking-[0.06em] text-[#221d17]/45 transition hover:text-[#b3502b]"
      >
        ← Back
      </Link>
      <h1 className="mb-8 font-serif text-[1.8rem] font-semibold text-[#221d17]">Edit project</h1>
      <ProjectForm
        action={updateWithId}
        submitLabel="Save changes"
        existingImages={project.images}
        defaultValues={{
          title: project.title,
          description: project.description,
          date: project.date.toISOString().slice(0, 10),
          githubUrl: project.githubUrl,
          liveUrl: project.liveUrl ?? "",
        }}
      />
    </main>
  );
}
