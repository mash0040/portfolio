import { Link } from "react-router-dom"
import type { Project } from "../types/project"

type Props = { project: Project }

export default function ProjectCard({ project }: Props) {
  const hasLinks = Boolean(project.repoUrl || project.liveUrl)

  return (
    <article className="group relative flex h-full flex-col rounded-xl border border-slate-800 bg-slate-900/80 p-6 shadow-lg shadow-black/20 ring-1 ring-white/5 transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-600 hover:bg-slate-900 hover:shadow-xl hover:shadow-black/40 focus-within:border-slate-600 focus-within:bg-slate-900">
      <Link
        to={`/projects/${project.slug}`}
        aria-label={`View ${project.title} case study`}
        className="absolute inset-0 rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
      />
      <div className="mb-3 flex items-start justify-between gap-3">
        <h2 className="text-xl font-semibold tracking-tight text-white transition-colors group-hover:text-sky-300 group-focus-within:text-sky-300">
          {project.title}
        </h2>
        {project.year && (
          <span className="shrink-0 rounded-full border border-slate-700/70 px-2 py-0.5 text-[11px] font-medium text-slate-400">
            {project.year}
          </span>
        )}
      </div>

      <p className="mb-5 line-clamp-3 text-sm leading-relaxed text-slate-400">
        {project.description}
      </p>

      <ul className="flex flex-wrap gap-1.5">
        {project.tech.map((t) => (
          <li
            key={t}
            className="rounded-md border border-slate-700/60 bg-slate-800/60 px-2 py-0.5 text-xs font-medium text-slate-300"
          >
            {t}
          </li>
        ))}
      </ul>

      {hasLinks && (
        <div className="relative z-10 mt-auto flex gap-4 border-t border-slate-800 pt-4 text-sm">
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-sm font-medium text-slate-400 transition-colors hover:text-white focus-visible:text-white focus-visible:underline focus-visible:underline-offset-4 focus-visible:outline-none"
            >
              Repo <span aria-hidden="true">-&gt;</span>
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-sm font-medium text-slate-400 transition-colors hover:text-white focus-visible:text-white focus-visible:underline focus-visible:underline-offset-4 focus-visible:outline-none"
            >
              Live <span aria-hidden="true">-&gt;</span>
            </a>
          )}
        </div>
      )}
    </article>
  )
}
