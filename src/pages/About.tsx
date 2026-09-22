import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { usePageMeta } from "../utils/usePageMeta";
import { ABOUT_META } from "../utils/seo";

const techGroups: { label: string; items: string[] }[] = [
  {
    label: "Frontend",
    items: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Vite"],
  },
  {
    label: "Backend",
    items: ["C#", "ASP.NET Core", "Node.js", "Express", "Python", "REST APIs"],
  },
  {
    label: "Data & authentication",
    items: ["PostgreSQL", "MySQL", "EF Core", "JWT", "magic-link sessions"],
  },
  {
    label: "Testing & API tools",
    items: ["xUnit", "Vitest", "Selenium", "Postman"],
  },
  {
    label: "Cloud & delivery",
    items: ["Azure", "Vercel", "Render", "Cloudflare Pages", "Neon", "Aiven", "GitHub Actions"],
  },
  {
    label: "Integrations",
    items: ["Resend for transactional email"],
  },
];

const experience = [
  {
    label: "TrainerOS",
    description: "Built and deployed a multi-tenant coaching platform with magic-link authentication, revocable sessions, and trainer-scoped data access. Moved reminders into queue-backed background processing to keep delivery failures separate from API requests.",
  },
  {
    label: "Plant Plotter",
    description: "Continued a group capstone independently, improving authentication, password recovery, garden-layout validation, mobile interactions, and database performance.",
  },
  {
    label: "Testing",
    description: "Used mutation testing to verify that tests detect broken behavior, uncovering ineffective assertions and a test that incorrectly treated a shipped bug as expected behavior.",
  },
  {
    label: "Deployment",
    description: "Built GitHub Actions pipelines for cloud deployments, including migration checks that stop a release when required database changes fail.",
  },
  {
    label: "Debugging",
    description: "Traced problems across the interface, API, database, and hosting configuration to identify their underlying causes.",
  },
];

const now = [
  "Extending and maintaining TrainerOS while refining my other projects.",
  "Deepening my knowledge of cloud infrastructure, deployment, and application reliability.",
  "Exploring developments in AI and evaluating where they can improve products and development workflows.",
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
      <div className="mt-6 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {techGroups.map((group) => (
          <div key={group.label}>
            <h3 className="font-mono text-[11px] uppercase tracking-widest text-slate-400">
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
    heading: "What I’ve worked on",
    body: (
      <ul className="mt-5 max-w-xl list-disc space-y-3 pl-5 text-base leading-relaxed text-slate-300 marker:text-slate-500">
        {experience.map((item) => (
          <li key={item.label}>
            <strong className="font-semibold text-slate-200">{item.label}:</strong>{" "}
            {item.description}
          </li>
        ))}
      </ul>
    ),
  },
  {
    number: "03",
    label: "AI",
    heading: "Working with AI systems",
    body: (
      <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-300">
        My AI-related work includes evaluating model outputs with Python,
        writing structured prompts, validating responses, and documenting
        reproducible defects. I bring the same attention to edge cases and
        clear evidence to my software projects.
      </p>
    ),
  },
  {
    number: "04",
    label: "Now",
    heading: "Current focus",
    body: (
      <ul className="mt-5 max-w-xl list-disc space-y-3 pl-5 text-base leading-relaxed text-slate-300 marker:text-slate-500">
        {now.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    ),
  },
];

export default function About() {
  usePageMeta(ABOUT_META);

  return (
    <div className="mx-auto max-w-6xl py-20 sm:py-28">
      <header className="max-w-3xl">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-slate-400">
          About
        </p>
        <h1
          className="mt-6 font-display text-5xl font-medium leading-[1.05] tracking-tight text-white sm:text-6xl"
        >
          Hi, I’m Ekene.
        </h1>
        <p className="mt-7 text-base leading-relaxed text-slate-300 sm:text-lg">
          I’m a software developer who builds and maintains full-stack
          applications, taking ideas from design through deployment.
        </p>
        <p className="mt-5 text-base leading-relaxed text-slate-300 sm:text-lg">
          I care about thoughtful user experiences and dependable software:
          secure authentication, well-designed data access, meaningful tests,
          and reliable releases. I enjoy solving problems across the stack,
          learning new tools, and choosing approaches that fit the product.
        </p>
      </header>

      <div className="mt-16 space-y-16 border-t border-slate-800/80 pt-16 sm:mt-20 sm:space-y-20 sm:pt-20">
        {sections.map((section) => (
          <section key={section.number} className="grid gap-2 sm:grid-cols-12">
            <div className="sm:col-span-3">
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-slate-400">
                <span className="text-slate-300">{section.number}</span>
                &nbsp;·&nbsp;
                {section.label}
              </p>
            </div>
            <div className="sm:col-span-9">
              <h2
                className="font-display text-2xl font-medium tracking-tight text-white sm:text-3xl"
              >
                {section.heading}
              </h2>
              {section.body}
            </div>
          </section>
        ))}

        <section className="grid gap-2 sm:grid-cols-12">
          <div className="sm:col-span-3">
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-slate-400">
              <span className="text-slate-300">05</span>
              &nbsp;·&nbsp;
              Contact
            </p>
          </div>
          <div className="sm:col-span-9">
            <h2
              className="font-display text-2xl font-medium tracking-tight text-white sm:text-3xl"
            >
              Get in touch
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-300">
              Want to talk shop, collaborate, or hire me?{" "}
              <Link
                to="/contact/"
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
