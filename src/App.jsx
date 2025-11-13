import { useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Crewmate from "./pages/Crewmate";
import CreateCrewMate from "./pages/CreateCrewMate";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/crewmate" element={<Crewmate />} />
      <Route path="/createCrewMate" element={<CreateCrewMate />} />
    </Routes>
  );
}

export default App;
