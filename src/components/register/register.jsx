import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";

function Register() {
    const [isLoading,setIsLoading]=useState(false)
    const navigate=useNavigate()
    const users = {
        name: "",
        email: "",
        password: "",
        rePassword: "",
        phone: ""
    };

    async function submit(values) {
        setIsLoading(true)
        try {
            const res = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup", values);
            console.log(res.data.user);
            toast.success(res.data.message);
            setIsLoading(false)
            navigate("/login")
        } catch (error) {
            toast.error(error.response.data.message)
            setIsLoading(false)
        }
    }
    const validation = yup.object().shape({
        name: yup.string()
            .required("Name is required")
            .min(3, "Name must be at least 3 characters")
            .max(15, "Maximum characters is 15"),
        email: yup.string()
            .required("Email is required")
            .email("Apply email format"),
        password: yup.string()
            .required("Password is required")
            .matches(/^[A-Z][a-z0-9]{4,10}$/, "Password must start with uppercase and be at least 4 characters"),
        rePassword: yup.string()
            .required("Re-password is required")
            .oneOf([yup.ref("password")], "Re-password doesn't match"),
        phone: yup.string()
            .required("Phone is required")
            .matches(/^01[0125][0-9]{8}$/, "Phone must be a valid Egyptian number"),
    });

    const formik = useFormik({
        initialValues: users,
        onSubmit: submit,
        validationSchema: validation
    });

    return (
        <div className="py-10">
            <h1 className="text-green-700 text-center text-4xl font-bold mb-10">Registration Form</h1>
            <div className="md:w-[60%] mx-auto px-5">
                <form onSubmit={formik.handleSubmit}>
                    {/** Name Field */}
                    <div className="relative z-0 w-full mb-6 group">
                        <input 
                            type="text" 
                            name="name" 
                            id="floating_name" 
                            value={formik.values.name} 
                            onChange={formik.handleChange} 
                            onBlur={formik.handleBlur} 
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-600 peer" 
                            placeholder=" " 
                        />
                        <label 
                            htmlFor="floating_name" 
                            className="absolute text-sm text-gray-500 dark:text-gray-400 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:font-medium peer-focus:left-0 peer-focus:text-green-600 peer-focus:scale-75 peer-focus:-translate-y-6 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0"
                        >
                            Name
                        </label>
                        {formik.errors.name && formik.touched.name && (
                            <div className="text-sm text-red-600 mt-2">
                                {formik.errors.name}
                            </div>
                        )}
                    </div>

                    {/** Email Field */}
                    <div className="relative z-0 w-full mb-6 group">
                        <input 
                            type="email" 
                            name="email" 
                            id="floating_email" 
                            value={formik.values.email} 
                            onChange={formik.handleChange} 
                            onBlur={formik.handleBlur} 
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-600 peer" 
                            placeholder=" " 
                        />
                        <label 
                            htmlFor="floating_email" 
                            className="absolute text-sm text-gray-500 dark:text-gray-400 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:font-medium peer-focus:left-0 peer-focus:text-green-600 peer-focus:scale-75 peer-focus:-translate-y-6 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0"
                        >
                            Email Address
                        </label>
                        {formik.errors.email && formik.touched.email && (
                            <div className="text-sm text-red-600 mt-2">
                                {formik.errors.email}
                            </div>
                        )}
                    </div>

                    {/** Password Field */}
                    <div className="relative z-0 w-full mb-6 group">
                        <input 
                            type="password" 
                            name="password" 
                            id="floating_password" 
                            value={formik.values.password} 
                            onChange={formik.handleChange} 
                            onBlur={formik.handleBlur} 
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-600 peer" 
                            placeholder=" " 
                        />
                        <label 
                            htmlFor="floating_password" 
                            className="absolute text-sm text-gray-500 dark:text-gray-400 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:font-medium peer-focus:left-0 peer-focus:text-green-600 peer-focus:scale-75 peer-focus:-translate-y-6 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0"
                        >
                            Password
                        </label>
                        {formik.errors.password && formik.touched.password && (
                            <div className="text-sm text-red-600 mt-2">
                                {formik.errors.password}
                            </div>
                        )}
                    </div>

                    {/** Confirm Password Field */}
                    <div className="relative z-0 w-full mb-6 group">
                        <input 
                            type="password" 
                            name="rePassword" 
                            id="floating_repeat_password" 
                            value={formik.values.rePassword} 
                            onChange={formik.handleChange} 
                            onBlur={formik.handleBlur} 
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-600 peer" 
                            placeholder=" " 
                        />
                        <label 
                            htmlFor="floating_repeat_password" 
                            className="absolute text-sm text-gray-500 dark:text-gray-400 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:font-medium peer-focus:left-0 peer-focus:text-green-600 peer-focus:scale-75 peer-focus:-translate-y-6 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0"
                        >
                            Confirm Password
                        </label>
                        {formik.errors.rePassword && formik.touched.rePassword && (
                            <div className="text-sm text-red-600 mt-2">
                                {formik.errors.rePassword}
                            </div>
                        )}
                    </div>

                    {/** Phone Number Field */}
                    <div className="relative z-0 w-full mb-6 group">
                        <input 
                            type="tel" 
                            name="phone" 
                            id="floating_phone" 
                            value={formik.values.phone} 
                            onChange={formik.handleChange} 
                            onBlur={formik.handleBlur} 
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-600 peer" 
                            placeholder=" " 
                        />
                        <label 
                            htmlFor="floating_phone" 
                            className="absolute text-sm text-gray-500 dark:text-gray-400 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:font-medium peer-focus:left-0 peer-focus:text-green-600 peer-focus:scale-75 peer-focus:-translate-y-6 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0"
                        >
                            Phone Number
                        </label>
                        {formik.errors.phone && formik.touched.phone && (
                            <div className="text-sm text-red-600 mt-2">
                                {formik.errors.phone}
                            </div>
                        )}
                    </div>

                    {/** Submit Button */}
                    <button
                        type="submit" 
                        className="w-full bg-green-700 hover:bg-green-800 text-white font-medium py-2.5 rounded-lg text-sm focus:outline-none focus:ring-4 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                    >
                       {isLoading===true?<i className="fa-solid fa-spinner fa-spin"></i>:"Register"}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Register;
