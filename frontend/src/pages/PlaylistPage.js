import React, { useEffect, useState } from 'react'
import MusicCard from '../MusicCard';
import { Center, Flex, Heading } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';

export default function PlaylistPage({handlePlay}) {
    const { name } = useParams();
    console.log(name)
    const [playlist, setPlaylist] = useState([
        {
            zenes: [{},{}],
        }
    ]);
    const getPlaylist=()=>{
        fetch("http://localhost:5202/api/Lejatszasilista")
        .then(response => {
          return response.json();
        })
        .then(data => {
            for (let i = 0; i < data.length; i++) {
                 if(data[i].listaNev === name){
                    setPlaylist(data[i].zenes);
                    console.log(data[i].zenes);
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
