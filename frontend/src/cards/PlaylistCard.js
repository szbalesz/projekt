import React, { useEffect, useState } from 'react';
import { Button, Box, Text } from "@chakra-ui/react";
import { useNavigate } from 'react-router-dom';
import api from '../services/Api';
import { Avatar } from '../components/ui/avatar';

export default function PlaylistCard({ playlist }) {
  const themecolor = localStorage.getItem("themecolor");
  const navigate = useNavigate();
  const [creator, setCreator] = useState({})
  const [length, setLength] = useState(0)
  const openPlaylist = ()=>{
    navigate(`/playlist/${playlist.id}`);
  }
  // Adatok lekérése
  const getData = async ()=>{
    const response = await api.get("/playlist/"+playlist.id);
       let creatorId = response.data.playlist[0].creatorId
       setLength(response.data.musics.length)
        if(creatorId != null){
          const res = await api.get("/user/"+creatorId);
          setCreator(res.data[0]);
        }
  }

  useEffect(() => {
    getData();
  }, [])
  return (
    // Lejátszási lista kártya
    <Button
      _hover={{ transform: "scale(1.05)" }}
      variant="ghost"
      w="150px"
      h="auto"
      m="2"
      p="0"
      textAlign="center"
      justifyContent="center"
      borderRadius="10px"
      onClick={()=>openPlaylist()}
    >
      <Text display={"flex"} position={"absolute"} top={"2"} left={"2"} fontSize={"12px"} as={"div"}>
       <Avatar boxShadow={"0 0 10px 0"} width="20px" height="20px" src={creator?.profilePictureURL}/>
        <Text ml={"1"} color={"colorPalette.300"}>
        {creator?.username}
        </Text>
        </Text>
      <Box
        borderRadius="10px"
        color="white"
        textAlign="center"
        justifyContent="center"
        overflow="hidden"
        boxShadow={`0 0 10px 0 ${themecolor}`}
      >
      <Box width="150px" height={"150px"} backgroundPosition="center" backgroundImage={"url("+playlist?.imageUrl+")"} backgroundSize="cover"/>
        <Box p="0" w="auto" paddingTop="5" paddingBottom="5" backgroundColor="colorPalette.inverted">
          <Text fontWeight="bold" color="colorPalette.300">{playlist.playlistName}</Text>
          <Text color={"bg.inverted"} fontSize="12px" letterSpacing="tight">
          {length} zene
          </Text>
        </Box>
      </Box>
    </Button>
  );
}
