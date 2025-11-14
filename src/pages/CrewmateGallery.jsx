import React, { useState, useEffect } from "react";
import CrewMateCard from "../components/CrewMateCard";
import { getAllCrewmates } from "../services";

const CrewmateGallery = () => {
  const [crewmates, setCrewmates] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCrewmates = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getAllCrewmates();
      setCrewmates(data);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching crewmates:", err);
    } finally {
      setLoading(false);
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

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-white text-lg">Loading crewmates...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-400 text-lg">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
      {crewmates && crewmates.length > 0 ? (
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
        ))
      ) : (
        <p className="text-gray-400 col-span-full text-center">
          No crewmates yet. Create your first one!
        </p>
      )}
    </div>
  );
};

export default CrewmateGallery;
