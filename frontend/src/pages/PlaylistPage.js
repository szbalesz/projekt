import React, { useEffect, useState } from 'react'
import MusicCard from '../MusicCard';
import { Center, Flex, Heading } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function PlaylistPage({handlePlay}) {
    const { name } = useParams();
    const [playlist, setPlaylist] = useState([
        {
            zenes: [{},{}],
        }
    ]);
    const getPlaylist=()=>{
        axios.get("https://localhost:5205/playlist/GetAllPlaylist")
        .then(response => {
          let data = response.data;
            for (let i = 0; i < data.length; i++) {
                 if(data[i].listaNev === name){
                    setPlaylist(data[i].zenes);
                 }
             }
        })
        .catch(e => {console.error("HIBA, Nem sikerült lekérni a lejátszási listát: ",e)})
    }

    useEffect(() => {
      getPlaylist();
    }, [])
    
  return (
    <div>
        <Flex display="block" justifyContent="center">
        <Heading textAlign="center"> {playlist.listaNev} </Heading>
        <Center>
          <Flex wrap="wrap" justify="center" gap={4} width="100%">
            {playlist.map((music, index) => (
              <MusicCard key={index} music={music} handlePlay={handlePlay}/>
            ))}
          </Flex>
        </Center>
      </Flex>
    </div>
  )
}
