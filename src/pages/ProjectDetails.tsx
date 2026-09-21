import { useCallback, useEffect, useRef, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { getProjectBySlug } from "../utils/projects"
import { resolveScreenshots, type ResolvedShot } from "../utils/assets"
import { usePageMeta } from "../utils/usePageMeta"
import { NOT_FOUND_META, projectPageMeta } from "../utils/seo"

type Section = { id: string } & (
  | { kind: "paragraph"; heading: string; body: string }
  | { kind: "list"; heading: string; items: string[] }
  | { kind: "screenshots"; heading: string; items: ResolvedShot[] }
)

const displayStyle = { fontVariationSettings: '"opsz" 144' }

export default function ProjectDetails() {
  const { slug } = useParams<{ slug: string }>()
  const project = getProjectBySlug(slug)

  // Called unconditionally: the not-found branch below returns early, so the
  // hook order has to be identical on both paths.
  usePageMeta(project ? projectPageMeta(project) : NOT_FOUND_META)

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const triggerRefs = useRef<Array<HTMLButtonElement | null>>([])
  const closeBtnRef = useRef<HTMLButtonElement | null>(null)

  const closeLightbox = useCallback(() => {
    setLightboxIndex((idx) => {
      if (idx === null) return null
      // Wait for the lightbox to unmount before restoring focus to the trigger.
      requestAnimationFrame(() => triggerRefs.current[idx]?.focus())
      return null
    })
  }, [])

  useEffect(() => {
    if (lightboxIndex === null) return
    closeBtnRef.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeLightbox()
        return
      }
      // Trap focus inside the dialog. The Close button is the only focusable
      // element, so any Tab / Shift+Tab attempt just re-focuses it instead of
      // leaking into the page behind the overlay.
      if (e.key === "Tab") {
        e.preventDefault()
        closeBtnRef.current?.focus()
      }
    }
    document.addEventListener("keydown", onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [lightboxIndex, closeLightbox])

  if (!project) {
    return (
      <div className="mx-auto max-w-6xl py-20 sm:py-28">
        <div className="border border-dashed border-slate-800 px-6 py-20 text-center">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-slate-400">
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

  const screenshots: ResolvedShot[] = resolveScreenshots(project.screenshots)
  const activeShot = lightboxIndex !== null ? screenshots[lightboxIndex] ?? null : null

  const sections: Section[] = []
  if (project.problem) {
    sections.push({ id: "section-problem", kind: "paragraph", heading: "Problem", body: project.problem })
  }
  if (project.solution) {
    sections.push({ id: "section-solution", kind: "paragraph", heading: "Solution", body: project.solution })
  }
  if (project.features && project.features.length > 0) {
    sections.push({ id: "section-features", kind: "list", heading: "Features", items: project.features })
  }
  if (screenshots.length > 0) {
    sections.push({ id: "section-screenshots", kind: "screenshots", heading: "Screenshots", items: screenshots })
  }
  if (project.challenges) {
    sections.push({ id: "section-challenges", kind: "paragraph", heading: "Challenges", body: project.challenges })
  }
  if (project.improvements && project.improvements.length > 0) {
    sections.push({ id: "section-what-i-improved", kind: "list", heading: "What I Improved", items: project.improvements })
  }
  if (project.learnings && project.learnings.length > 0) {
    sections.push({ id: "section-what-i-learned", kind: "list", heading: "What I Learned", items: project.learnings })
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
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-slate-400">
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
          <dl className="mt-8 grid grid-cols-2 gap-x-8 gap-y-3 border-t border-slate-800 pt-6 font-mono text-xs uppercase tracking-widest sm:max-w-md sm:grid-cols-[auto_1fr]">
            {project.year && (
              <>
                <dt className="text-slate-400">Year</dt>
                <dd className="text-slate-300">{project.year}</dd>
              </>
            )}
            {project.role && (
              <>
                <dt className="text-slate-400">Role</dt>
                <dd className="text-slate-300">{project.role}</dd>
              </>
            )}
          </dl>
        )}

        {project.tech.length > 0 && (
          <ul className="mt-6 flex flex-wrap gap-x-3 gap-y-1 font-mono text-[11px] tracking-tight text-slate-400">
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
              <section
                key={section.id}
                aria-labelledby={section.id}
                className="grid gap-2 sm:grid-cols-12"
              >
                <div className="sm:col-span-3">
                  <h2
                    id={section.id}
                    className="font-mono text-xs font-normal uppercase tracking-[0.25em] text-slate-400"
                  >
                    <span className="text-slate-300">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    &nbsp;·&nbsp;
                    {section.heading}
                  </h2>
                </div>
                <div className="sm:col-span-9">
                  {section.kind === "paragraph" ? (
                    <p className="whitespace-pre-line text-base leading-relaxed text-slate-300">
                      {section.body}
                    </p>
                  ) : section.kind === "list" ? (
                    <ul className="list-disc space-y-3 pl-5 text-base leading-relaxed text-slate-300 marker:text-slate-500">
                      {section.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  ) : (
                    <ul className="space-y-8">
                      {section.items.map((shot, shotIndex) => (
                        <li key={shot.src}>
                          <figure>
                            <button
                              type="button"
                              ref={(el) => {
                                triggerRefs.current[shotIndex] = el
                              }}
                              onClick={() => setLightboxIndex(shotIndex)}
                              aria-label={`Open ${shot.alt} at full size`}
                              className="block w-full cursor-zoom-in overflow-hidden rounded-md border border-slate-800 bg-slate-900 transition-colors hover:border-slate-600 focus-visible:border-slate-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
                            >
                              <img
                                src={shot.previewUrl}
                                srcSet={shot.previewSrcSet}
                                sizes="(min-width: 816px) 572px, (min-width: 640px) calc(75vw - 40px), calc(100vw - 50px)"
                                width={shot.width}
                                height={shot.height}
                                alt={shot.alt}
                                loading="lazy"
                                className="block h-auto w-full"
                                style={{ aspectRatio: `${shot.width} / ${shot.height}` }}
                              />
                            </button>
                            {shot.caption && (
                              <figcaption className="mt-3 font-mono text-xs leading-relaxed text-slate-400">
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
              <section
                aria-labelledby="section-links"
                className="grid gap-2 sm:grid-cols-12"
              >
                <div className="sm:col-span-3">
                  <h2
                    id="section-links"
                    className="font-mono text-xs font-normal uppercase tracking-[0.25em] text-slate-400"
                  >
                    <span className="text-slate-300">
                      {String(sections.length + 1).padStart(2, "0")}
                    </span>
                    &nbsp;·&nbsp;
                    Links
                  </h2>
                </div>
                <div className="min-w-0 sm:col-span-9">
                  <ul className="space-y-4">
                    {project.liveUrl && (
                      <li>
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex min-w-0 flex-col items-start gap-1 text-sm sm:flex-row sm:items-baseline sm:gap-4"
                        >
                          <span className="w-14 shrink-0 font-mono text-xs uppercase tracking-widest text-slate-400">
                            Live
                          </span>
                          <span className="min-w-0 max-w-full wrap-anywhere border-b border-slate-700 pb-0.5 font-medium text-white transition-colors group-hover:border-white">
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
                          className="group flex min-w-0 flex-col items-start gap-1 text-sm sm:flex-row sm:items-baseline sm:gap-4"
                        >
                          <span className="w-14 shrink-0 font-mono text-xs uppercase tracking-widest text-slate-400">
                            Code
                          </span>
                          <span className="min-w-0 max-w-full wrap-anywhere border-b border-slate-700 pb-0.5 font-medium text-white transition-colors group-hover:border-white">
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

      {activeShot && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={activeShot.alt}
          onClick={(e) => {
            // Only close when the click hits the backdrop itself, not a child
            // (image, close button, or the transparent letterbox area). This
            // also lets us drop the stopPropagation on the image.
            if (e.target === e.currentTarget) closeLightbox()
          }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/95 p-4 sm:p-8"
        >
          <button
            ref={closeBtnRef}
            type="button"
            onClick={closeLightbox}
            aria-label="Close screenshot"
            className="absolute right-4 top-4 inline-flex items-center gap-2 rounded-md border border-slate-700 bg-slate-900/80 px-3 py-1.5 font-mono text-xs uppercase tracking-widest text-slate-300 transition-colors hover:border-white hover:text-white focus-visible:border-white focus-visible:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
          >
            Close <span aria-hidden="true">×</span>
          </button>
          <img
            src={activeShot.url}
            alt={activeShot.alt}
            className="max-h-[90vh] max-w-[95vw] rounded-md border border-slate-800 object-contain"
          />
        </div>
      )}
    </div>
  )
}
