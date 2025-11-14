import React from "react";
import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="max-w-4xl w-full text-center">
          {/* Hero Section */}
          <div className="mb-12">
            <div className="text-6xl sm:text-7xl md:text-8xl mb-6 animate-bounce">
              🚀
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4">
              Crewmate Manager
            </h1>
            <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto">
              Create, manage, and organize your crew members with ease. Build
              your perfect team today!
            </p>
          </div>

          {/* Action Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {/* View Gallery Card */}
            <button
              onClick={() => navigate("/crewmate")}
              className="group bg-gray-900 border border-gray-800 hover:border-blue-500 rounded-2xl p-8 transition-all duration-300 hover:scale-105"
            >
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">
                👥
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                View Gallery
              </h3>
              <p className="text-gray-400 text-sm">
                Browse and manage all your crewmates
              </p>
            </button>

            {/* Create New Card */}
            <button
              onClick={() => navigate("/createCrewmate")}
              className="group bg-gray-900 border border-gray-800 hover:border-green-500 rounded-2xl p-8 transition-all duration-300 hover:scale-105"
            >
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">
                ➕
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Create New
              </h3>
              <p className="text-gray-400 text-sm">
                Add a new member to your crew
              </p>
            </button>
          </div>

          {/* Features */}
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm">
            <div className="text-gray-500">
              <div className="text-2xl mb-2">⚡</div>
              <p>Fast & Responsive</p>
            </div>
            <div className="text-gray-500">
              <div className="text-2xl mb-2">🎨</div>
              <p>Beautiful Design</p>
            </div>
            <div className="text-gray-500">
              <div className="text-2xl mb-2">🔒</div>
              <p>Secure Storage</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
