import React from "react";
import Sidebar from "../components/Sidebar";
import "./Dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <Sidebar />

      <div className="dashboard-content">
        <h1>Welcome to Admin Dashboard</h1>
        <p>
          Use the sidebar to manage Categories, Brands, Items and Quotes.
        </p>

        <div className="dashboard-cards">
          <div className="dashboard-card">
            <h3>Manage Categories</h3>
          </div>

          <div className="dashboard-card">
            <h3>Manage Brands</h3>
          </div>

          <div className="dashboard-card">
            <h3>Manage Items</h3>
          </div>

          <div className="dashboard-card">
            <h3>Manage Quotes</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
