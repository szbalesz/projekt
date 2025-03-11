import { AbsoluteCenter, Box, Button, Flex, Link, Spinner, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import BigMusicCard from '../cards/BigMusicCard';
import { useNavigate } from 'react-router-dom';
import { getAllMusic } from '../services/MusicService';
import { url } from '../services/Api';
import { LuBugOff } from 'react-icons/lu';

export default function Home() {
  const [isPending, setPending] = useState(false)
  const [musicList, setMusicList] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    // Zenék lekérése
    const getMusics = async () => {
      await setPending(true);
      setMusicList(await getAllMusic())
      await setPending(false);
    };
    getMusics();
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
          : musicList?.length > 0 ? musicList.slice(0,8).map((music, index) => (
            <BigMusicCard func={()=> navigate("/music/"+music.id)} key={index} music={music}/>
        )) : <AbsoluteCenter color="red">
          <Flex direction={"column"} textAlign={"center"}>
          <Text>Nem sikerült betölteni a zenéket!</Text>
          <Box mx={"auto"}>
            <Link href={`https://${url}/swagger/index.html`}>
            <Button><LuBugOff /> BUGFIX (Swagger)</Button>
            </Link>
          </Box>
          <Text color={"colorPalette.solid"} fontSize={"xs"}>Nyissa meg a swaggert és a probléma lehetőleg megoldódik!</Text>
          </Flex>
      </AbsoluteCenter>}
        </Flex>
      </Flex>
    </>
  );
}
