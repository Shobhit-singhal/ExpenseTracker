import React from "react";
import ProgressBar from "@ramonak/react-progress-bar";

const IndiProgress = () => {
    return (
        <div>
            <div className="flex justify-between items-center mb-1">
                <h3 className="text-md font-bold">
                    Salary <span className="text-xs text-gray-400">(30%)</span>
                </h3>
                <h4 className="text-xs text-gray-400">$38,800</h4>
            </div>
            <ProgressBar
                completed={30}
                customLabel=" "
                height="4px"
                bgColor="lime"
                baseBgColor="gray"
            />
        </div>
    );
};

export default IndiProgress;
