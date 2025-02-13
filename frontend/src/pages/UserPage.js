import { Box, Flex, Text, Heading, Button } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { Image } from "@chakra-ui/react"
import { useNavigate, useParams } from 'react-router-dom';
import api from '../Api';
import MusicCard from '../MusicCard';

export default function UserPage() {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [account, setAccount] = useState({});
  const [musics, setMusics] = useState([]);
  useEffect(() => {
    try {
      api.get("/user/GetProfile?Id="+id)
      .then(response=>{
        setAccount(response.data[0]);
      })
    } catch (error) {
      console.log("Hiba történt a profil lekérése közben:",error);
    }
    api.get("/music/GetMusicByUploader?id="+id)
      .then(response=>{
        setMusics(response.data);
        console.log(response.data)
      })
  }, [id])
  
  useEffect(() => {
    if(!account){
      navigate("/");
    }
  }, [account])
  

  return (
    <Flex w={"100%"}>
    {account?
      <Box
        w={"full"}
        alignItems={"left"}
        justifyContent={"center"}
        position={"relative"}
      >
        <Flex direction={"row"} p={"5"}>
          <Button
            backgroundImage={`url(${account?.profilePictureURL})`}
            boxSize={"150px"}
            variant={"outline"}
            colorPalette={"teal"}
            borderRadius={"full"}
            fit={"cover"}
          />
          <Box px={"5"} py={"5"}>
            <Text fontSize="sm">
              Profil
            </Text>
            <Text fontSize="4xl" fontWeight="bold">
              {account?.username}
            </Text>
            <Text fontSize="md">
            {musics.length} zene
            </Text>
          </Box>
        </Flex>
        <hr/>
        <Flex p={"5"} direction={"column"}>
          <Heading>Zenék</Heading>
          <Flex wrap="wrap" gap={4} width="100%">{musics.map((music, index) => <MusicCard key={index} music={music} />)}</Flex>
        </Flex>
      </Box>: 
      ""}
    </Flex>
  );
}