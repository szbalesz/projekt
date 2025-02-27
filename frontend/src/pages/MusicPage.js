import React, { useEffect, useState } from 'react';
import { Box, Text, Image, VStack, AbsoluteCenter, Button, Spinner } from '@chakra-ui/react';
import { LuPause, LuPlay, LuStar } from 'react-icons/lu';
import { useNavigate, useParams } from 'react-router-dom';
import { Slider } from '../components/ui/slider';
import { toaster } from '../components/ui/toaster';
import { Avatar } from '../components/ui/avatar';
import MusicMenu from '../menu/MusicMenu';
import { getUserProfile } from '../services/UserService';
import {
  getMusic,
  deleteMusic, 
  addToFavorite, 
  removeFromFavorite
} from '../services/MusicService';
import { getFavoritePlaylist } from "../services/PlaylistService";
import Cookies from "js-cookie";
const MusicPage = ({ currentTime, handleSliderChange, duration, currentMusic, handlePlay, isPlaying }) => {
  const themecolor = localStorage.getItem("themecolor");
  const { id } = useParams();
  const navigate = useNavigate();

  const [music, setMusic] = useState({});
  const [uploader, setUploader] = useState({});
  const [isPending, setPending] = useState(false);
  const [isFavorite, setFavorite] = useState(false);
  const [favoritePlaylistId, setFavoritePlaylistId] = useState("");
  const [isUploader, setIsUploader] = useState(false);
  const [Uploaderid, setUploaderid] = useState("");

  const getData = async () => {
    setPending(true);
    
    const musicData = await getMusic(id);
    if (musicData) {
      setMusic(musicData);
      setIsUploader(musicData.uploaderId === Cookies.get("userid"));
      const uploaderData = await getUserProfile(musicData.uploaderId);
      if (uploaderData) {
        setUploader(uploaderData);
        setUploaderid(musicData.uploaderId);
      }
    } else {
      navigate(-1);
    }

    const { favoritePlaylistId, isFavorite } = await getFavoritePlaylist();
    setFavoritePlaylistId(favoritePlaylistId);
    setFavorite(isFavorite);
    setPending(false);
  };

  useEffect(() => {
    getData();
  }, [id, navigate]);

  return (
    // Zene oldal
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
          <Box borderRadius="10px"  width={"250px"} height={"250px"} backgroundImage={"url("+ music.imageUrl+")"} backgroundPosition={"center"} backgroundSize={"cover"}/>
          <Text fontSize="2xl" fontWeight="bold">
            {music.title}
          </Text>
          <Text fontSize="lg">
            {music.artist}
          </Text>
          <Button onClick={()=> {
                navigate("/user/"+Uploaderid)
              }} mr={"1"} p={"0"} size={"xs"} variant={"ghost"}>
              <Avatar width="25px" height="25px" src={uploader.profilePictureURL}/>
              {uploader.username}
              </Button>
          <Text fontSize="md">
          </Text>
          <Text fontSize="md">
          {isFavorite? 
          <Button p={1} m={1} variant="solid" onClick={()=> removeFromFavorite(favoritePlaylistId, music.id, toaster, setFavorite)}><LuStar fill={"colorPalette.solid"} stroke="0"/> </Button> :
          <Button p={1} m={1} variant="solid" onClick={()=> addToFavorite(favoritePlaylistId, music.id, toaster, setFavorite)}><LuStar/></Button>}
            <Button p={1} m={1} variant={isPlaying && music?.title === currentMusic?.title ? "outline" : "subtle"} onClick={()=> handlePlay(music)}>{isPlaying && music?.title === currentMusic?.title ? <LuPause /> : <LuPlay />} </Button>
            <MusicMenu getData={getData} isUploader={isUploader} music={music} deleteMusic={()=> deleteMusic(id, music.title, navigate, toaster)} setFavorite={setFavorite} isFavorite={isFavorite} musicId={id}/>
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
      ) : null}
    </Box>
    </AbsoluteCenter>
    </>
  );
};

export default MusicPage;
