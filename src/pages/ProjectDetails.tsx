import { Link, useParams } from "react-router-dom"
import { getProjectBySlug } from "../utils/projects"

// Resolves any image under src/assets/* at build time. Screenshot entries
// referencing files that don't exist yet are silently skipped, so the page
// renders fine even before the actual screenshot files are dropped in.
const assetUrls = import.meta.glob(
  "../assets/**/*.{png,jpg,jpeg,webp,gif,svg}",
  { eager: true, query: "?url", import: "default" },
) as Record<string, string>

function resolveAsset(relPath: string): string | undefined {
  return assetUrls[`../assets/${relPath}`]
}

type ResolvedShot = { src: string; url: string; alt: string; caption?: string }

type Section =
  | { kind: "paragraph"; heading: string; body: string }
  | { kind: "list"; heading: string; items: string[] }
  | { kind: "screenshots"; heading: string; items: ResolvedShot[] }

const displayStyle = { fontVariationSettings: '"opsz" 144' }

export default function ProjectDetails() {
  const { slug } = useParams<{ slug: string }>()
  const project = getProjectBySlug(slug)

  if (!project) {
    return (
      <div className="mx-auto max-w-6xl py-20 sm:py-28">
        <div className="border border-dashed border-slate-800 px-6 py-20 text-center">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-slate-500">
            404
          </p>
          <h1
            className="mt-5 font-display text-3xl font-medium tracking-tight text-white sm:text-4xl"
            style={displayStyle}
          >
            Project not found.
          </h1>
          <p className="mt-4 text-base text-slate-400">
            We couldn't find that project.
          </p>
          <Link
            to="/projects"
            className="group mt-6 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-slate-400 transition-colors hover:text-white"
          >
            <span aria-hidden="true">←</span>
            <span className="border-b border-slate-700 pb-0.5 transition-colors group-hover:border-white">
              Back to projects
            </span>
          </Link>
        </div>
      </div>
    )
  }

  const sections: Section[] = []
  if (project.problem) {
    sections.push({ kind: "paragraph", heading: "Problem", body: project.problem })
  }
  if (project.solution) {
    sections.push({ kind: "paragraph", heading: "Solution", body: project.solution })
  }
  if (project.features && project.features.length > 0) {
    sections.push({ kind: "list", heading: "Features", items: project.features })
  }
  if (project.screenshots && project.screenshots.length > 0) {
    const resolved: ResolvedShot[] = project.screenshots
      .map((shot) => {
        const url = resolveAsset(shot.src)
        return url ? { ...shot, url } : null
      })
      .filter((shot): shot is ResolvedShot => shot !== null)
    if (resolved.length > 0) {
      sections.push({ kind: "screenshots", heading: "Screenshots", items: resolved })
    }
  }
  if (project.challenges) {
    sections.push({ kind: "paragraph", heading: "Challenges", body: project.challenges })
  }
  if (project.improvements && project.improvements.length > 0) {
    sections.push({ kind: "list", heading: "What I Improved", items: project.improvements })
  }
  if (project.learnings && project.learnings.length > 0) {
    sections.push({ kind: "list", heading: "What I Learned", items: project.learnings })
  }

  const hasLinks = Boolean(project.repoUrl || project.liveUrl)
  const hasBody = Boolean(project.overview) || sections.length > 0 || hasLinks

  return (
    <div className="mx-auto max-w-6xl py-20 sm:py-28">
      <Link
        to="/projects"
        className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-slate-400 transition-colors hover:text-white focus-visible:text-white focus-visible:outline-none"
      >
        <span
          aria-hidden="true"
          className="transition-transform group-hover:-translate-x-0.5"
        >
          ←
        </span>
        <span className="border-b border-slate-700 pb-0.5 transition-colors group-hover:border-white">
          Back to projects
        </span>
      </Link>

      <header className="mt-12 max-w-3xl">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-slate-500">
          Case Study
        </p>
        <h1
          className="mt-6 font-display text-5xl font-medium leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl"
          style={displayStyle}
        >
          {project.title}
        </h1>
        <p className="mt-7 text-base leading-relaxed text-slate-300 sm:text-lg">
          {project.description}
        </p>

        {(project.year || project.role) && (
          <dl className="mt-8 grid grid-cols-2 gap-x-8 gap-y-3 border-t border-slate-800 pt-6 font-mono text-xs uppercase tracking-widest sm:max-w-md sm:grid-cols-[auto,1fr]">
            {project.year && (
              <>
                <dt className="text-slate-500">Year</dt>
                <dd className="text-slate-300">{project.year}</dd>
              </>
            )}
            {project.role && (
              <>
                <dt className="text-slate-500">Role</dt>
                <dd className="text-slate-300">{project.role}</dd>
              </>
            )}
          </dl>
        )}

        {project.tech.length > 0 && (
          <ul className="mt-6 flex flex-wrap gap-x-3 gap-y-1 font-mono text-[11px] tracking-tight text-slate-400">
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
        )}

        {hasLinks && (
          <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-3 text-sm">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-md bg-sky-500 px-5 py-2.5 font-medium text-slate-950 transition-colors hover:bg-sky-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
              >
                View live <span aria-hidden="true">→</span>
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
                <span className="border-b border-slate-700 pb-0.5 transition-colors group-hover:border-white">
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
        )}
      </header>

      {hasBody && (
        <div className="mt-16 border-t border-slate-800/80 pt-16 sm:mt-20 sm:pt-20">
          <div className="max-w-3xl space-y-14 sm:space-y-16">
            {project.overview && (
              <p className="text-lg leading-relaxed text-slate-200">
                {project.overview}
              </p>
            )}

            {sections.map((section, i) => (
              <section key={section.heading} className="grid gap-2 sm:grid-cols-12">
                <div className="sm:col-span-3">
                  <p className="font-mono text-xs uppercase tracking-[0.25em] text-slate-500">
                    <span className="text-slate-400">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    &nbsp;—&nbsp;
                    {section.heading}
                  </p>
                </div>
                <div className="sm:col-span-9">
                  {section.kind === "paragraph" ? (
                    <p className="whitespace-pre-line text-base leading-relaxed text-slate-300">
                      {section.body}
                    </p>
                  ) : section.kind === "list" ? (
                    <ul className="list-disc space-y-3 pl-5 text-base leading-relaxed text-slate-300 marker:text-slate-600">
                      {section.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  ) : (
                    <ul className="space-y-8">
                      {section.items.map((shot) => (
                        <li key={shot.src}>
                          <figure>
                            <img
                              src={shot.url}
                              alt={shot.alt}
                              loading="lazy"
                              className="block w-full rounded-md border border-slate-800 bg-slate-900"
                            />
                            {shot.caption && (
                              <figcaption className="mt-3 font-mono text-xs leading-relaxed text-slate-500">
                                {shot.caption}
                              </figcaption>
                            )}
                          </figure>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </section>
            ))}

            {hasLinks && (
              <section className="grid gap-2 sm:grid-cols-12">
                <div className="sm:col-span-3">
                  <p className="font-mono text-xs uppercase tracking-[0.25em] text-slate-500">
                    <span className="text-slate-400">
                      {String(sections.length + 1).padStart(2, "0")}
                    </span>
                    &nbsp;—&nbsp;
                    Links
                  </p>
                </div>
                <div className="sm:col-span-9">
                  <ul className="space-y-4">
                    {project.liveUrl && (
                      <li>
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex items-baseline gap-4 text-sm"
                        >
                          <span className="w-14 shrink-0 font-mono text-xs uppercase tracking-widest text-slate-500">
                            Live
                          </span>
                          <span className="break-all border-b border-slate-700 pb-0.5 font-medium text-white transition-colors group-hover:border-white">
                            {project.liveUrl}
                          </span>
                        </a>
                      </li>
                    )}
                    {project.repoUrl && (
                      <li>
                        <a
                          href={project.repoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex items-baseline gap-4 text-sm"
                        >
                          <span className="w-14 shrink-0 font-mono text-xs uppercase tracking-widest text-slate-500">
                            Code
                          </span>
                          <span className="break-all border-b border-slate-700 pb-0.5 font-medium text-white transition-colors group-hover:border-white">
                            {project.repoUrl}
                          </span>
                        </a>
                      </li>
                    )}
                  </ul>
                </div>
              </section>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
