import React, { useState } from "react";
import { crewmates as initialCrewmates } from "../data/data";
import CrewMateCard from "../components/CrewMateCard";

const CrewmateGallery = () => {
  const [crewmates, setCrewmates] = useState(initialCrewmates);
  const [editingId, setEditingId] = useState(null);

  const handleEditToggle = (id) => {
    setEditingId(editingId === id ? null : id);
  };
  const handleSave = (updatedMate) => {
    setCrewmates((prev) =>
      prev.map((mate) => (mate.id === updatedMate.id ? updatedMate : mate))
    );
    setEditingId(null); // close editing
  };

  return (
    <div>
      {crewmates.map((crewmate) => (
        <CrewMateCard
          key={crewmate.id}
          id={crewmate.id}
          src={crewmate.src}
          name={crewmate.name}
          speed={crewmate.speed}
          color={crewmate.color}
          onEditToggle={() => handleEditToggle(crewmate.id)}
          isEditing={editingId === crewmate.id}
          onSave={handleSave}
        />
      ))}
    </div>
  );
};

export default CrewmateGallery;
