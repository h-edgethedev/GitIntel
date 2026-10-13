import { Routes, Route } from "react-router";
import App from "./App";
import { About } from "./Pages/About";

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<App />} />
            <Route path="/about" element={<About />} />
        </Routes>
    )
}