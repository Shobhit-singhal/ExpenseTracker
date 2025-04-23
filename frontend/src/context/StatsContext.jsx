import React, { createContext, useContext, useEffect, useState } from "react";
import privateAxios from "../axios/PrivateAxios";
import publicAxios from "../axios/PublicAxios";
import { BiCategory } from "react-icons/bi";

export const StatsProvider = createContext();

const StatsContext = ({ children }) => {
    const [loadingIncome, setLoadingIncome] = useState(true);
    const [loadingExpense, setLoadingExpense] = useState(true);
    const [year, setYear] = useState(2025);
    const [income, setIncome] = useState({});
    const [expense, setExpense] = useState({});
    const [incomeStats, setIncomeStats] = useState({});
    const [expenseStats, setExpenseStats] = useState({});
    const [start, setStart] = useState(() =>
        new Date(new Date().getFullYear(), 0, 1).toISOString().slice(0, 10)
    );
    const [end, setEnd] = useState(new Date().toISOString().slice(0, 10));

    const addExpense = async (details) => {
        try {
            let res = await privateAxios.post("/expense", details);
            await fetchData();
            await getGraphData(year);
            return res;
        } catch (err) {
            console.log(err);
        }
    };
    let getGraphData = async (year) => {
        console.log("fetch grpah data");
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

    const login = async (details) => {
        let res = await publicAxios.post("/public/login", details);
        localStorage.setItem("token", res.data);
        await getGraphData(year);
        await fetchData();
        return res;
    };
    const registerAcc = async (details) => {
        let req = await publicAxios.post("/public/register", details);
        console.log(req);
    };
    const fetchData = async () => {
        const startDate = start;
        const endDate = end;
        try {
            let incomeRes = await privateAxios.get("/expense", {
                params: {
                    startDate,
                    endDate,
                    expenseType: "income",
                },
            });
            let expenseRes = await privateAxios.get("/expense", {
                params: {
                    startDate,
                    endDate,
                    expenseType: "expense",
                },
            });
            setIncome(incomeRes.data);
            setExpense(expenseRes.data);
        } catch (err) {
            console.log(err);
        } finally {
            setLoadingIncome(false);
            setLoadingExpense(false);
        }
    };
    const getPieChartData = async () => {
        try {
            let expenseRes = await privateAxios.get("/expense", {
                params: {
                    expenseType: "expense",
                },
            });
            let incomeRes = await privateAxios.get("/expense", {
                params: {
                    expenseType: "income",
                },
            });

            return { expense: expenseRes.data, income: incomeRes.data };
        } catch (err) {
            console.log(err);
        }
    };
    const getAllTransaction = async () => {
        try {
            let res = await privateAxios.get("/expense");
            console.log(res.data);
            return res.data;
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        getGraphData(year);
    }, [year]);

    useEffect(() => {
        fetchData();
        getAllTransaction();
    }, []);
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
                login,
                registerAcc,
                start,
                setStart,
                end,
                setEnd,
                fetchData,
                getPieChartData,
                getAllTransaction,
            }}
        >
            {children}
        </StatsProvider.Provider>
    );
};

export default StatsContext;
