export default function Footer() {
  const currentYear = import.meta.env.VITE_BUILD_YEAR
  return (
    <footer className="border-t border-slate-800">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-6 py-6 text-sm text-slate-400">
        <span className="font-mono text-xs tracking-tight text-slate-400">
          © 2024–{currentYear} &nbsp;·&nbsp; Ekene Masha
        </span>
        <div className="flex gap-5">
          <a
            href="https://github.com/mash0040"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-sm transition-colors hover:text-white focus-visible:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
          >
            GitHub
            <span className="sr-only"> (opens in new tab)</span>
          </a>
          <a
            href="https://www.linkedin.com/in/mashaak"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-sm transition-colors hover:text-white focus-visible:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
          >
            LinkedIn
            <span className="sr-only"> (opens in new tab)</span>
          </a>
        </div>
      </div>
    </footer>
  )
}
