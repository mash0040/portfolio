# Source Code Context

This workspace contains the React application code.

## Tech Stack
- React
- Vite
- Tailwind CSS
- React Router
- JavaScript

## Folder Structure
- /components — Reusable UI components
- /pages — Route-level pages
- /data — Project, skills, and content data
- /assets — Images, icons, screenshots, resume
- /services — External integrations if added later
- /utils — Helper functions
- /tests — Component and utility tests

## Coding Standards
- Use functional React components.
- Use PascalCase for components and pages.
- Keep components small and reusable.
- Keep page components focused on layout and content composition.
- Avoid hardcoding project content directly inside components.
- Store project information in /data/projects.js.
- Use Tailwind CSS utility classes.
- Use semantic HTML where possible.
- Make components responsive from the beginning.

## Component Guidelines
Good reusable components include:
- Navbar
- Footer
- Button
- SectionHeading
- ProjectCard
- SkillBadge
- TechStackList
- CaseStudySection

## Routing
Expected routes:
- /
- /about
- /projects
- /projects/:slug
- /contact

## Testing Expectations
For MVP, test manually:
- Navigation works
- Project detail pages load correctly
- Site works on mobile
- Links open correctly
- Resume download works
- No console errors

Later, add automated tests for:
- Project card rendering
- Project detail route rendering
- Utility functions

## What Good Code Looks Like
- Easy to read
- Consistent naming
- Responsive
- Accessible
- Reusable
- Not overcomplicated