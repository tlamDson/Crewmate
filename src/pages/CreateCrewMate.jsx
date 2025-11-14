import React, { useState } from "react";
import Layout from "../components/Layout";
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
    <Layout>
      <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-2xl">
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
              Create Crewmate
            </h1>
            <p className="text-gray-400">Add a new member to your crew</p>
          </div>

          {/* Form Card */}
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 sm:p-8">
            <form onSubmit={addCrewmate} className="space-y-6">
              {/* Image Upload Section */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-3">
                  Profile Image
                </label>

                {/* Image Preview */}
                <div className="relative aspect-video bg-gray-800 rounded-xl overflow-hidden border-2 border-dashed border-gray-700 hover:border-gray-600 transition mb-3">
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-500">
                      <span className="text-5xl mb-3">📷</span>
                      <span className="text-sm">No image selected</span>
                    </div>
                  )}
                </div>

                {/* File Input */}
                <label className="flex items-center justify-center w-full px-4 py-3 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg cursor-pointer transition">
                  <svg
                    className="w-5 h-5 mr-2 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <span className="text-gray-300">
                    {imageFile ? imageFile.name : "Choose an image"}
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              </div>

              {/* Name Input */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Name *
                </label>
                <input
                  required
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter crewmate name"
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                />
              </div>

              {/* Speed Input */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Speed *
                </label>
                <input
                  required
                  type="number"
                  value={speed}
                  onChange={(e) => setSpeed(e.target.value)}
                  placeholder="Enter speed value"
                  min="0"
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                />
              </div>

              {/* Color Input */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Color *
                </label>
                <select
                  required
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                >
                  <option value="">Select a color</option>
                  <option value="Red">Red</option>
                  <option value="Blue">Blue</option>
                  <option value="Green">Green</option>
                  <option value="Yellow">Yellow</option>
                  <option value="Purple">Purple</option>
                  <option value="Pink">Pink</option>
                  <option value="Orange">Orange</option>
                </select>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isUploading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition disabled:bg-gray-700 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isUploading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Creating...
                  </>
                ) : (
                  "Create Crewmate"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCrewMate;
