import React, { useContext, useEffect, useState } from "react";
import StatsContext, { StatsProvider } from "../context/StatsContext";
import { useSearchParams } from "react-router-dom";

const AllTransactions = () => {
    const { getPieChartData, getAllTransaction } = useContext(StatsProvider);
    const [expenseTotal, setExpenseTotal] = useState(0);
    const [incomeTotal, setIncomeTotal] = useState(0);
    const [income, setIncome] = useState([]);
    const [expense, setExpense] = useState([]);
    const [all, setAll] = useState([]);
    const [type, setType] = useState("All");

    useEffect(() => {
        (async () => {
            let res = await getPieChartData();
            let data = await getAllTransaction();
            setIncomeTotal(res.income.total);
            setExpenseTotal(res.expense.total);
            setIncome(res.income.expenses);
            setExpense(res.expense.expenses);
            setAll(data.expenses);
        })();
    }, []);
    let selectedArr = () => {
        if (type.toLocaleLowerCase() == "all") {
            return all;
        } else if (type.toLocaleLowerCase() == "income") {
            return income;
        } else {
            return expense;
        }
    };
    return (
        <div className="w-full max-w-[900px] mx-auto bg-red-600 h-80">
            <div className="bg-white h-20 flex items-center justify-between">
                <h2 className="text-black">All {type}</h2>
                <div>
                    <select
                        name=""
                        id=""
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                    >
                        <option value="All">All</option>
                        <option value="Income">Income</option>
                        <option value="Expense">Expense</option>
                    </select>
                </div>
            </div>
            <div>
                {selectedArr().map((el) => (
                    <div>
                        <p>{el.id}</p>
                        <p>{el.amt}</p>
                        <p>{el.category}</p>
                        <p>{el.expenseType}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AllTransactions;
