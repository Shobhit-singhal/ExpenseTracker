import React, { useContext, useEffect, useState } from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";
import privateAxios from "../axios/PrivateAxios";
import { StatsProvider } from "../context/StatsContext";

const History = () => {
    // const [year, setYear] = useState(2025);
    const { year, setYear } = useContext(StatsProvider);
    const { incomeStats, expenseStats } = useContext(StatsProvider);
    const newIncome = Object.entries(incomeStats).map(([month, income]) => ({
        month,
        income,
    }));
    const newExpense = Object.entries(expenseStats).map(([month, expense]) => ({
        month,
        expense,
    }));

    function mergeIncomeExpense(incomes, expenses) {
        const merged = new Map();

        incomes.forEach(({ month, income }) => {
            if (!merged.has(month)) {
                merged.set(month, { month, income: 0, expense: 0 });
            }
            merged.get(month).income = income;
        });

        expenses.forEach(({ month, expense }) => {
            if (!merged.has(month)) {
                merged.set(month, { month, income: 0, expense: 0 });
            }
            merged.get(month).expense = expense;
        });

        return Array.from(merged.values()).sort((a, b) => a.month - b.month);
    }
    const summary = mergeIncomeExpense(newIncome, newExpense);

    return (
        <div className="max-w-[900px] px-4 mx-auto mt-5">
            <div className="flex justify-between">
                <h2 className="text-xl font-bold leading-loose tracking-wide">
                    History
                </h2>
                <select
                    name="year"
                    id="year"
                    className="bg-black"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                >
                    <option value={2025}>2025</option>
                    <option value={2024}>2024</option>
                    <option value={2023}>2023</option>
                </select>
            </div>
            <div className="h-64 w-full mt-2">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={summary}>
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar
                            dataKey="income"
                            fill="#82ca9d"
                            radius={[10, 10, 0, 0]}
                            barSize={30}
                            stroke="#4CBB77"
                            strokeWidth={2}
                        />

                        <Bar
                            dataKey="expense"
                            fill="#f56c6c"
                            radius={[10, 10, 0, 0]}
                            barSize={30}
                            stroke="#F44336"
                            strokeWidth={2}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default History;
