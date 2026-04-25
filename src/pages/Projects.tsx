import ProjectCard from "../components/ProjectCard"
import { projects } from "../data/projects"

export default function Projects() {
  return (
    <div className="mx-auto max-w-6xl">
      <header>
        <h1 className="text-3xl font-bold">Projects</h1>
        <p className="mt-2 text-sm text-slate-400">
          A selection of things I've built.
        </p>
      </header>

      {projects.length === 0 ? (
        <p className="mt-8 text-sm text-slate-500">No projects yet.</p>
      ) : (
        <ul className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <li key={project.slug}>
              <ProjectCard project={project} />
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
