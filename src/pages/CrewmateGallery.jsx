import React, { useState, useEffect } from "react";
import CrewMateCard from "../components/CrewMateCard";
import Layout from "../components/Layout";
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

  const handleDelete = (deletedId) => {
    setCrewmates((prev) => prev.filter((mate) => mate.id !== deletedId));
    setEditingId(null);
  };

  useEffect(() => {
    fetchCrewmates();
  }, []);

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-gray-400 text-lg">Loading crewmates...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="flex justify-center items-center min-h-screen">
          <div className="text-center p-8 bg-red-900/20 rounded-xl border border-red-800">
            <p className="text-red-400 text-lg mb-2">⚠️ Error</p>
            <p className="text-gray-400">{error}</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
            Crewmate Gallery
          </h1>
          <p className="text-gray-400">
            {crewmates.length}{" "}
            {crewmates.length === 1 ? "crewmate" : "crewmates"}
          </p>
        </div>

        {/* Grid */}
        {crewmates && crewmates.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 sm:gap-6">
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
                onDelete={handleDelete}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="text-6xl mb-4">🚀</div>
            <p className="text-gray-400 text-lg mb-2">No crewmates yet</p>
            <p className="text-gray-500 text-sm">
              Create your first one to get started!
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default CrewmateGallery;
