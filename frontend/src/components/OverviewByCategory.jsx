import React, { useContext, useEffect, useState } from "react";
import ProgressBar from "@ramonak/react-progress-bar";
import IndiProgress from "./IndiProgress";
import { StatsProvider } from "../context/StatsContext";

const OverviewByCategory = ({ title, data, total ,showAll,setShowAll }) => {
    const sortedEntries = Object.entries(data)
        .map(([category, amt]) => ({
            category,
            amt,
            per: Math.round((amt / total) * 100),
        }))
        .sort((a, b) => b.per - a.per);
    const reducedEntries = sortedEntries.slice(0, 3);
    let showingEntries = showAll ? sortedEntries : reducedEntries;
    return (
        <div
            className="w-full cursor-pointer md:w-1/2 py-4 border-gray-50/10 bg-[#08080A] border-1 px-4 rounded-md"
            onClick={(e) => setShowAll((prevShowAll) => !prevShowAll)}
        >
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold leading-loose tracking-wide text-gray-200">
                    {title} by category
                </h2>
                <h3 className="text-sm text-gray-400">${total}</h3>
            </div>
            <div className="mt-3 flex flex-col gap-4 ">
                {showingEntries.map(({ category, amt, per }) => (
                    <IndiProgress
                        key={category}
                        category={category}
                        total={amt}
                        per={per}
                    />
                ))}
            </div>
        </div>
    );
};

export default OverviewByCategory;
