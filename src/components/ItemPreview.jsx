import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import "./ItemPreview.css";

const ItemPreview = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const res = await axios.get("/items");
      setItems(res.data.slice(0, 4));
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  return (
    <div className="item-preview">
      <h2>Items</h2>

      <div className="item-grid">
        {items.length > 0 ? (
          items.map((item) => (
            <div key={item.id} className="item-card">

              {/* Image */}
              {item.image ? (
                <div className="image-wrapper">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="item-image"
                    loading="lazy"
                  />
                </div>
              ) : (
                <div className="no-image">No Image</div>
              )}

              <h3>{item.name}</h3>

              <p><strong>Brand:</strong> {item.Brand?.name || "N/A"}</p>
              <p><strong>Category:</strong> {item.Category?.name || "N/A"}</p>

              <p className="price">₹ {item.price}</p>
            </div>
          ))
        ) : (
          <p>No items available</p>
        )}
      </div>
    </div>
  );
};

export default ItemPreview;