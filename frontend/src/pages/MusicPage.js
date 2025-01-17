import React, { useEffect, useState } from 'react';
import { Box, Text, Image, VStack, AbsoluteCenter, Button } from '@chakra-ui/react';
import { LuList, LuStar } from 'react-icons/lu';
import { useLocation, useParams } from 'react-router-dom';

const MusicPage = () => {
  const [music, setMusic] = useState();
  const { guid } = useParams();
  const location = useLocation();
  const getMusic=()=>{
    fetch("http://localhost:5202/api/Lejatszasilista")
    .then(response => {
      return response.json();
    })
    .then(data => {
        for (let i = 0; i < data.length; i++) {
          for (let f = 0; f < data[i].zenes.length; f++) {
            if(data[i].zenes[f].guid === guid)
            setMusic(data[i].zenes[f]);
            console.log(data[i].zenes[f]);
          }
        }
        console.log(data[0])
    })
    .catch(e => {console.error("HIBA, Nem sikerült lekérni a zenét: ",e)})
}
useEffect(() => {
  getMusic();
}, [location])

  return (

    <>
      {/* Háttér */}
      <Box 
      style={{content: ""}}
      transition="all 1s ease-in-out"
      backgroundImage={music ? `url(${music.kep})` : ""} 
      backgroundSize="cover" 
      backgroundPosition="center" 
      backgroundRepeat="no-repeat" 
      position="absolute" 
      left="0" 
      top="0" 
      width="100%" 
      height="100%">  
      </Box>
      {/* Háttér elsötétülése */}
      <Box 
      style={{content: ""}} backgroundColor="rgba(0,0,0,0.25)"
      position="absolute" 
      left="0" 
      top="0" 
      width="100%" 
      height="100%">  
      </Box>

      <AbsoluteCenter 
      transition="all 1s ease-in-out"
      zIndex="0" 
      marginTop={{base: "-50px", md:"auto"}} 
      w={{base: "85%", md:"auto"}} 
      maxW="100%" 
      textAlign="center">
        <Box 
        p="25px" 
        bg="Background"
        transition="all 1s ease-in-out"
        boxShadow="0 0 25px 0 teal"
        borderRadius="25px"
        _hover={{transition:"all 1s ease-in-out", transform: "scale(1.05)" ,padding: "35px",borderRadius: `50px 15px`}}>
      {music ? (
        <VStack 
        spacing={4} 
        align="center" 
        w="auto" 
        p="0">
          <Image src={music.kep} 
          borderRadius="10px" 
          p="0" 
          alt={music.cim} 
          boxSize="250px" />
          <Text fontSize="2xl" fontWeight="bold">
            {music.cim}
          </Text>
          <Text fontSize="lg">
            {music.eloado}
          </Text>
          <Text fontSize="md">
          </Text>
          <Text fontSize="md">
            <Button p={1} m={1} variant="solid"><LuStar/></Button>
            <Button p={1} m={1} variant="solid"><LuList/></Button>
          </Text>
        </VStack>
      ) : (
        <Text>Jelenleg nincs kiválasztva zene</Text>
      )}
    </Box>
    </AbsoluteCenter>
    </>
  );
};

export default MusicPage;
