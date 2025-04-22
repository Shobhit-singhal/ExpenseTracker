import React, { useContext, useEffect } from "react";
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
import { StatsProvider } from "../context/StatsContext";

const History = () => {
    const { expense, income } = useContext(StatsProvider);
    useEffect(() => {
        console.log(income, " ", expense);
    }, []);

    const monthlyData = [
        { month: "Jan", income: 3000, expense: 1200 },
        { month: "Feb", income: 2800, expense: 1500 },
        { month: "Mar", income: 3200, expense: 1000 },
    ];
    return (
        <div className="max-w-[900px] px-4 mx-auto mt-5">
            <h2 className="text-xl font-bold leading-loose tracking-wide">
                History
            </h2>
            <div className="h-64 w-full mt-2">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={monthlyData}>
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
