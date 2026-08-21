import { Link } from "react-router-dom"
import type { Project } from "../types/project"
import { resolveAsset } from "../utils/assets"

type Props = {
  project: Project
  /** Heading rank for the project title. Sits under the section h2. */
  as?: "h2" | "h3"
}

const displayStyle = { fontVariationSettings: '"opsz" 144' }

/**
 * The lead project, set as a full-width editorial block rather than a card.
 * A single card stranded in a multi-column grid reads as a rendering fault;
 * the featured slot holds one project, so it gets the full measure instead.
 */
export default function FeaturedProject({ project, as = "h3" }: Props) {
  const Heading = as
  // Opt-in only: a project has to name a landscape lead image, otherwise the
  // panel runs without one rather than cropping a portrait screenshot.
  const lead = project.leadImage ? resolveAsset(project.leadImage) : undefined
  const blurb = project.overview ?? project.description
  const meta = [project.year, project.role].filter(Boolean)

  return (
    <article>
      {meta.length > 0 && (
        <p className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] uppercase tracking-widest text-slate-400">
          {meta.map((item, i) => (
            <span key={String(item)} className="flex items-center gap-3">
              {i > 0 && (
                <span aria-hidden="true" className="text-slate-500">
                  ·
                </span>
              )}
              <span>{item}</span>
            </span>
          ))}
        </p>
      )}

      <Heading
        className="mt-4 font-display text-4xl font-medium leading-tight tracking-tight text-white sm:text-5xl"
        style={displayStyle}
      >
        <Link
          to={`/projects/${project.slug}`}
          className="rounded-sm transition-colors hover:text-slate-200 focus-visible:text-slate-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-4 focus-visible:ring-offset-slate-950"
        >
          {project.title}
        </Link>
      </Heading>

      <p className="mt-6 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
        {blurb}
      </p>

      {project.tech.length > 0 && (
        <ul className="mt-6 flex max-w-3xl flex-wrap gap-x-3 gap-y-1 font-mono text-[11px] tracking-tight text-slate-400">
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
      )}

      <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-3 text-sm">
        <Link
          to={`/projects/${project.slug}`}
          className="group inline-flex items-center gap-2 font-medium text-white focus-visible:outline-none"
        >
          <span className="border-b border-slate-600 pb-0.5 transition-colors group-hover:border-white group-focus-visible:border-white">
            Read case study
          </span>
          <span
            aria-hidden="true"
            className="text-slate-500 transition-all group-hover:translate-x-0.5 group-hover:text-white group-focus-visible:text-white"
          >
            →
          </span>
        </Link>

        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 font-medium text-slate-300 transition-colors hover:text-white focus-visible:text-white focus-visible:outline-none"
          >
            <span className="border-b border-slate-700 pb-0.5 transition-colors group-hover:border-white group-focus-visible:border-white">
              View live
            </span>
            <span
              aria-hidden="true"
              className="text-slate-500 transition-all group-hover:translate-x-0.5 group-hover:text-white"
            >
              →
            </span>
            <span className="sr-only"> (opens in new tab)</span>
          </a>
        )}

        {project.repoUrl && (
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 font-medium text-slate-300 transition-colors hover:text-white focus-visible:text-white focus-visible:outline-none"
          >
            <span className="border-b border-slate-700 pb-0.5 transition-colors group-hover:border-white group-focus-visible:border-white">
              View code
            </span>
            <span
              aria-hidden="true"
              className="text-slate-500 transition-all group-hover:translate-x-0.5 group-hover:text-white"
            >
              →
            </span>
            <span className="sr-only"> (opens in new tab)</span>
          </a>
        )}
      </div>

      {lead && (
        <Link
          to={`/projects/${project.slug}`}
          tabIndex={-1}
          aria-hidden="true"
          className="mt-12 hidden max-w-3xl border border-slate-800 transition-colors hover:border-slate-600 sm:block"
        >
          <img
            src={lead}
            alt=""
            loading="lazy"
            className="block aspect-[2/1] w-full object-cover object-top"
          />
        </Link>
      )}
    </article>
  )
}
