import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LOGO from "../assets/logo.png"
import { IoSettingsOutline, IoChevronDown, IoLogOut } from "react-icons/io5";

const Navbar = ({ user = {}, onLogout }) => {

    const navigate = useNavigate()

    const menuref = useRef(null)
    const [menuOpen, setMenuOpen] = useState(false)

    const handleMenuToggle = () => setMenuOpen((prev) => !prev)
    const handleLogout = () => {
        setMenuOpen(false)

    }
    return (
        <header className='sticky top-0 z-50 bg-white/90 backdrop-blur-md shadow-md border-b border-gray-200 font-sans'>
            <div className='flex items-center justify-between px-4 py-3 md:px-6 max-w-7xl mx-auto'>
                {/* Logo */}
                <div className='flex items-center gap-2 cursor-pointer group' onClick={() => navigate('/')}>
                    <div className='relative w-10 h-10 flex items-center justify-center rounded-xl bg-gradient-to-br from-red-500 to-purple-500  shadow-lg group-hover:shadow-purple-300/50 group-hover:scale-105 transition-all duration-300'>
                        <img src={LOGO} alt="" className='w-9 h-9 flex items-center justify-center' />
                    </div>
                    <span className='text-lg font-extrabold bg-gradient-to-r from-red-500 to-purple-500 bg-clip-text text-transparent tracking-wide'>Task Manage Kar</span>
                </div>
                <div className="flex items-center gap-4">
                    <button className='p-2 text-gray-600 hover:text-purple-500 transition-colors duration-300  hover:bg-purple-50 rounded-full' onClick={() => navigate("/profile")}>
                        <IoSettingsOutline />
                    </button>

                    {/* dropdown options */}
                    <div ref={menuref} className='relative '>
                        <button
                            onClick={handleMenuToggle}
                            className='flex items-center gap-2 px-3 py-2 rounded-full cursor-pointer hover:bg-purple-50 transition-colors duration-300 border border-transparent hover:border-purple-200'>
                            <div className='relative'>
                                {
                                    user?.avatar ? (
                                        <img src={user.avatar} alt='Avatar' className='w-9 h-9 rounded-full shadow-md' />
                                    ) : (
                                        <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-500 text-white font-semibold shadow-md">
                                            {user.name?.[0]?.toUpperCase() || "U"}
                                        </div>
                                    )
                                }
                                <div className='absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border-2 border-white animate-pulse' />
                            </div>
                            <div className='text-left hidden md:block'>
                                <p className='text-sm font-medium text-gray-800'>{user.name}</p>
                                <p className='text-xs font-normal text-gray-500'>{user.email}</p>
                            </div>
                            <IoChevronDown className={`w-4 h-4 text-gray-500 transition-transform duration-300 ${menuOpen ? 'rotate-180' : ''}`} />
                        </button>
                        {menuOpen && (
                            <ul className='absolute top-14 right-0 w-56 bg-white rounded-2xl shadow-xl border border-purple-100 z-50 overflow-hidden animate-fadeIn'>
                                <li className='p-2'>
                                    <button onClick={() => {
                                        setMenuOpen(false)
                                        navigate('profile')
                                    }}
                                        className='w-full px-4 py-2.5 text-left hover:bg-purple-50 text-sm text-gray-700 transition-colors flex items-center gap-2 group' role='menuitem'>
                                        <IoSettingsOutline className='w-4 h-4 text-gray-700' />
                                        Profile Setting
                                    </button>
                                </li>
                                <li className='p-2'>
                                    <button onClick={handleLogout}
                                        className='flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm hover:bg-red-500  text-red-600'>
                                        <IoLogOut className='w-4 h-4 ' />
                                        Logout
                                    </button>
                                </li>
                            </ul>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;