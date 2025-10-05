import React, { useEffect, useState } from 'react';
import { IoLogIn } from 'react-icons/io5';
import { toast, ToastContainer } from 'react-toastify';
import { API_URL, BUTTONCLASSES, Inputwrapper, MESSAGE_ERROR, MESSAGE_SUCCESS } from '../constants/constants';
import { useNavigate } from 'react-router-dom';
import { FiEye, FiEyeOff, FiLock, FiMail } from 'react-icons/fi';
import { FaUserPlus } from 'react-icons/fa';
import axios from 'axios';


const INITIAL_FORM = { email: "", password: "" }

const Login = ({ onSubmit, onSwitchMode }) => {

    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState(INITIAL_FORM)
    const [showPass, setShowPass] = useState(false)
    const [rememberMe, setRememberMe] = useState(false)

    const navigate = useNavigate()

    const fields = [
        {
            name: "email",
            type: "email",
            placeholder: "Email",
            icon: FiMail
        },
        {
            name: "password",
            type: showPass ? "text" : "password",
            placeholder: "Password",
            icon: FiLock,
            isPassword: true
        }
    ]

    useEffect(() => {
        const token = localStorage.getItem("token")
        const userId = localStorage.getItem("userId")
        if (token) {
            (async () => {
                try {
                    const data = await axios.get(`${API_URL}/api/user/me`, {
                        headers: { Authorization: `Bearer ${token}` }
                    })
                    if (!data.success) {
                        onSubmit?.({ token, userId, ...data.user })
                        toast.success("Session restored. Redirecting")
                        navigate('/')
                    } else {
                        localStorage.clear()

                    }
                } catch (err) {
                    localStorage.clear()
                    console.log(err);

                }
            })
        }
    }, [navigate, onSubmit])

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!rememberMe) {
            toast.error('You must enable "Remember Me" to login.')
            return;
        }
        setLoading(true)
        try {
            const { data } = await axios.post(`${API_URL}/api/user/login`, formData)

            if (!data.token) throw new Error(data.message || "Login failed")

            localStorage.setItem("token", data.token)
            localStorage.setItem("userId", data.user.id)
            setFormData(INITIAL_FORM)
            onSubmit?.({ token: data.token, userId: data.user.id, ...data.user })
            toast.success("Login successful! Redirecting")
            setTimeout(() => navigate("/"), 1000);
        }
        catch (err) {
            const message = err.response?.data?.message || err.message
            toast.error(message)
        } finally {
            setLoading(false)
        }
    }

    const handleSwitchMode = () => {
        toast.dismiss()
        onSwitchMode?.()
    }


    return (
        <div className='max-w-md w-full bg-white shadow-lg border border-purple-100 rounded-xl p-8'>

            <ToastContainer position='top-center' autoClose={3000} hideProgressBar />

            <div className='mb-6 text-center'>
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full mx-auto flex items-center justify-center mb-4">
                    <IoLogIn className='w-8 h-8 text-white' />
                </div>
                <h2 className='text-2xl font-bold text-gray-800'>Welcome Back!</h2>
                <p className="text-gray-500 text-sm mt-1">Sign in to continue to Task Manager</p>
            </div>
            <form onSubmit={handleSubmit} className='space-y-4'>
                {fields.map(({ name, type, placeholder, icon: Icon, isPassword }) => (
                    <div key={name} className={Inputwrapper}>
                        <Icon className='text-blue-500 w-5 h-5 mr-2' />
                        <input type={type} placeholder={placeholder} value={formData[name]} onChange={(e) => setFormData({ ...formData, [name]: e.target.value })} className='w-full focus:outline-none text-sm text-gray-700' required />

                        {isPassword && (
                            <button type='button' onClick={() => setShowPass((prev) => !prev)} className='ml-2 text-gray-500 hover:text-purple-500 transition-colors'>
                                {showPass ? <FiEyeOff className='w-5 h-5' /> : <FiEye className='w-5 h-5' />}
                            </button>
                        )}
                    </div>
                ))}
                <div className="flex items-center">
                    <input type="checkbox" id='rememberMe' checked={rememberMe} onChange={() => setRememberMe(!rememberMe)} className='h-4 w-4 text-purple-500 focus:ring-purple-500 border-gray-300 rounded' required />
                    <label htmlFor='rememberMe' className='ml-2 block text-sm text-gray-700'>Remember Me</label>
                </div>
                <button type='submit' className={BUTTONCLASSES} disabled={loading}>{loading ? "Logging In..." : <><FaUserPlus className='w-4 h-4' />Login In</>}</button>
            </form>
            <p className='text-center text-sm text-gray-600 mt-6'>
                Don't have an account ? {' '}
                <button onClick={handleSwitchMode} className='text-purple-600 hover:text-purple-700 hover:underline font-medium transition-colors'>
                    Sign Up
                </button>
            </p>
        </div>
    );
};

export default Login;