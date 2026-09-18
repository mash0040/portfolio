import { useEffect, useRef } from "react"
import { useLocation } from "react-router-dom"

export default function ScrollToTop() {
  const { pathname } = useLocation()
  const previousPathname = useRef(pathname)

  useEffect(() => {
    window.scrollTo(0, 0)
    // Only move focus when the page changes, including Back/Forward. Initial
    // loads and same-page anchors keep their native keyboard behavior.
    if (previousPathname.current !== pathname) {
      document.getElementById("main-content")?.focus({ preventScroll: true })
      previousPathname.current = pathname
    }
  }, [pathname])

  return null
}
