import './navBar.css';
import { Link, Location, useLocation } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import { productService } from "../../services/product-service";
import { FetchCategoriesResponse } from "../../model/interfaces/categories-interface";
import { NavBarContext } from "./NavBarContext";
import { Avatar, Skeleton } from "@mui/material";
import { userService } from "../../services/user-service";
import { deepPurple } from '@mui/material/colors';

const NavBar: React.FC = () => {
    const item: number[] = [1, 2, 3, 4];
    const userId: string = localStorage.getItem('userId');
    const [userImage, setImage] = useState<{ image: string, name: string }>({
        image: '',
        name: '',
    });
    const [showCategories, setShowCategories] = useState<boolean>(false);
    const [isLogged, setIsLogged] = useState<boolean>();
    const [bookCategories, setCategories] = useState<FetchCategoriesResponse>();
    const navBarContext = useContext(NavBarContext);
    const { setData } = navBarContext;
    const { setSearchValue } = navBarContext
    const url: Location<string> = useLocation();

    const categories = () => {
        setShowCategories(true);
    }

    const hideCategories = () => {
        setShowCategories(false);
    }

    useEffect(() => {

        if (userId) {
            setIsLogged(true);
        } else {
            setIsLogged(false);
        }
        const fetchCategories = async () => {
            setCategories({ ...bookCategories, loading: true });
            try {
                const categories = await productService.fetchCategories();
                setCategories({ ...bookCategories, data: categories.data.data, loading: false });
            } catch (error) {
                console.log(error);
                setCategories({ ...bookCategories, loading: false, error: 'something went wrong' });

            }
        }

        const fetchUser = async () => {
            try {
                const user = await userService.fetchUserById(userId);
                user.data.data.image ? setImage({ ...userImage, image: user.data.data.image }) : setImage({ ...userImage, name: user.data.data.name });
            } catch (error) {
                console.log(error);
            }
        }
        fetchUser()
        fetchCategories()
    }, [userId, isLogged])

    const handleCategories = (name: string) => {
        setData(name);
    }

    const searchHandler = (e) => {
        setSearchValue(e.target.value)
    }

    const logOutHandler = () => {
        localStorage.clear();
        setIsLogged(false);
    }

    return (
        <nav className="bg-opacity-10 px-4 py-[6px] sticky w-full shadow-sm shadow-gray-100">
            <div className="flex justify-between items-center">
                {/* Logo Section */}
                <div className="text-black text-2xl font-bold flex items-start relative">
                    <Link to={'/'}>
                        <img src="../../../public/assets/booklogo.png" alt="Book Logo" />
                    </Link>
                </div>

                {/* Desktop Menu */}
                <div className="hidden md:flex space-x-6 items-center font-semibold h-full py-1 px-2 rounded-xl">
                    {/* Search Bar */}
                    <div className="w-full max-w-[600px] flex justify-end">
                        {url.pathname === '/all-products' && (
                            <input
                                onChange={searchHandler}
                                className="bg-white focus:outline-none focus:border-blue-200 border-2 border-gray-300 md:min-w-[400px] px-2 py-[13px] rounded-xl"
                                type="text"
                                placeholder="Search Book by author and title"
                            />
                        )}
                    </div>

                    {/* Links and Categories */}
                    <div className="flex items-center space-x-6 text-lg font-light" style={{ fontFamily: 'sans-serif' }}>
                        <Link to={'/all-products'} title="Collections" onClick={() => handleCategories('all books')}>Collections</Link>

                        {url.pathname === '/all-products' && (
                            <div
                                className="relative flex items-center cursor-pointer"
                                onMouseOver={categories}
                                onMouseLeave={hideCategories}
                            >
                                <p>Categories</p>
                                {showCategories && (
                                    <div className="category-div flex flex-col justify-center w-[130px] bg-gray-100 absolute top-[21px] left-0 py-1 rounded-md shadow-lg">
                                        {!bookCategories.loading && !bookCategories.error && bookCategories.data.map((x) => (
                                            <p
                                                key={x._id}
                                                role="button"
                                                onClick={() => handleCategories(x.name)}
                                                className="py-1 px-2 hover:bg-gray-200 transition-colors rounded-md"
                                            >
                                                {x.name}
                                            </p>
                                        ))}
                                        {bookCategories.loading && item.map((x) => (
                                            <Skeleton animation="wave" height={30} key={x.valueOf()} />
                                        ))}
                                        {bookCategories.error && <div><h1>{bookCategories.error}</h1></div>}
                                    </div>
                                )}
                            </div>
                        )}

                        {/* User Links */}
                        {userId && <Link to={'/cart'}>Cart</Link>}
                        {userId && (
                            <a className="text-black flex items-center">
                                <p className="mr-1">Wishlist</p>
                            </a>
                        )}

                        {!isLogged ? (
                            <Link to={'/auth/login'} className='hover:bg-gray-100 py-2 px-3 rounded-e-md transition-all'>Login</Link>
                        ) : (
                            <Link to={'/auth/login'} className='hover:bg-gray-100 py-2 px-3 rounded-e-md transition-all' onClick={logOutHandler}>Logout</Link>
                        )}

                        {/* Profile Picture */}
                        {userId && (
                            <div className='cursor-pointer'>
                                <Link to={'/user'} className='object-cover'>
                                    {userImage.image && <Avatar alt="RM" sx={{ width: 50, height: 50 }} src={userImage.image} />
                                    }
                                    {!userImage.image && <Avatar sx={{ bgcolor: deepPurple[500], fontWeight: 'bold', width: 44, height: 44 }}>{userImage.name[0]?.toUpperCase()}</Avatar>}
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

export default NavBar
