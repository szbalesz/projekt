import React from 'react'
import { Button } from "@chakra-ui/react"
import {
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
} from "../components/ui/menu"
import { LuCircleX, LuEllipsis, LuPen, LuUserRoundPlus } from 'react-icons/lu'
import DialogAlert from './DialogAlert'
import api from '../Api'
import { toaster } from '../components/ui/toaster'
import { useNavigate } from 'react-router-dom'

export default function PlaylistEditMenu({playlistName,playlistId}) {
  const navigate = useNavigate();
  const deletePlaylist = ()=>{
    api.delete("/playlist/"+playlistId)
    .then((res)=>{
      console.log(res);
      toaster.create({ title: `Sikeresen törölted a ${playlistName} lejátszási listát!`, type: "success" });
      navigate("/playlists");
    })
    .catch((e)=>{
      console.log("Hiba történt a lista törlése közben: ",e);
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
        <MenuItem value="hozzaad"><LuUserRoundPlus/> Hozzáadás a saját listáimhoz</MenuItem>
        <MenuItem value="szerkeszt"><LuPen/>Adatok szerkesztése</MenuItem>
        <DialogAlert openButton={<MenuItem value="torles"><LuCircleX/>Törlés</MenuItem>} func={deletePlaylist} title={"Biztosan törölni szeretnéd?"} text={"Ez a művelet nem vonható vissza. Ez véglegesen törli a lejátszási listát a rendszerből."} buttontext={"Törlés"}/>
      </MenuContent>
    </MenuRoot>
  )
}
