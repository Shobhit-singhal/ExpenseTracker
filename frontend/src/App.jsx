import React from "react";
import Navbar from "./components/Navbar";
import UserGreet from "./components/UserGreet";
import Overview from "./components/Overview";
import History from "./components/History";

const App = () => {
    return (
        <div className="w-full">
            <Navbar />
            <UserGreet />
            <Overview />
            <History />
        </div>
    );
};

export default App;
