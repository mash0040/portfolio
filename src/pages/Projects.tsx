import ProjectCard from "../components/ProjectCard"
import { projects } from "../data/projects"

export default function Projects() {
  const count = projects.length

  return (
    <div className="mx-auto max-w-6xl py-10 sm:py-14">
      <header className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-widest text-sky-400">
          Work
        </p>
        <h1 className="mt-3 text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl">
          Projects
        </h1>
        <p className="mt-5 text-base leading-relaxed text-slate-300 sm:text-lg">
          A selection of things I've built — small experiments, side projects,
          and work I'm proud of. Each one taught me something new.
        </p>
        {count > 0 && (
          <p className="mt-3 text-sm text-slate-500">
            {count} {count === 1 ? "project" : "projects"}
          </p>
        )}
      </header>

      <div className="mt-10 border-t border-slate-800 pt-10 sm:mt-14 sm:pt-14">
        {count === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-800 px-6 py-16 text-center">
            <p className="text-sm text-slate-500">
              No projects yet — check back soon.
            </p>
          </div>
        ) : (
          <section aria-label="Projects">
            <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:gap-8 xl:grid-cols-3">
              {projects.map((project) => (
                <li key={project.slug}>
                  <ProjectCard project={project} />
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </div>
  )
}
