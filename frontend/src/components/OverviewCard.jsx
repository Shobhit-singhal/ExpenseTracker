import React from "react";

const OverviewCard = ({ title, amt }) => {
    const getColor = () => {
        if (title == "Income") {
            return "bg-green-400/20 ";
        } else if (title == "Expense") {
            return "bg-red-400/20";
        } else {
            return "bg-purple-500/20";
        }
    };
    return (
        <div className=" py-4 border-gray-50/10 bg-[#08080A] border-1  px-4 flex items-center rounded-md w-2/3 mx-auto gap-2 ">
            <div className={`h-10 w-10 rounded-md ${getColor()}`}></div>
            <div>
                <p className="text-xs text-gray-300">{title}</p>
                <p className="text-lg font-bold ">$ {amt} </p>
            </div>
        </div>
    );
};

export default OverviewCard;
