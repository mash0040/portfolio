export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="flex flex-wrap items-center justify-between gap-2 border-t border-slate-800 p-4 text-sm text-slate-400">
      <span>© {year} Ekene Masha. All rights reserved.</span>
      <div className="flex gap-4">
        <a
          href="https://github.com/mash0040"
          target="_blank"
          rel="noreferrer"
          className="hover:text-white"
        >
          GitHub
        </a>
        <a
          href="https://www.linkedin.com/in/mashaak"
          target="_blank"
          rel="noreferrer"
          className="hover:text-white"
        >
          LinkedIn
        </a>
      </div>
    </footer>
  )
}
