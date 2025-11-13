import { useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import CreateCrewMate from "./pages/CreateCrewMate";
import CrewmateGallery from "./pages/CrewmateGallery";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/crewmate" element={<CrewmateGallery />} />
      <Route path="/createCrewMate" element={<CreateCrewMate />} />
    </Routes>
  );
}

export default App;
