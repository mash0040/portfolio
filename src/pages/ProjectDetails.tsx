import { useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import { getProjectBySlug } from "../utils/projects"

type Section =
  | { kind: "paragraph"; heading: string; body: string }
  | { kind: "list"; heading: string; items: string[] }

export default function ProjectDetails() {
  const { slug } = useParams<{ slug: string }>()
  const project = getProjectBySlug(slug)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [slug])

  if (!project) {
    return (
      <div className="mx-auto max-w-6xl py-10 sm:py-14">
        <div className="rounded-xl border border-dashed border-slate-800 px-6 py-16 text-center">
          <h1 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            Project not found
          </h1>
          <p className="mt-3 text-base text-slate-400">
            We couldn't find that project.
          </p>
          <Link
            to="/projects"
            className="mt-4 inline-block text-sm font-medium text-sky-400 transition-colors hover:text-sky-300"
          >
            <span aria-hidden="true" className="mr-1">&larr;</span>
            Back to projects
          </Link>
        </div>
      </div>
    )
  }

  const sections: Section[] = []
  if (project.problem) {
    sections.push({ kind: "paragraph", heading: "Problem", body: project.problem })
  }
  if (project.features && project.features.length > 0) {
    sections.push({ kind: "list", heading: "Features", items: project.features })
  }
  if (project.challenges) {
    sections.push({ kind: "paragraph", heading: "Challenges", body: project.challenges })
  }
  if (project.learnings && project.learnings.length > 0) {
    sections.push({ kind: "list", heading: "What I Learned", items: project.learnings })
  }

  const hasLinks = Boolean(project.repoUrl || project.liveUrl)
  const hasBody = Boolean(project.overview) || sections.length > 0 || hasLinks

  return (
    <div className="mx-auto max-w-6xl py-10 sm:py-14">
      <Link
        to="/projects"
        className="inline-flex items-center text-sm font-medium text-slate-400 transition-colors hover:text-white"
      >
        <span aria-hidden="true" className="mr-1">&larr;</span>
        Back to projects
      </Link>

      <header className="mt-6 max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-widest text-sky-400">
          Case Study
        </p>
        <h1 className="mt-3 text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl">
          {project.title}
        </h1>
        <p className="mt-5 text-base leading-relaxed text-slate-300 sm:text-lg">
          {project.description}
        </p>

        {(project.year || project.role) && (
          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-slate-400">
            {project.year && (
              <span>
                <span className="text-slate-500">Year:</span> {project.year}
              </span>
            )}
            {project.role && (
              <span>
                <span className="text-slate-500">Role:</span> {project.role}
              </span>
            )}
          </div>
        )}

        {project.tech.length > 0 && (
          <ul className="mt-5 flex flex-wrap gap-1.5">
            {project.tech.map((t) => (
              <li
                key={t}
                className="rounded-md border border-slate-700/60 bg-slate-800/60 px-2 py-0.5 text-xs font-medium text-slate-300"
              >
                {t}
              </li>
            ))}
          </ul>
        )}

        {hasLinks && (
          <div className="mt-6 flex flex-wrap gap-3 text-sm">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="rounded-md bg-sky-500 px-4 py-2 font-medium text-white transition-colors hover:bg-sky-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300"
              >
                View live <span aria-hidden="true">-&gt;</span>
              </a>
            )}
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noreferrer"
                className="rounded-md border border-slate-700 px-4 py-2 font-medium text-slate-200 transition-colors hover:border-slate-500 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
              >
                View code <span aria-hidden="true">-&gt;</span>
              </a>
            )}
          </div>
        )}
      </header>

      {hasBody && (
        <div className="mt-10 border-t border-slate-800 pt-10 sm:mt-14 sm:pt-14">
          <div className="max-w-3xl space-y-12 sm:space-y-16">
            {project.overview && (
              <p className="text-lg leading-relaxed text-slate-200">
                {project.overview}
              </p>
            )}

            {sections.map((section) => (
              <section key={section.heading}>
                <h2 className="text-xl font-semibold tracking-tight text-white">
                  {section.heading}
                </h2>
                {section.kind === "paragraph" ? (
                  <p className="mt-3 whitespace-pre-line text-base leading-relaxed text-slate-300">
                    {section.body}
                  </p>
                ) : (
                  <ul className="mt-3 list-disc space-y-2 pl-5 text-base leading-relaxed text-slate-300 marker:text-sky-500/60">
                    {section.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
              </section>
            ))}

            {hasLinks && (
              <section>
                <h2 className="text-xl font-semibold tracking-tight text-white">
                  Links
                </h2>
                <div className="mt-3 space-y-3 rounded-lg border border-slate-800 bg-slate-900/60 p-5">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="group flex items-baseline gap-3 text-sm"
                    >
                      <span className="w-14 shrink-0 text-slate-500">Live</span>
                      <span className="break-all font-medium text-sky-400 transition-colors group-hover:text-sky-300">
                        {project.liveUrl}
                      </span>
                    </a>
                  )}
                  {project.repoUrl && (
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="group flex items-baseline gap-3 text-sm"
                    >
                      <span className="w-14 shrink-0 text-slate-500">Code</span>
                      <span className="break-all font-medium text-sky-400 transition-colors group-hover:text-sky-300">
                        {project.repoUrl}
                      </span>
                    </a>
                  )}
                </div>
              </section>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
