// src/components/ResetPassword.jsx
import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate, useLocation } from 'react-router-dom';

function ResetPassword() {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const email = location.state?.email; // Get email from location state

    async function handleSubmit(e) {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            toast.error('Passwords do not match.');
            return;
        }

        setIsLoading(true);
        try {
            await axios.put('https://ecommerce.routemisr.com/api/v1/auth/resetPassword', {
                email,
                newPassword
            });
            toast.success('Password reset successfully.');
            navigate('/login'); // Redirect to login page after success
        } catch (error) {
            toast.error('Failed to reset password.');
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="py-10">
            <h1 className="text-green-700 text-center text-4xl font-bold mb-10">Reset Password</h1>
            <div className="md:w-[60%] mx-auto px-5">
                <form onSubmit={handleSubmit}>
                    <div className="relative z-0 w-full mb-6 group">
                        <input
                            type="password"
                            name="newPassword"
                            id="floating_newPassword"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-600 peer"
                            placeholder=" "
                        />
                        <label
                            htmlFor="floating_newPassword"
                            className="absolute text-sm text-gray-500 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:font-medium peer-focus:left-0 peer-focus:text-green-600 peer-focus:scale-75 peer-focus:-translate-y-6 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0"
                        >
                            New Password
                        </label>
                    </div>
                    <div className="relative z-0 w-full mb-6 group">
                        <input
                            type="password"
                            name="confirmPassword"
                            id="floating_confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-600 peer"
                            placeholder=" "
                        />
                        <label
                            htmlFor="floating_confirmPassword"
                            className="absolute text-sm text-gray-500 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:font-medium peer-focus:left-0 peer-focus:text-green-600 peer-focus:scale-75 peer-focus:-translate-y-6 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0"
                        >
                            Confirm Password
                        </label>
                    </div>
                    <button
                        type="submit"
                        className="w-full mt-5 bg-green-700 hover:bg-green-800 text-white font-medium py-2.5 rounded-lg text-sm focus:outline-none focus:ring-4 focus:ring-green-300"
                    >
                        {isLoading ? <i className="fa-solid fa-spinner fa-spin"></i> : "Reset Password"}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default ResetPassword;
