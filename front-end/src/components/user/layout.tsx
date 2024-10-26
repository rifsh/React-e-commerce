import Footer from "./footer"
import { Navigate, Outlet, useLocation } from "react-router-dom"
import { NavBarProvider } from "./NavBarContext"
import NavBar from "./navBar"
import { Bounce, toast } from "react-toastify";

function Layout() {
    const url = useLocation();
    const token = localStorage.getItem('token');

    if (!token && url.pathname === '/cart') {
        toast.warn('Please login', {
            position: "bottom-center",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
        });
        return <Navigate to="auth/login" />;
    }
    return (
        <NavBarProvider>
            <div className="min-h-screen">
                {url.pathname !== '/cart' && <div className="fixed top-0 z-50 w-full">
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