import React, { useState, useEffect } from "react";
import CrewMateCard from "../components/CrewMateCard";
import { supabase } from "../supabaseClient";

const CrewmateGallery = () => {
  const [crewmates, setCrewmates] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const fetchCrewmates = async () => {
    const { data, error } = await supabase.from("Crewmates").select("*");
    if (error) {
      console.error(error);
    } else {
      setCrewmates(data);
    }
  };

  const handleEditToggle = (id) => {
    setEditingId(editingId === id ? null : id);
  };
  const handleSave = (updatedMate) => {
    setCrewmates((prev) =>
      prev.map((mate) => (mate.id === updatedMate.id ? updatedMate : mate))
    );
    setEditingId(null);
  };
  useEffect(() => {
    fetchCrewmates();
  }, []);

  return (
    <div>
      {crewmates &&
        crewmates.map((crewmate) => (
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
