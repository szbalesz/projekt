import React from 'react';
import { Button, Box, Text, Image } from "@chakra-ui/react";
import { useNavigate } from 'react-router-dom';

export default function PlaylistCard({ playlist }) {
  const themecolor = localStorage.getItem("themecolor");
  const navigate = useNavigate();

  const openPlaylist = ()=>{
    navigate(`/playlist/${playlist.id}`);
  }
  return (
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
      <Box
        borderRadius="10px"
        color="white"
        textAlign="center"
        justifyContent="center"
        overflow="hidden"
        boxShadow={`0 0 10px 0 ${themecolor}`}
      >
      <Image minW="150px" minH={"150px"} src={playlist.imageUrl.length > 15 ? playlist.imageUrl : "https://www.svgrepo.com/show/340721/no-image.svg"}/>
        <Box p="0" w="auto" paddingTop="5" paddingBottom="5" backgroundColor="colorPalette.inverted">
          <Text fontWeight="bold" color="colorPalette.300">{playlist.playlistName}</Text>
          <Text fontSize="12px" letterSpacing="tight">
            {playlist.musics.length} zene
          </Text>
        </Box>
      </Box>
    </Button>
  );
}
