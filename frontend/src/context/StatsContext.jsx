import React, { createContext, useContext, useEffect, useState } from "react";
import privateAxios from "../axios/PrivateAxios";

export const StatsProvider = createContext();

const StatsContext = ({ children }) => {
    const [loadingIncome, setLoadingIncome] = useState(true);
    const [loadingExpense, setLoadingExpense] = useState(true);
    const [year, setYear] = useState(2025);
    const [income, setIncome] = useState({});
    const [expense, setExpense] = useState({});
    const [incomeStats, setIncomeStats] = useState({});
    const [expenseStats, setExpenseStats] = useState({});
    const fetchStatsData = async () => {
        setLoadingIncome(true);
        setLoadingExpense(true);
        try {
            const expenseRes = await privateAxios.get("/expense", {
                params: { expenseType: "expense" },
            });
            const incomeRes = await privateAxios.get("/expense", {
                params: { expenseType: "income" },
            });

            setExpense(expenseRes.data);
            setIncome(incomeRes.data);
        } catch (Err) {
            console.log(Err);
        } finally {
            setLoadingIncome(false);
            setLoadingExpense(false);
        }
    };

    const addExpense = async (details) => {
        try {
            let res = await privateAxios.post("/expense", details);
            await fetchStatsData();
            await getGraphData(year);
            return res;
        } catch (err) {
            console.log(err);
        }
    };
    let getGraphData = async (year) => {
        let incomeRes = await privateAxios.get("/expense/monthly", {
            params: {
                year,
                expenseType: "income",
            },
        });
        let expenseRes = await privateAxios.get("/expense/monthly", {
            params: {
                year,
                expenseType: "expense",
            },
        });
        setIncomeStats(incomeRes.data);
        setExpenseStats(expenseRes.data);
    };

    useEffect(() => {
        fetchStatsData();
    }, []);
    useEffect(() => {
        getGraphData(year);
    }, [year]);

    return (
        <StatsProvider.Provider
            value={{
                loadingIncome,
                loadingExpense,
                income,
                expense,
                addExpense,
                expenseStats,
                incomeStats,
                year,
                setYear,
            }}
        >
            {children}
        </StatsProvider.Provider>
    );
};

export default StatsContext;
