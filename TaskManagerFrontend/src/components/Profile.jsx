import React, { useEffect, useState } from 'react';
import { BiChevronLeft, BiLock, BiSave, BiShield, BiUserCircle } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { API_URL, personalFields, securityFields } from '../constants/constants';
import axios from 'axios';
import { LuLogOut } from 'react-icons/lu';


const Profile = ({ setCurrentUser, onLogout }) => {

    const [profile, setProfile] = useState({ name: "", email: "" })
    const [pass, setPass] = useState({ current: "", new: "", confirm: "" })

    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (!token) return;
        axios
            .get(`${API_URL}/api/user/me`, {
                headers: { Authorization: `Bearer ${token}` }
            })
            .then(({ data }) => {
                if (data.success) setProfile({ name: data.user.name, email: data.user.email })
                else toast.error(data.message)
            })
            .catch(() => toast.error("Unable to load profile"))

    }, [])

    const saveProfile = async (e) => {
        e.preventDefault()
        try {
            const token = localStorage.getItem('token')
            const { data } = await axios.put(
                `${API_URL}/api/user/profile`,
                { name: profile.name, email: profile.email },
                { headers: { Authorization: `Bearer ${token}` } }
            )
            if (data.success) {
                setCurrentUser((prev) => ({
                    ...prev,
                    name: profile.name,
                    avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(profile.name || 'User')}&background=random`
                }))
                toast.success("Profile Updated")
            } else
                toast.error("Unable to update")

        }
        catch (err) {
            console.log(err.response?.data?.message || "Profile update failed");
        }
    }

    const changePassword = async (e) => {
        e.preventDefault()
        if (pass.new !== pass.confirm) {
            return toast.error("Password and confirm password does not match")
        }

        try {
            const token = localStorage.getItem('token')
            const { data } = await axios.put(
                `${API_URL}/api/user/password`,
                { currentPassword: pass.current, newPassword: pass.new },
                { headers: { Authorization: `Bearer ${token}` } }
            )
            if (data.success) {
                toast.success("Password Changed")
                setPass({ current: "", new: "", confirm: "" })
            }
            else toast.error(data.message)
        } catch (err) {
            console.log(err.response?.data?.message || "Password change failed");
        }
    }

    return (
        <div className='min-h-screen bg-gray-50'>
            <ToastContainer position='top-center' autoClose={3000} />
            <div className='max-w-4xl mx-auto p-6'>
                <button onClick={() => navigate(-1)} className='flex items-center text-gray-600 hover:text-purple-600 mb-8 transition-colors duration-200'>
                    <BiChevronLeft className='w-5 h-5 mr-1' />
                    Back to Dashboard
                </button>

                <div className='flex items-center gap-4 mb-8'>
                    <div className='w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold shadow-md'>
                        {profile.name ? profile.name[0].toUpperCase() : "U"}
                    </div>
                    <div>
                        <h1 className='text-3xl font-bold text-gray-800'>Account Settings</h1>
                        <p className='text-gray-500 text-sm'>Manage your profile and security settings</p>
                    </div>
                </div>

                <div className='grid md:grid-cols-2 gap-8'>
                    <section className='bg-white rounded-xl shadow-sm border border-purple-100 p-6'>
                        <div className='flex items-center gap-2 mb-6'>
                            <BiUserCircle className='text-purple-500 w-5 h-5' />
                            <h3 className='text-xl font-semibold text-gray-800'>Personal Information</h3>
                        </div>

                        <form onSubmit={saveProfile} className='space-y-4'>
                            {personalFields.map(({ name, type, placeholder, icon: Icon }) => (
                                <div key={name} className='flex items-center border border-purple-100 rounded-lg px-3 py-2.5 focus-within:ring-2 focus-within:ring-purple-500 focus-within:border-purple-500 transition-all duration-200'>
                                    <Icon className='text-blue-500 w-5 h-5 mr-2' />
                                    <input type={type} placeholder={placeholder} value={profile[name]} onChange={(e) => setProfile({ ...profile, [name]: e.target.value })} className='w-full focus:outline-none text-sm ' required />

                                </div>
                            ))}
                            <button className='w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2.5 rounded-lg hover:shadow-md transition-all duration-200 flex items-center justify-center gap-2'>
                                <BiSave className='w-4 h-4' /> Save Changes
                            </button>
                        </form>

                    </section>

                    <section className='bg-white rounded-xl shadow-sm border border-purple-100 p-6'>
                        <div className='flex items-center gap-2 mb-6'>
                            <BiShield className='text-purple-500 w-5 h-5' />
                            <h3 className='text-xl font-semibold text-gray-800'>Security</h3>
                        </div>

                        <form onSubmit={changePassword} className='space-y-4'>
                            {securityFields.map(({ name, placeholder }) => (
                                <div key={name} className='flex items-center border border-purple-100 rounded-lg px-3 py-2.5 focus-within:ring-2 focus-within:ring-purple-500 focus-within:border-purple-500 transition-all duration-200'>
                                    <BiLock className='text-blue-500 w-5 h-5 mr-2' />
                                    <input type='password' placeholder={placeholder} value={pass[name]} onChange={(e) => setPass({ ...pass, [name]: e.target.value })} className='w-full focus:outline-none text-sm ' required />
                                </div>
                            ))}
                            <button className='w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2.5 rounded-lg hover:shadow-md transition-all duration-200 flex items-center justify-center gap-2'>
                                <BiShield className='w-4 h-4' /> Change Password
                            </button>
                            <div className='mt-8 p-6 border-t border-purple-100'>
                                <h3 className='text-red-600 font-semibold mb-4 flex items-center gap-2'>
                                    <LuLogOut className='w-4 h-4' /> Danger Zone
                                </h3>
                                <button className='w-full text-red-600 border border-red-200 py-2.5 rounded-lg hover:bg-red-50 transition-colors duration-200' onClick={onLogout}>Logout</button>

                            </div>
                        </form>
                    </section>

                </div>
            </div>
        </div>
    );
};

export default Profile;