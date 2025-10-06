import React, { useMemo, useState } from 'react';
import { FiFilter } from 'react-icons/fi';
import { LuListChecks } from 'react-icons/lu';
import { useOutletContext } from 'react-router-dom';
import { layoutClasses, SORT_OPTIONS } from '../constants/constants';
import { BiPlus } from 'react-icons/bi';
import { CgLock } from 'react-icons/cg';
import TaskItem from '../components/TaskItem';
import TaskModal from '../components/TaskModal';

const PendingPage = ({ handleDelete, handleToggleComplete }) => {

    const { tasks = [], refreshTasks } = useOutletContext()
    const [sortBy, setSortBy] = useState('newest')
    const [selectedTask, setSelectedTask] = useState(null)
    const [showModal, setShowModal] = useState(false)

    const getHeaders = () => {
        const token = localStorage.getItem('token')
        if (!token) throw new Error("No auth token found")
        return {
            'Content-Type': 'application/json', Authorization: `Bearer ${token}`
        }
    }

    const sortedPendingTasks = useMemo(() => {
        const filtered = tasks.filter((t) => !t.completed || (typeof t.completed === 'string' && t.completed.toLowerCase() === "no"))

        return filtered.sort((a, b) => {
            if (sortBy === 'newest') return new Date(b.createdAt) - new Date(a.createdAt)
            if (sortBy === 'oldest') return new Date(a.createdAt) - new Date(b.createdAt)

            const order = { high: 3, medium: 2, low: 1 }
            return order[b.priority.toLowerCase()] - order[a.priority.toLowerCase()]
        })
    }, [tasks, sortBy])

    return (
        <div className='p-6 min-h-screen overflow-hidden'>
            <div className='flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4'>
                <div>
                    <h1 className='text-2xl md:text-3xl font-bold text-gray-800 flex items-center gap-2'>
                        <LuListChecks className='text-purple-500' /> Pending Task
                    </h1>
                    <p className='text-sm text-gray-500 mt-1 ml-7'>
                        {sortedPendingTasks.length} task {sortedPendingTasks.length !== 1 && 's'}
                        needing your attention
                    </p>
                </div>
                <div className='flex items-center justify-between bg-white p-3 rounded-xl shadow-sm border border-purple-100 w-full md:w-auto'>
                    <div className='flex items-center gap-2 text-gray-700 font-medium'>
                        <FiFilter className='w-4 h-4 text-purple-500' />
                        <span className='text-sm'>Sort By:</span>
                    </div>
                    <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className='px-3 py-2 border border-purple-100 rounded-lg focus:ring-2 focus:ring-purple-500 md:hidden text-sm'>
                        <option value="newest">Newest First</option>
                        <option value="oldest">Oldest First</option>
                        <option value="priority">By Priority</option>
                    </select>

                    <div className='hidden md:flex space-x-1 bg-purple-50 p-1 rounded-lg ml-3'>
                        {SORT_OPTIONS.map(opt => (
                            <button key={opt.id} onClick={() => setSortBy(opt.id)} className={`${layoutClasses.tabButton(sortBy === opt.id)}`}>
                                {<opt.icon className='layoutClasses' />}{opt.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className='hidden md:block p-5 border-2 border-dashed border-purple-200 rounded-xl hover:border-purple-400 transition-colors cursor-pointer mb-6 bg-purple-50/50 group' onClick={() => setShowModal(true)}>
                <div className='flex items-center justify-center gap-3 text-gray-500 group-hover:text-purple-600 transition-colors duration-200'>
                    <div className='w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm group-hover:shadow-md transition-all duration-300'>
                        <BiPlus className='text-purple-500' size={18} />
                    </div>
                    <span className='font-medium'>
                        Add New Task
                    </span>
                </div>
            </div>

            <div className='space-y-4'>
                {
                    sortedPendingTasks.length === 0 ? (
                        <div className='p-8 bg-white rounded-xl shadow-sm border border-purple-100 text-center'>
                            <div className='max-w-xs mx-auto py-6'>
                                <div className='w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4'>
                                    <CgLock className='w-8 h-8 text-purple-500' />
                                </div>
                                <h3 className='text-lg font-semibold text-gray-800 mb-2'>
                                    All caught up!
                                </h3>
                                <p className='text-sm text-gray-500 mb-4'>No pending tasks</p>
                                <button onClick={() => setShowModal(true)} className='px-4 py-2 bg-purple-100 hover:bg-purple-200 text-purple-700 rounded-lg text-sm font-medium transition-colors'>Create New Task</button>
                            </div>
                        </div>
                    ) : (
                        sortedPendingTasks.map(task => (
                            <TaskItem key={task.id || task._id} task={task} showCompleteCheckbox onDelete={() => handleDelete(task._id || task.id)} onToggleComplete={() => handleToggleComplete(task.id || task._id)} onEdit={() => { setSelectedTask(task); setShowModal(true) }}
                                onRefresh={refreshTasks}
                            />
                        ))
                    )
                }
            </div>
            <TaskModal isOpen={!!selectedTask || showModal} onClose={() => { setShowModal(false); setSelectedTask(null); refreshTasks(); }} taskToEdit={selectedTask} />
        </div>
    );
};

export default PendingPage;