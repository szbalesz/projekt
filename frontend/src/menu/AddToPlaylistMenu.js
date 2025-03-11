import React, { useEffect, useState } from 'react'
import { Flex, Image, MenuTriggerItem, Text } from "@chakra-ui/react"
import {
  MenuContent,
  MenuItem,
  MenuRoot,
} from "../components/ui/menu"
import { LuMinus, LuPlus } from 'react-icons/lu'
import { toaster } from '../components/ui/toaster'
import { AddOrRemoveFromPlaylist, getPlaylistsWithMusic } from '../services/PlaylistService'
import { getUserId } from '../services/UserService'

export default function AddToPlaylistMenu({ setFavorite, isFavorite, musicId }) {
  const userid = getUserId();
  const [playlists, setPlaylists] = useState([]);
  const [addedMusic, setAddedMusic] = useState({});
  // Adatok betöltése függvény definiálása
  const load = async () => {
    // Lejátszási listák lekérése, + azoknak lekérése amelyekben benne van a zene
    const response = await getPlaylistsWithMusic(musicId);
    setPlaylists(response.playlists);
    setAddedMusic(response.addedMusics);
  }

  useEffect(() => {
    load();
  }, [userid, musicId,isFavorite]);

  return (
    // Lejátszási listához adás menü
    <MenuRoot positioning={{ placement: "right-start", gutter: 2 }}>
      {/* Lejátszási listához hozzáadás menügomb a zenéknél */}
      <MenuTriggerItem  value="listamenu"><LuPlus/>Felvétel listába</MenuTriggerItem>
      <MenuContent>
        {playlists.map((playlist, index) => { {/* Lejátszási listák betöltése a menüben */}
          const isAdded = addedMusic[playlist.id] || false;
          return (
            <MenuItem 
              key={index} 
              onClick={async () => setAddedMusic(await AddOrRemoveFromPlaylist(musicId,setFavorite,toaster,playlist.id, playlist.playlistName))} 
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
