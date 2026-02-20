import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import axios from "../api/axios";
import "./AdminBrands.css";

const Brands = () => {
  const [brands, setBrands] = useState([]);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchBrands();
  }, []);

  const fetchBrands = async () => {
    try {
      const res = await axios.get("/brands");
      setBrands(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();

    if (!name.trim()) return;

    try {
      setLoading(true);
      await axios.post("/brands", { name });
      setName("");
      fetchBrands();
    } catch (error) {
      alert(error.response?.data?.message || "Error creating brand");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    await axios.delete(`/brands/${id}`);
    fetchBrands();
  };

  return (
    <div className="admin-container">
      <Sidebar />

      <div className="admin-content">
        <h1>Manage Brands</h1>

        <form className="admin-form" onSubmit={handleAdd}>
          <input
            type="text"
            placeholder="Brand Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? "Adding..." : "Add Brand"}
          </button>
        </form>

        {/* TABLE SECTION */}
        <div className="table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Brand Name</th>
                <th>Status</th>
                <th>Created At</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {brands.length === 0 ? (
                <tr>
                  <td colSpan="5" className="no-data">
                    No brands found
                  </td>
                </tr>
              ) : (
                brands.map((brand) => (
                  <tr key={brand.id}>
                    <td>{brand.id}</td>
                    <td>{brand.name}</td>
                    <td>
                      {brand.isActive ? (
                        <span className="active">Active</span>
                      ) : (
                        <span className="inactive">Inactive</span>
                      )}
                    </td>
                    <td>
                      {new Date(brand.createdAt).toLocaleDateString()}
                    </td>
                    <td>
                      <button
                        className="delete-btn"
                        onClick={() => handleDelete(brand.id)}
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

export default Brands;
