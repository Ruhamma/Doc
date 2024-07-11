import React from "react";
import Sidebar from "../_component/sidebar";

const Home: React.FC = () => (
  <div className="container">
    <Sidebar />
    <div className="welcome-content">
      <h1>Welcome to the Documentation</h1>
      <p>Select a section from the sidebar to start reading.</p>
    </div>
  </div>
);

export default Home;
