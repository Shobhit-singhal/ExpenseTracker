import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import Navbar from "../components/Navbar";
import UserGreet from "../components/UserGreet";
import { useNavigate } from "react-router-dom";
import { StatsProvider } from "../context/StatsContext";

const AddExpense = () => {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm();

    const { addExpense } = useContext(StatsProvider);

    const onSubmit = async (details) => {
        let res = await addExpense({
            ...details,
            amt: parseFloat(details.amt),
        });
        console.log(res);
        navigate("/");
    };

    return (
        <div className="min-h-screen w-full max-w-4xl mx-auto px-4">
            <Navbar />
            <UserGreet />

            <div className="mt-8">
                <h1 className="text-3xl font-extrabold text-gray-800 mb-6">
                    Add Income / Expense
                </h1>

                <form
                    className="flex flex-col gap-6 items-center bg-gray-900 rounded-2xl p-10 shadow-lg"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    {/* Amount Input */}
                    <div className="w-full sm:w-2/3">
                        <input
                            className={`w-full px-5 py-3 rounded-lg  font-semibold focus:outline-none focus:ring-2 text-white ${
                                errors.amt
                                    ? "border-2 border-red-400"
                                    : "border-2 border-gray-300"
                            }`}
                            type="number"
                            step={0.01}
                            placeholder="Enter the amount"
                            {...register("amt", {
                                required: {
                                    value: true,
                                    message: "Amount can't be empty",
                                },
                            })}
                        />
                        <p className="text-xs mt-1 text-red-400">
                            {errors.amt && errors.amt.message}
                        </p>
                    </div>

                    {/* Category Input */}
                    <div className="w-full sm:w-2/3">
                        <input
                            className={`w-full px-5 py-3 rounded-lg text-white font-semibold focus:outline-none focus:ring-2 ${
                                errors.category
                                    ? "border-2 border-red-400"
                                    : "border-2 border-gray-300"
                            }`}
                            type="text"
                            placeholder="Enter the category"
                            {...register("category", {
                                required: {
                                    value: true,
                                    message: "Category can't be empty",
                                },
                                minLength: {
                                    value: 3,
                                    message: "Category must be at least 3 characters",
                                },
                            })}
                        />
                        <p className="text-xs mt-1 text-red-400">
                            {errors.category && errors.category.message}
                        </p>
                    </div>

                    {/* Expense Type Select */}
                    <div className="w-full sm:w-2/3">
                        <select
                            className={`w-full px-5 py-3 rounded-lg font-semibold text-gray-700 bg-white focus:outline-none focus:ring-2 ${
                                errors.expenseType
                                    ? "border-2 border-red-400"
                                    : "border-2 border-gray-300"
                            }`}
                            {...register("expenseType", {
                                required: {
                                    value: true,
                                    message: "Please select a type",
                                },
                            })}
                        >
                            <option value="">Select Income/Expense</option>
                            <option value="INCOME">Income</option>
                            <option value="EXPENSE">Expense</option>
                        </select>
                        <p className="text-xs mt-1 text-red-400">
                            {errors.expenseType && errors.expenseType.message}
                        </p>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="mt-4 bg-blue-500 hover:bg-blue-600 transition-all text-white font-bold py-3 px-8 rounded-full shadow-md disabled:bg-blue-300"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Adding... Please wait" : "Add Expense"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddExpense;
