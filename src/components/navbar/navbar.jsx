import { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import { AddToCartContext } from "../../context/addTocartContext";
import logo from "./../../assets/images/freshcart-logo.svg";

function Navbar() {
    const { token, setToken } = useContext(AuthContext);
    const { numOfCartItems } = useContext(AddToCartContext);
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    function Logout() {
        setToken(null);
        localStorage.removeItem("token"); // Clear token from localStorage on logout
        navigate("/login");
        setIsOpen(false); // Close the menu on logout
    }

    function handleNavLinkClick() {
        setIsOpen(false); // Close the menu on link click
    }

    return (
        <nav className="bg-gray-100 shadow-md p-2">
            <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between px-4 py-3">
                {/* Logo */}
                <div className="flex items-center justify-between w-full lg:w-auto">
                    <img src={logo} alt="Logo" className="w-32 h-auto" />
                    {/* Toggle Button for Mobile */}
                    <button 
                        className="lg:hidden text-gray-700 focus:outline-none"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        <i className={`fa-solid ${isOpen ? 'fa-xmark' : 'fa-bars'} text-xl`}></i>
                    </button>
                </div>

                {/* Navigation Links */}
                <div className={`w-full lg:w-auto lg:flex lg:items-center lg:space-x-4 ${isOpen ? 'block' : 'hidden'} lg:block lg:pt-0 pt-4`}>
                    <ul className="flex flex-col lg:flex-row gap-4 lg:gap-4 items-center">
                        {token ? (
                            <>
                                <li className="transform transition-transform duration-300 hover:scale-110">
                                    <NavLink to="/home" className="text-gray-700 hover:text-green-600" onClick={handleNavLinkClick}>Home</NavLink>
                                </li>
                                <li className="transform transition-transform duration-300 hover:scale-110">
                                    <NavLink to="/products" className="text-gray-700 hover:text-green-600" onClick={handleNavLinkClick}>Products</NavLink>
                                </li>
                                <li className="transform transition-transform duration-300 hover:scale-110">
                                    <NavLink to="/category" className="text-gray-700 hover:text-green-600" onClick={handleNavLinkClick}>Categories</NavLink>
                                </li>
                                <li className="transform transition-transform duration-300 hover:scale-110">
                                    <NavLink to="/brands" className="text-gray-700 hover:text-green-600" onClick={handleNavLinkClick}>Brands</NavLink>
                                </li>
                                <li className="transform transition-transform duration-300 hover:scale-110">
                                    <NavLink to="/allorders" className="text-gray-700 hover:text-green-600" onClick={handleNavLinkClick}>All Orders</NavLink>
                                </li>
                                <li className="transform transition-transform duration-300 hover:scale-110">
                                    <NavLink to="/wishList" className="text-gray-700 hover:text-green-600" onClick={handleNavLinkClick}>Wishlist</NavLink>
                                </li>
                                <li className="relative transform transition-transform duration-300 hover:scale-110 lg:mt-0 mt-2">
                                    <NavLink to="/cart" className="relative" onClick={handleNavLinkClick}>
                                        <i className="fa-solid fa-cart-shopping md:mt-4"></i>
                                        <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-4 -end-4 dark:border-gray-900">{numOfCartItems}</div>
                                    </NavLink>
                                </li>
                                <li className="transform transition-transform duration-300 hover:scale-110">
                                    <button onClick={Logout} className="text-gray-700 hover:text-red-600 ms-2">
                                        Logout
                                    </button>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="transform transition-transform duration-300 hover:scale-110">
                                    <NavLink to="/login" className="text-gray-700 hover:text-green-600" onClick={handleNavLinkClick}>
                                        Login
                                    </NavLink>
                                </li>
                                <li className="transform transition-transform duration-300 hover:scale-110">
                                    <NavLink to="/register" className="text-gray-700 hover:text-green-600" onClick={handleNavLinkClick}>
                                        Register
                                    </NavLink>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
