import type { ReactNode } from "react";
import { Link } from "react-router-dom";

const techGroups: { label: string; items: string[] }[] = [
  {
    label: "Frontend",
    items: ["React", "TypeScript", "Tailwind CSS", "Next.js"],
  },
  {
    label: "Backend",
    items: ["Node.js", "Express.js", "REST APIs", "JWT Auth"],
  },
  {
    label: "Database & Tools",
    items: ["MySQL", "Git", "GitHub", "Vite", "Vercel", "Azure"],
  },
];

const experience = [
  "Built and deployed Plant Plotter, a live full-stack garden planning and care-tracking app with authentication, protected routes, garden creation, visual plant planning, companion planting guidance, task tracking, and MySQL persistence.",
  "Improved a group capstone project into a production-ready app by refining validation, authentication flows, mobile behavior, tracker workflows, API performance, and deployment across Vercel and Azure.",
  "Designed and consumed REST APIs, handling auth, validation, error states, protected routes, and user-specific data.",
  "Debugged full-stack issues by tracing problems through the UI, API, database, environment variables, CORS, deployment settings, and browser behavior.",
  "Built responsive interfaces with React, TypeScript, and Tailwind CSS, focusing on clear layouts, accessible UI patterns, and maintainable component structure.",
];

const now = [
  "Improving Plant Plotter as a portfolio-ready full-stack project.",
  "Strengthening my backend fundamentals with Node.js, Express, REST APIs, authentication, and MySQL.",
  "Building clearer project case studies that explain not just what I built, but the decisions, trade-offs, and improvements behind the work.",
  "Targeting entry-level and junior software developer roles where I can contribute to real products and keep growing with a team.",
];

const sections: {
  number: string;
  label: string;
  heading: string;
  body: ReactNode;
}[] = [
  {
    number: "01",
    label: "Stack",
    heading: "Technical focus",
    body: (
      <div className="mt-6 grid grid-cols-1 gap-8 sm:grid-cols-3">
        {techGroups.map((group) => (
          <div key={group.label}>
            <h3 className="font-mono text-[11px] uppercase tracking-widest text-slate-500">
              {group.label}
            </h3>
            <ul className="mt-3 space-y-1.5 text-sm text-slate-300">
              {group.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    ),
  },
  {
    number: "02",
    label: "Experience",
    heading: "What I've worked on",
    body: (
      <ul className="mt-5 list-disc space-y-3 pl-5 text-base leading-relaxed text-slate-300 marker:text-slate-600">
        {experience.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    ),
  },
  {
    number: "03",
    label: "AI",
    heading: "Working with AI systems",
    body: (
      <p className="mt-5 text-base leading-relaxed text-slate-300">
        I've also worked on the AI side of software &mdash; evaluating model
        outputs, writing structured prompts, validating responses, and
        identifying reproducible defects. That experience strengthened how I
        think about debugging, edge cases, clarity, and quality control.
      </p>
    ),
  },
  {
    number: "04",
    label: "Now",
    heading: "What I'm doing this year",
    body: (
      <ul className="mt-5 list-disc space-y-3 pl-5 text-base leading-relaxed text-slate-300 marker:text-slate-600">
        {now.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    ),
  },
];

export default function About() {
  return (
    <div className="mx-auto max-w-6xl py-20 sm:py-28">
      <header className="max-w-3xl">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-slate-500">
          About
        </p>
        <h1
          className="mt-6 font-display text-5xl font-medium leading-[1.05] tracking-tight text-white sm:text-6xl"
          style={{ fontVariationSettings: '"opsz" 144' }}
        >
          Hi, I'm Ekene.
        </h1>
        <p className="mt-7 text-base leading-relaxed text-slate-300 sm:text-lg">
          I'm a software developer focused on building practical full-stack
          web apps and improving real user flows from the interface down to
          the API and database. I work mostly across React, TypeScript,
          Node.js, Express, and MySQL, with a focus on clean APIs,
          predictable state, authentication, debugging, and deployment.
        </p>
      </header>

      <div className="mt-16 space-y-16 border-t border-slate-800/80 pt-16 sm:mt-20 sm:space-y-20 sm:pt-20">
        {sections.map((section) => (
          <section key={section.number} className="grid gap-2 sm:grid-cols-12">
            <div className="sm:col-span-3">
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-slate-500">
                <span className="text-slate-400">{section.number}</span>
                &nbsp;—&nbsp;
                {section.label}
              </p>
            </div>
            <div className="sm:col-span-9">
              <h2
                className="font-display text-2xl font-medium tracking-tight text-white sm:text-3xl"
                style={{ fontVariationSettings: '"opsz" 144' }}
              >
                {section.heading}
              </h2>
              {section.body}
            </div>
          </section>
        ))}

        <section className="grid gap-2 sm:grid-cols-12">
          <div className="sm:col-span-3">
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-slate-500">
              <span className="text-slate-400">05</span>
              &nbsp;—&nbsp;
              Contact
            </p>
          </div>
          <div className="sm:col-span-9">
            <h2
              className="font-display text-2xl font-medium tracking-tight text-white sm:text-3xl"
              style={{ fontVariationSettings: '"opsz" 144' }}
            >
              Get in touch
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-300">
              Want to talk shop, collaborate, or hire me?{" "}
              <Link
                to="/contact"
                className="group inline-flex items-center gap-1.5 font-medium text-white"
              >
                <span className="border-b border-slate-600 pb-0.5 transition-colors group-hover:border-white">
                  Reach out
                </span>
                <span
                  aria-hidden="true"
                  className="text-slate-500 transition-all group-hover:translate-x-0.5 group-hover:text-white"
                >
                  →
                </span>
              </Link>
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
