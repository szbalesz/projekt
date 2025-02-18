import React, { useEffect, useState } from 'react';
import { Box, Text, Image, VStack, AbsoluteCenter, Button, Spinner } from '@chakra-ui/react';
import { LuList, LuPause, LuPlay, LuStar, LuTrash } from 'react-icons/lu';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import api from '../Api';
import Cookies from "js-cookie";
import AddToPlaylistMenu from './AddToPlaylistMenu';
import { Slider } from '../components/ui/slider';
import { toaster } from '../components/ui/toaster';

const MusicPage = ({currentTime, handleSliderChange, duration, currentMusic, handlePlay, isPlaying }) => {
  const themecolor = localStorage.getItem("themecolor");
  const [music, setMusic] = useState({});
  const [isPending, setPending] = useState(false)
  const [isFavorite, setFavorite] = useState(false)
  const [isUploader, setIsUploader] = useState(false)
  const { id } = useParams();
  const token = Cookies.get("token");
  let userid = Cookies.get("userid");
  const location = useLocation();
  const navigate = useNavigate();
  const getMusic=()=>{
    setPending(true);
    api.get("/music/"+id)
    .then(response => {
       setMusic(response.data[0]);
       if(token !== ""){
        getFavorite(response.data[0].title);
       }
       if(response.data[0].uploaderId === userid){
        setIsUploader(true);
       }
    })
    .catch(e => {console.error("HIBA, Nem sikerült lekérni a zenét: ",e)})
    .finally(()=>{
        setPending(false)
    })
}

  const getFavorite = (name) => {
    setPending(true);
    api.get("/GetAllPlaylist",{
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

  const deleteMusic = ()=>{
    api.delete("/music/"+id, {
      headers: {
        Authorization: `Bearer ${token}`
    }
    })
    .then(() =>{
      toaster.create({ title: `Sikeresen törölted a ${music?.title} című zenét!`, type: "success" });
      navigate("/");
    })
    .catch((e)=>{
      console.error("Hiba történt a zene törlése közben: ",e);
    })
  }
useEffect(() => {
  getMusic();
}, [location])

useEffect(() => {
  if(!music){
    navigate("/");
  }
}, [music])

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
        boxShadow={`0 0 25px 0 ${themecolor}`}
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
            <Button p={1} m={1} variant="solid">{isFavorite? <LuStar fill={"colorPalette.solid"} stroke="0"/> : <LuStar/>}</Button>
            <Button p={1} m={1} variant={isPlaying && music?.title === currentMusic?.title ? "outline" : "subtle"} onClick={()=> handlePlay(music)}>{isPlaying && music?.title === currentMusic?.title ? <LuPause /> : <LuPlay />} </Button>
            <AddToPlaylistMenu musicId={id}/>
            {isUploader? <Button p={1} m={1} variant="solid" colorPalette={"red"} onClick={deleteMusic}><LuTrash/></Button>: null}
          </Text>
          {music?.id === currentMusic?.id? 
            <Box display={{base:"flex",md:"none"}} w={"100%"} alignItems="center" mx="5">
            <Text fontSize="xs" mr="3">{Math.floor(currentTime)} mp</Text>
              <Slider
                value={[currentTime]}
                onValueChange={(a) => handleSliderChange(a.value)}
                min={0}
                max={duration}
                step={1}
                width="50%"
              />
              <Text fontSize="xs" ml="3">{Math.floor(duration)} mp</Text>
            </Box>
        : ""}
        </VStack>
      ) : ""}
    </Box>
    </AbsoluteCenter>
    </>
  );
};

export default MusicPage;
