import React from "react";
import Navbar from "../components/Navbar";
import UserGreet from "../components/UserGreet";
import Overview from "../components/Overview";
import History from "../components/History";
import { PieChart } from "recharts";
import PieChartComp from "../components/PieChartComp";
import AllTransactions from "../components/AllTransactions";

const Transaction = () => {
    return (
        <div className="w-full min-h-screen">
            <Navbar />
            <UserGreet isHome={true} />
            <PieChartComp />
            {/* <AllTransactions /> */}
        </div>
    );
};

export default Transaction;
