import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import {
  getCrewmateById,
  updateCrewmate,
  deleteCrewmate,
  uploadImage,
} from "../services";

const CrewmateDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [crewmate, setCrewmate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Edit state
  const [editedName, setEditedName] = useState("");
  const [editedSpeed, setEditedSpeed] = useState("");
  const [editedColor, setEditedColor] = useState("");
  const [editImage, setEditImage] = useState("");
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    fetchCrewmate();
  }, [id]);

  const fetchCrewmate = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getCrewmateById(id);
      setCrewmate(data);
      setEditedName(data.name);
      setEditedSpeed(data.speed);
      setEditedColor(data.color);
      setEditImage(data.src);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching crewmate:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    setIsUploading(true);
    try {
      let imageUrl = crewmate.src;

      if (imageFile) {
        const result = await uploadImage(imageFile);
        imageUrl = result.url;
      }

      const updatedData = await updateCrewmate(id, {
        name: editedName,
        speed: editedSpeed,
        color: editedColor,
        src: imageUrl,
      });

      setCrewmate(updatedData);
      setIsEditing(false);
      alert("Crewmate updated!");
    } catch (error) {
      alert(error.message || "Failed to update crewmate");
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm(`Are you sure you want to delete ${crewmate.name}?`)) {
      return;
    }

    setIsDeleting(true);
    try {
      await deleteCrewmate(id);
      alert("Crewmate deleted!");
      navigate("/crewmate");
    } catch (error) {
      alert(error.message || "Failed to delete crewmate");
      setIsDeleting(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-gray-400 text-lg">Loading crewmate...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (error || !crewmate) {
    return (
      <Layout>
        <div className="flex justify-center items-center min-h-screen p-4">
          <div className="text-center p-8 bg-red-900/20 rounded-xl border border-red-800 max-w-md">
            <p className="text-red-400 text-lg mb-2">⚠️ Error</p>
            <p className="text-gray-400 mb-4">
              {error || "Crewmate not found"}
            </p>
            <button
              onClick={() => navigate("/crewmate")}
              className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition"
            >
              Back to Gallery
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen p-4 sm:p-6 lg:p-8">
        {/* Back Button */}
        <button
          onClick={() => navigate("/crewmate")}
          className="mb-6 flex items-center gap-2 text-gray-400 hover:text-white transition"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Gallery
        </button>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Image Section */}
            <div className="space-y-4">
              <div className="relative aspect-square bg-gray-800 rounded-2xl overflow-hidden border border-gray-800">
                {(isEditing ? editImage : crewmate.src) ? (
                  <img
                    src={isEditing ? editImage : crewmate.src}
                    alt={crewmate.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-600 text-8xl">
                    👤
                  </div>
                )}

                {isEditing && (
                  <label className="absolute inset-0 flex items-center justify-center bg-black/60 cursor-pointer hover:bg-black/70 transition">
                    <div className="text-center">
                      <span className="text-white text-5xl block mb-3">📷</span>
                      <span className="text-gray-300">Change Image</span>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
            </div>

            {/* Info Section */}
            <div className="space-y-6">
              <div>
                {isEditing ? (
                  <input
                    type="text"
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                    placeholder="Name"
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white text-2xl font-bold placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                ) : (
                  <h1 className="text-4xl font-bold text-white">
                    {crewmate.name}
                  </h1>
                )}
              </div>

              <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 space-y-4">
                <h2 className="text-xl font-semibold text-white mb-4">
                  Attributes
                </h2>

                {/* Speed */}
                <div className="flex items-center justify-between py-3 border-b border-gray-800">
                  <span className="text-gray-400 font-medium">Speed</span>
                  {isEditing ? (
                    <input
                      type="number"
                      value={editedSpeed}
                      onChange={(e) => setEditedSpeed(e.target.value)}
                      className="bg-gray-800 border border-gray-700 rounded px-3 py-1 text-white w-24 text-right focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <span className="text-white text-lg font-semibold">
                      {crewmate.speed}
                    </span>
                  )}
                </div>

                {/* Color */}
                <div className="flex items-center justify-between py-3 border-b border-gray-800">
                  <span className="text-gray-400 font-medium">Color</span>
                  {isEditing ? (
                    <select
                      value={editedColor}
                      onChange={(e) => setEditedColor(e.target.value)}
                      className="bg-gray-800 border border-gray-700 rounded px-3 py-1 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="Red">Red</option>
                      <option value="Blue">Blue</option>
                      <option value="Green">Green</option>
                      <option value="Yellow">Yellow</option>
                      <option value="Purple">Purple</option>
                      <option value="Pink">Pink</option>
                      <option value="Orange">Orange</option>
                    </select>
                  ) : (
                    <span
                      className={`text-lg font-semibold ${
                        crewmate.color?.toLowerCase() === "red"
                          ? "text-red-400"
                          : crewmate.color?.toLowerCase() === "blue"
                          ? "text-blue-400"
                          : crewmate.color?.toLowerCase() === "green"
                          ? "text-green-400"
                          : crewmate.color?.toLowerCase() === "yellow"
                          ? "text-yellow-400"
                          : crewmate.color?.toLowerCase() === "purple"
                          ? "text-purple-400"
                          : crewmate.color?.toLowerCase() === "pink"
                          ? "text-pink-400"
                          : crewmate.color?.toLowerCase() === "orange"
                          ? "text-orange-400"
                          : "text-gray-400"
                      }`}
                    >
                      {crewmate.color}
                    </span>
                  )}
                </div>

                {/* ID */}
                <div className="flex items-center justify-between py-3">
                  <span className="text-gray-400 font-medium">ID</span>
                  <span className="text-gray-500 font-mono text-sm">
                    {crewmate.id}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                {isEditing ? (
                  <>
                    <button
                      onClick={handleSave}
                      disabled={isUploading}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition disabled:bg-gray-700 disabled:cursor-not-allowed"
                    >
                      {isUploading ? "Saving..." : "Save Changes"}
                    </button>
                    <button
                      onClick={() => {
                        setIsEditing(false);
                        setEditedName(crewmate.name);
                        setEditedSpeed(crewmate.speed);
                        setEditedColor(crewmate.color);
                        setEditImage(crewmate.src);
                        setImageFile(null);
                      }}
                      disabled={isUploading}
                      className="w-full bg-gray-800 hover:bg-gray-700 text-gray-300 py-3 rounded-lg font-semibold transition"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
                  >
                    Edit Crewmate
                  </button>
                )}

                <button
                  onClick={handleDelete}
                  disabled={isDeleting || isUploading}
                  className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-semibold transition disabled:bg-gray-700 disabled:cursor-not-allowed"
                >
                  {isDeleting ? "Deleting..." : "Delete Crewmate"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CrewmateDetail;
