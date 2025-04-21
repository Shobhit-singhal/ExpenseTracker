import React from "react";

const OverviewCard = () => {
    return (
        <div className=" py-4 border-gray-50/10 bg-[#08080A] border-1  px-4 flex items-center rounded-md w-2/3 mx-auto gap-2 ">
            <div className="h-10 w-10 bg-green-400/20 rounded-md"></div>
            <div>
                <p className="text-xs text-gray-300">Income</p>
                <p className="text-lg font-bold ">$ 2,303,000 </p>
            </div>
        </div>
    );
};

export default OverviewCard;
