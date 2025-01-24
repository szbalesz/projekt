import React, { useEffect, useState } from 'react'
import { Heading, Flex, Center, Spinner } from "@chakra-ui/react";
import PlaylistCard from '../PlaylistCard';
import axios from 'axios';

export default function Playlists() {
  const [playlists, setPlaylists] = useState([])
  const [isPending, setPending] = useState(false)
  const getPlaylists=()=>{
      setPending(true);
      axios.get("https://localhost:5205/playlist/GetAllPlaylist")
      .then(response => {
          setPlaylists(response.data);
      })
      .catch(e => {console.error("HIBA, Nem sikerült lekérni a lejátszási listák: ",e)})
      .finally(()=>{
        setPending(false);
      })
  }
  useEffect(() => {
    getPlaylists();
  }, [])
  
  return (
    <>
      <Flex display="block" justifyContent="center">
        <Heading textAlign="center"> Lejátszási listák </Heading>
         <Center>
          {isPending? <Spinner/> : <Flex wrap="wrap" justify="center" gap={4} width="100%">
            {playlists.map((playlist, index) => (
              <PlaylistCard key={index} playlist={playlist} />
            ))}
          </Flex>}
          
        </Center>
      </Flex>
    </>
  );
}
