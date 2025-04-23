import React, { useContext, useEffect, useState } from "react";
import OverviewCard from "./OverviewCard";
import OverviewByCategory from "./OverviewByCategory";
import { StatsProvider } from "../context/StatsContext";

const Overview = () => {
    const {
        loadingIncome,
        loadingExpense,
        income,
        expense,
        start,
        setStart,
        end,
        setEnd,
        fetchData,
    } = useContext(StatsProvider);
    const [showAll, setShowAll] = useState(false);
    const handleSearch = async () => {
        console.log("searched");
        await fetchData();
    };
    return (
        <div className="max-w-[900px] px-4 mx-auto mt-5">
            <div className="flex justify-between items-center">
                <h1 className="text-xl font-bold tracking-wide">Overview</h1>
                <div className="flex flex-col gap-2 items-end">
                    <div className="flex gap-2">
                        <label htmlFor="start">Start: </label>
                        <input
                            type="date"
                            className="border-gray-50/10 border-1 px-4 cursor-pointer font-medium outline-0"
                            value={start}
                            id="start"
                            onChange={(e) => setStart(e.target.value)}
                        />
                    </div>
                    <div className="flex gap-2">
                        <label htmlFor="end">End: </label>
                        <input
                            type="date"
                            className="border-gray-50/10 border-1 px-4 cursor-pointer font-medium outline-0"
                            value={end}
                            id="end"
                            onChange={(e) => setEnd(e.target.value)}
                        />
                    </div>
                </div>
                <input
                    type="button"
                    value={"Search"}
                    className="bg-blue-500 rounded-xl h-fit py-1 px-4 text-black font-bold  cursor-pointer"
                    onClick={handleSearch}
                />
            </div>
            <div className="flex flex-col gap-3 mt-4 md:flex-row">
                {!loadingIncome && (
                    <OverviewCard title="Income" amt={income.total} />
                )}
                {!loadingExpense && (
                    <OverviewCard title="Expense" amt={expense.total} />
                )}
                {!loadingExpense && !loadingIncome && (
                    <OverviewCard
                        title="Saved"
                        amt={income.total - expense.total}
                    />
                )}
            </div>
            <div className="mt-2 flex flex-col md:flex-row gap-2 ">
                {!loadingIncome && (
                    <OverviewByCategory
                        title="Income"
                        data={income.categoryTotal}
                        total={income.total}
                        showAll={showAll}
                        setShowAll={setShowAll}
                    />
                )}
                {!loadingExpense && (
                    <OverviewByCategory
                        title="Expense"
                        data={expense.categoryTotal}
                        total={expense.total}
                        showAll={showAll}
                        setShowAll={setShowAll}
                    />
                )}
            </div>
        </div>
    );
};

export default Overview;
