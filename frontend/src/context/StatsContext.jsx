import React, { createContext, useContext, useEffect, useState } from "react";
import privateAxios from "../axios/PrivateAxios";
import publicAxios from "../axios/PublicAxios";

export const StatsProvider = createContext();

const StatsContext = ({ children }) => {
    const [addExpenseRes, setAddExpenseRes] = useState({
        loading: false,
        data: null,
        error: null,
    });
    const [incomeGraphData, setIncomeGraphData] = useState({
        loading: false,
        data: null,
        error: null,
    });
    const [expenseGraphData, setExpenseGraphData] = useState({
        loading: false,
        data: null,
        error: null,
    });
    const [loginData, setLoginData] = useState({
        loading: false,
        data: null,
        error: null,
    });
    const [registerData, setRegisterData] = useState({
        loading: false,
        data: null,
        error: null,
    });
    const [incomeDataFromDate, setIncomeDataFromDate] = useState({
        loading: false,
        data: null,
        error: null,
    });
    const [expenseDataFromDate, setExpenseDataFromDate] = useState({
        loading: false,
        data: null,
        error: null,
    });
    const [incomePieChartData, setIncomePieChartData] = useState({
        loading: false,
        data: null,
        error: null,
    });
    const [expensePieChartData, setExpensePieChartData] = useState({
        loading: false,
        data: null,
        error: null,
    });
    const [allTransactionData, setAllTransactionData] = useState({
        loading: false,
        data: null,
        error: null,
    });
    const [logoutData, setLogoutData] = useState({
        loading: false,
        data: null,
        error: null,
    });
    const addExpense = async (details) => {
        setAddExpenseRes({ loading: true, data: null, error: null });
        try {
            let res = await privateAxios.post("/expense", details);
            setAddExpenseRes({ loading: false, data: res.data, error: null });
        } catch (err) {
            setAddExpenseRes({
                loading: false,
                data: null,
                error: err.message || "Something went wrong",
            });
        }
    };
    let fetchGraphData = async (year) => {
        setIncomeGraphData({ loading: true, data: null, error: null });
        setExpenseGraphData({ loading: true, data: null, error: null });
        try {
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
            setIncomeGraphData({
                loading: false,
                data: incomeRes.data,
                error: null,
            });
            setExpenseGraphData({
                loading: false,
                data: expenseRes.data,
                error: null,
            });
        } catch (err) {
            setIncomeGraphData({
                loading: false,
                data: null,
                error: err.message || "Something went wrong",
            });
            setExpenseGraphData({
                loading: false,
                data: null,
                error: err.message || "Something went wrong",
            });
        }
    };

    const login = async (details) => {
        setLoginData({ loading: true, data: null, error: null });
        try {
            let res = await publicAxios.post("/public/login", details);
            localStorage.setItem("token", res.data);
            setLoginData({ loading: false, data: res.data, error: null });
        } catch (err) {
            setLoginData({
                loading: false,
                data: null,
                error: err.message || "Something went wrong",
            });
        }
    };
    const registerAcc = async (details) => {
        setRegisterData({ loading: true, data: null, error: null });
        try {
            let req = await publicAxios.post("/public/register", details);
            setRegisterData({ loading: false, data: res.data, error: null });
        } catch (err) {
            setRegisterData({
                loading: false,
                data: null,
                error: err.message || "Something went wrong",
            });
        }
    };
    const fetchDataFromDate = async (startDate, endDate) => {
        setIncomeDataFromDate({ loading: true, data: null, error: null });
        setExpenseDataFromDate({ loading: true, data: null, error: null });
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
            setIncomeDataFromDate({
                loading: false,
                data: incomeRes.data,
                error: null,
            });
            setExpenseDataFromDate({
                loading: false,
                data: expenseRes.data,
                error: null,
            });
        } catch (err) {
            setIncomeDataFromDate({
                loading: false,
                data: null,
                error: err.message || "Something went wrong",
            });
            setExpenseDataFromDate({
                loading: false,
                data: null,
                error: err.message || "Something went wrong",
            });
        }
    };
    const fetchPieChartData = async () => {
        setIncomePieChartData({ loading: true, data: null, error: null });
        setExpensePieChartData({ loading: true, data: null, error: null });
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
            setIncomePieChartData({
                loading: false,
                data: incomeRes.data,
                error: null,
            });
            setExpensePieChartData({
                loading: false,
                data: expenseRes.data,
                error: null,
            });
        } catch (err) {
            setIncomePieChartData({
                loading: false,
                data: null,
                error: err.message || "Something went wrong",
            });
            setExpensePieChartData({
                loading: false,
                data: null,
                error: err.message || "Something went wrong",
            });
        }
    };
    const getAllTransaction = async () => {
        setAllTransactionData({ loading: true, data: null, error: null });
        try {
            let res = await privateAxios.get("/expense");
            setAllTransactionData({
                loading: false,
                data: res.data,
                error: null,
            });
        } catch (err) {
            setAllTransactionData({
                loading: false,
                data: null,
                error: err.message || "Something went wrong",
            });
        }
    };
    const logOut = () => {
        setLogoutData({ loading: true, data: null, error: null });
        try {
            localStorage.removeItem("token");
            setLogoutData({
                loading: false,
                data: "logout successfull",
                error: null,
            });
        } catch (err) {
            setLogoutData({
                loading: false,
                data: null,
                error: err.message || "Something went wrong",
            });
        }
    };
    return (
        <StatsProvider.Provider
            value={{
                addExpenseRes,
                incomeGraphData,
                expenseGraphData,
                loginData,
                registerData,
                incomeDataFromDate,
                expenseDataFromDate,
                incomePieChartData,
                expensePieChartData,
                allTransactionData,
                logoutData,
                addExpense,
                fetchGraphData,
                login,
                registerAcc,
                fetchDataFromDate,
                fetchPieChartData,
                getAllTransaction,
                logOut,
            }}
        >
            {children}
        </StatsProvider.Provider>
    );
};

export default StatsContext;
