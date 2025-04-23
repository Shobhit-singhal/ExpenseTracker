import React from "react";
import { FaRegMoon } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };
    return (
        <div className="flex justify-between items-center h-12 px-4 max-w-[900px] mx-auto">
            <ul className="flex gap-3 items-center text-sm text-[#565656] cursor-pointer">
                <NavLink
                    to="/"
                    className="text-xl text-[#E7BA53] font-bold tracking-wide"
                >
                    BudgetTracker
                </NavLink>
                <NavLink to="/">Dashboard</NavLink>
                <NavLink to="/transaction">Transaction</NavLink>
                <NavLink to="">Manage</NavLink>
            </ul>
            <div className="flex items-center gap-4">
                <div className="text-white font-bold">
                    <FaRegMoon />
                </div>
                <div
                    className="h-8 w-8 bg-gray-600 rounded-full cursor-pointer"
                    onClick={handleLogout}
                ></div>
            </div>
        </div>
    );
};

export default Navbar;
