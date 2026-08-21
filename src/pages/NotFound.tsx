import { Link } from "react-router-dom"
import { usePageMeta } from "../utils/usePageMeta"
import { NOT_FOUND_META } from "../utils/seo"

export default function NotFound() {
  usePageMeta(NOT_FOUND_META)

  return (
    <div className="mx-auto max-w-6xl py-20 sm:py-28">
      <div className="border border-dashed border-slate-800 px-6 py-20 text-center">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-slate-400">
          404
        </p>
        <h1
          className="mt-5 font-display text-4xl font-medium tracking-tight text-white sm:text-5xl"
          style={{ fontVariationSettings: '"opsz" 144' }}
        >
          Page not found.
        </h1>
        <p className="mt-4 text-base text-slate-400">
          The page you're looking for doesn't exist or has moved.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-x-7 gap-y-3 text-sm">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-md bg-sky-500 px-5 py-2.5 font-medium text-slate-950 transition-colors hover:bg-sky-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
          >
            Back to home
            <span aria-hidden="true">→</span>
          </Link>
          <Link
            to="/projects"
            className="group inline-flex items-center gap-2 font-medium text-slate-300 transition-colors hover:text-white"
          >
            <span className="border-b border-slate-700 pb-0.5 transition-colors group-hover:border-white">
              View projects
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
  )
}
