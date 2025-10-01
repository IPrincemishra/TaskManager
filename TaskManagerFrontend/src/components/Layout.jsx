import React, { useCallback, useState } from 'react';
import Navbar from './Navbar'
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';
const Layout = ({ user, onLogout }) => {

    const [tasks, setTasks] = useState([])
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null)

    const fetchTasks = useCallback(async () => {
        setLoading(true)
        setError(null)

        try {
            const token = localStorage.getItem('token');
            if (!token) throw new Error("No Auth token found")

            const { data } = await 
        } catch (error) {
            console.log(error);
        }
    })

    return (
        <div className='min-h-screen bg-gray-50'>
            <Navbar user={user} onLogout={onLogout} />
            <Sidebar user={user} tasks={tasks} />

            <div className="ml-0 xl:ml-60 lg:ml-64 md:ml-16 pt-16 p-3 sm:p-4 md:p-4 transition-all dur-300">
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6">
                    <div className="xl:col-span-2 space-y-3 sm:space-y-4">
                        <Outlet context={{ tasks, refreshTasks: fetchTasks }} />
                    </div>

                </div>


            </div>
        </div>
    );
};

export default Layout;