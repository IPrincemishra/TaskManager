import { FiUser, FiMail, FiHome, FiCheckCircle, FiLock, FiMoreVertical } from 'react-icons/fi'
import { RiListCheck2, RiEdit2Line, RiDeleteBinLine, RiAwardLine, RiTimeLine, RiCalendar2Line } from 'react-icons/ri'
import { FaFire } from 'react-icons/fa'


export const Inputwrapper =
    "flex items-center border border-purple-100 rounded-lg px-3 py-2.5 focus-within:ring-2 focus-within:ring-purple-500 focus-within:border-purple-500 transition-all duration-200"
export const BUTTONCLASSES =
    "w-full bg-gradient-to-r from-fuchsia-500 to-purple-600 text-white text-sm font-semibold py-2.5 rounded-lg hover:shadow-md transition-all duration-200 flex items-center justify-center gap-2"
export const MESSAGE_SUCCESS = "bg-green-50 text-green-600 p-3 rounded-lg text-sm mb-4 border border-green-100"
export const MESSAGE_ERROR = "bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-4 border border-red-100"

export const FIELDS = [
    { name: "name", type: "text", placeholder: "Full Name", icon: FiUser },
    { name: "email", type: "email", placeholder: "Email", icon: FiMail },
    { name: "password", type: "password", placeholder: "Password", icon: FiLock },
]

// Login




export const API_URL = "http://localhost:8000"