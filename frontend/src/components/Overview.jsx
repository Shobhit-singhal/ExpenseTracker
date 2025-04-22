import React, { useContext, useEffect } from "react";
import OverviewCard from "./OverviewCard";
import OverviewByCategory from "./OverviewByCategory";
import { StatsProvider } from "../context/StatsContext";

const Overview = () => {
    const { loadingIncome, loadingExpense, income, expense } =
        useContext(StatsProvider);

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
                    />
                )}
                {!loadingExpense && (
                    <OverviewByCategory
                        title="Expense"
                        data={expense.categoryTotal}
                        total={expense.total}
                    />
                )}
            </div>
        </div>
    );
};

export default Overview;
