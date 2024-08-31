// src/components/EnterResetCode.jsx
import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate, useLocation } from 'react-router-dom';

function EnterResetCode() {
    const [resetCode, setResetCode] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const email = location.state?.email; // Get email from location state

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            await axios.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode', { resetCode });
            toast.success('Reset code verified.');
            navigate('/ResetPassword', { state: { email } }); // Pass email to the ResetPassword page
        } catch (error) {
            toast.error('Failed to verify reset code.');
        }
    }

    return (
        <div className="py-10">
            <h1 className="text-green-700 text-center text-4xl font-bold mb-10">Enter Reset Code</h1>
            <div className="md:w-[60%] mx-auto px-5">
                <form onSubmit={handleSubmit}>
                    <div className="relative z-0 w-full mb-6 group">
                        <input
                            type="text"
                            name="resetCode"
                            id="floating_resetCode"
                            value={resetCode}
                            onChange={(e) => setResetCode(e.target.value)}
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-600 peer"
                            placeholder=" "
                        />
                        <label
                            htmlFor="floating_resetCode"
                            className="absolute text-sm text-gray-500 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:font-medium peer-focus:left-0 peer-focus:text-green-600 peer-focus:scale-75 peer-focus:-translate-y-6 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0"
                        >
                            Reset Code
                        </label>
                    </div>
                    <button
                        type="submit"
                        className="w-full mt-5 bg-green-700 hover:bg-green-800 text-white font-medium py-2.5 rounded-lg text-sm focus:outline-none focus:ring-4 focus:ring-green-300"
                    >
                        Verify Code
                    </button>
                </form>
            </div>
        </div>
    );
}

export default EnterResetCode;
