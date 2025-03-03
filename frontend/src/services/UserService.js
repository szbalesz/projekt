import api from './Api';
import Cookies from "js-cookie";
import { sendEmail } from './EmailService';
import { onLogout } from './AuthService';

const token = Cookies.get("token");
const userid = Cookies.get("userid");
// Felhasználó adatainak lekérése
export const getUserProfile = async (id) => {
  try {
    const response = await api.get(`/user/${id}`);
    return response.data[0];
  } catch (error) {
    console.error("Hiba történt a profil lekérése közben:", error);
    return null;
  }
};
// Összes felhasználó adatainak lekérése
export const getAllUser = async () => {
  try {
    const response = await api.get(`/user/GetAllUser`);
    let users = response.data;
    let updatedusers = [];
    for (const user of users) {
      const musiccount = (await getUserMusics(user.id)).length;
      const playlistcount = (await getUserPlaylists(user.id)).length;
      const roles = (await getUserRoles(user.id));
      let updateduser = {
        id: user.id,
        username: user.username,
        profilePictureURL: user.profilePictureURL,
        musiccount: musiccount,
        playlistcount: playlistcount,
        roles: roles
      };
      updatedusers.push(updateduser);
    }
    return updatedusers;
  } catch (error) {
    console.error("Hiba történt a profilok lekérése közben:", error);
    return null;
  }
}
// Felhasználó rolejainak lekérése
export const getUserRoles = async (id) => {
  try {
    const response = await api.get(`/user/getRole/${id}`);
    return response.data;
  } catch (error) {
    console.error("Hiba történt a roleok lekérése közben:", error);
    return [];
  }
}
// Felhasználó zenéinek lekérése
export const getUserMusics = async (id) => {
  try {
    const response = await api.get(`/music/uploader/${id}`);
    return response.data;
  } catch (error) {
    console.error("Hiba történt a zenék lekérése közben:", error);
    return [];
  }
};
// Felhasználó lejátszási listáinak lekérése
export const getUserPlaylists = async (id) => {
  try {
    const response = await api.get(`/GetPlaylistByUser?id=${id}`);
    return response.data;
  } catch (error) {
    console.error("HIBA, Nem sikerült lekérni a lejátszási listákat:", error);
    return [];
  }
};
// Felhasználó profilképének módosítása
export const changeProfilePicture = async (imageUrl,toaster,setOpen) =>{
  api.put("/user/ChangeProfilePicture", {
    profilePictureURL: imageUrl,
    id: userid
  }, {
      headers: {
          Authorization: `Bearer ${token}`
      }
  })
  .then(()=>{
      toaster.create({
      title: `Profilkép sikeresen hozzáadva!`,
      type: "success",
  })
  })
  .finally(()=>{
      setOpen(false);
      window.location.reload(); // az oldal frissítése, hogy az új profilkép mindenhol megjelenjen
  })
}
// Felhasználó törlése
export const deleteUser = async (id,toaster,navigate) => {
  const profile = await getUserProfile(id);
  await api.delete("/user/"+id,{
    headers: {
      Authorization: `Bearer ${token}`
  }
  })
  .then(async()=>{
    toaster.create({
      title: `Fiók sikeresen törölve!`,
      type: "success",
  })
  sendEmail(profile.email,profile.username,"accountDeletion");
  })
  .finally(()=>{
    onLogout();
    navigate("/")
    window.location.reload(); // az oldal frissítése, hogy minden megfelelően működjön
  })
}
// Felhasználónév módosítása
export const changeUsername = async (userid,toaster,newusername) => {
  api.put("/user/ChangeUserName", {
    userName: newusername,
    id: userid
  }, {
      headers: {
          Authorization: `Bearer ${token}`
      }
  })
  .then(async ()=>{
      toaster.create({
      title: `Felhasználónév sikeresen módosítva!`,
      type: "success",
  })
  const profile = await getUserProfile(userid);
  sendEmail(profile.email,newusername,"usernameChange");
  })
  .finally(()=>{
      window.location.reload(); // az oldal frissítése, hogy az új felhasználónév megjelenjen
  })
}
// Email módosítása
export const changeEmail = async (userid,toaster,newemail) => {
  api.put("/user/ChangeEmail", {
    email: newemail,
    id: userid
  }, {
      headers: {
          Authorization: `Bearer ${token}`
      }
  })
  .then(async ()=>{
      toaster.create({
      title: `Email cím sikeresen módosítva!`,
      type: "success",
  })
  const profile = await getUserProfile(userid);
  sendEmail(newemail,profile.userName,"emailChange");
  })
  .finally(()=>{
      window.location.reload(); // az oldal frissítése, hogy az új felhasználónév megjelenjen
  })
}