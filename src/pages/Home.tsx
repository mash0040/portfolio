import { Link } from "react-router-dom";
import FeaturedProject from "../components/FeaturedProject";
import { getFeaturedProjects } from "../utils/projects";
import { usePageMeta } from "../utils/usePageMeta";
import { HOME_META } from "../utils/seo";

const displayStyle = { fontVariationSettings: '"opsz" 144' };

export default function Home() {
  usePageMeta(HOME_META);
  const featured = getFeaturedProjects(3);

  return (
    <>
      <section
        aria-labelledby="hero-heading"
        className="relative isolate overflow-hidden"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-160"
          style={{
            backgroundImage:
              "radial-gradient(60% 55% at 30% 20%, rgba(56, 189, 248, 0.2), transparent 70%)",
            maskImage:
              "radial-gradient(75% 75% at 30% 30%, black, transparent 85%)",
            WebkitMaskImage:
              "radial-gradient(75% 75% at 30% 30%, black, transparent 85%)",
          }}
        />

        <div className="mx-auto flex min-h-[70vh] max-w-6xl flex-col justify-center py-20 sm:py-28">
          <div className="max-w-3xl">
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-slate-400">
              <span className="text-slate-300">01</span>
              &nbsp;·&nbsp; Software Developer
            </p>

            <h1
              id="hero-heading"
              className="mt-6 font-display text-5xl font-medium leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl"
              style={displayStyle}
            >
              I build practical full-stack web apps from idea to deployment.
            </h1>

            <p className="mt-7 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
              I'm{" "}
              <a
                href="https://namedrop.io/Akmasha"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Listen to the pronunciation of Ekene"
                title="Listen to the pronunciation of Ekene"
                className="text-white underline decoration-sky-400 underline-offset-4 transition hover:text-sky-300"
              >
                Ekene
              </a>
              , a software developer building reliable web applications with
              React and TypeScript on the front end and ASP.NET Core or
              Node.js behind them. I care about clean APIs, auth that holds,
              and shipping apps that are stable enough for real users.
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
          aria-labelledby="featured-heading"
          className="border-t border-slate-800/80"
        >
          <div className="mx-auto max-w-6xl py-20 sm:py-28">
            <header className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <div className="max-w-2xl">
                <p className="font-mono text-xs uppercase tracking-[0.25em] text-slate-400">
                  <span className="text-slate-300">02</span>
                  &nbsp;·&nbsp; Current Work
                </p>
                <h2
                  id="featured-heading"
                  className="mt-5 font-display text-4xl font-medium leading-tight tracking-tight text-white sm:text-5xl"
                  style={displayStyle}
                >
                  {featured.length === 1
                    ? "Featured Project."
                    : "Featured Projects."}
                </h2>
                <p className="mt-4 text-base leading-relaxed text-slate-400">
                  The project that best represents my current work. The full
                  write-up is on its case study page.
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

            <div className="mt-12 space-y-20 sm:mt-14 sm:space-y-24">
              {featured.map((project) => (
                <FeaturedProject key={project.slug} project={project} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
