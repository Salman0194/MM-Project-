import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    // 1. Clear session data (Token/User info)
    localStorage.removeItem("token");
    
    // 2. Redirect specifically to the Admin Login page
    navigate("/"); // Redirects to AdminLogin.jsx
  };

  return (
    <div className="sidebar">
      <div>
        <h2 className="sidebar-title">Admin Panel</h2>
        <ul className="sidebar-menu">
          <li className={location.pathname === "/dashboard" ? "active" : ""}>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li className={location.pathname === "/admin/categories" ? "active" : ""}>
            <Link to="/admin/categories">Categories</Link>
          </li>
          <li className={location.pathname === "/admin/brands" ? "active" : ""}>
            <Link to="/admin/brands">Brands</Link>
          </li>
          <li className={location.pathname === "/admin/items" ? "active" : ""}>
            <Link to="/admin/items">Items</Link>
          </li>
          <li className={location.pathname === "/admin/quotes" ? "active" : ""}>
            <Link to="/admin/quotes">Quotes</Link>
          </li>
        </ul>
      </div>

      {/* Logout button anchored at the bottom with existing CSS */}
      <div className="sidebar-footer">
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;