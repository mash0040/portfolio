import { Link } from "react-router-dom"
import type { Project } from "../types/project"

type Props = {
  project: Project
  /** Heading rank for the card title. Sits under the section h2. */
  as?: "h2" | "h3"
}

export default function ProjectCard({ project, as = "h3" }: Props) {
  const hasLinks = Boolean(project.repoUrl || project.liveUrl)
  const Heading = as

  return (
    <article className="group relative flex h-full flex-col border border-slate-800 bg-slate-950 p-6 transition-colors duration-200 hover:border-slate-600 focus-within:border-slate-600 sm:p-7">
      <Link
        to={`/projects/${project.slug}/`}
        aria-label={`View ${project.title} case study`}
        className="absolute inset-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
      />

      {project.year && (
        <span className="font-mono text-[11px] uppercase tracking-widest text-slate-400">
          {project.year}
        </span>
      )}

      <Heading
        className="mt-3 font-display text-2xl font-medium leading-tight tracking-tight text-white transition-colors group-hover:text-slate-200 group-focus-within:text-slate-200"
        style={{ fontVariationSettings: '"opsz" 144' }}
      >
        {project.title}
      </Heading>

      <p className="mt-3 line-clamp-3 max-w-2xl text-sm leading-relaxed text-slate-400">
        {project.description}
      </p>

      <ul className="mt-5 flex max-w-2xl flex-wrap gap-x-3 gap-y-1 font-mono text-[11px] tracking-tight text-slate-400">
        {project.tech.map((t, i) => (
          <li key={t} className="flex items-center gap-3">
            <span>{t}</span>
            {i < project.tech.length - 1 && (
              <span aria-hidden="true" className="text-slate-500">
                ·
              </span>
            )}
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
                className="-my-2.5 rounded-sm py-2.5 font-mono text-xs uppercase tracking-widest text-slate-400 transition-colors hover:text-white focus-visible:text-white focus-visible:underline focus-visible:underline-offset-4 focus-visible:outline-none"
              >
                Repo
                <span className="sr-only"> (opens in new tab)</span>
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="-my-2.5 rounded-sm py-2.5 font-mono text-xs uppercase tracking-widest text-slate-400 transition-colors hover:text-white focus-visible:text-white focus-visible:underline focus-visible:underline-offset-4 focus-visible:outline-none"
              >
                Live
                <span className="sr-only"> (opens in new tab)</span>
              </a>
            )}
          </div>
        ) : (
          <span aria-hidden="true" />
        )}
        <span
          aria-hidden="true"
          className="font-display text-xl text-slate-500 transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-white group-focus-within:translate-x-0.5 group-focus-within:text-white"
        >
          →
        </span>
      </div>
    </article>
  )
}
