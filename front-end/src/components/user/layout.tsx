import Footer from "./footer"
import { Outlet, useLocation } from "react-router-dom"
import { NavBarProvider } from "./NavBarContext"
import NavBar from "./navBar"

function Layout() {
    const url = useLocation();
    
    return (
        <NavBarProvider>
            <div className="min-h-screen">
                {url.pathname !== '/cart' &&<div className="fixed top-0 z-50 w-full">
                    <NavBar />
                </div>}
                <div className="mt-24">
                    <Outlet />
                </div>
                {url.pathname !== '/cart' && <Footer />}
            </div>
        </NavBarProvider>

    )
}

export default Layout