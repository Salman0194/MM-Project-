import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// Global Styles
import "./index.css";
import "./styles/theme.css";

// Create Root & Render App
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
