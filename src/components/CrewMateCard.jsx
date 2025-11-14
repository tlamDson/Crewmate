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
    <div
      className="flex flex-col items-center gap-2 bg-gray-800 text-white p-4 rounded-2xl shadow-lg hover:shadow-xl 
      transition-all duration-300 transform hover:-translate-y-1 w-48 cursor-pointer"
      key={id}
    >
      <img
        src={isEditing ? editImage : src}
        alt={name}
        className="w-24 h-24 rounded-full border-4 border-gray-700 object-cover"
      />

      {isEditing ? (
        <>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="text-xs text-gray-300 w-full file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:bg-blue-600 file:text-white file:text-xs file:cursor-pointer hover:file:bg-blue-700"
          />
          <input
            type="text"
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
            className="w-full text-lg font-semibold mt-2 bg-gray-700 rounded px-2 py-1 text-center"
          />
          <input
            type="number"
            value={editedSpeed}
            onChange={(e) => setEditedSpeed(e.target.value)}
            className="w-full text-sm text-gray-300 bg-gray-700 rounded px-2 py-1 text-center"
            placeholder="Speed"
          />
          <input
            type="text"
            value={editedColor}
            onChange={(e) => setEditedColor(e.target.value)}
            className="w-full text-sm bg-gray-700 rounded px-2 py-1 text-center"
            placeholder="Color"
          />
          <div className="flex gap-2 mt-2">
            <button
              onClick={handleSave}
              disabled={isUploading}
              className="px-3 py-1 bg-green-600 hover:bg-green-700 rounded-lg text-sm font-medium transition disabled:bg-gray-600 disabled:cursor-not-allowed"
            >
              {isUploading ? "Saving..." : "Save"}
            </button>
            <button
              onClick={() => onEditToggle(id)}
              disabled={isUploading}
              className="px-3 py-1 bg-gray-600 hover:bg-gray-700 rounded-lg text-sm font-medium transition disabled:cursor-not-allowed"
            >
              Cancel
            </button>
          </div>
        </>
      ) : (
        <>
          <p className="text-lg font-semibold mt-2">{name}</p>
          <p className="text-sm text-gray-300">Speed: {speed}</p>
          <p
            className={`text-sm font-medium ${
              color.toLowerCase() === "red"
                ? "text-red-400"
                : color.toLowerCase() === "blue"
                ? "text-blue-400"
                : color.toLowerCase() === "green"
                ? "text-green-400"
                : color.toLowerCase() === "yellow"
                ? "text-yellow-400"
                : "text-purple-400"
            }`}
          >
            Color: {color}
          </p>
          <button
            onClick={() => onEditToggle(id)}
            className="mt-2 px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-medium transition"
          >
            Edit CrewMate
          </button>
        </>
      )}
    </div>
  );
};

export default CrewMateCard;
