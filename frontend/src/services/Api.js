import axios from "axios";

export const url = process.env.REACT_APP_API_URL;

// Axios beállítása
const api = axios.create({
  baseURL: `https://${url}/api`,
  withCredentials: true, // Cookiekhoz szükséges, de sajnos csak localhostnál működnek
});

export default api;