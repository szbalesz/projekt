import api from './Api';
import Cookies from "js-cookie";
import { getUserProfile } from './UserService';

const token = Cookies.get("token");
const userid = Cookies.get("userid");
// Kedvencek lejátszási lista megkeresése függvény
export const getFavoritePlaylist = async (musicid) => {
    if (!userid) return { favoritePlaylistId: "", isFavorite: false };

    try {
        const response = await api.get(`/GetPlaylistByUser?id=${userid}`);
        const favoriteId = response.data.find(pl => pl.playlistName === "Kedvencek" && pl.creatorId === userid)?.id;
        if (!favoriteId) return { favoritePlaylistId: "", isFavorite: false };

        const favoriteMusics = await api.get(`/playlist/${favoriteId}`);
        const isFavorite = favoriteMusics.data.musics.some(m => m.id === musicid);
        return { favoritePlaylistId: favoriteId, isFavorite };
    } catch (error) {
        console.error("HIBA, Nem sikerült lekérni a kedvencek listáját: ", error);
        return { favoritePlaylistId: "", isFavorite: false };
    }
}
// Összes lejátszási lista lekérése
export const getAllPlaylist = async (setPlaylists) => {
   await api.get("/GetAllPlaylist")
    .then(response => {
        setPlaylists(response.data);
    })
    .catch(e => {console.error("HIBA, Nem sikerült lekérni a lejátszási listákat: ",e);}) 
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
export const getPlaylistByUser = async (id,setPlaylistId,toaster)=>{
    const response = await api.get("/GetPlaylistByUser?id="+userid);
      if(response.data.length > 0){
        id = response.data.filter(pl=>pl.creatorId === userid).filter(pl=> pl.playlistName === id)[0]?.id;
        if(!id){
          toaster.create({ title: `Úgytűnik nincs ilyen nevű listád! Hozz létre egyet Kedvencek névvel!`, type: "info" });
        }
        else{
            setPlaylistId(id);
          return id;
        }
      }
      return null;
}
// Felhasználó lejátszási listáinak lekérése függvény
export const getPlaylist = async (setPending,id,toaster,setPlaylistId,setMusics,setPlaylist,setCreator,navigate) => {
    setPending(true);
    if(id === "Kedvencek"){
      id = await getPlaylistByUser(id,setPlaylistId,toaster);
    }
    try {
      const response = await api.get("/playlist/"+id);
      setMusics(response?.data.musics);
      setPlaylist(response?.data.playlist[0])
      let creatorId = response?.data.playlist[0].creatorId;
      setCreator(await getUserProfile(creatorId));
    } catch (e) {
      navigate(-1)
    } finally {
      setPending(false);
    }
}
// Felhasználó összes lejátszási listájának lekérése függvény
export const getUsersAllPlaylist = async (setPlaylists) =>{
    if(token){
        api.get("/GetPlaylistByUser?id="+userid)
        .then(response => {
            setPlaylists(response.data);
        })
        .catch(e => {console.error("HIBA, Nem sikerült lekérni a lejátszási listák: ",e)})
    }
}
// Lejátszási lista készítés függvény
export const createPlaylist = async (newPlaylist,toaster,setPlaylistName,setImageUrl,setOpen,getPlaylists) => {
    api.post("/CreatePlaylist",newPlaylist, {
        headers: {
            Authorization: `Bearer ${token}`
        }
        })
    .then((res)=>{
        toaster.create({ title: "Sikeres létrehozás.", type: "success" });
        const newPlaylistId = res.data.id;
        const creatorId = res.data.creatorId;
        api.post("/AddPlaylistToUser",{playlistId: newPlaylistId,userid: creatorId},{
        headers: {
            Authorization: `Bearer ${token}`
        }
        })
        .then(()=>{
            setPlaylistName("");
            setImageUrl("");
            setOpen(false);
            getPlaylists();
        })
    })
    .catch((e)=>{
        toaster.create({ title: "Hiba történt.", type: "error" });
        console.error("Hiba történt a lejátszási lista elkészítése alatt: ",e)
    })
}
// Lejátszási lista törlés függvény
export const deletePlaylist = async (playlistId,toaster,playlistName,navigate)=>{
    await api.delete("/playlist/"+playlistId,{
      headers: {
        Authorization: `Bearer ${token}`
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
    if(playlistId === "Kedvencek"){
      const response = await api.get("/GetPlaylistByUser?id="+userid);
      playlistId = response.data.filter(pl=>pl.creatorId === userid).filter(pl=> pl.playlistName === playlistId)[0].id;
    }
}
// Megnézi, hogy a lejátszási lista benne van e a saját listáimban
export const getIsPlaylistAdded = async (playlistId, setIsCreator, setIsAdded)=>{
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
export const addToMyPlaylists = async (playlistId,playlistName,toaster,setIsAdded)=>{
    api.post("/AddPlaylistToUser",{userid,playlistId},{
      headers: {
        Authorization: `Bearer ${token}`
    }
    })
    .then(()=>{
      toaster.create({ title: `Sikeresen hozzáadtad a(z) ${playlistName} listát a saját listáidhoz!`, type: "success" });
      setIsAdded(true);
    })
    .catch((e)=>{
      console.error("Hiba történt a lista hozzáadása közben: ",e);
    })
}
// Lejátszási lista törlése a saját listáimból
export  const removeFromMyPlaylists = (playlistId,playlistName,toaster,setIsAdded)=>{
    api.delete("/DeleteUserFromPlaylist", {
      data: {
          userid: userid,
          playlistId: playlistId
      },
      headers: {
          Authorization: `Bearer ${token}`
      }
    })
    .then(()=>{
      toaster.create({ title: `Sikeresen törölted a(z) ${playlistName} listát a saját listáid közül!`, type: "success" });
      setIsAdded(false);
    })
    .catch((e)=>{
      console.error("Hiba történt a lista hozzáadása közben: ",e);
    })
}
// Lejátszási lista adatainak módosítása függvény
export const editPlaylist = async(playlist,imageUrl,playlistName,toaster,setOpen,load)=>{
  api.put("/playlist/"+playlist.id,{imageUrl,playlistName},{
      headers: {
        Authorization: `Bearer ${token}`
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
export const getPlaylistsWithMusic = async (setPlaylists,musicId,setAddedMusic) => {
  try {
    const res = await api.get(`/GetPlaylistByUser?id=${userid}`);
    const userPlaylists = res.data.filter(pl => pl.creatorId === userid);
    setPlaylists(userPlaylists);

    const musicStatus = {};
    await Promise.all(userPlaylists.map(async (playlist) => {
      const musicRes = await api.get(`/playlist/${playlist.id}`);
      const isAdded = musicRes.data.musics.some(music => music.id === musicId);
      musicStatus[playlist.id] = isAdded;
    }));

    setAddedMusic(musicStatus);
  } catch (error) {
    console.error("Hiba a playlist betöltésekor:", error);
  }
};
// Zene törlése/hozzáadása lejátszási listához
export const AddOrRemoveFromPlaylist = async (setAddedMusic,musicId,setFavorite,toaster,playlistId, playlistName) => {
  try {
    const musicRes = await api.get(`/playlist/${playlistId}`);
    const isAlreadyAdded = musicRes.data.musics.some(music => music.id === musicId);
    if (isAlreadyAdded) {
      if(playlistName === "Kedvencek"){
        setFavorite(false);
      }
      await api.delete("/DeleteMusicFromPlaylist", { data: { playlistId, musicId }, headers: {
        Authorization: `Bearer ${token}`
    }});
      toaster.create({ title: `A zene törölve a ${playlistName} listából!`, type: "success" });
    } else {
      if(playlistName === "Kedvencek"){
        setFavorite(true);
      }
      await api.post("/AddMusicToPlaylist", { playlistId, musicId }, {
        headers: {
          Authorization: `Bearer ${token}`
      }
      });
      toaster.create({ title: `Zene hozzáadva ${playlistName} listához.`, type: "success" });
    }

    setAddedMusic(prevState => ({
      ...prevState,
      [playlistId]: !isAlreadyAdded
    }));
  } catch (error) {
    console.error("Hiba történt:", error);
    toaster.create({ title: `Hiba történt a művelet során.`, type: "error" });
  }
};