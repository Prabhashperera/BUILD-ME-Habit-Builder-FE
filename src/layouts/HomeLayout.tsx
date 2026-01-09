import { Outlet } from "react-router-dom"
// import Navbar from "../components/Navbar"
import AmbientBgGlows from "../components/AmbientBgGlows"

function HomeLayout() {
    return (
        <div className="">
            <AmbientBgGlows />
            {/* <Navbar /> */}
            <Outlet />
        </div>
    )
}

export default HomeLayout