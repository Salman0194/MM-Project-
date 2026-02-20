import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import "./CategoryPreview.css";

const CategoryPreview = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axios.get("/categories");
      // Show only first 4 categories for preview
      setCategories(res.data.slice(0, 4));
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  return (
    <div className="category-preview">
      <h2>Categories</h2>

      <div className="category-grid">
        {categories.map((cat) => (
          <div key={cat.id} className="category-card">
            <h3>{cat.name}</h3>
            <p>{cat.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryPreview;
