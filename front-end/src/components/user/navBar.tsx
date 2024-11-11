import './navBar.css';
import { Link, useLocation } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import { productService } from "../../services/product-service";
import { FetchCategoriesResponse } from "../../model/interfaces/categories-interface";
import { NavBarContext } from "./NavBarContext";
import { Avatar, Box, CircularProgress, Skeleton } from "@mui/material";
import { deepPurple } from '@mui/material/colors';
import userFetch from '../../hooks/user/user';
import { UserInterface } from '../../model/interfaces/user-interface';
import { userService } from '../../services/user-service';

const NavBar: React.FC = () => {
    const userId: string | null = localStorage.getItem('userId');
    const [showCategories, setShowCategories] = useState<boolean>(false);
    const [user, setUserData] = useState<{ data: UserInterface | null, loading: boolean, error: null | string }>({
        data: null,
        loading: false,
        error: null
    })
    const [isLogged, setIsLogged] = useState<boolean>(!!userId);
    const [bookCategories, setCategories] = useState<FetchCategoriesResponse | null>(null);
    const navBarContext = useContext(NavBarContext);
    const { setData, setSearchValue } = navBarContext;
    const { userData } = userFetch(userId);
    const location = useLocation();

    const handleCategories = (name: string) => {
        setData(name);
    }

    const searchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
    }

    const logOutHandler = () => {
        localStorage.clear();
        setIsLogged(false);
    }

    const fetchUser = async (loading?: boolean) => {
        setUserData({ ...user, loading: true });
        try {
            const response = await userService.fetchUserById(userId);
            setUserData({ ...user, data: response.data.data, loading: false });
        } catch (error) {

        }
        return userData;
    }

    useEffect(() => {
        const fetchCategories = async () => {
            setCategories({ loading: true, data: null, error: null });
            try {
                const response = await productService.fetchCategories();
                setCategories({ loading: false, data: response.data.data, error: null });
            } catch (error) {
                console.error("Error fetching categories:", error);
                setCategories({ loading: false, data: null, error: 'Something went wrong' });
            }
        };
        fetchUser();
        fetchCategories();
    }, [userData, navBarContext.data]);

    return (
        <nav className="bg-opacity-10 px-4 py-[6px] w-full shadow-sm shadow-gray-100">
            <div className="flex justify-between items-center">
                {/* Logo Section */}
                <div className="text-black text-2xl font-bold flex items-start relative">
                    <Link to='/'>
                        <img src="../../../public/assets/booklogo.png" alt="Book Logo" />
                    </Link>
                </div>

                {/* Desktop Menu */}
                <div className="hidden md:flex space-x-6 items-center font-semibold h-full py-1 px-2 rounded-xl">
                    {/* Search Bar */}
                    {location.pathname === '/all-products' && (
                        <div className="w-full max-w-[600px] flex justify-end">
                            <input
                                onChange={searchHandler}
                                className="bg-white focus:outline-none focus:border-blue-200 border-2 border-gray-300 md:min-w-[400px] px-2 py-[13px] rounded-xl"
                                type="text"
                                placeholder="Search Book by author and title"
                            />
                        </div>
                    )}

                    {/* Links and Categories */}
                    <div className="flex items-center space-x-6 text-lg font-light" style={{ fontFamily: 'sans-serif' }}>
                        <Link to='/all-products' title="Collections" onClick={() => handleCategories('all books')}>Collections</Link>

                        {location.pathname === '/all-products' && (
                            <div
                                className="relative flex items-center cursor-pointer"
                                onMouseEnter={() => setShowCategories(true)}
                                onMouseLeave={() => setShowCategories(false)}
                            >
                                <p>Categories</p>
                                {showCategories && (
                                    <div className="category-div flex flex-col justify-center w-[130px] bg-gray-100 absolute top-[21px] left-0 py-1 rounded-md shadow-lg">
                                        {bookCategories?.loading && [1, 2, 3, 4].map((item) => (
                                            <Skeleton animation="wave" height={30} key={item} />
                                        ))}
                                        {bookCategories?.data && bookCategories.data.map((category) => (
                                            <p
                                                key={category._id}
                                                role="button"
                                                onClick={() => handleCategories(category.name)}
                                                className="py-1 px-2 hover:bg-gray-200 transition-colors rounded-md"
                                            >
                                                {category.name}
                                            </p>
                                        ))}
                                        {bookCategories?.error && <div><h1>{bookCategories.error}</h1></div>}
                                    </div>
                                )}
                            </div>
                        )}

                        {/* User Links */}
                        {isLogged && <Link to='/cart'>Cart</Link>}
                        {isLogged && <Link to='/wishlist' className="text-black flex items-center">Wishlist</Link>}

                        {!isLogged ? (
                            <Link to='/auth/login' className='hover:bg-gray-100 py-2 px-3 rounded-e-md transition-all'>Login</Link>
                        ) : (
                            <button onClick={logOutHandler} className='hover:bg-gray-100 py-2 px-3 rounded-e-md transition-all'>Logout</button>
                        )}

                        {/* Profile Picture */}
                        {isLogged && (
                            <div className='cursor-pointer'>
                                <Link to='/user' className='object-cover'>
                                    {user.data?.image ? (
                                        <div className='flex items-center justify-center'>
                                            {user.loading ? (
                                                <Box sx={{ display: 'flex', position: 'absolute', zIndex: '1' }}>
                                                    <CircularProgress />
                                                </Box>
                                            ) : (
                                                <Avatar alt="RM" sx={{ width: 50, height: 50}} src={user.data.image} />
                                            )}
                                        </div>
                                    ) : (
                                        <Avatar sx={{ bgcolor: deepPurple[500], fontWeight: 'bold', width: 44, height: 44 }}>
                                            {user.data?.name?.[0]?.toUpperCase()}
                                        </Avatar>
                                    )}
                                </Link>
                            </div>
                        )}
                    </div>
                </div>

                {/* Mobile Menu Toggle */}
                <div className="md:hidden">
                    <button id="menu-toggle" className="text-black focus:outline-none">
                        <p>Menu</p>
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <div id="mobile-menu" className="hidden md:hidden mt-2">
                <Link to="/" className="block py-2 px-4 text-black hover:bg-gray-100">Home</Link>
                <Link to="/about" className="block py-2 px-4 text-black hover:bg-gray-100">About</Link>
                <Link to="/services" className="block py-2 px-4 text-black hover:bg-gray-100">Services</Link>
                <Link to="/contact" className="block py-2 px-4 text-black hover:bg-gray-100">Contact</Link>
            </div>
        </nav>
    )
}

export default NavBar;
