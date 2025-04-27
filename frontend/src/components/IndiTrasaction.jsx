import React, { useCallback, useContext } from "react";
import { FaTrash } from "react-icons/fa";
import privateAxios from "../axios/PrivateAxios";
import { StatsProvider } from "../context/StatsContext";

const IndiTrasaction = ({ data }) => {
    const isExpense = data.expenseType === "EXPENSE";

    const { onDelete } = useContext(StatsProvider);

    const handleClick = () => {
        console.log(data.id);
        onDelete(data.id);
    };
    return (
        <div
            className={`flex items-center justify-between gap-4 py-3 px-5 rounded-lg shadow-sm border border-gray-300 ${
                isExpense ? "bg-red-100" : "bg-green-100"
            }`}
        >
            <div className="w-[80px] text-right font-semibold text-gray-800">
                ₹{data.amt}
            </div>
            <div className="w-[90px]">
                <span
                    className={`block text-center px-2 py-1 rounded-full text-xs font-medium ${
                        isExpense
                            ? "bg-red-500 text-white"
                            : "bg-green-500 text-white"
                    }`}
                >
                    {data.expenseType}
                </span>
            </div>
            <div className="w-[120px] text-sm text-gray-700 capitalize text-center">
                {data.category}
            </div>
            <div className=" flex items-center gap-4 text-sm text-gray-500 text-right">
                <div
                    className="h-8 w-8 bg-gray-500/30 hover:bg-gray-500/60 cursor-pointer rounded-full flex items-center justify-center"
                    onClick={handleClick}
                >
                    <FaTrash className="text-red-400" />
                </div>
                {formatDate(data.dateTime)}
            </div>
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
