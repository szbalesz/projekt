import { Box, Flex, Text, Heading, Button } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../services/Api';
import MusicCard from '../cards/MusicCard';
import PlaylistCard from '../cards/PlaylistCard';
import EditPicture from '../menu/EditPicture';
import Cookies from "js-cookie";

export default function UserPage() {
  const { id } = useParams(); 
  const userid = Cookies.get("userid");
  const navigate = useNavigate();
  const [account, setAccount] = useState({});
  const [musics, setMusics] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  useEffect(() => {
    try {
      api.get("/user/"+id)
      .then(response=>{
        setAccount(response.data[0]);
      })
    } catch (error) {
      console.log("Hiba történt a profil lekérése közben:",error);
    }
    api.get("/music/uploader/"+id)
      .then(response=>{
        setMusics(response.data);
      })
      getPlaylists();
  }, [id])
   const getPlaylists=()=>{
        api.get("/GetPlaylistByUser?id="+id)
        .then(response => {
            setPlaylists(response.data);
        })
        .catch(e => {console.error("HIBA, Nem sikerült lekérni a lejátszási listák: ",e)})
  }
  useEffect(() => {
    if(!account){
      navigate("/");
    }
  }, [account])
  

  return (
    // Profil oldal
    <Flex w={"100%"}>
    {account?
      <Box
        w={"full"}
        alignItems={"left"}
        justifyContent={"center"}
        position={"relative"}
      >
        <Flex zIndex={"1"} bgGradient="to-tr" gradientFrom="colorPalette.solid/65" gradientTo="transparent" position={"absolute"} w={"full"} h={"190px"}></Flex>
        <Flex overflowX={"clip"} backgroundImage={`url(${account?.profilePictureURL})`} backgroundPosition={"center"} backgroundSize={"cover"} direction={"row"} p={"5"}>
          {id === userid? <EditPicture account={account}/> :
          <Button
            zIndex={"2"}
            boxShadowColor={"colorPalette"}
            boxShadow={"0 0 25px 0"}
            backgroundImage={`url(${account?.profilePictureURL})`}
            boxSize={"150px"}
            variant={"outline"}
            borderRadius={"full"}
            backgroundSize={"cover"}
            backgroundPosition={"center"}
            fit={"cover"}
            />}
          <Box zIndex={"2"} px={"5"} py={"5"}>
            <Text fontSize="sm">
              Profil
            </Text>
            <Text fontSize="4xl" fontWeight="bold">
              {account?.username}
            </Text>
            <Text fontSize="md">
            {musics?.length} zene
            </Text>
          </Box>
        </Flex>
        <hr/>
        <Flex px={"5"} pt={"3"} direction={"column"}>
          <Heading>Zenék</Heading>
          <Flex my={"3"} overflowX={"auto"} gap={4} width="100%">
            {musics.map((music, index) => <MusicCard key={index} music={music} />)}
          </Flex>
          <hr />
          <Heading>Lejátszási listák</Heading>
          <Flex my={"3"} overflowX={"auto"} gap={4} width="100%">
            {playlists.map((playlist, index) => <PlaylistCard key={index} playlist={playlist} />)}
          </Flex>
        </Flex>
      </Box>: 
      ""}
    </Flex>
  );
}