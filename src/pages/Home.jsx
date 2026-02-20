import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import CategoryPreview from "../components/CategoryPreview";
import BrandPreview from "../components/BrandPreview";
import ItemPreview from "../components/ItemPreview";
import ViewAllButton from "../components/ViewAllButton";

const Home = () => {
  return (
    <>
      <Navbar />
      <Hero />

      {/* <CategoryPreview />
      <ViewAllButton path="/categories" />

      <BrandPreview />
      <ViewAllButton path="/brands" /> */}

      <ItemPreview />
      <ViewAllButton path="/items" />
    </>
  );
};

export default Home;
