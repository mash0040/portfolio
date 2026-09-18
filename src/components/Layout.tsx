import { Outlet } from "react-router-dom"
import Navbar from "./Navbar"
import Footer from "./Footer"
import ScrollToTop from "./ScrollToTop"

export default function Layout() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-950 text-white">
      <ScrollToTop />
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-sky-500 focus:px-3 focus:py-2 focus:text-sm focus:font-medium focus:text-slate-950 focus:outline-none focus:ring-2 focus:ring-sky-300"
      >
        Skip to content
      </a>
      <Navbar />
      <main
        id="main-content"
        tabIndex={-1}
        /* scroll-mt clears the sticky nav so the skip link doesn't drop the
           top of the content underneath it. */
        className="flex-1 scroll-mt-20 px-6 outline-none"
      >
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
