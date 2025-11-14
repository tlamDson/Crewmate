import React, { useState } from "react";
import { uploadImage, updateCrewmate } from "../services";

const CrewMateCard = ({
  id,
  src,
  name,
  speed,
  color,
  onEditToggle,
  isEditing,
  onSave,
}) => {
  const [editImage, setEditImage] = useState(src);
  const [editedName, setEditedName] = useState(name);
  const [editedSpeed, setEditedSpeed] = useState(speed);
  const [editedColor, setEditedColor] = useState(color);
  const [imageFile, setImageFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      // Create preview
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
      let imageUrl = src; // Keep existing image by default

      // Upload new image if one was selected
      if (imageFile) {
        const result = await uploadImage(imageFile);
        imageUrl = result.url;
      }

      // Update crewmate using service
      const updatedData = await updateCrewmate(id, {
        name: editedName,
        speed: editedSpeed,
        color: editedColor,
        src: imageUrl,
      });

      // Update parent state
      onSave(updatedData);

      alert("Crewmate updated!");
    } catch (error) {
      alert(error.message || "Failed to update crewmate");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="group bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden hover:border-gray-700 transition-all duration-300">
      {/* Image Section */}
      <div className="relative aspect-square bg-gray-800 overflow-hidden">
        {src || editImage ? (
          <img
            src={isEditing ? editImage : src}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-600 text-6xl">
            👤
          </div>
        )}

        {/* Edit Image Upload in Edit Mode */}
        {isEditing && (
          <label className="absolute inset-0 flex items-center justify-center bg-black/60 cursor-pointer hover:bg-black/70 transition">
            <div className="text-center">
              <span className="text-white text-3xl block mb-2">📷</span>
              <span className="text-sm text-gray-300">Change Image</span>
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

      {/* Content Section */}
      <div className="p-4 space-y-3">
        {isEditing ? (
          <>
            {/* Edit Mode */}
            <input
              type="text"
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
              placeholder="Name"
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <input
              type="number"
              value={editedSpeed}
              onChange={(e) => setEditedSpeed(e.target.value)}
              placeholder="Speed"
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <input
              type="text"
              value={editedColor}
              onChange={(e) => setEditedColor(e.target.value)}
              placeholder="Color"
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />

            {/* Action Buttons */}
            <div className="flex gap-2 pt-2">
              <button
                onClick={handleSave}
                disabled={isUploading}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition disabled:bg-gray-700 disabled:cursor-not-allowed"
              >
                {isUploading ? "Saving..." : "Save"}
              </button>
              <button
                onClick={() => onEditToggle(id)}
                disabled={isUploading}
                className="flex-1 bg-gray-800 hover:bg-gray-700 text-gray-300 py-2 rounded-lg font-medium transition disabled:cursor-not-allowed"
              >
                Cancel
              </button>
            </div>
          </>
        ) : (
          <>
            {/* View Mode */}
            <div>
              <h3 className="text-lg font-semibold text-white truncate">
                {name || "Unnamed"}
              </h3>
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-400">Speed</span>
              <span className="text-white font-medium">{speed || "0"}</span>
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-400">Color</span>
              <span
                className={`font-medium ${
                  color?.toLowerCase() === "red"
                    ? "text-red-400"
                    : color?.toLowerCase() === "blue"
                    ? "text-blue-400"
                    : color?.toLowerCase() === "green"
                    ? "text-green-400"
                    : color?.toLowerCase() === "yellow"
                    ? "text-yellow-400"
                    : color?.toLowerCase() === "purple"
                    ? "text-purple-400"
                    : "text-gray-400"
                }`}
              >
                {color || "None"}
              </span>
            </div>

            {/* Edit Button */}
            <button
              onClick={() => onEditToggle(id)}
              className="w-full bg-gray-800 hover:bg-gray-700 text-white py-2 rounded-lg font-medium transition mt-2"
            >
              Edit
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default CrewMateCard;
