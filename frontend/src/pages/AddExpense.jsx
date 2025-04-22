import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import Navbar from "../components/Navbar";
import UserGreet from "../components/UserGreet";
import privateAxios from "../axios/PrivateAxios";
import { useNavigate } from "react-router-dom";
import { StatsProvider } from "../context/StatsContext";

const AddExpense = () => {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        watch,
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
        <div className="min-h-screen w-full max-w-[900px] mx-auto">
            <Navbar />
            <UserGreet />
            <div className="mt-4">
                <div>
                    <p className="text-2xl font-bold">Add Income/Expense</p>
                </div>
                <form
                    className="flex flex-col gap-5 mt-6 items-center bg-slate-900 rounded-xl py-10"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <div className="w-2/3">
                        <input
                            className={` border-1  w-full px-4 py-1 rounded-md ${
                                errors.amt
                                    ? "border-red-500/40"
                                    : "border-gray-50/40"
                            }`}
                            type="number"
                            step={0.01}
                            placeholder="Enter the amount"
                            {...register("amt", {
                                required: {
                                    value: true,
                                    message: "Amt cant be null",
                                },
                            })}
                        />
                        <p className="text-sm text-red-500/40">
                            {errors.amt && errors.amt.message}
                        </p>
                    </div>
                    <div className="w-2/3">
                        <input
                            className={` border-1  w-full px-4 py-1 rounded-md ${
                                errors.amt
                                    ? "border-red-500/40"
                                    : "border-gray-50/40"
                            }`}
                            type="text"
                            placeholder="Enter the category"
                            {...register("category", {
                                required: {
                                    value: true,
                                    message: "Category cant be null",
                                },
                                minLength: {
                                    value: 3,
                                    message:
                                        "Category must be atleast 3 characters long",
                                },
                            })}
                        />
                        <p className="text-sm text-red-500/40">
                            {errors.category && errors.category.message}
                        </p>
                    </div>
                    <div className="py-1 px-3 w-1/2">
                        <select
                            className={`bg-white text-black font-bold border-2 w-full py-1 rounded-md ${
                                errors.expenseType
                                    ? "border-red-500/40"
                                    : "border-gray-50/40"
                            }`}
                            {...register("expenseType", {
                                required: {
                                    value: true,
                                    message: "Please select a type",
                                },
                            })}
                        >
                            <option value=""></option>
                            <option value="INCOME">Income</option>
                            <option value="EXPENSE">Expense</option>
                        </select>
                    </div>
                    <input
                        className="cursor-pointer bg-blue-400 w-fit py-2 px-5 font-bold text-black rounded-full "
                        type="submit"
                        disabled={isSubmitting}
                        value={
                            isSubmitting ? "Adding please wait" : "Add expense"
                        }
                    />
                </form>
            </div>
        </div>
    );
};

export default AddExpense;
