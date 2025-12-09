// services/api.ts
import axios from "axios";

// 🚀 En Vite las variables vienen desde import.meta.env
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
