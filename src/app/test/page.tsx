import React from "react";
import Sidebar from "../_component/sidebar";
import Header from "../_component/header";

const Home: React.FC = () => (
  <div>
    <Header />
    <div className="container">
      <Sidebar />
      <div className="welcome-content">
        <h1>Welcome to the Documentation</h1>
        <p>Select a section from the sidebar to start reading.</p>
      </div>
    </div>
  </div>
);

export default Home;
