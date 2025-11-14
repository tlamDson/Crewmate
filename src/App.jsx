import { useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import CreateCrewMate from "./pages/CreateCrewMate";
import CrewmateGallery from "./pages/CrewmateGallery";
import CrewmateDetail from "./pages/CrewmateDetail";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/crewmate" element={<CrewmateGallery />} />
      <Route path="/crewmate/:id" element={<CrewmateDetail />} />
      <Route path="/createCrewMate" element={<CreateCrewMate />} />
    </Routes>
  );
}

export default App;
