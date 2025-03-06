import axios from "axios";
// Alap: localhost:5205
export const url = "localhost:5205";

// Axios beállítása
const api = axios.create({
  baseURL: `https://${url}/api`,
  withCredentials: true,
});

export default api;