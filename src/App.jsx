import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Public Pages
import Home from "./pages/Home";
import CategoriesPage from "./pages/CategoriesPage";
import BrandsPage from "./pages/BrandsPage";
import ItemsPage from "./pages/ItemsPage";

// Admin Pages
import AdminRegister from "./pages/AdminRegister";
import AdminLogin from "./pages/AdminLogin";
import Dashboard from "./pages/Dashboard";
import Categories from "./pages/Categories";
import Brands from "./pages/Brands";
import Items from "./pages/Items";
import Quotes from "./pages/Quotes";

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("adminToken");

  if (!token) {
    return <Navigate to="/admin" replace />;
  }

  return children;
};

const App = () => {
  return (
    <Router>
      <Routes>
        {/* ================= PUBLIC ROUTES ================= */}
        <Route path="/" element={<Home />} />
        <Route path="/categories" element={<CategoriesPage />} />
        <Route path="/brands" element={<BrandsPage />} />
        <Route path="/items" element={<ItemsPage />} />

        {/* ================= ADMIN LOGIN ================= */}
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/register" element={<AdminRegister />} />

        {/* ================= PROTECTED ADMIN ROUTES ================= */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/categories"
          element={
            <ProtectedRoute>
              <Categories />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/brands"
          element={
            <ProtectedRoute>
              <Brands />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/items"
          element={
            <ProtectedRoute>
              <Items />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/quotes"
          element={
            <ProtectedRoute>
              <Quotes />
            </ProtectedRoute>
          }
        />

        {/* ================= 404 ================= */}
        <Route path="*" element={<h1 style={{textAlign:"center",marginTop:"50px"}}>404 - Page Not Found</h1>} />
      </Routes>
    </Router>
  );
};

export default App;
