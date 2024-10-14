import Footer from "./footer"
import { Outlet } from "react-router-dom"
import { NavBarProvider } from "./NavBarContext"
import NavBar from "./navBar"

function Layout() {
    return (
        <NavBarProvider>
            <div className="min-h-screen">
                <div className="fixed top-0 z-50 w-full">
                    <NavBar />
                </div>
                <div className="mt-24">
                    <Outlet />
                </div>
                <Footer />
            </div>
        </NavBarProvider>

    )
}

export default Layout