import api from './Api';
import { getUserId, getUserProfile } from './UserService';
import { getToken } from './AuthService';

// Kedvencek lejátszási lista megkeresése függvény
export const getFavoritePlaylist = async () => {
    const userid = getUserId();
    if (!userid) return null;

    try {
        const response = await api.get(`/GetPlaylistByUser?id=${userid}`);
        const favoriteId = response.data.find(pl => pl.playlistName === "Kedvencek" && pl.creatorId === userid)?.id;
        return favoriteId;
    } catch (error) {
        console.error("HIBA, Nem sikerült lekérni a kedvencek listáját: ", error);
        return null;
    }
}
// Zene benne van e a kedvencekbe megkeresése
export const getIsFavorite = async (favoriteId,musicid) => {
  const favoriteMusics = await api.get(`/playlist/${favoriteId}`);
  const isFavorite = favoriteMusics.data.musics.some(m => m.id === musicid);
  return isFavorite;
}
// Összes lejátszási lista lekérése
export const getAllPlaylist = async () => {
   const res = await api.get("/GetAllPlaylist");
   return res.data;
}
// Id alapján lejátszási lista lekérése
export const getPlaylistById = async (id) =>{
  const response = await api.get("/playlist/"+id)
  return response.data;
}
// Lejátszási lista keresés függvény
export const searchPlaylist = async (query) => {
  try {
    const endpoint = query.length > 0 ? `/GetPlaylistByName?betu=${query}` : "/GetAllPlaylist";
    const response = await api.get(endpoint);
    return response.data;
  } catch (error) {
    console.error("HIBA, Nem sikerült lekérni a lejátszási listákat: ", error);
    return [];
  }
}
// Id alapján lejátszási lista lekérése függvény
export const getPlaylistByUser = async (id,toaster)=>{
    const userid = getUserId();
    const response = await api.get("/GetPlaylistByUser?id="+userid);
      if(response.data.length > 0){
        id = response.data.filter(pl=>pl.creatorId === userid).filter(pl=> pl.playlistName === id)[0]?.id;
        if(!id){
          toaster.create({ title: `Úgytűnik nincs ilyen nevű listád! Hozz létre egyet Kedvencek névvel!`, type: "info" });
        }
        else{ // Ha talált Kedvencek nevű listát akkor az idjét küldi vissza
          return id;
        }
      }
      return null;
}
// Felhasználó lejátszási listáinak lekérése függvény
export const getPlaylist = async (id,toaster) => {
    let playlistid = id;
    let playlist = [];
    let musics = [];
    let creator = {};
    if(id === "Kedvencek"){
      id = await getPlaylistByUser(id,toaster);
      playlistid = id;
    }
    try {
      const response = await api.get("/playlist/"+id);
      musics = response?.data.musics;
      playlist = response?.data.playlist[0];
      let creatorId = response?.data.playlist[0].creatorId;
      creator = (await getUserProfile(creatorId));
    } catch (e) {
      return null;
    }
    return await {playlistid,playlist,musics,creator} 
}
// Felhasználó összes lejátszási listájának lekérése függvény
export const getUsersAllPlaylist = async () =>{
    const userid = getUserId();
    if(getToken()){
        const response = await api.get("/GetPlaylistByUser?id="+userid)
        return response.data;
    }
}
// Lejátszási lista készítés függvény
export const createPlaylist = async (newPlaylist,toaster,load,hasFavorite) => {
    const res = await api.post("/CreatePlaylist",newPlaylist, {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
        })
    if(res.status === 200){
        if(!hasFavorite){
          toaster.create({ title: "Sikeres létrehozás.", type: "success" });
        }
        const newPlaylistId = res.data.id;
        const creatorId = res.data.creatorId;
        await api.post("/AddPlaylistToUser",{playlistId: newPlaylistId,userid: creatorId},{
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
        })
        .then(()=>{
          if(load){
            load();
          }
        })
    }
    else{
      toaster.create({ title: "Hiba történt.", type: "error" });
        console.error("Hiba történt a lejátszási lista elkészítése alatt: ",res.data)
    }
    return res.status;
}
// Lejátszási lista törlés függvény
export const deletePlaylist = async (playlistId,toaster,playlistName,navigate)=>{
    await api.delete("/playlist/"+playlistId,{
      headers: {
        Authorization: `Bearer ${getToken()}`
    }
    })
    .then(()=>{
      toaster.create({ title: `Sikeresen törölted a ${playlistName} lejátszási listát!`, type: "success" });
      navigate("/playlists");
    })
    .catch((e)=>{
      console.error("Hiba történt a lista törlése közben: ",e);
    })
}
// Kedvencek lista id-jának lekérése függvény
export const getFavoriteId = async (playlistId)=>{
    const userid = getUserId();
    if(playlistId === "Kedvencek"){
      const response = await api.get("/GetPlaylistByUser?id="+userid);
      playlistId = response.data.filter(pl=>pl.creatorId === userid).filter(pl=> pl.playlistName === playlistId)[0].id;
    }
}
// Megnézi, hogy a lejátszási lista benne van e a saját listáimban
export const getIsPlaylistAdded = async (playlistId, setIsCreator, setIsAdded)=>{
    const userid = getUserId();
    const response = await api.get("/GetPlaylistByUser?id="+userid)
    const plist = response.data.find(pl => pl.id === playlistId);
    if(plist?.creatorId === userid){
      setIsCreator(true);
    }
    if(plist !== undefined){
      setIsAdded(true);
    }
}
// Lejátszási lista hozzáadása a saját listáimhoz
export const addToMyPlaylists = async (playlistId,playlistName,toaster)=>{
    let isAdded = false;
    const userid = getUserId(); 
    await api.post("/AddPlaylistToUser",{userid,playlistId},{
      headers: {
        Authorization: `Bearer ${getToken()}`
    }
    })
    .then(()=>{
      toaster.create({ title: `Sikeresen hozzáadtad a(z) ${playlistName} listát a saját listáidhoz!`, type: "success" });
      isAdded = true;
    })
    .catch((e)=>{
      console.error("Hiba történt a lista hozzáadása közben: ",e);
    })
    return await isAdded;
}
// Lejátszási lista törlése a saját listáimból
export  const removeFromMyPlaylists = async (playlistId,playlistName,toaster)=>{
    let isAdded = true;
    const userid = getUserId();
    await api.delete("/DeleteUserFromPlaylist", {
      data: {
          userid: userid,
          playlistId: playlistId
      },
      headers: {
          Authorization: `Bearer ${getToken()}`
      }
    })
    .then(()=>{
      toaster.create({ title: `Sikeresen törölted a(z) ${playlistName} listát a saját listáid közül!`, type: "success" });
      isAdded = false;
    })
    .catch((e)=>{
      console.error("Hiba történt a lista hozzáadása közben: ",e);
    })
    return await isAdded;
}
// Lejátszási lista adatainak módosítása függvény
export const editPlaylist = async(playlist,imageUrl,playlistName,toaster,setOpen,load)=>{
  api.put("/playlist/"+playlist.id,{imageUrl,playlistName},{
      headers: {
        Authorization: `Bearer ${getToken()}`
    }
    })
    .then(()=>{
      toaster.create({ title: `Sikeres módosítás!`, type: "success" });
      setOpen(false);
      load();
    })
    .catch((e)=>{
      console.error("Hiba történt a lista hozzáadása közben: ",e);
    })
}
// Lejátszási lista és zenéinek lekérése
export const getPlaylistsWithMusic = async (musicId) => {
  const userid = getUserId();
  let playlists = null;
  let addedMusics = null;
  try {
    const res = await api.get(`/GetPlaylistByUser?id=${userid}`);
    const userPlaylists = res.data.filter(pl => pl.creatorId === userid);
    playlists = userPlaylists;

    const musicStatus = {};
    await Promise.all(userPlaylists.map(async (playlist) => {
      const musicRes = await api.get(`/playlist/${playlist.id}`);
      const isAdded = musicRes.data.musics.some(music => music.id === musicId);
      musicStatus[playlist.id] = isAdded;
    }));

    addedMusics = musicStatus;
  } catch (error) {
    console.error("Hiba a playlist betöltésekor:", error);
  }
  return {playlists,addedMusics}
};
// Zene törlése/hozzáadása lejátszási listához
export const AddOrRemoveFromPlaylist = async (musicId,setFavorite,toaster,playlistId, playlistName) => {
  try {
    const musicRes = await api.get(`/playlist/${playlistId}`);
    const isAlreadyAdded = musicRes.data.musics.some(music => music.id === musicId);
    if (isAlreadyAdded) {
      if(playlistName === "Kedvencek"){
        setFavorite(false);
      }
      await api.delete("/DeleteMusicFromPlaylist", { data: { playlistId, musicId }, headers: {
        Authorization: `Bearer ${getToken()}`
    }});
      toaster.create({ title: `A zene törölve a ${playlistName} listából!`, type: "success" });
    } else {
      if(playlistName === "Kedvencek"){
        setFavorite(true);
      }
      await api.post("/AddMusicToPlaylist", { playlistId, musicId }, {
        headers: {
          Authorization: `Bearer ${getToken()}`
      }
      });
      toaster.create({ title: `Zene hozzáadva ${playlistName} listához.`, type: "success" });
    }

    return (prevState => ({
      ...prevState,
      [playlistId]: !isAlreadyAdded
    }));
  } catch (error) {
    console.error("Hiba történt:", error);
    toaster.create({ title: `Hiba történt a művelet során.`, type: "error" });
  }
};