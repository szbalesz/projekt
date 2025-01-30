import React, { useEffect, useState } from 'react';
import { Box, Text, Image, VStack, AbsoluteCenter, Button, Spinner } from '@chakra-ui/react';
import { LuList, LuPause, LuPlay, LuStar, LuStarOff } from 'react-icons/lu';
import { useLocation, useParams } from 'react-router-dom';
import axios from 'axios';

const MusicPage = ({ currentMusic, handlePlay, isPlaying }) => {
  const [music, setMusic] = useState();
  const [isPending, setPending] = useState(false)
  const [isFavorite, setFavorite] = useState(false)
  const { guid } = useParams();
  const location = useLocation();
  const getMusic=()=>{
    setPending(true);
    axios.get("https://localhost:5205/music/GetAllMusic")
    .then(response => {
       let foundMusic = response.data.find((m) => m.guid === guid); 
       setMusic(foundMusic);
       getFavorite(foundMusic.cim);  //Ideiglenes, később ID alapján fog működni
    })
    .catch(e => {console.error("HIBA, Nem sikerült lekérni a zenét: ",e)})
    .finally(()=>{
        setPending(false)
    })
}

  const getFavorite = (name) => {
    setPending(true);
    axios.get("https://localhost:5205/playlist/GetAllPlaylist")
    .then(response => {
      let data = response.data;
        for (let i = 0; i < data.length; i++) {
             if(data[i].listaNev === "Kedvencek"){
                for (let f = 0; f < data[i].zenes.length; f++) {
                  if(name === data[i].zenes[f].cim){
                    setFavorite(true);
                  }
                }
             }
         }
  })
    .catch(e => {console.error("HIBA, Nem sikerült lekérni a lejátszási listát: ",e)})
    .finally(()=>{
        setPending(false);
    })
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
      {isPending?
      <AbsoluteCenter>
        <Spinner/>
      </AbsoluteCenter> 
     : music ? (
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
            <Button p={1} m={1} variant="solid">{isFavorite? <LuStar fill="teal" stroke="0"/> : <LuStar/>}</Button>
            <Button p={1} m={1} variant={isPlaying && music?.cim === currentMusic?.cim ? "outline" : "subtle"} colorPalette="teal" onClick={()=> handlePlay(music)}>{isPlaying && music?.cim === currentMusic?.cim ? <LuPause /> : <LuPlay />} </Button>
            <Button p={1} m={1} variant="solid"><LuList/></Button>
          </Text>
        </VStack>
      ) : (
        <Text>Nem létezik ilyen zene</Text>
      )}
    </Box>
    </AbsoluteCenter>
    </>
  );
};

export default MusicPage;
