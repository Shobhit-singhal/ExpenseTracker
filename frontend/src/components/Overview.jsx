import React, { useContext, useEffect, useState } from "react";
import OverviewCard from "./OverviewCard";
import OverviewByCategory from "./OverviewByCategory";
import { StatsProvider } from "../context/StatsContext";

const Overview = () => {
    const [start, setStart] = useState(() =>
        new Date(new Date().getFullYear(), 0, 1).toISOString().slice(0, 10)
    );
    const [end, setEnd] = useState(new Date().toISOString().slice(0, 10));
    const [showAll, setShowAll] = useState(false);

    const { incomeDataFromDate, expenseDataFromDate, fetchDataFromDate } =
        useContext(StatsProvider);

    const handleSearch = async () => {
        console.log("searched");
        fetchDataFromDate(start, end);
    };
    useEffect(() => {
        fetchDataFromDate(start, end);
    }, []);

    return (
        <div className="max-w-[900px] px-4 mx-auto mt-5">
            <div className="flex justify-between items-center">
                <h1 className="text-xl font-bold tracking-wide">Overview</h1>
                <div className="flex flex-col md:flex-row gap-2 items-end">
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
                {!incomeDataFromDate.loading &&
                    !expenseDataFromDate.loading &&
                    incomeDataFromDate.data &&
                    expenseDataFromDate.data && (
                        <>
                            <OverviewCard
                                title="Income"
                                amt={incomeDataFromDate.data.total.toFixed(2)}
                            />
                            <OverviewCard
                                title="Expense"
                                amt={expenseDataFromDate.data.total.toFixed(2)}
                            />
                            <OverviewCard
                                title="Saved"
                                amt={(
                                    incomeDataFromDate.data.total -
                                    expenseDataFromDate.data.total
                                ).toFixed(2)}
                            />
                        </>
                    )}
            </div>
            <div className="mt-2 flex flex-col md:flex-row gap-2 ">
                {!incomeDataFromDate.loading &&
                    !expenseDataFromDate.loading &&
                    incomeDataFromDate.data &&
                    expenseDataFromDate.data && (
                        <>
                            <OverviewByCategory
                                title="Income"
                                data={incomeDataFromDate.data.categoryTotal}
                                total={incomeDataFromDate.data.total}
                                showAll={showAll}
                                setShowAll={setShowAll}
                            />

                            <OverviewByCategory
                                title="Expense"
                                data={expenseDataFromDate.data.categoryTotal}
                                total={expenseDataFromDate.data.total}
                                showAll={showAll}
                                setShowAll={setShowAll}
                            />
                        </>
                    )}
            </div>
        </div>
    );
};

export default Overview;
