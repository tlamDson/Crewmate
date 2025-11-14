import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import { uploadImage, createCrewmate } from "../services";

const CreateCrewMate = () => {
  const [name, setName] = useState("");
  const [speed, setSpeed] = useState("");
  const [color, setColor] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const addCrewmate = async (e) => {
    e.preventDefault();
    setIsUploading(true);

    try {
      let imageUrl = null;

      // Upload image if one was selected
      if (imageFile) {
        const result = await uploadImage(imageFile);
        imageUrl = result.url;
      }

      // Create crewmate using service
      await createCrewmate({
        name,
        speed,
        color,
        src: imageUrl,
      });

      alert("Crewmate added!");

      // Reset form
      setName("");
      setSpeed("");
      setColor("");
      setImageFile(null);
      setImagePreview(null);
    } catch (error) {
      alert(error.message || "Failed to add crewmate");
    } finally {
      setIsUploading(false);
    }
  };
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 p-6">
      <Sidebar />
      <div className="bg-gray-800 text-white p-6 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Create New Crewmate
        </h2>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-300">Name</label>
            <input
              required
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-gray-700 rounded-lg p-2 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-300">Speed</label>
            <input
              required
              type="number"
              value={speed}
              onChange={(e) => setSpeed(e.target.value)}
              className="bg-gray-700 rounded-lg p-2 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-300">Color</label>
            <input
              required
              type="text"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="bg-gray-700 rounded-lg p-2 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-300">Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="text-gray-200 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-600 file:text-white file:cursor-pointer hover:file:bg-blue-700"
            />
          </div>

          <div className="w-full h-40 bg-gray-700 rounded-lg flex items-center justify-center text-gray-400 border border-gray-600 overflow-hidden">
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="Preview"
                className="w-full h-full object-cover"
              />
            ) : (
              "Image Preview"
            )}
          </div>

          <button
            className="w-full bg-blue-600 hover:bg-blue-700 transition py-2 rounded-lg font-semibold disabled:bg-gray-600 disabled:cursor-not-allowed"
            onClick={addCrewmate}
            disabled={isUploading}
          >
            {isUploading ? "Uploading..." : "Create Crewmate"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateCrewMate;
