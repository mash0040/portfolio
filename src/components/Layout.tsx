import { Outlet } from "react-router-dom"
import Navbar from "./Navbar"
import Footer from "./Footer"

export default function Layout() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-950 text-white">
      <Navbar />
      <main className="flex-1 p-6">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
