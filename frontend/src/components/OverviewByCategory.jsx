import React from "react";
import ProgressBar from "@ramonak/react-progress-bar";
import IndiProgress from "./IndiProgress";

const OverviewByCategory = () => {
    return (
        <div className="w-full md:w-1/2 py-4 border-gray-50/10 bg-[#08080A] border-1 px-4 rounded-md">
            <h2 className="text-xl font-bold leading-loose tracking-wide text-gray-200">
                Income by category
            </h2>
            <div className="mt-3 flex flex-col gap-4 ">
                <IndiProgress />
                <IndiProgress />
                <IndiProgress />
            </div>
        </div>
    );
};

export default OverviewByCategory;
