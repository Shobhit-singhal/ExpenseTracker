import React from "react";
import { useForm } from "react-hook-form";

const LoginPage = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting },
    } = useForm();
    return (
        <div className="w-full max-w-[900px] h-screen flex items-center justify-center mx-auto">
            <form className="border-1 w-full px-4 flex flex-col items-center" action="">
                <div className="flex flex-col gap-1 w-full ">
                    <label
                        htmlFor="username"
                        className="cursor-pointer text-sm text-gray-400"
                    >
                        Username
                    </label>
                    <input
                        type="text"
                        id="username"
                        {...register("username", {
                            required: {
                                value: true,
                                message: "Please enter your username",
                            },
                            minLength: {
                                value: 3,
                                message:
                                    "Username must be atleast 3 characters long",
                            },
                        })}
                        className={`border-1 px-3 py-1 rounded-md  w-2/3 ${
                            errors.username
                                ? "border-red-500"
                                : "border-gray-500"
                        }`}
                    />
                    <p className="text-xs text-red-500/80">
                        {errors.username && errors.username.message}
                    </p>
                </div>
                <div className="flex flex-col gap-1 w-full ">
                    <label
                        htmlFor="password"
                        className="cursor-pointer text-sm text-gray-400"
                    >
                        password
                    </label>
                    <input
                        type="text"
                        id="password"
                        {...register("password", {
                            required: {
                                value: true,
                                message: "Please enter your password",
                            },
                            minLength: {
                                value: 3,
                                message:
                                    "Password must be atleast 3 characters long",
                            },
                        })}
                        className={`border-1 px-3 py-1 rounded-md  w-2/3 ${
                            errors.password
                                ? "border-red-500"
                                : "border-gray-500"
                        }`}
                    />
                    <p className="text-xs text-red-500/80">
                        {errors.password && errors.password.message}
                    </p>
                </div>
                <input
                    type="submit"
                    className="cursor-pointer bg-blue-500 px-3 py-1 rounded-md font-bold text-md tracking-wider  "
                    name=""
                    id=""
                />
            </form>
        </div>
    );
};

export default LoginPage;
