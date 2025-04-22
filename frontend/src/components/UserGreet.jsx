import React, { useEffect, useState } from "react";
import privateAxios from "../axios/PrivateAxios";
import { useNavigate } from "react-router-dom";

const UserGreet = ({ isHome = false }) => {
    const [name, setName] = useState("Guest");
    const navigate = useNavigate();
    useEffect(() => {
        const getName = async () => {
            try {
                let res = await privateAxios.get("/user/info");
                setName(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        getName();
    }, []);
    const handleClick = (e) => {
        if (isHome) navigate("/create");
        else navigate("/");
    };

    return (
        <div className="h-24 bg-[#08080A] border-y-1 border-gray-50/10">
            <div className="max-w-[900px] h-full mx-auto flex justify-between items-center px-4">
                <p className="text-2xl md:text-3xl font-bold font-mono">
                    Hello, {name}👋
                </p>
                <div className="flex gap-3">
                    <button
                        className="bg-green-400/20 px-4 py-1 rounded-md border-1 border-green-400 cursor-pointer text-sm"
                        onClick={handleClick}
                    >
                        {isHome ? "Add Expense" : "Back to home"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UserGreet;
