import React from "react";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="absolute top-0 bottom-0 left-0 w-[50px] bg-black flex flex-col justify-center items-center gap-1">
        {" "}
        <div onClick={() => navigate("/")}>Home</div>
        <div onClick={() => navigate("/crewmate")}>Crewmate Gallery</div>
        <div onClick={() => navigate("/createCrewmate")}>CreateCrewMate</div>
      </div>
    </div>
  );
};

export default Sidebar;
