import React, { useEffect, useState } from 'react'
import { Button, Flex, Image, Text } from "@chakra-ui/react"
import {
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
} from "../components/ui/menu"
import { LuList, LuPlus } from 'react-icons/lu'
import api from '../Api'
import Cookies from "js-cookie";
import { toaster } from '../components/ui/toaster'

export default function AddToPlaylistMenu({ musicId }) {
  const userid = Cookies.get("userid");
  const [playlists, setPlaylists] = useState([])
  useEffect(() => {
    api.get("/UserPlaylist/GetPlaylistByUser?id="+userid)
    .then((res)=>{
      setPlaylists(res.data);
    })
  }, [])
  
  const AddOrRemove = (playlistId,playlistName) =>{
    let obj = {
      playlistId: playlistId,
      musicId: musicId
    }
    api.get("/PlaylistMusic/GetMusicFromPlaylist?id="+playlistId)
    .then((res)=>{
      for (const music of res.data) {
        if(music.id == musicId){
          // Itt lesz majd a törlés  a listból ha majd lesz végpont
          toaster.create({ title: `A zene már benne van a ${playlistName} listában!`, type: "error" });
          return;
        }
      }
      api.post("/PlaylistMusic/AddMusicToPlaylist",obj)
      .then(()=>{
        toaster.create({ title: `Zene hozzáadva ${playlistName} listához.`, type: "success" });
      })
      .catch(()=>{
        toaster.create({ title: `Zenét nem sikerült hozzáadni a ${playlistName} listához!`, type: "error" });
      })
    })
  }

  return (
    <MenuRoot>
      <MenuTrigger asChild>
      <Button p={1} m={1} variant="solid"><LuList/></Button>
      </MenuTrigger>
      <MenuContent>
        {playlists.map((playlist,index)=>
          <MenuItem onClick={()=> AddOrRemove(playlist?.id,playlist?.playlistName)} key={index} value={playlist?.playlistName} justifyContent={"space-between"}>
            <Flex>
              <Text p="1"><LuPlus/></Text>
              <Text>{playlist?.playlistName} </Text>
            </Flex>
            <Image rounded={"md"} w={"25px"} h={"25px"} src={playlist?.imageUrl}/>
          </MenuItem>
        )}
      </MenuContent>
    </MenuRoot>
  )
}
