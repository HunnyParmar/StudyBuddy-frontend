import axios from "axios";

const instance = axios.create({
  baseURL: "https://study-buddy-aryh.onrender.com", // ⬅️ Replace with your API base URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Automatically attach token (if exists)
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default instance;
