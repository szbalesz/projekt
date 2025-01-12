// CardSearchResult.js
import React from 'react';
import { Button, Box, Text, Image } from "@chakra-ui/react";
import { useNavigate } from 'react-router-dom';

export default function MusicCard({ result, handlePlay, handlePopupClose }) {
  const navigate = useNavigate();

  const play = ()=>{
    handlePlay(result);
    navigate("/current-song");
    handlePopupClose();
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
      onClick={()=>play()}
    >
      <Box
        borderRadius="10px"
        color="white"
        textAlign="center"
        justifyContent="center"
        overflow="hidden"
        boxShadow="0 0 10px 0 #99f6e4"
      >
      <Image src={result.image}/>
        <Box p="0" w="auto" paddingTop="5" paddingBottom="5" backgroundColor="rgba(0,0,0,0.33)">
          <Text fontWeight="bold">{result.title}</Text>
          <Text color="#99f6e4">{result.artist}</Text>
          <Text fontSize="12px" letterSpacing="tight">
            {result.listeners} hallgató
          </Text>
        </Box>
      </Box>
    </Button>
  );
}
