// import React from 'react'
import { ImBooks } from "react-icons/im";
import './navBar.css';
import { Link } from "react-router-dom";


export default function NavBar() {
    return (
        <nav className="bg-opacity-10 px-4 py-[12px] w-full sticky top-0 shadow-lg shadow-gray-300">
            <div className="container mx-auto justify-between flex items-center">
                <div className="text-black text-2xl font-bold me-[30px] flex items-center">
                    <ImBooks className='me-3 text-4xl' />
                    {/* <a className="font-mono text-4xl">BOOKS</a> */}
                    <Link to={'/'} className="main-head font-mono text-4xl">Books</Link>
                </div>

                <div className="hidden md:flex space-x-6 md:items-center font-sans font-semibold h-full py-1 px-2 rounded-xl">
                    <div >
                        <input
                            className="bg-gray-100 focus:outline-none border-2 border-gray-300 ps-2 pe-40 py-[13px] rounded-xl" type="text"
                            placeholder="Search Books" />
                    </div>
                    {/* <a className="text-black">All Books</a> */}
                    <Link to={'/all-products'}>All Books</Link>

                    <div className="flex flex-col items-center justify-center relative">
                        <p className="text-black font-semibold cursor-pointer">Categories</p>
                    </div >

                    <div className="relative">
                        <a className="text-black flex items-center" >
                            <p>Cart</p>
                        </a >
                    </div >

                    <div className="relative">
                        <a className="text-black flex items-center" >
                            <p className="me-1">Wishlist</p>
                        </a >
                    </div >

                    <div className="relative">
                        <a className="text-black flex items-center">
                            <p>Logout</p>
                            <i className='bx bx-log-out text-3xl'></i>
                        </a >
                    </div >

                    <div className="relative">
                        <a className="text-black flex items-center">
                            <p>LogIn</p>
                            <i className='bx bx-log-in text-3xl'></i>
                        </a >
                    </div >

                    {/* <div className="relative w-[72px]">
                        <a className="text-black flex items-center">
                            <i className='bx bx-user-circle text-3xl'></i>
                        </a >
                    </div > */}
                </div>




                {/* <div className="md:hidden">
                    <button id="menu-toggle" className="text-white focus:outline-none">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                        </svg>
                    </button>
                </div> */}
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
