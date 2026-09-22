import FeaturedProject from "../components/FeaturedProject"
import ProjectCard from "../components/ProjectCard"
import { projects } from "../data/projects"
import { getFeaturedProjects, getSelectedProjects } from "../utils/projects"
import { usePageMeta } from "../utils/usePageMeta"
import { PROJECTS_META } from "../utils/seo"

// Two columns at most, so a trailing odd card can span the full measure
// instead of stranding two empty tracks beside it.
const cardGrid =
  "mt-10 grid gap-5 lg:gap-6 [grid-template-columns:repeat(auto-fit,minmax(min(100%,28rem),1fr))] [&>li:last-child:nth-child(odd)]:col-span-full"

export default function Projects() {
  usePageMeta(PROJECTS_META)
  const featured = getFeaturedProjects()
  const selected = getSelectedProjects()
  const total = projects.length

  return (
    <div className="mx-auto max-w-6xl py-20 sm:py-28">
      <header className="max-w-3xl">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-slate-400">
          Work
        </p>
        <h1
          className="mt-6 font-display text-5xl font-medium leading-[1.05] tracking-tight text-white sm:text-6xl"
        >
          Projects.
        </h1>
        <p className="mt-7 text-base leading-relaxed text-slate-300 sm:text-lg">
          A selection of things I've built: small experiments, side projects,
          and work I'm proud of. Each one taught me something new.
        </p>
      </header>

      <div className="mt-16 border-t border-slate-800/80 pt-16 sm:mt-20 sm:pt-20">
        {total === 0 ? (
          <div className="border border-dashed border-slate-800 px-6 py-20 text-center">
            <p className="font-mono text-xs uppercase tracking-widest text-slate-400">
              No projects yet. Check back soon.
            </p>
          </div>
        ) : (
          <div className="space-y-20 sm:space-y-28">
            {featured.length > 0 && (
              <section aria-labelledby="featured-heading">
                <header className="max-w-2xl">
                  <p className="font-mono text-xs uppercase tracking-[0.25em] text-slate-400">
                    <span className="text-slate-300">01</span>
                    &nbsp;·&nbsp; Current
                  </p>
                  <h2
                    id="featured-heading"
                    className="mt-5 font-display text-2xl font-medium tracking-tight text-white sm:text-3xl"
                  >
                    {featured.length === 1
                      ? "Featured Project."
                      : "Featured Projects."}
                  </h2>
                  <p className="mt-3 text-sm text-slate-400">
                    Actively developed, deployed, and maintained in production.
                  </p>
                </header>
                <div className="mt-12 space-y-20 sm:space-y-24">
                  {featured.map((project) => (
                    <FeaturedProject key={project.slug} project={project} />
                  ))}
                </div>
              </section>
            )}

            {selected.length > 0 && (
              <section aria-labelledby="selected-heading">
                <header className="max-w-2xl">
                  <p className="font-mono text-xs uppercase tracking-[0.25em] text-slate-400">
                    <span className="text-slate-300">02</span>
                    &nbsp;·&nbsp; Completed
                  </p>
                  <h2
                    id="selected-heading"
                    className="mt-5 font-display text-2xl font-medium tracking-tight text-white sm:text-3xl"
                  >
                    Selected Projects.
                  </h2>
                  <p className="mt-3 text-sm text-slate-400">
                    Completed work, presented as full case studies.
                  </p>
                </header>
                <ul className={cardGrid}>
                  {selected.map((project) => (
                    <li key={project.slug}>
                      <ProjectCard project={project} />
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
