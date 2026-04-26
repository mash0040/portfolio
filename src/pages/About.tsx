import type { ReactNode } from "react";
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
        outputs, writing structured prompts, and identifying reproducible
        defects to help improve system accuracy and reliability. It taught me
        to treat ambiguity as a debugging surface in its own right.
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
          A software developer focused on building practical web apps and
          debugging production issues end to end. I work mostly across React,
          TypeScript, and Laravel, with a focus on clean APIs, predictable
          state flows, and reliable user-facing systems.
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
