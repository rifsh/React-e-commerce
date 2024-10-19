import { ImBooks } from "react-icons/im";
import './navBar.css';
import { Link, useLocation } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import { productService } from "../../services/product-service";
import { FetchCategoriesResponse } from "../../model/interfaces/categories-interface";
import { NavBarContext } from "./NavBarContext";
import { Skeleton } from "@mui/material";

const NavBar: React.FC = () => {
    const item = [1, 2, 3, 4];
    const [showCategories, setShowCategories] = useState<boolean>(false);
    const [bookCategories, setCategories] = useState<FetchCategoriesResponse>();
    const navBarContext = useContext(NavBarContext);
    const { setData } = navBarContext;
    const { setSearchValue } = navBarContext
    const url = useLocation()
    const categories = () => {
        setShowCategories(true);
    }

    const hideCategories = () => {
        setShowCategories(false);
    }

    useEffect(() => {
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

        fetchCategories()
    }, [])

    const handleCategories = (name: string) => {
        setData(name);
    }

    const searchHandler = (e) => {
        setSearchValue(e.target.value)
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

                    <div className="flex w-full items-center justify-between max-w-[400px]">
                        <div>
                            <Link to={'/all-products'} onClick={() => { handleCategories('all books') }}>All Books</Link>
                        </div>
                        {url.pathname === '/all-products' && <div className="flex flex-col items-center justify-center relative" onMouseOver={categories} onMouseLeave={hideCategories}>
                            <p className="text-black font-semibold cursor-pointer">Categories</p>
                            {showCategories && <div className="category-div flex flex-col  justify-center w-[130px] bg-gray-100 absolute top-[21px] left-0 py-1 rounded-md">
                                {!bookCategories.loading && !bookCategories.error && bookCategories.data.map((x) => {
                                    return (
                                        <div className="flex flex-col hover:scale-105 transition-all justify-center" key={x._id}>
                                            <p role="button" onClick={() => { handleCategories(x.name) }} className="py-1 ps-2 font-extralight">{x.name}</p>
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
                            <a className="text-black flex items-center" >
                                <p>Cart</p>
                            </a >
                        </div >

                        <div className="">
                            <a className="text-black flex items-center" >
                                <p className="me-1">Wishlist</p>
                            </a >
                        </div >

                        {/* <div className=""> */}
                        {/* <a className="text-black flex items-center">
                                <p>Logout</p>
                                <i className='bx bx-log-out text-3xl'></i>
                            </a > */}
                        {/* </div > */}

                        <div className="">
                            <Link to={'auth/login'}>Login</Link>
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
