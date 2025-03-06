import api from './Api';
import { getToken } from './AuthService';

const token = getToken();
// Összes zene lekérése függvény
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
// Id alapján zene lekérés függvény
export const getMusic = async (id) => {
  try {
    const response = await api.get(`/music/${id}`);
    return response.data[0];
  } catch (error) {
    console.error("HIBA, Nem sikerült lekérni a zenét: ", error);
    return null;
  }
}
// Zene keresés függvény
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
// Zene feltöltés függvény
export const uploadMusic = async (formData,toaster,setTitle,setArtist,setImageurl,setMusicfile) => {
  try {
    const response = await api.post("/UploadMusic", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`
        },
    });

    if (response.status === 201) {
        toaster.create({
            title: `Zene sikeresen feltöltve!`,
            type: "success",
        })
        setTitle("");
        setArtist("");
        setImageurl("");
        setMusicfile(null);
    } else {
        toaster.create({
            title: `Hiba történt a fájl feltöltésekor.`,
            type: "error",
        })
    }
} catch (error) {
    toaster.create({
        title: `Hiba történt a kapcsolatban.`,
        type: "error",
    })
}
}
// Zene törlés függvény
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
// Zene hozzáadása kedvencekhez függvény
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
// Zene törlése kedvencekből függvény
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
// Zene szerkesztése függvény
export const editMusic = async(music,artist,title,imageurl,toaster,setOpen,getData)=>{
  api.put("/music/"+music.id,{artist,title,imageurl},{
      headers: {
        Authorization: `Bearer ${token}`
    }
    })
    .then(()=>{
      toaster.create({ title: `Sikeres módosítás!`, type: "success" });
      setOpen(false);
      getData();
    })
    .catch((e)=>{
      console.error("Hiba történt a lista hozzáadása közben: ",e);
    })
}