import api from "./Api";
import { sendEmail } from "./EmailService";
import { getUserProfile } from "./UserService";
import { getToken } from "./AuthService";

// Kiválasztott felhasználók törlése
export const deleteSelectedUsers = async (selecteduserids,toaster,load) => {
    for (const id of selecteduserids) {
        const profile = await getUserProfile(id);
        await api.delete("/user/"+id,{
        headers: {
            Authorization: `Bearer ${getToken()}`
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
            headers: { Authorization: `Bearer ${getToken()}` }
          });
          toaster.create({ title: `A(z) ${music.title} című zene törlésre került!`, type: "success" });
        } catch (error) {
          toaster.create({ title: `Hiba történt a zene törlése közben! (Hiba a konzolban)`, type: "error" });
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
            Authorization: `Bearer ${getToken()}`
        }
        })
        .then(()=>{
          toaster.create({ title: `A(z) ${playlist.playlistName} nevű lista törlésre került!`, type: "success" });
        })
        .catch((e)=>{
          toaster.create({ title: `Hiba történt a lista törlése közben! (Hiba a konzolban)`, type: "error" });
          console.error("Hiba történt a lista törlése közben: ",e);
        })
    }
    load();
}
// Kiválasztott felhasználóhoz rang adás
export const addRoleToUser = async (user,role,toaster,load)=>{
  await api.post(`/user/addRole/${role}/${user.id}`,{
    headers: {
      Authorization: `Bearer ${getToken()}`
  }
  })
  .then(()=>{
    toaster.create({ title: `A(z) ${user.username} nevű felhasználóhoz ${role} rang hozzáadva!`, type: "success" });
  })
  .catch((e)=>{
    toaster.create({ title: `Hiba történt a rang hozzáadása közben! (Hiba a konzolban)`, type: "error" });
    console.error("Hiba történt a rang elvétele közben: ",e);
  })
  load();
}
// Kiválasztott felhasználótól rang elvétel
export const removeRoleFromUser = async (user,role,toaster,load)=>{
  await api.delete(`/user/removeRole/${role}/${user.id}`,{
    headers: {
      Authorization: `Bearer ${getToken()}`
  }
  })
  .catch((e)=>{
    toaster.create({ title: `Hiba történt a rang elvétele közben! (Hiba a konzolban)`, type: "error" });
    console.error("Hiba történt a rang elvétele közben: ",e);
  })
  load();
}