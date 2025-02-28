import axios from "axios";

// Axios beállítása
const api = axios.create({
  baseURL: "https://localhost:5205/api",
  withCredentials: true,
});

export default api;