import NavBar from "./navBar"
import Footer from "./footer"
import { Outlet } from "react-router-dom"

function Layout() {
    return (
        <div className="">
            <div className="sticky top-q0">
                <NavBar />
            </div>

            <div className="">
                <Outlet />
            </div>

            <div className="">
                <Footer />
            </div>
        </div>
    )
}

export default Layout