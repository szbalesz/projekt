import React, { useEffect, useState } from 'react';
import { Box, Text, VStack, AbsoluteCenter, Button, Spinner } from '@chakra-ui/react';
import { LuList, LuPause, LuPlay, LuStar } from 'react-icons/lu';
import { useNavigate, useParams } from 'react-router-dom';
import { toaster } from '../components/ui/toaster';
import { Avatar } from '../components/ui/avatar';
import MusicMenu from '../menu/MusicMenu';
import { getUserId, getUserProfile } from '../services/UserService';
import {
  getMusic,
  deleteMusic, 
  addToFavorite, 
  removeFromFavorite
} from '../services/MusicService';
import { getFavoritePlaylist } from "../services/PlaylistService";
import { getCurrentMusic, handlePlay, } from '../services/PlayerService';
import { getToken } from '../services/AuthService';
const MusicPage = ({ audioRef,setIsPlaying, isPlaying }) => {
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
  const [currentMusic,setCurrentMusic] = useState(getCurrentMusic());
  // Jelenlegi zene lekérése
  const getCMusic = async () => {
    await setCurrentMusic(getCurrentMusic());
  }
  useEffect(() => {
    getCMusic();
  }, [isPlaying])

  // Kiválasztott zene adatainak lekérése
  const getData = async () => {
    setPending(true);
    // Zene lekérése
    const musicData = await getMusic(id);
    if (musicData) {
      setMusic(musicData);
      setIsUploader(musicData.uploaderId === getUserId());
      const uploaderData = await getUserProfile(musicData.uploaderId);
      if (uploaderData) {
        setUploader(uploaderData);
        setUploaderid(musicData.uploaderId);
      }
    } else {
      navigate(-1);
    }
    // Zene benne van e a kedvencek lejátszási listában, vizsgálata
    const { favoritePlaylistId, isFavorite } = await getFavoritePlaylist(id);
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
      w={{base: "85%", md:"450px"}} 
      maxW="100%" 
      textAlign="center">
        <Box 
        p="25px" 
        bg="Background"
        transition="all 1s ease-in-out"
        boxShadow={`0 0 25px 0 ${themecolor}`}
        borderRadius="25px"
        _hover={{transition:"all 1s ease-in-out", transform: "scale(1.05)" ,padding: "35px",borderRadius: `50px 15px`}}>
      {isPending ?
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
          <Button p={1} m={1} variant="solid" onClick={async ()=> setFavorite(await removeFromFavorite(favoritePlaylistId, music.id, toaster))}><LuStar fill={"colorPalette.solid"} stroke="0"/> </Button> :
          <Button p={1} m={1} variant="solid" onClick={async ()=> setFavorite(await addToFavorite(favoritePlaylistId, music.id, toaster))}><LuStar/></Button>}
            <Button p={1} m={1} variant={isPlaying && music?.title === currentMusic?.title ? "outline" : "subtle"} onClick={async ()=> {
              await handlePlay(audioRef,music,setIsPlaying,isPlaying);
              await getCMusic();
              }}>{isPlaying && music?.title === currentMusic?.title ? <LuPause /> : <LuPlay />} </Button>
            {getToken()?
              <MusicMenu getData={getData} isUploader={isUploader} music={music} deleteMusic={()=> deleteMusic(id, music.title, navigate, toaster)} setFavorite={setFavorite} isFavorite={isFavorite} musicId={id}/> :
              <Button p={1} m={1} variant="solid" onClick={()=> {
                toaster.create({ title: `Jelentkezz be a funkció használatához!`, type: "info" });
              }}><LuList/></Button>  }
          </Text>
        </VStack>
      ) : null}
    </Box>
    </AbsoluteCenter>
    </>
  );
};

export default MusicPage;
