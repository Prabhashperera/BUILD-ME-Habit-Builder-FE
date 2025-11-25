import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar"
import AmbientBgGlows from "../components/AmbientBgGlows"

function HomeLayout() {
    return (
        <div className="min-h-screen w-full bg-slate-950 font-sans text-white selection:bg-emerald-500/30 pb-20 overflow-x-hidden relative">
            <AmbientBgGlows />
            <Navbar />
            <Outlet />
        </div>
    )
}

export default HomeLayout