import { Link } from "react-router-dom"
import type { Project } from "../types/project"

type Props = { project: Project }

export default function ProjectCard({ project }: Props) {
  const hasLinks = Boolean(project.repoUrl || project.liveUrl)

  return (
    <article className="group relative flex h-full flex-col border border-slate-800 bg-slate-950 p-6 transition-colors duration-200 hover:border-slate-600 focus-within:border-slate-600 sm:p-7">
      <Link
        to={`/projects/${project.slug}`}
        aria-label={`View ${project.title} case study`}
        className="absolute inset-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
      />

      {project.year && (
        <span className="font-mono text-[11px] uppercase tracking-widest text-slate-500">
          {project.year}
        </span>
      )}

      <h2
        className="mt-3 font-display text-2xl font-medium leading-tight tracking-tight text-white transition-colors group-hover:text-slate-200 group-focus-within:text-slate-200 sm:text-[1.65rem]"
        style={{ fontVariationSettings: '"opsz" 144' }}
      >
        {project.title}
      </h2>

      <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-slate-400">
        {project.description}
      </p>

      <ul className="mt-5 flex flex-wrap gap-x-3 gap-y-1 font-mono text-[11px] tracking-tight text-slate-400">
        {project.tech.map((t, i) => (
          <li key={t} className="flex items-center gap-3">
            {i > 0 && (
              <span aria-hidden="true" className="text-slate-700">
                ·
              </span>
            )}
            <span>{t}</span>
          </li>
        ))}
      </ul>

      <div className="relative z-10 mt-auto flex items-end justify-between gap-4 pt-6">
        {hasLinks ? (
          <div className="flex gap-5 text-sm">
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-sm font-mono text-xs uppercase tracking-widest text-slate-500 transition-colors hover:text-white focus-visible:text-white focus-visible:underline focus-visible:underline-offset-4 focus-visible:outline-none"
              >
                Repo
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-sm font-mono text-xs uppercase tracking-widest text-slate-500 transition-colors hover:text-white focus-visible:text-white focus-visible:underline focus-visible:underline-offset-4 focus-visible:outline-none"
              >
                Live
              </a>
            )}
          </div>
        ) : (
          <span aria-hidden="true" />
        )}
        <span
          aria-hidden="true"
          className="font-display text-xl text-slate-600 transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-white group-focus-within:translate-x-0.5 group-focus-within:text-white"
        >
          →
        </span>
      </div>
    </article>
  )
}
