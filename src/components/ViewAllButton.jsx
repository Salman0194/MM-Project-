import React from "react";
import { useNavigate } from "react-router-dom";
import "./ViewAllButton.css";

const ViewAllButton = ({ path }) => {
  const navigate = useNavigate();

  return (
    <div className="view-all-container">
      <button
        className="view-all-btn"
        onClick={() => navigate(path)}
      >
        View All
      </button>
    </div>
  );
};

export default ViewAllButton;
