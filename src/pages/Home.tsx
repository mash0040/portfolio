import { Link } from "react-router-dom";
import ProjectCard from "../components/ProjectCard";
import { getFeaturedProjects } from "../utils/projects";

export default function Home() {
  const featured = getFeaturedProjects(3);

  return (
    <>
      <section
        aria-labelledby="hero-heading"
        className="relative isolate overflow-hidden"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[640px]"
          style={{
            backgroundImage:
              "radial-gradient(60% 55% at 30% 20%, rgba(56, 189, 248, 0.14), transparent 70%)",
            maskImage:
              "radial-gradient(70% 70% at 30% 30%, black, transparent 80%)",
            WebkitMaskImage:
              "radial-gradient(70% 70% at 30% 30%, black, transparent 80%)",
          }}
        />

        <div className="mx-auto flex min-h-[70vh] max-w-6xl flex-col justify-center py-20 sm:py-28">
          <div className="max-w-3xl">
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-slate-500">
              01 &nbsp;—&nbsp; Software Developer
            </p>

            <h1
              id="hero-heading"
              className="mt-6 font-display text-5xl font-medium leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl"
              style={{ fontVariationSettings: '"opsz" 144' }}
            >
              I build practical web apps that are fast, clean, and easy to
              maintain.
            </h1>

            <p className="mt-7 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
              I'm{" "}
              <a
                href="https://namedrop.io/Akmasha"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="text-white">Ekene</span>
              </a>
              , a software developer focused on building reliable, real-world
              web applications. I work across React, TypeScript, and Laravel,
              with experience designing REST APIs and debugging production
              systems. I also bring experience working with AI systems &mdash;
              evaluating model outputs, writing structured prompts, and
              identifying reproducible defects to improve system accuracy and
              reliability.
            </p>

            <div className="mt-8 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-slate-400">
              <span
                aria-hidden="true"
                className="h-1.5 w-1.5 rounded-full bg-emerald-400 ring-2 ring-emerald-400/20"
              />
              Available for new opportunities
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-3 text-sm">
              <Link
                to="/projects"
                className="inline-flex items-center gap-2 rounded-md bg-sky-500 px-5 py-2.5 font-medium text-slate-950 transition-colors hover:bg-sky-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
              >
                View projects
                <span aria-hidden="true">→</span>
              </Link>
              <Link
                to="/contact"
                className="group inline-flex items-center gap-2 font-medium text-slate-300 transition-colors hover:text-white focus-visible:text-white focus-visible:outline-none"
              >
                <span className="border-b border-slate-700 pb-0.5 transition-colors group-hover:border-white">
                  Get in touch
                </span>
                <span
                  aria-hidden="true"
                  className="text-slate-500 transition-all group-hover:translate-x-0.5 group-hover:text-white"
                >
                  →
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {featured.length > 0 && (
        <section
          aria-labelledby="recent-heading"
          className="border-t border-slate-800/80"
        >
          <div className="mx-auto max-w-6xl py-20 sm:py-28">
            <header className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <div className="max-w-2xl">
                <p className="font-mono text-xs uppercase tracking-[0.25em] text-slate-500">
                  02 &nbsp;—&nbsp; Recent Work
                </p>
                <h2
                  id="recent-heading"
                  className="mt-5 font-display text-4xl font-medium leading-tight tracking-tight text-white sm:text-5xl"
                  style={{ fontVariationSettings: '"opsz" 144' }}
                >
                  What I'm building lately.
                </h2>
                <p className="mt-4 text-base leading-relaxed text-slate-400">
                  A few things I've shipped recently &mdash; full case studies
                  on the projects page.
                </p>
              </div>
              <Link
                to="/projects"
                className="group inline-flex shrink-0 items-center gap-2 font-mono text-xs uppercase tracking-widest text-slate-400 transition-colors hover:text-white focus-visible:text-white focus-visible:outline-none"
              >
                <span className="border-b border-slate-700 pb-0.5 transition-colors group-hover:border-white">
                  View all
                </span>
                <span
                  aria-hidden="true"
                  className="transition-all group-hover:translate-x-0.5"
                >
                  →
                </span>
              </Link>
            </header>

            <ul className="mt-12 grid grid-cols-1 gap-5 sm:mt-14 sm:grid-cols-2 lg:gap-6 xl:grid-cols-3">
              {featured.map((project) => (
                <li key={project.slug}>
                  <ProjectCard project={project} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </>
  );
}
