import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router";
import App from "./App";
import { About } from "./Pages/About";

const HAS_VISITED_KEY = "gitintel_has_visited";

function RootRoute() {
  const [isFirstVisit] = useState(() => {
    try {
      return !localStorage.getItem(HAS_VISITED_KEY);
    } catch {
      return false;
    }
  });

  useEffect(() => {
    if (isFirstVisit) {
      try {
        localStorage.setItem(HAS_VISITED_KEY, "true");
      } catch (err) {
        console.error("Failed to save visit status:", err);
      }
    }
  }, [isFirstVisit]);

  if (isFirstVisit) {
    return <Navigate to="/about" replace />;
  }

  return <App />;
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<RootRoute />} />
      <Route path="/about" element={<About />} />
    </Routes>
  );
}
