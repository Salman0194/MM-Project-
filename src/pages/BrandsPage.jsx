import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "../api/axios";
import "./BrandsPage.css";

const BrandsPage = () => {
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    fetchBrands();
  }, []);

  const fetchBrands = async () => {
    try {
      const res = await axios.get("/brands");
      setBrands(res.data);
    } catch (error) {
      console.error("Error fetching brands:", error);
    }
  };

  return (
    <>
      <Navbar />

      <div className="brands-page">
        <h1>All Brands</h1>

        <div className="brands-grid">
          {brands.map((brand) => (
            <div key={brand.id} className="brand-card">
              <h3>{brand.name}</h3>
              <p>{brand.description}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default BrandsPage;
