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
import { toaster } from '../components/ui/toaster'
import { useNavigate } from 'react-router-dom'
import EditPlaylistWindow from './EditPlaylistWindow'
import { addToMyPlaylists, deletePlaylist, getFavoriteId, getIsPlaylistAdded, removeFromMyPlaylists } from '../services/PlaylistService'


export default function PlaylistEditMenu({playlist,playlistName,playlistId,load}) {
  const navigate = useNavigate();
  const [isCreator, setIsCreator] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  
  useEffect(() => {
    getFavoriteId(playlistId);
    getIsPlaylistAdded(playlistId, setIsCreator, setIsAdded);
  }, [])

  return (
    <MenuRoot>
      <MenuTrigger asChild>
      <Button color={"white"} size={"s"} variant={"ghost"}>
                <LuEllipsis/>
        </Button>
      </MenuTrigger>
      <MenuContent>
        {
        !isCreator? 
        !isAdded ? 
        <MenuItem value="hozzaad" onClick={async ()=> setIsAdded(await addToMyPlaylists(playlistId,playlistName,toaster))}><LuUserRoundPlus/> Hozzáadás a saját listáimhoz</MenuItem> 
        : <MenuItem value="eltavolit" color={"red.500"} onClick={async ()=> setIsAdded(await removeFromMyPlaylists(playlistId,playlistName,toaster))}><LuUserRoundMinus/> Eltávolítás a saját listáimból</MenuItem> 
        : null}
        {isCreator ?
         <>
         <EditPlaylistWindow openbutton={<MenuItem value="szerkeszt"><LuPen/>Adatok szerkesztése</MenuItem>} playlist={playlist} load={load}/>
         <DialogAlert openButton={<MenuItem value="torles" color={"red.500"}><LuCircleX/>Törlés</MenuItem>} func={()=> deletePlaylist(playlistId,toaster,playlistName,navigate)} title={"Biztosan törölni szeretnéd?"} text={"Ez a művelet nem vonható vissza. Ez véglegesen törli a lejátszási listát a rendszerből."} buttontext={"Törlés"}/>
         </> : null}
      </MenuContent>
    </MenuRoot>
  )
}
