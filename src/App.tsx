import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginRegister from "./components/login/LoginRegister";
import GameDashboard from "./components/gameboard/GameDashboard";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginRegister />} />
        <Route path="/game" element={<GameDashboard />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
