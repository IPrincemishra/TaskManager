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

// Sidebar
export const menuItems = [
    { text: "Dashboard", path: "/", icon: FiHome },
    { text: "Pending Tasks", path: "/pending", icon: RiListCheck2 },
    { text: "Completed Tasks", path: "/complete", icon: FiCheckCircle },
]


export const LINK_CLASSES = {
    base: "group flex items-center px-4 py-3 rounded-xl transition-all duration-300",
    active: "bg-gradient-to-r from-purple-50 to-fuchsia-50 border-l-4 border-purple-500 text-purple-700 font-medium shadow-sm",
    inactive: "hover:bg-purple-50/50 text-gray-600 hover:text-purple-700",
    icon: "transition-transform duration-300 group-hover:scale-110 text-purple-500",
    text: "text-sm font-medium ml-2",
}

export const personalFields = [
    { name: "name", type: "text", placeholder: "Full Name", icon: FiUser },
    { name: "email", type: "email", placeholder: "Email", icon: FiMail },
]

export const securityFields = [
    { name: "current", placeholder: "Current Password" },
    { name: "new", placeholder: "New Password" },
    { name: "confirm", placeholder: "Confirm Password" },
];

export const API_URL = "http://localhost:8000"