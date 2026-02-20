import React, { useEffect, useState, useRef } from "react";
import Sidebar from "../components/Sidebar";
import axios from "../api/axios";
import "./AdminItems.css";

const Items = () => {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);

  // Form State
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [sku, setSku] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [brandId, setBrandId] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchItems();
    fetchCategories();
    fetchBrands();
  }, []);

  const fetchItems = async () => {
    try {
      const res = await axios.get("/items");
      setItems(res.data);
    } catch (err) { console.error("Fetch items error:", err); }
  };

  const fetchCategories = async () => {
    try {
      const res = await axios.get("/categories");
      setCategories(res.data);
    } catch (err) { console.error("Fetch categories error:", err); }
  };

  const fetchBrands = async () => {
    try {
      const res = await axios.get("/brands");
      setBrands(res.data);
    } catch (err) { console.error("Fetch brands error:", err); }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    
    // Safety check for image selection
    if (!image) return alert("Please select an image file.");

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("name", name);
      formData.append("price", price);
      formData.append("stock", stock);
      formData.append("sku", sku);
      formData.append("categoryId", categoryId);
      formData.append("brandId", brandId);
      formData.append("image", image); // The actual file object from state

      // CRITICAL: Explicitly set headers for file upload
      await axios.post("/items", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      // Reset Form on Success
      setName(""); setPrice(""); setStock(""); setSku("");
      setCategoryId(""); setBrandId(""); setImage(null);
      if (fileInputRef.current) fileInputRef.current.value = "";

      fetchItems();
    } catch (error) {
      // Catch server-side validation errors
      alert(error.response?.data?.message || "Server Error: Could not add item");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this item?")) return;
    try {
      await axios.delete(`/items/${id}`);
      fetchItems();
    } catch (err) { alert("Delete failed"); }
  };

  return (
    <div className="admin-container">
      <Sidebar />
      <div className="admin-content">
        <h1>Manage Items</h1>

        <form className="admin-form" onSubmit={handleAdd}>
          {/* Row 1: Text inputs - Placeholders now visible */}
          <div className="input-group">
            <input type="text" placeholder="Item Name" value={name} onChange={(e) => setName(e.target.value)} required />
            <input type="number" step="0.01" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} required />
            <input type="number" placeholder="Stock" value={stock} onChange={(e) => setStock(e.target.value)} />
            <input type="text" placeholder="SKU" value={sku} onChange={(e) => setSku(e.target.value)} />
          </div>
          
          {/* Row 2: Selectors & File Upload */}
          <div className="controls-group">
            <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)} required>
              <option value="">Select Category</option>
              {categories.map((cat) => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
            </select>

            <select value={brandId} onChange={(e) => setBrandId(e.target.value)} required>
              <option value="">Select Brand</option>
              {brands.map((brand) => <option key={brand.id} value={brand.id}>{brand.name}</option>)}
            </select>

            <div className="file-box">
              <label>Product Image</label>
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={(e) => setImage(e.target.files[0])} 
                required 
              />
            </div>

            <button type="submit" disabled={loading} className="submit-btn">
              {loading ? "..." : "ADD ITEM"}
            </button>
          </div>
        </form>

        {/* Item List Table */}
        <div className="table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Category</th>
                <th>Brand</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td>
                    <img src={`http://localhost:5000/uploads/${item.image}`} alt={item.name} className="table-img" />
                  </td>
                  <td>{item.name}</td>
                  <td>₹{item.price}</td>
                  <td>{item.stock}</td>
                  <td>{item.Category?.name || "N/A"}</td>
                  <td>{item.Brand?.name || "N/A"}</td>
                  <td>
                    <button className="delete-btn" onClick={() => handleDelete(item.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Items;