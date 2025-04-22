import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import StatsContext from "./context/StatsContext.jsx";

createRoot(document.getElementById("root")).render(
    <StatsContext>
        <App />
    </StatsContext>
);
