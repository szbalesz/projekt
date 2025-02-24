import { AbsoluteCenter, Flex, Spinner } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import BigMusicCard from '../cards/BigMusicCard';
import api from '../Api';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const [isPending, setPending] = useState(false)
  const [musicList, setMusicList] = useState();
  const navigate = useNavigate();
  const getAllMusic=()=>{
      setPending(true);
      api.get("/GetAllMusic")
      .then(response => {
        setMusicList(response.data);
      })
      .catch(e => {console.error("HIBA, Nem sikerült lekérni a zenéket: ",e);}) 
      .finally(()=>{
        setPending(false);
      })
}
  useEffect(() => {
    getAllMusic();
  }, [])

  return (
    <>
    {/* Főoldal */}
      <Flex justifyContent="center">
        <Flex
          justifyContent="center"
          wrap="wrap"
          gap={6}
          padding={5}
          mt={5}
        >
          {/* Betöltő kör megjelenítése amíg betölti a zenéket */}
          {isPending?  
          <AbsoluteCenter>
            <Spinner/>
          </AbsoluteCenter> 
          : musicList? musicList.slice(0,8).map((music, index) => (
            <BigMusicCard func={()=> navigate("/music/"+music.id)} key={index} music={music}/>
        )) : <AbsoluteCenter color="red">
        Nem sikerült betölteni a zenéket!
      </AbsoluteCenter>}
        </Flex>
      </Flex>
    </>
  );
}
