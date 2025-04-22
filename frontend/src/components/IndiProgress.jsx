import React from "react";
import ProgressBar from "@ramonak/react-progress-bar";

const IndiProgress = ({ category, total, per }) => {
    return (
        <div>
            <div className="flex justify-between items-center mb-1">
                <h3 className="text-md font-bold">
                    {category}{" "}
                    <span className="text-xs text-gray-400">({per}%)</span>
                </h3>
                <h4 className="text-xs text-gray-400">${total}</h4>
            </div>
            <ProgressBar
                completed={per}
                customLabel=" "
                height="4px"
                bgColor="lime"
                baseBgColor="gray"
            />
        </div>
    );
};

export default IndiProgress;
