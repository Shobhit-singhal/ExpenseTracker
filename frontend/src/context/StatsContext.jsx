import React, { createContext, useContext, useEffect, useState } from "react";
import privateAxios from "../axios/PrivateAxios";

export const StatsProvider = createContext();

const StatsContext = ({ children }) => {
    const [loadingIncome, setLoadingIncome] = useState(true);
    const [loadingExpense, setLoadingExpense] = useState(true);
    const [income, setIncome] = useState({});
    const [expense, setExpense] = useState({});
    useEffect(() => {
        const getIncomeData = async () => {
            setLoadingIncome(true);
            try {
                const res = await privateAxios.get("/expense", {
                    params: {
                        expenseType: "income",
                    },
                });
                console.log(res.data.categoryTotal);
                setIncome(res.data);
            } catch (Err) {
                console.log(Err);
            } finally {
                setLoadingIncome(false);
            }
        };
        getIncomeData();
    }, []);
    useEffect(() => {
        const getExpenseData = async () => {
            setLoadingExpense(true);
            try {
                const res = await privateAxios.get("/expense", {
                    params: {
                        expenseType: "expense",
                    },
                });
                console.log(res.data);
                setExpense(res.data);
            } catch (Err) {
                console.log(Err);
            } finally {
                setLoadingExpense(false);
            }
        };
        getExpenseData();
    }, []);

    return (
        <StatsProvider.Provider
            value={{ loadingIncome, loadingExpense, income, expense }}
        >
            {children}
        </StatsProvider.Provider>
    );
};

export default StatsContext;
