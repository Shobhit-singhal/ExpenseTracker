import React, { useContext } from "react";
import { FaTrash } from "react-icons/fa";
import { StatsProvider } from "../context/StatsContext";
import { FaPen } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const IndiTrasaction = ({ data, expanded, setExpanded }) => {
    const isExpense = data.expenseType === "EXPENSE";

    const { onDelete } = useContext(StatsProvider);
    const navigate = useNavigate();

    const handleDelete = (e) => {
        e.stopPropagation();
        onDelete(data.id);
    };
    const handleClick = (e) => {
        e.stopPropagation();
        setExpanded(expanded == data.id ? -1 : data.id);
    };
    const handleUpdate = (e) => {
        e.stopPropagation();
        navigate(`/update/${data.id}`);
    };

    return (
        <div
            className={`flex flex-col gap-3 py-4 px-6  rounded-2xl shadow-md border ${
                isExpense
                    ? "bg-red-50 border-red-200"
                    : "bg-green-50 border-green-200"
            } hover:shadow-lg cursor-pointer  transition-all`}
            onClick={handleClick}
        >
            <div className={`flex items-center justify-between gap-6 `}>
                <div className="w-[90px] text-right font-bold text-gray-800 text-lg">
                    ₹{data.amt}
                </div>

                <div className="w-[100px]">
                    <span
                        className={`block text-center px-3 py-1 rounded-full text-xs font-semibold ${
                            isExpense
                                ? "bg-red-500/90 text-white"
                                : "bg-green-500/90 text-white"
                        }`}
                    >
                        {data.expenseType}
                    </span>
                </div>

                <div className="w-[140px] text-sm text-gray-700 capitalize text-center font-medium">
                    {data.category}
                </div>

                <div className="flex items-center gap-4 text-sm text-gray-600">
                    {/* Delete Button */}
                    <div
                        className="h-9 w-9 bg-gray-400/20 hover:bg-gray-500/30 cursor-pointer rounded-full flex items-center justify-center transition-colors"
                        onClick={handleDelete}
                    >
                        <FaTrash className="text-red-500" />
                    </div>
                    <div
                        className="h-9 w-9 bg-gray-400/20 hover:bg-gray-500/30 cursor-pointer rounded-full flex items-center justify-center transition-colors"
                        onClick={handleUpdate}
                    >
                        <FaPen className="text-blue-600" />
                    </div>

                    <div className="text-xs">{formatDate(data.dateTime)}</div>
                </div>
            </div>
            {expanded === data.id && data.description && (
                <div className="bg-white text-black font-medium text-md px-6 py-4 rounded-md transition-all duration-150">
                    {data.description}
                </div>
            )}
        </div>
    );
};

const formatDate = (datetime) => {
    const date = new Date(datetime);
    return date.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
    });
};

export default IndiTrasaction;
