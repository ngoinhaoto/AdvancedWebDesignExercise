import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import AppHome from "./pages/AppHome";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/app" element={<AppHome />} />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>{" "}
    </BrowserRouter>
  );
}

export default App;
