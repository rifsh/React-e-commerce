import { ImBooks } from "react-icons/im";
import './navBar.css';
import { Link, Location, useLocation } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import { productService } from "../../services/product-service";
import { FetchCategoriesResponse } from "../../model/interfaces/categories-interface";
import { NavBarContext } from "./NavBarContext";
import { Skeleton } from "@mui/material";
import { FaRegUserCircle } from "react-icons/fa";
import { userService } from "../../services/user-service";

const NavBar: React.FC = () => {
    const item: number[] = [1, 2, 3, 4];
    const userId: string = localStorage.getItem('userId');
    const [userImage, setImage] = useState<{ image: string, loading: boolean }>({
        image: '',
        loading: true
    });
    const [showCategories, setShowCategories] = useState<boolean>(false);
    const [bookCategories, setCategories] = useState<FetchCategoriesResponse>();
    const [Logout, setLogOut] = useState<boolean>();
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
            setLogOut(false);
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
            setImage({ ...userImage, loading: true });
            try {
                const user = await userService.fetchUserById(userId);
                setImage({ ...userImage, image: user.data.data.image, loading: false });
            } catch (error) {
                console.log(error);

            }
        }
        fetchUser()
        fetchCategories()
    }, [Logout])

    const handleCategories = (name: string) => {
        setData(name);
    }

    const searchHandler = (e) => {
        setSearchValue(e.target.value)
    }

    const logOutHandler = () => {
        localStorage.clear();
    }

    return (
        <nav className="bg-opacity-10 px-4 py-[12px] sticky w-full shadow-lg shadow-gray-300">
            <div className="justify-between flex items-center">
                <div className="text-black text-2xl font-bold flex items-center">
                    <ImBooks className='text-4xl' />
                    <Link to={'/'} className="main-head font-mono text-4xl">Books</Link>
                </div>

                <div className="hidden w-full md:flex space-x-6 md:items-center font-sans font-semibold h-full py-1 px-2 rounded-xl justify-between">
                    <div className="w-full max-w-[600px] flex items-end justify-end">
                        {url.pathname === '/all-products' && <input onChange={searchHandler}
                            className="bg-gray-100 focus:outline-none border-2 border-gray-300 md:min-w-[400px] shrink ps-2 py-[13px] rounded-xl" type="text"
                            placeholder="Search Book by author and title" />}
                    </div>

                    <div className="flex items-center justify-between min-w-[500px] text-lg" style={{ fontFamily: 'Roboto', fontWeight: 'lighter' }}>
                        <div>
                            <Link to={'/all-products'} onClick={() => { handleCategories('all books') }}>All Books</Link>
                        </div>
                        {url.pathname === '/all-products' && <div className="flex flex-row items-center justify-center relative" onMouseOver={categories} onMouseLeave={hideCategories}>
                            <p className="text-black cursor-pointer">Categories</p>
                            {showCategories && <div className="category-div flex flex-col  justify-center w-[130px] bg-gray-100 absolute top-[21px] left-0 py-1 rounded-md">
                                {!bookCategories.loading && !bookCategories.error && bookCategories.data.map((x) => {
                                    return (
                                        <div className="flex flex-col hover:scale-105 transition-all justify-center" key={x._id}>
                                            <p role="button" onClick={() => { handleCategories(x.name) }} className="py-1 ps-2 font-normal">{x.name}</p>
                                        </div>
                                    )
                                })}
                                {bookCategories.loading && !bookCategories.error && item.map((x) => {
                                    return (
                                        <Skeleton animation="wave" height={30} key={x.valueOf()} />
                                    )
                                })}
                                {bookCategories.error && <div><h1>{bookCategories.error}</h1></div>}
                            </div>}
                        </div >}

                        <div className="">
                            <Link to={'cart'}>Cart</Link>
                        </div >

                        <div className="">
                            <a className="text-black flex items-center" >
                                <p className="me-1">Wishlist</p>
                            </a >
                        </div >


                        {!userId && <div className="">
                            <Link to={'auth/login'}>Login</Link>
                        </div >}

                        {userId && <div className="logout w-20 h-9 rounded-lg hover:bg-[#ededed80] transition-all">
                            <a role="button" onClick={logOutHandler} className="text-black h-full w-full flex items-center justify-center">
                                <p>Logout</p>
                            </a >
                        </div >}

                        <div className="h-12 w-12 rounded-full overflow-hidden object-cover">
                            <Link to={''}>
                                {!userImage && <FaRegUserCircle className="text-5xl" />}
                                {userImage.loading && <Skeleton variant="rounded" animation='wave' width={100} height={100} />}
                                {userImage && <img src={userImage.image} className="rounded-full" alt="" />}
                            </Link>
                        </div >
                    </div>
                </div>

                <div className="md:hidden">
                    <button id="menu-toggle" className="text-white focus:outline-none">
                        <p className="text-black">Button</p>

                    </button>
                </div>
            </div>


            {/* <div id="mobile-menu" className="hidden md:hidden mt-2">
                <a href="#" className="block py-2 px-4 text-white hover:bg-blue-700">Home</a>
                <a href="#" className="block py-2 px-4 text-white hover:bg-blue-700">About</a>
                <a href="#" className="block py-2 px-4 text-white hover:bg-blue-700">Services</a>
                <a href="#" className="block py-2 px-4 text-white hover:bg-blue-700">Contact</a>
            </div> */}
        </nav >
    )
}

export default NavBar
