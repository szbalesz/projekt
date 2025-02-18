import React, { useEffect, useState } from 'react'
import { Button } from "@chakra-ui/react"
import {
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
} from "../components/ui/menu"
import { LuCircleX, LuEllipsis, LuPen, LuUserRoundMinus, LuUserRoundPlus } from 'react-icons/lu'
import DialogAlert from './DialogAlert'
import api from '../Api'
import { toaster } from '../components/ui/toaster'
import { useNavigate } from 'react-router-dom'
import Cookies from "js-cookie"

export default function PlaylistEditMenu({playlistName,playlistId,userId}) {
  const token = Cookies.get("token");
  const navigate = useNavigate();
  const [isCreator, setIsCreator] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const deletePlaylist =()=>{
    api.delete("/playlist/"+playlistId,{
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

  const getIsAdded = async ()=>{
    const response = await api.get("/GetPlaylistByUser?id="+userId)
    const plist = response.data.find(pl => pl.id === playlistId);
    if(plist?.creatorId === userId){
      setIsCreator(true);
    }
    if(plist !== undefined){
      setIsAdded(true);
    }
  }

  const getId = async ()=>{
    if(playlistId === "Kedvencek"){
      const response = await api.get("/GetPlaylistByUser?id="+userId);
      playlistId = response.data.filter(pl=>pl.creatorId === userId).filter(pl=> pl.playlistName === playlistId)[0].id;
    }
  }
  
  useEffect(() => {
    getId();
    getIsAdded();
  }, [])
  

  const addToMyPlaylists =()=>{
    api.post("/AddPlaylistToUser",{userId,playlistId},{
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

  const removeFromMyPlaylists =()=>{
    api.delete("/DeleteUserFromPlaylist", {
      data: {
          userId: userId,
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
  return (
    <MenuRoot>
      <MenuTrigger asChild>
      <Button size={"s"} variant={"ghost"}>
                <LuEllipsis/>
        </Button>
      </MenuTrigger>
      <MenuContent>
        {!isCreator? 
        !isAdded ? 
        <MenuItem value="hozzaad" onClick={addToMyPlaylists}><LuUserRoundPlus/> Hozzáadás a saját listáimhoz</MenuItem> 
        : <MenuItem value="eltavolit" color={"red.500"} onClick={removeFromMyPlaylists}><LuUserRoundMinus/> Eltávolítás a saját listáimból</MenuItem> 
        : null}
        {isCreator ?
         <>
         <MenuItem value="szerkeszt"><LuPen/>Adatok szerkesztése</MenuItem>
         <DialogAlert openButton={<MenuItem value="torles" color={"red.500"}><LuCircleX/>Törlés</MenuItem>} func={deletePlaylist} title={"Biztosan törölni szeretnéd?"} text={"Ez a művelet nem vonható vissza. Ez véglegesen törli a lejátszási listát a rendszerből."} buttontext={"Törlés"}/>
         </> : null}
      </MenuContent>
    </MenuRoot>
  )
}
