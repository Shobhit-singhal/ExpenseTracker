import React from "react";
import Navbar from "./components/Navbar";
import UserGreet from "./components/UserGreet";
import Overview from "./components/Overview";
import History from "./components/History";
import Dashboard from "./pages/Dashboard";
import AddExpense from "./pages/AddExpense";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Register from "./pages/Register";

const App = () => {
    return (
        <div className="w-full">
            <Routes>
                <Route path="/" element={<Dashboard />}></Route>
                <Route path="/create" element={<AddExpense />}></Route>
                <Route path="/login" element={<LoginPage />}></Route>
                <Route path="/register" element={<Register />}></Route>
            </Routes>
        </div>
    );
};

export default App;
