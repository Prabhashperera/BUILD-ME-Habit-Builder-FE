import { Outlet } from "react-router-dom"

function AuthLayout() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-[#0d0d12] p-4 text-white">
            <Outlet />
        </div>
    )
}

export default AuthLayout