import React, { useState } from "react";

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
  const [editedName, setEditedName] = useState(name);
  const [editedSpeed, setEditedSpeed] = useState(speed);
  const [editedColor, setEditedColor] = useState(color);

  const handleSave = () => {
    console.log("Saving:", {
      id,
      name: editedName,
      speed: editedSpeed,
      color: editedColor,
    });
    onSave({
      id,
      name: editedName,
      speed: editedSpeed,
      color: editedColor,
    });
  };

  return (
    <div
      className="flex flex-col items-center gap-2 bg-gray-800 text-white p-4 rounded-2xl shadow-lg hover:shadow-xl 
      transition-all duration-300 transform hover:-translate-y-1 w-48 cursor-pointer"
      key={id}
    >
      <img
        src={src}
        alt={name}
        className="w-24 h-24 rounded-full border-4 border-gray-700 object-cover"
      />

      {isEditing ? (
        <>
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
              className="px-3 py-1 bg-green-600 hover:bg-green-700 rounded-lg text-sm font-medium transition"
            >
              Save
            </button>
            <button
              onClick={() => onEditToggle(id)}
              className="px-3 py-1 bg-gray-600 hover:bg-gray-700 rounded-lg text-sm font-medium transition"
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
