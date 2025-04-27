import React, { useContext, useEffect, useState } from "react";
import { StatsProvider } from "../context/StatsContext";
import IndiTrasaction from "./IndiTrasaction";

const AllTransactions = () => {
    const { getAllTransaction, allTransactionData } = useContext(StatsProvider);

    const [expenseTotal, setExpenseTotal] = useState(0);
    const [incomeTotal, setIncomeTotal] = useState(0);
    const [income, setIncome] = useState([]);
    const [expense, setExpense] = useState([]);
    const [all, setAll] = useState([]);
    const [type, setType] = useState("All");

    const [sortBy, setSortBy] = useState("date"); // date | category | amount
    const [sortOrder, setSortOrder] = useState("desc"); // asc | desc

    // const onDelete = async (id) => {
    //     let res = await handleDelete(id);
    //     fetchData();
    //     console.log(res);
    // };

    useEffect(() => {
        if (allTransactionData.data) {
            setAll(allTransactionData.data.expenses);
            setIncome(
                allTransactionData.data.expenses.filter(
                    (expense) => expense.expenseType == "INCOME"
                )
            );
            setExpense(
                allTransactionData.data.expenses.filter(
                    (expense) => expense.expenseType == "EXPENSE"
                )
            );
            console.log(allTransactionData.data);
        }
    }, [allTransactionData]);

    useEffect(() => {
        getAllTransaction();
    }, []);

    const selectedArr = () => {
        let baseArr = [];

        if (type.toLowerCase() === "all") baseArr = [...all];
        else if (type.toLowerCase() === "income") baseArr = [...income];
        else baseArr = [...expense];

        return sortTransactions(baseArr);
    };

    const sortTransactions = (arr) => {
        let copy = [...arr];
        copy.sort((a, b) => {
            let valA, valB;
            switch (sortBy) {
                case "date":
                    valA = new Date(a.dateTime);
                    valB = new Date(b.dateTime);
                    break;
                case "category":
                    valA = a.category.toLowerCase();
                    valB = b.category.toLowerCase();
                    break;
                case "amount":
                    valA = a.amt;
                    valB = b.amt;
                    break;
                default:
                    return 0;
            }

            if (valA < valB) return sortOrder === "asc" ? -1 : 1;
            if (valA > valB) return sortOrder === "asc" ? 1 : -1;
            return 0;
        });

        return copy;
    };

    return (
        <div className="w-full max-w-[900px] mx-auto">
            <div className="bg-white text-black h-20 flex items-center justify-between px-4">
                <h2 className="text-xl font-semibold text-black">
                    All {type === "All" ? "Transactions" : type}
                </h2>
                <div className="flex gap-2 items-center">
                    <select
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        className="border px-2 py-1 rounded"
                    >
                        <option value="All">All</option>
                        <option value="Income">Income</option>
                        <option value="Expense">Expense</option>
                    </select>

                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="border px-2 py-1 rounded"
                    >
                        <option value="date">Sort by Date</option>
                        <option value="category">Sort by Category</option>
                        <option value="amount">Sort by Amount</option>
                    </select>

                    <button
                        onClick={() =>
                            setSortOrder((prev) =>
                                prev === "asc" ? "desc" : "asc"
                            )
                        }
                        className="border px-3 py-1 rounded bg-gray-200 hover:bg-gray-300"
                    >
                        {sortOrder === "asc" ? "↑ Asc" : "↓ Desc"}
                    </button>
                </div>
            </div>

            <div className="flex flex-col gap-1 mt-4 px-2">
                {selectedArr().map((el) => (
                    <IndiTrasaction key={el.id} data={el} />
                ))}
            </div>
        </div>
    );
};

export default AllTransactions;
