import React from 'react';
import { Button, Box, Text, Image } from "@chakra-ui/react";
import { useLocation, useNavigate } from 'react-router-dom';

export default function MusicCard({ music, handlePopupClose }) {
  const navigate = useNavigate();
  const location = useLocation();
  const isPopup = location.pathname.includes("popup");  
  const click = ()=>{
    navigate(`/music/${music.guid}`);
    if(isPopup){
      handlePopupClose();
    }
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
      onClick={()=>click()}
    >
      <Box
        borderRadius="10px"
        color="white"
        textAlign="center"
        justifyContent="center"
        overflow="hidden"
        boxShadow="0 0 10px 0 #99f6e4"
      >
      <Image h="150px" w="150px" src={music.kep}/>
        <Box p="0" w="auto" paddingTop="5" paddingBottom="5" backgroundColor="rgba(0,0,0,0.33)">
          <Text fontWeight="bold">{music.cim}</Text>
          <Text color="#99f6e4">{music.eloado}</Text>
        </Box>
      </Box>
    </Button>
  );
}
