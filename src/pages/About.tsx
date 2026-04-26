import { Link } from "react-router-dom";

const techGroups: { label: string; items: string[] }[] = [
  { label: "Frontend", items: ["React", "TypeScript", "Tailwind CSS"] },
  { label: "Backend", items: ["Laravel", "PHP", "REST APIs"] },
  { label: "Tools", items: ["Git", "Vite", "GitHub"] },
];

const experience = [
  "Debugged production issues across full-stack apps, tracing bugs from the UI down through the API and database layers.",
  "Built and consumed REST APIs in Laravel, handling auth, validation, and error states cleanly.",
  "Designed and shipped responsive interfaces in React with TypeScript, prioritizing accessibility and clear state management.",
  "Worked with relational databases (PostgreSQL, MySQL) — schema design, basic query tuning, and migrations.",
];

const now = [
  "Sharpening my Laravel skills with API-first projects.",
  "Reading more about systems design and reliability.",
  "Shipping this portfolio and writing case studies for the work in it.",
];

export default function About() {
  return (
    <div className="mx-auto max-w-6xl py-10 sm:py-14">
      <header className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-widest text-sky-400">
          About
        </p>
        <h1 className="mt-3 text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl">
          Hi, I'm Ekene.
        </h1>
        <p className="mt-5 text-base leading-relaxed text-slate-300 sm:text-lg">
          I'm a software developer focused on building practical web apps and
          debugging production issues end to end. I work mostly across React,
          TypeScript, and Laravel, with a focus on clean APIs, predictable
          state flows, and reliable user-facing systems.
        </p>
      </header>

      <div className="mt-10 border-t border-slate-800 pt-10 sm:mt-14 sm:pt-14">
        <div className="max-w-3xl space-y-12 sm:space-y-16">
          <section>
            <h2 className="text-xl font-semibold tracking-tight text-white">
              Technical focus
            </h2>
            <div className="mt-5 grid grid-cols-1 gap-6 sm:grid-cols-3">
              {techGroups.map((group) => (
                <div key={group.label}>
                  <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                    {group.label}
                  </h3>
                  <ul className="mt-3 flex flex-wrap gap-1.5">
                    {group.items.map((item) => (
                      <li
                        key={item}
                        className="rounded-md border border-slate-700/60 bg-slate-800/60 px-2 py-0.5 text-xs font-medium text-slate-300"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold tracking-tight text-white">
              Experience highlights
            </h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-base leading-relaxed text-slate-300 marker:text-sky-500/60">
              {experience.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold tracking-tight text-white">
              AI work
            </h2>
            <p className="mt-3 text-base leading-relaxed text-slate-300">
              I've also worked on the AI side of software &mdash; evaluating
              model outputs, writing structured prompts, and identifying
              reproducible defects to help improve system accuracy and
              reliability. It taught me to treat ambiguity as a debugging
              surface in its own right.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold tracking-tight text-white">
              Now
            </h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-base leading-relaxed text-slate-300 marker:text-sky-500/60">
              {now.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold tracking-tight text-white">
              Get in touch
            </h2>
            <p className="mt-3 text-base leading-relaxed text-slate-300">
              Want to talk shop, collaborate, or hire me?{" "}
              <Link
                to="/contact"
                className="font-medium text-sky-400 transition-colors hover:text-sky-300"
              >
                Reach out <span aria-hidden="true">-&gt;</span>
              </Link>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
