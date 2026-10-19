import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { deleteProjectAction, logoutAction } from "./actions";

export default async function AdminDashboardPage() {
  const projects = await prisma.project.findMany({ orderBy: { date: "desc" } });

  return (
    <main className="mx-auto w-full max-w-[900px] px-5 py-14 sm:px-8">
      <div className="mb-10 flex items-center justify-between gap-4">
        <div>
          <p className="mb-2 text-[0.78rem] font-extrabold uppercase tracking-[0.14em] text-[#2f5d4b]">
            Admin
          </p>
          <h1 className="font-serif text-[1.8rem] font-semibold text-[#17161a]">Projects</h1>
        </div>
        <div className="flex items-center gap-5">
          <Link
            href="/admin/new"
            className="inline-flex min-h-[44px] items-center justify-center rounded-full bg-[#17161a] px-5 text-sm font-extrabold text-[#faf9f6] transition hover:bg-[#2f5d4b]"
          >
            + Add project
          </Link>
          <form action={logoutAction}>
            <button
              className="text-sm font-extrabold uppercase tracking-[0.06em] text-[#17161a]/50 transition hover:text-[#2f5d4b]"
              type="submit"
            >
              Log out
            </button>
          </form>
        </div>
      </div>

      {projects.length === 0 ? (
        <p className="border border-dashed border-[#17161a]/20 px-6 py-10 text-center font-semibold text-[#17161a]/50">
          No projects yet. Add your first one to have it show up on the site.
        </p>
      ) : (
        <ul className="grid gap-px overflow-hidden border border-[#17161a]/12 bg-[#17161a]/12 p-0">
          {projects.map((project) => (
            <li
              className="flex flex-wrap items-center justify-between gap-4 bg-[#ffffff] px-6 py-5"
              key={project.id}
            >
              <div>
                <p className="mb-1 flex items-center gap-2 text-[0.72rem] font-extrabold uppercase tracking-[0.08em] text-[#17161a]/40">
                  {new Intl.DateTimeFormat("en-US", { month: "short", year: "numeric" }).format(
                    project.date,
                  )}
                  <span
                    className={project.liveUrl ? "text-[#3f7d54]" : "text-[#17161a]/35"}
                  >
                    · {project.liveUrl ? "Live" : "Not deployed"}
                  </span>
                </p>
                <h2 className="m-0 font-serif text-[1.15rem] font-semibold text-[#17161a]">
                  {project.title}
                </h2>
              </div>
              <div className="flex items-center gap-4">
                <Link
                  href={`/admin/${project.id}/edit`}
                  className="text-sm font-extrabold uppercase tracking-[0.06em] text-[#17161a] transition hover:text-[#2f5d4b]"
                >
                  Edit
                </Link>
                <form action={deleteProjectAction.bind(null, project.id)}>
                  <button
                    className="text-sm font-extrabold uppercase tracking-[0.06em] text-[#17161a]/45 transition hover:text-[#2f5d4b]"
                    type="submit"
                  >
                    Delete
                  </button>
                </form>
              </div>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
