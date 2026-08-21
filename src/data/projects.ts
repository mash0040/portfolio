import type { Project } from "../types/project";

export const projects: Project[] = [
  {
    slug: "traineros",
    title: "TrainerOS",
    description:
      "A coaching platform for personal trainers and their clients. Trainers write programs; clients log their sets from the gym floor.",
    tech: [
      ".NET 8",
      "ASP.NET Core",
      "C#",
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "Vite",
      "PostgreSQL",
      "EF Core",
      "Azure Functions",
      "Azure App Service",
      "Neon",
      "Resend",
      "xUnit",
      "Vitest",
      "GitHub Actions",
    ],
    repoUrl: "https://github.com/mash0040/traineros",
    liveUrl: "https://traineros.me",
    year: 2026,
    role: "Solo full-stack developer",
    featured: true,
    leadImage: "traineros/clients-roster.png",
    overview:
      "An ASP.NET Core API serving a React SPA from a single App Service, with a separate Function App running the reminder pipeline off a Storage queue, and Postgres on Neon. Sessions are server-side and revocable, data access is scoped so a query for another trainer's client won't compile, and reminder delivery is idempotent through a unique index rather than application logic.",
    problem:
      "Programs went out over Google Sheets and WhatsApp. What came back was inconsistent: a notes app, a photo of a page, memory, or nothing. There was no record of what a client actually lifted, and no way to notice someone had stopped training until they said so. In-person clients lived in the trainer's iPhone Notes.",
    solution:
      "Clients sign in from an emailed link, pick the day they're training, and log each set next to what they lifted at that position last time. Scheduled reminders go out per client, with a one-tap pause. The trainer sees every session: the date, the client's note, and each set in that client's own unit.",
    features: [
      "Magic-link auth with revocable server-side sessions",
      "Per-client programs with days and prescriptions in real coaching language (8-10, AMRAP, RPE 8)",
      "Inline last-time numbers on the logging screen, positioned beside the set being entered",
      "Same-day set editing and deletion",
      "Session notes recorded against the workout",
      "Per-client kg/lb display with canonical storage",
      "Scheduled reminder emails with a one-tap pause link",
      "Trainer views of client history, plus an exercise library with soft-delete",
    ],
    challenges:
      "The hard part was making cross-tenant data leaks structurally impossible rather than a thing I had to remember. Getting there meant data-access paths that make a cross-tenant query fail to compile, and uniform 404s so one trainer can't probe whether another's record exists. The reminder pipeline was its own problem: it runs on a timer in a separate Function App, reads schedules from the same Postgres the API uses, and signs pause links with a key the API validates, so a key mismatch makes every pause link look forged.",
    improvements: [
      "Built on a five-document spec frozen before any code, then amended in place whenever implementation contradicted it, so the docs describe what exists rather than what was planned",
      "Made security structural instead of a matter of discipline: data-access paths where cross-tenant queries fail to compile, and uniform 404s so records can't be probed",
      "Adopted mutation testing as standard practice: break the mechanism, confirm the test fails, revert",
      "Split the reminder pipeline into a queue-backed Function App so a slow or failing send never blocks an API request",
      "Stored weights canonically and converted at the edge, so a client switching between kg and lb never rewrites their own history",
      "Gated deploys on EF migrations, so a failed migration stops the pipeline instead of shipping code that assumes it applied",
    ],
    learnings: [
      "Green tests prove nothing on their own. Mutation testing caught seven tests that passed while asserting nothing real, one of which was pinning a shipped bug as correct behaviour.",
      "Specs go stale against reality. The trainer screens were specified desktop-first, and it took using them in a gym to notice that a personal trainer doesn't work at a desk.",
      "Writing the spec first only pays off if you amend it when the code disagrees, otherwise you end up with documentation that quietly describes a different product.",
      "Designing the data layer so the wrong query won't compile beats reviewing every query for the right tenant filter.",
      "Showing last session's numbers next to the input is the entire product for a client mid-set, and it changed how I prioritised everything else.",
    ],
    screenshots: [
      {
        src: "traineros/day-picker.jpeg",
        alt: "TrainerOS client view of today's Upper day with targets and cues",
        caption:
          "The client opens straight into the day they're training.",
      },
      {
        src: "traineros/log-workout.jpeg",
        alt: "TrainerOS logging screen with last time's numbers beside the inputs",
        caption:
          "Progression without remembering, or scrolling back through history.",
      },
      {
        src: "traineros/reminder-email.jpeg",
        alt: "TrainerOS reminder email on a phone, with a one-tap pause link",
        caption:
          "Goes out on each client's own schedule rather than a global one.",
      },
      {
        src: "traineros/clients-roster.png",
        alt: "TrainerOS clients table with last-session and status columns",
        caption:
          "Who trained today and who has gone quiet, at a glance.",
      },
      {
        src: "traineros/trainer-client-detail.png",
        alt: "TrainerOS client detail page with programs and reminder settings",
        caption:
          "Send time is set in the client's own timezone, not the trainer's.",
      },
      {
        src: "traineros/program-builder.png",
        alt: "TrainerOS day editor with sets, reps, load and rest per exercise",
        caption:
          "Prescriptions stay free text, so 6-8, AMRAP and RPE 8 survive as typed.",
      },
    ],
  },
  {
    slug: "plant-plotter",
    title: "Plant Plotter",
    description:
      "A live full-stack garden planning and care-tracking app where users create gardens, plan plant placement, review companion planting guidance, and manage care tasks over time.",
    tech: [
      "Next.js 15",
      "React 19",
      "Tailwind CSS",
      "Node.js",
      "Express",
      "MySQL",
      "JWT",
      "Azure",
      "Vercel",
      "GitHub Actions",
    ],
    repoUrl: "https://github.com/mash0040/Plant-Plotter",
    liveUrl: "https://plantplotter.me",
    year: 2026,
    role: "Full-stack developer / solo continuation of client group project",
    overview:
      "Plant Plotter is a live garden planning and care-tracking app. Users can create an account, set up one or more gardens, plan where plants should go, review companion planting guidance, and track care activities like watering, fertilizing, pruning, harvesting, weeding, and planting. The app is deployed with a Next.js frontend on Vercel, an Express API on Azure App Service, and a MySQL database hosted on an Azure Ubuntu VM.",
    problem:
      "Beginner gardeners often struggle with organizing their garden layout, deciding which plants should be placed together, and keeping track of ongoing garden care. The original version started as a client-focused final group project. After the initial delivery, I continued developing it independently because the concept was strong, but the app needed clearer flows, stronger validation, authentication polish, mobile improvements, performance work, and a real production deployment.",
    solution:
      "I continued the project as a production-ready full-stack app. The final flow lets users create gardens, add garden details, place plants visually on a grid, review companion planting guidance, and manage care through activities and scheduled tasks. I improved the authentication flow, protected routes, garden planner behavior, tracker workflows, mobile handling, API performance, password reset, and deployment setup.",
    features: [
      "Account creation, login, password reset, and protected routes",
      "JWT auth with expired-session cleanup and bcrypt-hashed passwords",
      "Multi-garden dashboard with dimensions, soil type, location, status, and unit preference",
      "Visual planner with plant search, footprint sizes, overlap validation, bounds checking, and saved layouts",
      "Mobile-friendly planner that emphasizes row planting over drag-and-drop",
      "Companion planting guidance based on the plant dataset",
      "Tracker with calendar, today/upcoming/overdue tasks, and weather context",
      "Context-aware task creation for plantings, individual garden plants, or whole gardens",
    ],
    challenges:
      "The biggest challenge was turning a client group project into a live application with real production concerns. I had to improve authentication, handle expired sessions, reduce unstable user flows, clean up validation, make the planner easier to use across desktop and mobile, and deploy the frontend, backend, database, DNS, and email service so they worked together reliably.",
    improvements: [
      "Shipped to a real production environment behind plantplotter.me with a custom domain",
      "Replaced course-grade auth with JWT, bcrypt, password reset, and expired-session cleanup",
      "Strengthened planner placement with footprint checks, bounds and overlap validation, and saved layouts",
      "Reworked planner UX for mobile after drag-and-drop proved awkward on touch",
      "Reduced duplicate garden detail fetches; added plant-library caching, MySQL indexes, and a lighter garden summary endpoint",
      "Wired up Vercel, Azure App Service, MySQL on an Azure VM, Resend, Open-Meteo, GitHub Actions, and Namecheap DNS so the full stack deploys together",
    ],
    learnings: [
      "How to take a school project past the demo stage and into a real production environment",
      "How frontend, API, database, DNS, email, and CORS concerns connect once you actually ship",
      "How to handle protected routes and expired-token flows on the wire",
      "How to lighten an API by trimming payloads, caching reference data, and indexing the right columns",
      "When to make mobile behave differently from desktop instead of forcing the same interaction",
      "How to communicate project decisions clearly in a written case study",
    ],
    screenshots: [
      {
        src: "plant-plotter/planner.png",
        alt: "Plant Plotter visual planner with plants placed on a numbered garden grid",
        caption:
          "Visual planner: plants placed on a grid that persists to the API.",
      },
      {
        src: "plant-plotter/my-gardens.png",
        alt: "Plant Plotter My Gardens dashboard listing user-created gardens",
        caption: "My Gardens: multi-garden dashboard, per user.",
      },
      {
        src: "plant-plotter/garden-details.png",
        alt: "Plant Plotter garden details overview page",
        caption:
          "Garden details: overview, plants, analytics, and settings in one view.",
      },
      {
        src: "plant-plotter/companion-guide.png",
        alt: "Plant Plotter companion planting guidance",
        caption: "Companion guidance pulled from the plant dataset.",
      },
      {
        src: "plant-plotter/tracker.png",
        alt: "Plant Plotter tracker showing a calendar of garden care tasks",
        caption:
          "Tracker: calendar, today's tasks, overdue tasks, and weather context.",
      },
      {
        src: "plant-plotter/landing-page.png",
        alt: "Plant Plotter public landing page",
        caption: "Landing page: public marketing entry point.",
      },
    ],
  },
  {
    slug: "portfolio",
    title: "Personal Portfolio",
    description:
      "This site itself: a personal portfolio built with React, TypeScript, and Tailwind CSS that presents each project as a full case study.",
    tech: ["React", "TypeScript", "Tailwind", "Vite", "React Router"],
    repoUrl: "https://github.com/mash0040/portfolio",
    liveUrl: "https://akmasha.dev",
    year: 2026,
    role: "Designer & Developer",
    overview:
      "A static portfolio site that puts the work first. Each project has its own case study page with consistent typography, a predictable structure, and nothing flashy getting in the way of the writing. It's a single-page React app written in TypeScript, styled with Tailwind CSS, routed with React Router, and deployed on Cloudflare Pages.",
    problem:
      "Most junior developer portfolios lean on heavy animation, generic templates, or one-paragraph blurbs that don't explain the work. I wanted a site that reads more like a case study deck: each project should answer what the problem was, what I built, and what I took away from it.",
    features: [
      "Reusable ProjectCard with hover and focus-visible states and a full-card click target",
      "Dynamic /projects/:slug routes via React Router, with a fallback page for unknown slugs",
      "Structured case study layout: Overview, Problem, Features, Challenges, What I Learned, Links",
      "Project content kept in one typed data file, separate from the UI components",
      "Screenshot galleries with lazy-loaded images and a keyboard-accessible lightbox",
      "Responsive grid that scales from a single column on mobile to three columns at xl",
      "Dark, accessible color palette tuned for long-form reading",
    ],
    challenges:
      "The trickiest part was making the whole project card clickable while keeping the inline Repo and Live links independently actionable, since nesting <a> tags inside a <Link> isn't valid HTML. I solved it with an absolutely positioned overlay link and lifted the action links above it with z-index, so both targets work without breaking semantics.",
    learnings: [
      "Designing a small system of reusable components before writing any pages kept every later change small and predictable.",
      "Keeping text width to roughly 65 characters did more for readability than any other typography decision.",
      "Tailwind v4's marker: variant lets you style list bullets without giving up native <ul> semantics.",
      "Optional data fields make a content-driven site easier to fill out over time: a case study with missing sections still renders as an intentional page.",
    ],
  },
];
