import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import logo from "../assets/Logo.jpeg";   // ✅ Import logo

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/" className="logo-link">
          <img src={logo} alt="MMPT Logo" className="nav-logo-img" />
          <span>MM-Store</span>
        </Link>
      </div>

      <ul className="navbar-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/categories">Categories</Link></li>
        <li><Link to="/brands">Brands</Link></li>
        <li><Link to="/items">Items</Link></li>
        <li><Link to="/admin">Admin</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;