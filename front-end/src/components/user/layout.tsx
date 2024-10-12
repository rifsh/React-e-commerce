import NavBar from "./navBar"
import Footer from "./footer"
import { Outlet } from "react-router-dom"

function Layout() {
    return (
        <div className="min-h-screen">
            <div className="fixed top-0 z-50 w-full">
                <NavBar/>
            </div>
            <div className="mt-24">
                <Outlet />
            </div>
            <Footer />
        </div>

    )
}

export default Layout