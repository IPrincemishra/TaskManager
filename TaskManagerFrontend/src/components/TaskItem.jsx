import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BiCheckCircle } from 'react-icons/bi';
import { API_URL } from '../constants/constants';

const TaskItem = ({ task, onRefresh, onLogout, showCompleteCheckbox = true }) => {

    const [showMenu, setShowMenu] = useState(false)
    const [isCompleted, setIsCompleted] = useState(
        [true, 1, 'yes'].includes(
            typeof task.completed === 'string' ? task.completed.toLowerCase() : task.completed
        )
    )

    const [showEditModal, setShowEditModal] = useState(false)
    const [subtasks, setSubtasks] = useState(task.subtasks || [])

    useEffect(() => {
        setIsCompleted(
            [true, 1, 'yes'].includes(
                typeof task.completed === 'string' ? task.completed.toLowerCase() : task.completed
            )
        )
    }, [task.completed])

    const getAuthHeaders = () => {
        const token = localStorage.getItem('token')
        if (!token) throw new Error("No auth token found")
        return {
            Authorization: `Bearer ${token}`
        }
    }

    const borderColor = isCompleted ? "border-green-500" : getPriorityColor(task.priority).split(" ")[0]

    const handleComplete = async () => {
        const newStatus = isCompleted ? 'No' : 'Yes'
        try {
            await axios.put(`${API_URL}/api/tasks/${task.id}/gp`, { completed: newStatus },
                { headers: getAuthHeaders() })
            setIsCompleted(!isCompleted)
            onRefresh?.()
        } catch (err) {
            console.log(err);
            if (err.response?.status === 401) onLogout?.()
        }
    }

    const progress = subtasks.length ? (subtasks.filter(st => st.completed).length / subtasks.length) * 100 : 0;

    return (
        <>
            <div className={`group p-4 sm:p-5 rounded-xl shadow-sm bg-white border-l-4 hover:shadow-md transition-all duration-300 border border-purple-100 ${borderColor}`}>
                <div className='flex items-start gap-2 sm:gap-3 flex-1 min-w-0'>
                    {showCompleteCheckbox && (
                        <button onClick={handleComplete} className={`mt-0.5 sm:mt-1 p-1 sm:p-1.5 rounded-full hover:bg-purple-100 transition-colors duration-300 ${isCompleted ? "text-green-500" : "text-gray-300"}`}>
                            <BiCheckCircle size={18} className={`w-4 h-4 sm:w-5 sm:h-5 ${isCompleted ? "fill-green-500" : ""}`} />
                        </button>
                    )}
                </div>
            </div>
        </>
    );
};

export default TaskItem;