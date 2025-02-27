// services/userService.js
import api from './Api';

export const getUserProfile = async (id) => {
  try {
    const response = await api.get(`/user/${id}`);
    return response.data[0];
  } catch (error) {
    console.error("Hiba történt a profil lekérése közben:", error);
    return null;
  }
};

export const getUserMusics = async (id) => {
  try {
    const response = await api.get(`/music/uploader/${id}`);
    return response.data;
  } catch (error) {
    console.error("Hiba történt a zenék lekérése közben:", error);
    return [];
  }
};

export const getUserPlaylists = async (id) => {
  try {
    const response = await api.get(`/GetPlaylistByUser?id=${id}`);
    return response.data;
  } catch (error) {
    console.error("HIBA, Nem sikerült lekérni a lejátszási listákat:", error);
    return [];
  }
};
