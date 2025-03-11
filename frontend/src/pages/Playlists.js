import React, { useEffect, useState } from 'react'
import { Heading, Flex, Box, Text } from "@chakra-ui/react";
import PlaylistCard from '../cards/PlaylistCard';
import PlaylistWindow from '../menu/PlaylistWindow';
import { getUsersAllPlaylist } from '../services/PlaylistService';
import { getToken } from '../services/AuthService';
import { getUserId } from '../services/UserService';

export default function Playlists() {
  const themecolor = localStorage.getItem("themecolor");
  const [playlists, setPlaylists] = useState()
  const token = getToken();
  const userid = getUserId();

  // Adatok betöltése
  const load = async () => {
    // Ha van tokenje (be van jelentkezve) lekéri a lejátszási listáit
    if(token){
      setPlaylists(await getUsersAllPlaylist());
    }
  }
  
  useEffect(() => {
    load();
  }, [])
  
  return (
    // Lejátszási listák oldal
    <>
    <Flex w={"100%"}>
      <Box
        w={"full"}
        alignItems={"left"}
        justifyContent={"center"}
        position={"relative"}
      >
        <Flex zIndex={"1"} bgGradient="to-tr" gradientFrom="colorPalette.solid/65" gradientTo="transparent" position={"absolute"} w={"full"} h={"190px"}></Flex>
        <Flex backgroundImage={`url($)`} backgroundPosition={"center"} backgroundSize={"cover"} direction={"row"} h={"190px"} p={"5"}>
          <Box zIndex={"2"} px={"5"} py={"5"}>
            <Text fontSize="4xl" py={"5"} fontWeight="bold" color={"white"}>
              Lejátszási listák
            </Text>
          </Box>
        </Flex>
        <hr/>
        <Flex px={"5"} pt={"3"} direction={"column"}>
          <Flex justifyContent={"space-between"}>
          {token? <Heading>Lejátszási listák</Heading> : <Heading color={"colorPalette.300"}>Jelentkezz be a funkció használatához!</Heading>}
          {token? <Heading textAlign="center">  <PlaylistWindow load={load} playlists={playlists} themecolor={themecolor} userid={userid}/> </Heading> : null} 
          </Flex>
          <Flex my={"3"} overflowX={"auto"} gap={4} width="100%">{playlists?.map((playlist, index) => <PlaylistCard key={index} playlist={playlist} />)}</Flex>
        </Flex>
      </Box>
    </Flex>
    </>
  );
}
