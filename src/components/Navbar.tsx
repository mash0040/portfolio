import { Link } from "react-router-dom"

export default function Navbar() {
  return (
    <nav className="flex gap-4 border-b border-slate-800 p-4">
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <Link to="/projects">Projects</Link>
      <Link to="/contact">Contact</Link>
    </nav>
  )
}
