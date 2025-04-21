import React from "react";
import Navbar from "./components/Navbar";
import UserGreet from "./components/UserGreet";
import Overview from "./components/Overview";

const App = () => {
    return (
        <div className="w-full">
            <Navbar />
            <UserGreet />
            <Overview />
        </div>
    );
};

export default App;
