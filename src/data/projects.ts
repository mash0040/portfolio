import type { Project } from "../types/project"

// Replace these placeholder entries with your real projects.
export const projects: Project[] = [
  {
    slug: "sample-project-a",
    title: "Sample Project A",
    description:
      "A personal portfolio site built to showcase projects with clean, content-first case studies.",
    tech: ["React", "TypeScript", "Tailwind", "Vite", "React Router"],
    repoUrl: "https://github.com/mash0040",
    liveUrl: "https://example.com",
    year: 2026,
    role: "Designer & Developer",
    featured: true,
    overview:
      "A static portfolio site that puts the work first. Each project has its own case study page with consistent typography, predictable structure, and no flashy animation getting in the way of the writing.",
    problem:
      "Most junior-developer portfolios bury the actual work under heavy animation, generic templates, or one-paragraph project blurbs that don't explain anything. I wanted a site that reads more like a designer's case-study deck — each project should answer what the problem was, what I built, and what I took away from it.",
    features: [
      "Reusable ProjectCard with hover lift, focus-visible ring, and a full-card click target",
      "Dynamic /projects/:slug route with graceful handling of unknown slugs",
      "Structured case study layout: Overview, Problem, Features, Challenges, What I Learned, Links",
      "Responsive grid that scales from a single column on mobile to three columns at xl",
      "Dark, accessible color palette tuned for long-form reading",
    ],
    challenges:
      "The trickiest part was making the whole project card clickable while keeping the inline Repo and Live links independently actionable — nesting <a> tags inside <Link> isn't valid HTML. I solved it with an absolutely-positioned overlay link and lifted the action links above it with z-index so both interaction targets work without breaking semantics.",
    learnings: [
      "Designing a small system of reusable components before writing any pages kept every later change small and predictable.",
      "Constraining text width to roughly 65 characters is the single highest-leverage typography decision on a content page.",
      "Tailwind v4's marker: variant lets you style list bullets without giving up native <ul> semantics.",
      "Optional, gracefully-degrading data fields make a content-driven site easier to fill out over time — half-finished case studies still look intentional.",
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
    repoUrl: "https://github.com/mash0040/Plant-Plotter.git",
    liveUrl: "https://plantplotter.me",
    year: 2026,
    role: "Full-stack developer / solo rebuild after group capstone",
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
      "The biggest challenge was turning a class project into a live application with real production concerns. I had to improve authentication, handle expired sessions, reduce unstable user flows, clean up validation, make the planner easier to use across desktop and mobile, and deploy the frontend, backend, database, DNS, and email service so they worked together reliably.",
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
        caption: "Visual planner — plants placed on a grid that persists to the API.",
      },
      {
        src: "plant-plotter/my-gardens.png",
        alt: "Plant Plotter My Gardens dashboard listing user-created gardens",
        caption: "My Gardens — multi-garden dashboard, per user.",
      },
      {
        src: "plant-plotter/garden-details.png",
        alt: "Plant Plotter garden details overview page",
        caption: "Garden details — overview, plants, analytics, and settings in one view.",
      },
      {
        src: "plant-plotter/companion-guide.png",
        alt: "Plant Plotter companion planting guidance",
        caption: "Companion guidance pulled from the plant dataset.",
      },
      {
        src: "plant-plotter/tracker.png",
        alt: "Plant Plotter tracker showing a calendar of garden care tasks",
        caption: "Tracker — calendar, today's tasks, overdue tasks, and weather context.",
      },
      {
        src: "plant-plotter/landing-page.png",
        alt: "Plant Plotter public landing page",
        caption: "Landing page — public marketing entry point.",
      },
    ],
  },
]
