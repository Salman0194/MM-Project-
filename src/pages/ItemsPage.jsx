import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "../api/axios";
import "./ItemsPage.css";

const ItemsPage = () => {
  const [items, setItems] = useState([]);
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);

  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const BASE_URL = "https://mm-project-backend.onrender.com";

  useEffect(() => {
    fetchBrands();
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchItems();
  }, [selectedBrand, selectedCategory]);

  const fetchBrands = async () => {
    const res = await axios.get("/brands");
    setBrands(res.data);
  };

  const fetchCategories = async () => {
    const res = await axios.get("/categories");
    setCategories(res.data);
  };

  const fetchItems = async () => {
    try {
      let query = "/items?";
      if (selectedBrand) query += `brandId=${selectedBrand}&`;
      if (selectedCategory) query += `categoryId=${selectedCategory}`;

      const res = await axios.get(query);
      setItems(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Navbar />

      <div className="items-page">
        <h1>All Items</h1>

        {/* FILTER SECTION */}
        <div className="filter-section">
          <select
            value={selectedBrand}
            onChange={(e) => setSelectedBrand(e.target.value)}
          >
            <option value="">All Brands</option>
            {brands.map((brand) => (
              <option key={brand.id} value={brand.id}>
                {brand.name}
              </option>
            ))}
          </select>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className="items-grid">
          {items.map((item) => (
            <div key={item.id} className="item-card">

              <img
                src={`${BASE_URL}/uploads/${item.image}`}
                alt={item.name}
                className="item-image"
              />

              <h3>{item.name}</h3>
              <p><strong>Brand:</strong> {item.Brand?.name}</p>
              <p><strong>Category:</strong> {item.Category?.name}</p>
              <p className="price">₹ {item.price}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ItemsPage;
