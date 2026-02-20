import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import "./BrandPreview.css";

const BrandPreview = () => {
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    fetchBrands();
  }, []);

  const fetchBrands = async () => {
    try {
      const res = await axios.get("/brands");
      setBrands(res.data.slice(0, 10)); // show more like logo strip
    } catch (error) {
      console.error("Error fetching brands:", error);
    }
  };

  return (
    <section className="brand-section">
      <h2 className="brand-title">WE DEAL WITH</h2>

      <div className="brand-row">
        {brands.map((brand) => (
          <span key={brand.id} className="brand-name">
            {brand.name}
          </span>
        ))}
      </div>
    </section>
  );
};

export default BrandPreview;
