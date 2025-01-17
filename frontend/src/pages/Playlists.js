import React, { useEffect, useState } from 'react'
import { Heading, Flex, Center } from "@chakra-ui/react";
import PlaylistCard from '../PlaylistCard';

export default function Playlists() {
  const [playlists, setPlaylists] = useState([])
  const getPlaylists=()=>{
      fetch("http://localhost:5202/playlist/GetAllPlaylist")
      .then(response => {
        return response.json();
      })
      .then(data => {
          setPlaylists(data);
      })
      .catch(e => {console.error("HIBA, Nem sikerült lekérni a lejátszási listák: ",e)})
  }
  useEffect(() => {
    getPlaylists();
  }, [])
  
  return (
    <>
      <Flex display="block" justifyContent="center">
        <Heading textAlign="center"> Lejátszási listák </Heading>
        <Center>
          <Flex wrap="wrap" justify="center" gap={4} width="100%">
            {playlists.map((playlist, index) => (
              <PlaylistCard key={index} playlist={playlist} />
            ))}
          </Flex>
        </Center>
      </Flex>
    </>
  );
}
