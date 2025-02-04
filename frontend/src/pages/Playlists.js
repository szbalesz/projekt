import React, { useEffect, useState } from 'react'
import { Heading, Flex, Center, Spinner, AbsoluteCenter } from "@chakra-ui/react";
import PlaylistCard from '../PlaylistCard';
import axios from 'axios';

export default function Playlists({token}) {
  const [playlists, setPlaylists] = useState()
  const [isPending, setPending] = useState(false)
  const getPlaylists=()=>{
      setPending(true);
      axios.get("https://localhost:5205/api/playlist/GetAllPlaylist",{
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(response => {
          setPlaylists(response.data);
      })
      .catch(e => {console.error("HIBA, Nem sikerült lekérni a lejátszási listák: ",e)})
      .finally(()=>{
        setPending(false);
      })
  }
  useEffect(() => {
    if(token !== ""){
      getPlaylists();
    }
  }, [])
  
  return (
    <>
      <Flex display="block" justifyContent="center">
        <Heading textAlign="center"> Lejátszási listák </Heading>
         <Center>
          {isPending? 
          <AbsoluteCenter>
            <Spinner/>
          </AbsoluteCenter>  
        : playlists? <Flex wrap="wrap" justify="center" gap={4} width="100%">
            {playlists.map((playlist, index) => (
              <PlaylistCard key={index} playlist={playlist} />
            ))}
          </Flex> : <AbsoluteCenter color="red">
            Nem sikerült betölteni a lejátszási listákat!
          </AbsoluteCenter>}
          
        </Center>
      </Flex>
    </>
  );
}
