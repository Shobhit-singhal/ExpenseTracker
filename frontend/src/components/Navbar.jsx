import React, { useEffect, useState } from "react";
import { FaRegMoon } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    const [prevScrollpos, setPrevScrollpos] = useState(window.pageYOffset);
    const [top, setTop] = useState(0);
    useEffect(() => {
        const handleScroll = () => {
            const currentScrollPos = window.pageYOffset;
            if (prevScrollpos > currentScrollPos) {
                setTop(0);
            } else {
                setTop(-50);
            }
            setPrevScrollpos(currentScrollPos);
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [prevScrollpos]);

    return (
        <div
            className="flex justify-between items-center h-12 px-4 max-w-[900px] mx-auto sticky bg-black z-10 transition-all duration-200 "
            style={{ top: `${top}px` }}
        >
            <ul className="flex gap-3 items-center text-sm text-[#565656] cursor-pointer">
                <NavLink
                    to="/"
                    className="text-xl text-[#E7BA53] font-bold tracking-wide"
                >
                    BudgetTracker
                </NavLink>
                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        isActive ? "text-blue-500" : ""
                    }
                >
                    Dashboard
                </NavLink>
                <NavLink
                    to="/transaction"
                    className={({ isActive }) =>
                        isActive ? "text-blue-500" : ""
                    }
                >
                    Transaction
                </NavLink>
                {/* <NavLink to="">Manage</NavLink> */}
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
