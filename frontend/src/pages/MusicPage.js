import React, { useEffect, useState } from 'react';
import { Box, Text, Image, VStack, AbsoluteCenter, Button, Spinner } from '@chakra-ui/react';
import { LuList, LuPause, LuPlay, LuStar } from 'react-icons/lu';
import { useLocation, useParams } from 'react-router-dom';
import axios from 'axios';

const MusicPage = ({ token, currentMusic, handlePlay, isPlaying }) => {
  const [music, setMusic] = useState();
  const [isPending, setPending] = useState(false)
  const [isFavorite, setFavorite] = useState(false)
  const { id } = useParams();
  const location = useLocation();
  const getMusic=()=>{
    setPending(true);
    axios.get("https://localhost:5205/api/music/GetAllMusic")
    .then(response => {
       let foundMusic = response.data.find((m) => m.id === id); 
       setMusic(foundMusic);
       getFavorite(foundMusic.title);  //Ideiglenes, később ID alapján fog működni
    })
    .catch(e => {console.error("HIBA, Nem sikerült lekérni a zenét: ",e)})
    .finally(()=>{
        setPending(false)
    })
}

  const getFavorite = (name) => {
    setPending(true);
    axios.get("https://localhost:5205/api/playlist/GetAllPlaylist",{
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => {
      let data = response.data;
        for (let i = 0; i < data.length; i++) {
             if(data[i].playlistName === "Kedvencek"){
                for (let f = 0; f < data[i].musics.length; f++) {
                  if(name === data[i].musics[f].title){
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
      backgroundImage={music ? `url(${music.imageUrl})` : ""} 
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
          <Image src={music.imageUrl} 
          borderRadius="10px" 
          p="0" 
          alt={music.title} 
          boxSize="250px" />
          <Text fontSize="2xl" fontWeight="bold">
            {music.title}
          </Text>
          <Text fontSize="lg">
            {music.artist}
          </Text>
          <Text fontSize="md">
          </Text>
          <Text fontSize="md">
            <Button p={1} m={1} variant="solid">{isFavorite? <LuStar fill="teal" stroke="0"/> : <LuStar/>}</Button>
            <Button p={1} m={1} variant={isPlaying && music?.title === currentMusic?.title ? "outline" : "subtle"} colorPalette="teal" onClick={()=> handlePlay(music)}>{isPlaying && music?.title === currentMusic?.title ? <LuPause /> : <LuPlay />} </Button>
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
