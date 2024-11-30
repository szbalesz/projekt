// CardSearchResult.js
import React from 'react';
import { Button, Box, Text } from "@chakra-ui/react";
import { useNavigate } from 'react-router-dom';

export default function CardSearchResult({ result, handlePlay, handlePopupClose }) {
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
      w="115px"
      h="115px"
      m="1"
      p="0"
      textAlign="center"
      justifyContent="center"
      borderRadius="10px"
      onClick={()=>play()}
    >
      <Box
        backgroundSize="cover"
        backgroundImage={`url(${result.image})`}
        borderRadius="10px"
        color="white"
        textAlign="center"
        justifyContent="center"
        overflow="hidden"
      >
        <Box position="relative" p="0" w="115px" h="115px" paddingTop="7" backgroundColor="rgba(0,0,0,0.33)">
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
