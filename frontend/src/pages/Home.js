import { Flex } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import BigMusicCard from '../BigMusicCard';
import axios from 'axios';

export default function Home() {
  const [isPending, setPending] = useState(false)
  const [musicList, setMusicList] = useState([]);
  //ideiglenes keresés de ezt majd a backend fogja végezni
  const getAllMusic=()=>{
      axios.get("https://localhost:5205/music/GetAllMusic")
      .then(response => {
        setMusicList(response.data);
    
      })
      .catch(e => {console.error("HIBA, Nem sikerült lekérni a zenéket: ",e)}) 
}

  useEffect(() => {
    getAllMusic();
  }, [])

  return (
    <>
      <Flex justifyContent="center">
        <Flex
          justifyContent="center"
          wrap="wrap"
          gap={6}
          padding={4}
        >
          {musicList.map((music, index) => (
              <BigMusicCard key={index} music={music}/>
          ))}
        </Flex>
      </Flex>
    </>
  );
}
