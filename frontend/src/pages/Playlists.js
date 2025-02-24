import React, { useEffect, useState } from 'react'
import { Heading, Flex, Center, Spinner, AbsoluteCenter, Button, Box, Text } from "@chakra-ui/react";
import PlaylistCard from '../cards/PlaylistCard';
import api from '../Api';
import Cookies from "js-cookie"
import PlaylistWindow from './PlaylistWindow';
import { useNavigate } from 'react-router-dom';

export default function Playlists() {
  const themecolor = localStorage.getItem("themecolor");
  const navigate = useNavigate();
  const [playlists, setPlaylists] = useState()
  const [isPending, setPending] = useState(false)
  const token = Cookies.get("token");
  const userid = Cookies.get("userid");

  const getPlaylists=()=>{
      setPending(true);
      if(token){
        api.get("/GetPlaylistByUser?id="+userid)
        .then(response => {
            setPlaylists(response.data);
        })
        .catch(e => {console.error("HIBA, Nem sikerült lekérni a lejátszási listák: ",e)})
        .finally(()=>{
          setPending(false);
        })
      }
      else{
        setPending(false);
      }
  }
  useEffect(() => {
    if(token){
      getPlaylists();
    }
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
            <Text fontSize="4xl" py={"5"} fontWeight="bold">
              Lejátszási listák
            </Text>
          </Box>
        </Flex>
        <hr/>
        <Flex px={"5"} pt={"3"} direction={"column"}>
          <Flex justifyContent={"space-between"}>
          {token? <Heading>Lejátszási listák</Heading> : <Heading color={"colorPalette.300"}>Jelentkezz be a funkció használatához!</Heading>}
          {token? <Heading textAlign="center">  <PlaylistWindow themecolor={themecolor} userid={userid} getPlaylists={getPlaylists}/> </Heading> : null} 
          </Flex>
          <Flex my={"3"} overflowX={"auto"} gap={4} width="100%">{playlists?.map((playlist, index) => <PlaylistCard key={index} playlist={playlist} />)}</Flex>
        </Flex>
      </Box>
    </Flex>
    </>
  );
}
