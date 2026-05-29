import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getRoles, isLoggedIn } from '../Util/auth';

const Navbar = () => {

    const navigate = useNavigate();

    const [search, setSearch] = useState("");

    const [menuOpen, setMenuOpen] = useState(false);

    // 🔥 SEARCH HANDLER
    const searchHandler = (e) => {

        e.preventDefault();

        const trimmedSearch = search.trim();

        // 🔥 Prevent empty search
        if (!trimmedSearch) return;

        // 🔥 Navigate to search page
        navigate(
            `/productSearch?query=${encodeURIComponent(trimmedSearch)}`
        );

        // 🔥 Close mobile menu
        setMenuOpen(false);

        // 🔥 Clear input
        setSearch("");
    };

    return (

        <div className="sticky top-0 z-50 bg-[#ffffffcc] backdrop-blur-2xl border-b border-white/20 shadow-[0_8px_30px_rgba(0,0,0,0.06)]">

            {/* 🔥 MAIN NAVBAR */}
            <div className="max-w-[95%] xl:max-w-[90%] mx-auto flex justify-between items-center py-4">

                {/* 🔥 LOGO */}
                <div
                    onClick={() => navigate('/')}
                    className="flex flex-col cursor-pointer group"
                >

                    <h1 className="text-3xl md:text-4xl font-bold tracking-tight bg-gradient-to-r from-pink-600 via-rose-500 to-pink-700 bg-clip-text text-transparent">
                        SareeNest
                    </h1>

                    <span className="hidden md:block text-[11px] uppercase tracking-[0.45em] text-gray-400 mt-1 group-hover:text-pink-500 transition">
                        Luxury Ethnic Wear
                    </span>

                </div>

                {/* 🔥 DESKTOP NAV */}
                <div className="hidden lg:flex items-center gap-8">

                    <Link
                        to='/about'
                        className='text-gray-700 font-medium hover:text-pink-600 transition'
                    >
                        About
                    </Link>

                    <Link
                        to='/contact'
                        className='text-gray-700 font-medium hover:text-pink-600 transition'
                    >
                        Contact
                    </Link>

                    <Link
                        to='/categories'
                        className='text-gray-700 font-medium hover:text-pink-600 transition'
                    >
                        Categories
                    </Link>

                    <Link
                        to='/cart'
                        className='text-gray-700 font-medium hover:text-pink-600 transition'
                    >
                        Cart
                    </Link>

                    <Link
                        to='/my-orders'
                        className='text-gray-700 font-medium hover:text-pink-600 transition'
                    >
                        Orders
                    </Link>

                </div>

                {/* 🔥 RIGHT SIDE */}
                <div className='hidden lg:flex items-center gap-4'>

                    {/* 🔥 SEARCH */}
                    <form
                        onSubmit={searchHandler}
                        className='flex items-center bg-white border border-gray-200 rounded-full overflow-hidden shadow-sm hover:shadow-lg transition duration-300'
                    >

                        <input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            type="search"
                            autoComplete="off"
                            placeholder='Search luxury sarees...'
                            className='px-5 py-3 outline-none w-56 bg-transparent text-sm'
                        />

                        <button
                            type='submit'
                            className='bg-gradient-to-r from-pink-500 to-rose-500 text-white px-6 py-3 font-medium hover:from-pink-600 hover:to-rose-600 transition'
                        >
                            Search
                        </button>

                    </form>

                    {/* 🔥 ADMIN */}
                    {
                        getRoles()?.includes("ROLE_ADMIN") && (

                            <Link
                                to='/addProduct'
                                className='bg-gradient-to-r from-pink-600 to-rose-500 text-white px-5 py-3 rounded-2xl font-medium shadow-lg hover:scale-105 transition'
                            >
                                Admin Portal
                            </Link>
                        )
                    }

                    {/* 🔥 USER */}
                    {
                        getRoles()?.includes("ROLE_USER") && (

                            <Link
                                to='/user-dashboard'
                                className='bg-black text-white px-5 py-3 rounded-2xl font-medium hover:scale-105 transition'
                            >
                                Profile
                            </Link>
                        )
                    }

                    {/* 🔥 LOGIN */}
                    {
                        !isLoggedIn() && (

                            <Link
                                to='/login'
                                className='bg-gradient-to-r from-emerald-500 to-green-500 text-white px-5 py-3 rounded-2xl font-medium hover:scale-105 transition'
                            >
                                Login
                            </Link>
                        )
                    }

                </div>

                {/* 🔥 MOBILE MENU BUTTON */}
                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="lg:hidden flex flex-col gap-1.5"
                >

                    <span className={`w-7 h-[3px] bg-black rounded transition ${menuOpen ? "rotate-45 translate-y-2" : ""}`}></span>

                    <span className={`w-7 h-[3px] bg-black rounded transition ${menuOpen ? "opacity-0" : ""}`}></span>

                    <span className={`w-7 h-[3px] bg-black rounded transition ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}></span>

                </button>

            </div>

            {/* 🔥 MOBILE MENU */}
            <div className={`lg:hidden overflow-hidden transition-all duration-500 ${menuOpen ? "max-h-[700px] opacity-100" : "max-h-0 opacity-0"}`}>

                <div className="px-6 pb-6 pt-2 bg-white/95 backdrop-blur-2xl border-t border-gray-100">

                    {/* 🔥 LINKS */}
                    <div className="flex flex-col gap-5 text-lg font-medium mb-6">

                        <Link
                            onClick={() => setMenuOpen(false)}
                            to='/about'
                            className='hover:text-pink-600 transition'
                        >
                            About
                        </Link>

                        <Link
                            onClick={() => setMenuOpen(false)}
                            to='/contact'
                            className='hover:text-pink-600 transition'
                        >
                            Contact
                        </Link>

                        <Link
                            onClick={() => setMenuOpen(false)}
                            to='/categories'
                            className='hover:text-pink-600 transition'
                        >
                            Categories
                        </Link>

                        <Link
                            onClick={() => setMenuOpen(false)}
                            to='/cart'
                            className='hover:text-pink-600 transition'
                        >
                            Cart
                        </Link>

                        <Link
                            onClick={() => setMenuOpen(false)}
                            to='/my-orders'
                            className='hover:text-pink-600 transition'
                        >
                            Orders
                        </Link>

                    </div>

                    {/* 🔥 MOBILE SEARCH */}
                    <form
                        onSubmit={searchHandler}
                        className='flex flex-col gap-4 mb-6'
                    >

                        <input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            type="search"
                            autoComplete="off"
                            placeholder='Search luxury sarees...'
                            className='border border-gray-200 rounded-2xl px-5 py-4 outline-none'
                        />

                        <button
                            type='submit'
                            className='bg-gradient-to-r from-pink-500 to-rose-500 text-white py-4 rounded-2xl font-semibold'
                        >
                            Search
                        </button>

                    </form>

                    {/* 🔥 ACTION BUTTONS */}
                    <div className="flex flex-col gap-4">

                        {
                            getRoles()?.includes("ROLE_ADMIN") && (

                                <Link
                                    onClick={() => setMenuOpen(false)}
                                    to='/addProduct'
                                    className='bg-gradient-to-r from-pink-600 to-rose-500 text-white py-4 rounded-2xl text-center font-semibold'
                                >
                                    Admin Portal
                                </Link>
                            )
                        }

                        {
                            getRoles()?.includes("ROLE_USER") && (

                                <Link
                                    onClick={() => setMenuOpen(false)}
                                    to='/user-dashboard'
                                    className='bg-black text-white py-4 rounded-2xl text-center font-semibold'
                                >
                                    Profile
                                </Link>
                            )
                        }

                        {
                            !isLoggedIn() && (

                                <Link
                                    onClick={() => setMenuOpen(false)}
                                    to='/login'
                                    className='bg-gradient-to-r from-emerald-500 to-green-500 text-white py-4 rounded-2xl text-center font-semibold'
                                >
                                    Login
                                </Link>
                            )
                        }

                    </div>

                </div>

            </div>

        </div>
    );
};

export default Navbar;