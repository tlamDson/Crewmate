import React from "react";
import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-950">
      <Sidebar />
      {/* Main content with responsive padding to avoid sidebar overlap */}
      <main className="lg:ml-20 min-h-screen">{children}</main>
    </div>
  );
};

export default Layout;
