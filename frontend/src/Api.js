import axios from "axios";

const api = axios.create({
  baseURL: "https://localhost:5205/api",
  withCredentials: true,
});

export default api;