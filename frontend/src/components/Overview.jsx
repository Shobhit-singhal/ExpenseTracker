import React from "react";
import OverviewCard from "./OverviewCard";

const Overview = () => {
    return (
        <div className="max-w-[900px] px-4 mx-auto mt-5">
            <div className="flex justify-between">
                <h1 className="text-xl font-bold tracking-wide">Overview</h1>
                <select
                    name="sort"
                    id="sort"
                    className="border-gray-50/10 border-1 px-4 cursor-pointer font-medium outline-0"
                >
                    <option value="abc"> Apr 1, 2004 - Apr 25, 2004</option>
                </select>
            </div>
            <div className="flex flex-col gap-3 mt-4 md:flex-row">
                <OverviewCard />
                <OverviewCard />
                <OverviewCard />
            </div>
        </div>
    );
};

export default Overview;
