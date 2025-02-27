import api from './Api';
import Cookies from "js-cookie";

const token = Cookies.get("token");
const userid = Cookies.get("userid");

export const getAllMusic = async (setPending,setMusicList) =>{
    setPending(true);
    api.get("/GetAllMusic")
    .then(response => {
        setMusicList(response.data);
    })
    .catch(e => {console.error("HIBA, Nem sikerült lekérni a zenéket: ",e);}) 
    .finally(()=>{
        setPending(false);
    })
}

export const getMusic = async (id) => {
  try {
    const response = await api.get(`/music/${id}`);
    return response.data[0];
  } catch (error) {
    console.error("HIBA, Nem sikerült lekérni a zenét: ", error);
    return null;
  }
}

export const searchMusic = async (query) => {
  try {
    const endpoint = query.length > 0 ? `/GetMusicByName?betu=${query}` : "/GetAllMusic";
    const response = await api.get(endpoint);
    return response.data;
  } catch (error) {
    console.error("HIBA, Nem sikerült lekérni a zenéket: ", error);
    return [];
  }
}

export const deleteMusic = async (id, musicTitle, navigate, toaster) => {
  try {
    await api.delete(`/music/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    toaster.create({ title: `Sikeresen törölted a ${musicTitle} című zenét!`, type: "success" });
    navigate("/");
  } catch (error) {
    console.error("Hiba történt a zene törlése közben: ", error);
  }
}

export const addToFavorite = async (favoritePlaylistId, musicId, toaster, setFavorite) => {
  if (!token) {
    toaster.create({ title: `Jelentkezz be a funkció használatához!`, type: "info" });
    return;
  }
  
  if (!favoritePlaylistId) {
    toaster.create({ title: `Úgy tűnik nincs Kedvencek nevű listád! Hozz létre egyet!`, type: "info" });
    return;
  }

  try {
    await api.post("/AddMusicToPlaylist", { playlistId: favoritePlaylistId, musicId }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    toaster.create({ title: `Zene hozzáadva a kedvencekhez.`, type: "success" });
    setFavorite(true);
  } catch (error) {
    toaster.create({ title: `Hiba történt a művelet közben.`, type: "error" });
    console.error(error);
  }
}

export const removeFromFavorite = async (favoritePlaylistId, musicId, toaster, setFavorite) => {
  try {
    await api.delete("/DeleteMusicFromPlaylist", { 
      data: { playlistId: favoritePlaylistId, musicId },
      headers: { Authorization: `Bearer ${token}` }
    });
    toaster.create({ title: `A zene törölve a kedvencekből!`, type: "success" });
    setFavorite(false);
  } catch (error) {
    toaster.create({ title: `Hiba történt a művelet közben.`, type: "error" });
    console.error(error);
  }
}

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

export const editMusic = async(music,artist,title,imageurl,toaster,setOpen,getData)=>{
  api.put("/music/"+music.id,{artist,title,imageurl},{
      headers: {
        Authorization: `Bearer ${token}`
    }
    })
    .then(()=>{
      toaster.create({ title: `Sikeres módosítás!`, type: "success" });
      getMusic();
      setOpen(false);
      getData();
    })
    .catch((e)=>{
      console.error("Hiba történt a lista hozzáadása közben: ",e);
    })
}