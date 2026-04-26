import ProjectCard from "../components/ProjectCard"
import { projects } from "../data/projects"
import { getEarlierProjects, getRecentProjects } from "../utils/projects"

export default function Projects() {
  const recent = getRecentProjects()
  const earlier = getEarlierProjects()
  const total = projects.length

  return (
    <div className="mx-auto max-w-6xl py-20 sm:py-28">
      <header className="max-w-3xl">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-slate-500">
          Work
        </p>
        <h1
          className="mt-6 font-display text-5xl font-medium leading-[1.05] tracking-tight text-white sm:text-6xl"
          style={{ fontVariationSettings: '"opsz" 144' }}
        >
          Projects.
        </h1>
        <p className="mt-7 text-base leading-relaxed text-slate-300 sm:text-lg">
          A selection of things I've built — small experiments, side projects,
          and work I'm proud of. Each one taught me something new.
        </p>
      </header>

      <div className="mt-16 border-t border-slate-800/80 pt-16 sm:mt-20 sm:pt-20">
        {total === 0 ? (
          <div className="border border-dashed border-slate-800 px-6 py-20 text-center">
            <p className="font-mono text-xs uppercase tracking-widest text-slate-500">
              No projects yet — check back soon.
            </p>
          </div>
        ) : (
          <div className="space-y-20 sm:space-y-28">
            {recent.length > 0 && (
              <section aria-labelledby="recent-heading">
                <header className="grid gap-2 sm:grid-cols-12">
                  <div className="sm:col-span-3">
                    <p className="font-mono text-xs uppercase tracking-[0.25em] text-slate-500">
                      <span className="text-slate-400">01</span>
                      &nbsp;—&nbsp;
                      Recent
                    </p>
                  </div>
                  <div className="sm:col-span-9">
                    <h2
                      id="recent-heading"
                      className="font-display text-3xl font-medium tracking-tight text-white sm:text-4xl"
                      style={{ fontVariationSettings: '"opsz" 144' }}
                    >
                      What I'm building lately.
                    </h2>
                    <p className="mt-3 text-sm text-slate-400">
                      Recent work and what I'm shipping right now.
                    </p>
                  </div>
                </header>
                <ul className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:gap-6 xl:grid-cols-3">
                  {recent.map((project) => (
                    <li key={project.slug}>
                      <ProjectCard project={project} />
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {earlier.length > 0 && (
              <section aria-labelledby="earlier-heading">
                <header className="grid gap-2 sm:grid-cols-12">
                  <div className="sm:col-span-3">
                    <p className="font-mono text-xs uppercase tracking-[0.25em] text-slate-500">
                      <span className="text-slate-400">02</span>
                      &nbsp;—&nbsp;
                      Earlier
                    </p>
                  </div>
                  <div className="sm:col-span-9">
                    <h2
                      id="earlier-heading"
                      className="font-display text-3xl font-medium tracking-tight text-white sm:text-4xl"
                      style={{ fontVariationSettings: '"opsz" 144' }}
                    >
                      Things I've built before.
                    </h2>
                    <p className="mt-3 text-sm text-slate-400">
                      Older but still part of how I got here.
                    </p>
                  </div>
                </header>
                <ul className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:gap-6 xl:grid-cols-3">
                  {earlier.map((project) => (
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
