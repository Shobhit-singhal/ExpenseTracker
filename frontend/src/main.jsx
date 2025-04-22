import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import StatsContext from "./context/StatsContext.jsx";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
    <StatsContext>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </StatsContext>
);
