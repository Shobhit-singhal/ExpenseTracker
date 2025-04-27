import React, { useContext, useEffect, useState } from "react";
import { Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { StatsProvider } from "../context/StatsContext";

const PieChartComp = () => {
    const { incomePieChartData, expensePieChartData, fetchPieChartData } =
        useContext(StatsProvider);

    const [incomeData, setIncomeData] = useState([]);
    const [expenseData, setExpenseData] = useState([]);
    const [incomeTotal, setIncomeTotal] = useState(0);
    const [expenseTotal, setExpenseTotal] = useState(0);
    const getRandomColor = () => {
        const colors = [
            "#8884d8",
            "#82ca9d",
            "#ffc658",
            "#ff8042",
            "#8dd1e1",
            "#d0ed57",
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    };

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            const { name, value } = payload[0];
            return (
                <div className="bg-white text-black border p-2 rounded shadow">
                    <p className="text-sm font-semibold">{name}</p>
                    <p className="text-xs">Total: ₹{value}</p>
                </div>
            );
        }
        return null;
    };

    useEffect(() => {
        fetchPieChartData();
    }, []);
    useEffect(() => {
        console.log(incomePieChartData, " ", expensePieChartData);
        if (incomePieChartData.data && expensePieChartData.data) {
            setIncomeData(formattedData(incomePieChartData.data.categoryTotal));
            setExpenseData(
                formattedData(expensePieChartData.data.categoryTotal)
            );
            setIncomeTotal(incomePieChartData.data.total);
            setExpenseTotal(expensePieChartData.data.total);
        }
    }, [incomePieChartData, expensePieChartData]);

    let formattedData = (obj) => {
        return Object.entries(obj).map(([category, total]) => ({
            name: category,
            value: total,
            fill: getRandomColor(),
        }));
    };

    return (
        <div className="w-full max-w-[900px] mx-auto p-4 flex flex-col gap-8 md:flex-row md:justify-between">
            {!incomePieChartData.loading &&
                !expensePieChartData.loading &&
                incomePieChartData &&
                expensePieChartData && (
                    <>
                        <div className="w-full md:w-1/2 h-80 bg-white rounded-xl shadow-md p-4">
                            <h2 className="text-lg text-black font-semibold text-center mb-2">
                                Expenses by Category ({expenseTotal})
                            </h2>
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={incomeData}
                                        dataKey="value"
                                        nameKey="name"
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={100}
                                        fill="#8884d8"
                                    />
                                    <Tooltip content={<CustomTooltip />} />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>

                        <div className="w-full md:w-1/2 h-80 bg-white rounded-xl shadow-md p-4">
                            <h2 className="text-lg text-black font-semibold text-center mb-2">
                                Income by Category ({incomeTotal})
                            </h2>
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={expenseData}
                                        dataKey="value"
                                        nameKey="name"
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={100}
                                        fill="#82ca9d"
                                    />
                                    <Tooltip content={<CustomTooltip />} />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </>
                )}
        </div>
    );
};

export default PieChartComp;
