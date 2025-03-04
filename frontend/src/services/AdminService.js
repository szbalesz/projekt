import api from "./Api";
import Cookies from "js-cookie";
import { sendEmail } from "./EmailService";
import { getUserProfile } from "./UserService";

const token = Cookies.get("token");

// Kiválasztott felhasználók törlése
export const deleteSelectedUsers = async (selecteduserids,toaster,load) => {
    for (const id of selecteduserids) {
        const profile = await getUserProfile(id);
        await api.delete("/user/"+id,{
        headers: {
            Authorization: `Bearer ${token}`
        }
        })
        .then(async()=>{
        toaster.create({
            title: `${profile.username} felhasználó sikeresen törölve!`,
            type: "success",
        })
        sendEmail(profile.email,profile.username,"accountDeletion");
        })
    }
    load();
  }

// Kiválasztott zenék törlése
export const deleteSelectedMusics = async (selectedmusics,toaster,load) => {
    for (const music of selectedmusics) {
        try {
          await api.delete(`/music/${music.id}`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          toaster.create({ title: `A(z) ${music.title} című zene törlésre került!`, type: "success" });
        } catch (error) {
          console.error("Hiba történt a zene törlése közben: ", error);
        }
    }
    load();
  }

// Kiválasztott Lejátszási listák törlése
export const deleteSelectedPlaylists = async (selectedplaylists,toaster,load)=>{
    for (const playlist of selectedplaylists) {
        await api.delete("/playlist/"+playlist.id,{
          headers: {
            Authorization: `Bearer ${token}`
        }
        })
        .then(()=>{
          toaster.create({ title: `A(z) ${playlist.playlistName} nevű lista törlésre került!`, type: "success" });
        })
        .catch((e)=>{
          console.error("Hiba történt a lista törlése közben: ",e);
        })
    }
    load();
}