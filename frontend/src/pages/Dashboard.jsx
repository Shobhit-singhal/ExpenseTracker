import React from "react";
import Navbar from "../components/Navbar";
import UserGreet from "../components/UserGreet";
import Overview from "../components/Overview";
import History from "../components/History";

const Dashboard = () => {
    return (
        <div className="w-full min-h-screen">
            <Navbar />
            <UserGreet isHome={true} />
            <Overview />
            <History />
        </div>
    );
};

export default Dashboard;
