import axios from "axios";
console.log(import.meta.env);
const instance = axios.create({
  baseURL: "http://localhost:7000",
  
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
