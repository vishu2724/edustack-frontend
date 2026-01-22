import axios from "axios";

const api = axios.create({
  baseURL: "https://edustack-backend-6gz4.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});

// 🔐 token automatically attach karega
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
