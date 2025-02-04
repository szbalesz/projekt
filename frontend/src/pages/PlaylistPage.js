import React, { useEffect, useState } from 'react'
import MusicCard from '../MusicCard';
import { AbsoluteCenter, Center, Flex, Heading, Spinner } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function PlaylistPage({token, handlePlay}) {
    const { id } = useParams();
    const [isPending, setPending] = useState(false)
    const [playlist, setPlaylist] = useState();
    const getPlaylist=()=>{
      setPending(true);
        axios.get("https://localhost:5205/api/playlist/GetAllPlaylist",{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then(response => {
          let data = response.data;
            for (let i = 0; i < data.length; i++) {
                 if(data[i].id === id || id == "Kedvencek"){
                    setPlaylist(data[i].musics);
                 }
             }
        })
        .catch(e => {console.error("HIBA, Nem sikerült lekérni a lejátszási listát: ",e)})
        .finally(()=>{
            setPending(false);
        })
    }

    useEffect(() => {
      getPlaylist();
    }, [])
    
  return (
    <div>
        <Flex display="block" justifyContent="center">
        <Heading textAlign="center"> {playlist?.playlistName} </Heading>
        <Center>
          <Flex wrap="wrap" justify="center" gap={4} width="100%">
          {isPending?
           <AbsoluteCenter>
            <Spinner/>
            </AbsoluteCenter>  
         : playlist? playlist.map((music, index) => (
          <MusicCard key={index} music={music} handlePlay={handlePlay}/>
        )) : <AbsoluteCenter color="red">
              Nem sikerült betölteni a zenéket!
            </AbsoluteCenter>}
          </Flex>
        </Center>
      </Flex>
    </div>
  )
}
