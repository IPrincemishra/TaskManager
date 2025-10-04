import React, { useState, useEffect } from 'react';
import { GiSparkles } from 'react-icons/gi';
import { LINK_CLASSES, menuItems } from '../constants/constants';
import { NavLink } from 'react-router-dom';
import { LiaLightbulb } from 'react-icons/lia';
import { BiMenu } from 'react-icons/bi';
import { FiX } from 'react-icons/fi';

const Sidebar = ({ user, tasks }) => {

    const [mobileOpen, setMobileOpen] = useState(false)
    const [showModel, swtShowModel] = useState(false)

    const totalTasks = tasks?.length || 0
    const completedTasks = tasks?.filter((t) => t.completed).length || 0
    const productivity = totalTasks > 0
        ? Math.round((completedTasks / totalTasks) * 100) : 0

    const username = user?.name || "User"
    const initial = username.charAt(0).toUpperCase()

    useEffect(() => {
        document.body.style.overflow = mobileOpen ? "hidden" : "auto"
        return () => { document.body.style.overflow = "auto" }
    }, [mobileOpen])

    const renderMenuItems = (isMobile = false) => (
        <ul className='space-y-2'>
            {menuItems.map(({ text, path, icon: Icon }) => (
                <li key={text}>
                    <NavLink to={path} className={({ isActive }) => [
                        LINK_CLASSES.base,
                        isActive ? LINK_CLASSES.active : LINK_CLASSES.inactive,
                        isMobile ? "justify-start" : "lg:justify-start"
                    ].join(" ")} onClick={() => setMobileOpen(false)} >
                        <span className={LINK_CLASSES.icon}>
                            <Icon className='text-blue-500 w-4 h-4' />
                        </span>
                        <span className={` ${isMobile ? "block" : "hidden lg:block"} ${LINK_CLASSES.text} `}>
                            {text}
                        </span>

                    </NavLink>
                </li>
            ))}
        </ul>)


    return (
        <>
            <div className='hidden md:flex flex-col fixed h-full w-20 lg:w-64 bg-white/90 backdrop-blur-sm border-r border-purple-100 shadow-sm z-20 transition-all duration-300'>
                <div className='p-5 border-b border-purple-100 lg:block hidden'>
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold shadow-md">
                            {initial}
                        </div>
                        <div>
                            <h2 className='text-lg font-bold text-gray-800'>Hey, {username} </h2>
                            <p className='text-sm text-purple-500 font-medium flex items-center gap-1'>
                                <GiSparkles className='w-3 h-3 ' /> Let's crush some tasks!
                            </p>
                        </div>
                    </div>
                    <div className="p-4 space-y-6 overflow-y-auto flex-1">
                        <div className='bg-purple-50/50 rounded-xl p-3 border border-purple-100'>
                            <div className='flex items-center justify-between mb-2'>
                                <h3 className='text-xs font-semibold text-purple-700'>Productivity</h3>
                                <span className='text-xs bg-purple-200 text-purple-700 px-2 py-0.5 rounded-full'>{productivity}%</span>
                            </div>
                            <div className='w-full h-2 bg-purple-200 rounded-full overflow-hidden'>
                                <div className='h-full bg-gradient-to-r from-fuchsia-500 to-purple-600 animate-pulse' style={{ width: `${productivity}%` }} />
                            </div>
                        </div>

                        {renderMenuItems()}

                        <div className='mt-auto pt-6 lg:block hidden'>
                            <div className='bg-gradient-to-r from-purple-50 to-fuchsia-50 rounded-xl p-4 border border-purple-100'>
                                <div className='flex items-center gap-2'>
                                    <div className='p-2 bg-purple-100 rounded-lg'>
                                        <LiaLightbulb className='w-5 h-5 text-purple-600' />
                                    </div>
                                    <div>
                                        <h3 className='text-sm font-semibold text-gray-800'>Pro Tip</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {!mobileOpen && (
                <button className='absolute md:hidden top-25 left-5 z-50 bg-purple-600 text-white p-2 rounded-full shadow-lg hover:bg-purple-700 transition' onClick={() => setMobileOpen(true)}>
                    <BiMenu className='w-5 h-5' />
                </button>
            )}
            {mobileOpen && (
                <div className="fixed inset-0 z-40">
                    <div className='fixed inset-0 bg-black/40 backdrop-blur-sm' onClick={() => setMobileOpen(false)} />
                    <div className='absolute top-0 left-0 w-64 h-full bg-white/90 backdrop-blur-md border-r border-purple-100 shadow-lg z-50 p-4 flex flex-col space-y-6' onClick={(e) => e.stopPropagation()}>
                        <div className='flex justify-between items-center mb-4 border-b pb-2'>
                            <h2 className='text-lg font-black text-purple-600'>Menu</h2>
                            <button onClick={() => setMobileOpen(false)} className='text-gray-700 hover:text-purple-700'>
                                <FiX className='w-5 h-5' />
                            </button>
                        </div>
                        <div className="flex items-center gap-3 mb-6">
                            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold shadow-md">
                                {initial}
                            </div>
                            <div>
                                <h2 className='text-lg font-bold mt-16 text-gray-800'>Hey, {username} </h2>
                                <p className='text-sm text-purple-500 font-medium flex items-center gap-1'>
                                    <GiSparkles className='w-3 h-3 ' /> Let's crush some tasks!
                                </p>
                            </div>
                        </div>
                        {renderMenuItems(true)}
                    </div>
                </div>
            )}
        </>
    );
};

export default Sidebar;