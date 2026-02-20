import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import axios from "../api/axios";
import "./AdminCategories.css";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axios.get("/categories");
      setCategories(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      alert("Category name is required");
      return;
    }

    try {
      setLoading(true);
      await axios.post("/categories", { name });
      setName("");
      fetchCategories();
    } catch (error) {
      alert(error.response?.data?.message || "Error creating category");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this category?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(`/categories/${id}`);
      fetchCategories();
    } catch (error) {
      alert("Failed to delete category");
    }
  };

  return (
    <div className="admin-container">
      <Sidebar />

      <div className="admin-content">
        <h1>Manage Categories</h1>

        {/* FORM */}
        <form className="admin-form" onSubmit={handleAdd}>
          <input
            type="text"
            placeholder="Category Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? "Adding..." : "Add Category"}
          </button>
        </form>

        {/* TABLE */}
        <div className="table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Category Name</th>
                <th>Created Date</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {categories.length === 0 ? (
                <tr>
                  <td colSpan="4" className="no-data">
                    No categories available
                  </td>
                </tr>
              ) : (
                categories.map((cat) => (
                  <tr key={cat.id}>
                    <td>{cat.id}</td>
                    <td>{cat.name}</td>
                    <td>
                      {new Date(cat.createdAt).toLocaleDateString()}
                    </td>
                    <td>
                      <button
                        className="delete-btn"
                        onClick={() => handleDelete(cat.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Categories;
