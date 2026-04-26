import { Link } from "react-router-dom";
import ProjectCard from "../components/ProjectCard";
import { getFeaturedProjects } from "../utils/projects";

export default function Home() {
  const ctaBaseClass =
    "rounded-md px-5 py-2.5 font-medium transition-colors focus-visible:outline-none focus-visible:ring-2";
  const primaryCtaClass = `${ctaBaseClass} bg-sky-500 text-white hover:bg-sky-400 focus-visible:ring-sky-300`;
  const secondaryCtaClass = `${ctaBaseClass} border border-slate-700 text-slate-200 hover:border-slate-500 hover:text-white focus-visible:ring-slate-400`;

  const featured = getFeaturedProjects(3);

  return (
    <>
      <section className="mx-auto flex min-h-[70vh] max-w-6xl flex-col justify-center">
      <div className="max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-widest text-sky-400">
          Software Developer
        </p>

        <h1 className="mt-3 text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
          I build practical web apps that are fast, clean, and easy to maintain.
        </h1>

        <p className="mt-5 text-base leading-relaxed text-slate-300 sm:text-lg">
          I'm <span className="text-white">Ekene</span>, a software developer
          focused on building reliable, real-world web applications. I work
          across React, TypeScript, and Laravel, with experience designing REST
          APIs and debugging production systems. I also bring experience working
          with AI systems, where I evaluated model outputs, wrote structured
          prompts, and identified reproducible defects to improve system
          accuracy and reliability.
        </p>

        <div className="mt-8 inline-flex items-center gap-2 text-sm text-slate-400">
          <span
            aria-hidden="true"
            className="h-2 w-2 rounded-full bg-emerald-400"
          />
          Available for new opportunities
        </div>

        <div className="mt-5 flex flex-wrap gap-3 text-sm">
          <Link to="/projects" className={primaryCtaClass}>
            View projects <span aria-hidden="true">-&gt;</span>
          </Link>
          <Link to="/contact" className={secondaryCtaClass}>
            Get in touch
          </Link>
        </div>
      </div>
      </section>

      {featured.length > 0 && (
        <section className="mx-auto max-w-6xl py-10 sm:py-14">
          <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-widest text-sky-400">
                Featured Work
              </p>
              <h2 className="mt-3 text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl">
                Selected projects
              </h2>
              <p className="mt-3 text-base leading-relaxed text-slate-300">
                A few things I've built recently &mdash; full case studies on
                the projects page.
              </p>
            </div>
            <Link
              to="/projects"
              className="shrink-0 text-sm font-medium text-sky-400 transition-colors hover:text-sky-300"
            >
              View all projects <span aria-hidden="true">-&gt;</span>
            </Link>
          </header>

          <ul className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:gap-8 xl:grid-cols-3">
            {featured.map((project) => (
              <li key={project.slug}>
                <ProjectCard project={project} />
              </li>
            ))}
          </ul>
        </section>
      )}
    </>
  );
}
