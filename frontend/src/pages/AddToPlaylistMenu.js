import React, { useEffect, useState } from 'react'
import { Button, Flex, Image, Text } from "@chakra-ui/react"
import {
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
} from "../components/ui/menu"
import { LuList, LuMinus, LuPlus } from 'react-icons/lu'
import api from '../Api'
import Cookies from "js-cookie";
import { toaster } from '../components/ui/toaster'

export default function AddToPlaylistMenu({ musicId }) {
  const userid = Cookies.get("userid");
  const [playlists, setPlaylists] = useState([]);
  const [addedMusic, setAddedMusic] = useState({});

  useEffect(() => {
    const getPlaylists = async () => {
      try {
        const res = await api.get(`/GetPlaylistByUser?id=${userid}`);
        const userPlaylists = res.data.filter(pl => pl.creatorId === userid);
        setPlaylists(userPlaylists);

        const musicStatus = {};
        await Promise.all(userPlaylists.map(async (playlist) => {
          const musicRes = await api.get(`/GetMusicFromPlaylist?id=${playlist.id}`);
          const isAdded = musicRes.data.some(music => music.id === musicId);
          musicStatus[playlist.id] = isAdded;
        }));

        setAddedMusic(musicStatus);
      } catch (error) {
        console.error("Hiba a playlist betöltésekor:", error);
      }
    };

    getPlaylists();
  }, [userid, musicId]);

  const AddOrRemove = async (playlistId, playlistName) => {
    try {
      const musicRes = await api.get(`/GetMusicFromPlaylist?id=${playlistId}`);
      const isAlreadyAdded = musicRes.data.some(music => music.id === musicId);
      if (isAlreadyAdded) {
        await api.delete("/DeleteMusicFromPlaylist", { data: { playlistId, musicId } });
        toaster.create({ title: `A zene törölve a ${playlistName} listából!`, type: "success" });
      } else {
        await api.post("/AddMusicToPlaylist", { playlistId, musicId });
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

  return (
    <MenuRoot>
      <MenuTrigger asChild>
        <Button p={1} m={1} variant="solid"><LuList/></Button>
      </MenuTrigger>
      <MenuContent>
        {playlists.map((playlist, index) => {
          const isAdded = addedMusic[playlist.id] || false;
          return (
            <MenuItem 
              key={index} 
              onClick={() => AddOrRemove(playlist.id, playlist.playlistName)} 
              value={playlist.playlistName} 
              justifyContent={"space-between"}
            >
                <Flex>
                {isAdded? <Text p="1" color={"red.500"}><LuMinus /></Text> : <Text p="1"><LuPlus /></Text>}
                <Text color={isAdded? "red.500" : "bg.inverted"}>{playlist.playlistName}</Text>
              </Flex>
              <Image rounded={"md"} w={"25px"} h={"25px"} src={playlist.imageUrl} />
            </MenuItem>
          );
        })}
      </MenuContent>
    </MenuRoot>
  );
}
