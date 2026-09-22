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
    items: ["ASP.NET Core", "C#", "Python", "Node.js", "Express", "REST APIs"],
  },
  {
    label: "Data & Auth",
    items: ["PostgreSQL", "MySQL", "EF Core", "JWT", "Magic-link sessions"],
  },
  {
    label: "Platform & Testing",
    items: ["Azure", "Vercel", "GitHub Actions", "xUnit", "Vitest"],
  },
];

const experience = [
  "Built and shipped TrainerOS, a multi-tenant coaching platform on ASP.NET Core and Postgres, with magic-link auth, revocable server-side sessions, and data access scoped so a query for another trainer's client fails to compile.",
  "Moved reminder delivery into a queue-backed Azure Function App so a slow or failing send never blocks an API request, with duplicate sends prevented by a unique index rather than application logic.",
  "Took Plant Plotter from a group capstone to a live product: replaced course-grade auth with JWT, bcrypt, and password reset, added footprint and overlap validation to the planner, reworked it for touch after drag-and-drop proved awkward on mobile, and cut API load with caching, lighter payloads, and MySQL indexes.",
  "Adopted mutation testing as standard practice: break the mechanism, confirm the test fails, revert. It caught seven tests that passed while asserting nothing real, one of which was pinning a shipped bug as correct behaviour.",
  "Wired deployments across Azure App Service, Azure Functions, Vercel, Neon, and Cloudflare Pages, with GitHub Actions pipelines gated on EF Core migrations so a failed migration stops the deploy instead of shipping code that assumes it applied.",
  "Debugged full-stack issues by tracing problems through the UI, API, database, environment variables, CORS, deployment settings, and browser behavior.",
];

const now = [
  "Extending TrainerOS, which is deployed, actively maintained, and the project I point people at first.",
  "Deepening my .NET and C# work: EF Core query shaping, background processing, and tests that fail when the mechanism breaks.",
  "Building clearer project case studies that explain not just what I built, but the decisions, trade-offs, and improvements behind the work.",
  "Targeting junior to mid-level full-stack roles where I can own features end to end and keep learning from a team.",
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
      <div className="mt-6 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
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
    heading: "What I've worked on",
    body: (
      <ul className="mt-5 max-w-xl list-disc space-y-3 pl-5 text-base leading-relaxed text-slate-300 marker:text-slate-500">
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
      <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-300">
        I've also worked on the AI side of software: evaluating model
        outputs in Python, writing structured prompts, validating responses,
        and identifying reproducible defects. That experience strengthened
        how I think about debugging, edge cases, clarity, and quality
        control.
      </p>
    ),
  },
  {
    number: "04",
    label: "Now",
    heading: "What I'm doing this year",
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
          Hi, I'm Ekene.
        </h1>
        <p className="mt-7 text-base leading-relaxed text-slate-300 sm:text-lg">
          I'm a software developer who builds full-stack products and ships
          them. React and TypeScript on the front end, ASP.NET Core or
          Node.js on the back, with Postgres or MySQL behind them. What I
          care about most is the unglamorous part: auth that holds, data
          access that can't leak between tenants, tests that fail when
          something actually breaks, and deploys that stop themselves when a
          migration doesn't apply.
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
