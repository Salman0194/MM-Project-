import axios from "axios";

// Create axios instance
const instance = axios.create({
  baseURL: "http://localhost:5000/api", // Backend base URL
  withCredentials: false, // change to true only if using cookies
});

// ================= REQUEST INTERCEPTOR =================
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("adminToken");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// ================= RESPONSE INTERCEPTOR =================
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Token expired or unauthorized
      if (error.response.status === 401) {
        localStorage.removeItem("adminToken");
        window.location.href = "/admin"; // redirect to login
      }

      // Optional: handle 403
      if (error.response.status === 403) {
        console.error("Forbidden access");
      }
    }

    return Promise.reject(error);
  }
);

export default instance;
