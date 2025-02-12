import { Box, Flex, Text, Heading } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { Image } from "@chakra-ui/react"
import { useNavigate, useParams } from 'react-router-dom';
import api from '../Api';

export default function UserPage() {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [account, setAccount] = useState({});
  useEffect(() => {
    try {
      api.get("/user/GetProfile?Id="+id)
      .then(response=>{
        setAccount(response.data[0]);
      })
    } catch (error) {
      console.log("Hiba történt a profil lekérése közben:",error);
    }
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
          <Image
            src={account?.profilePictureURL}
            boxSize={"150px"}
            borderRadius={"full"}
            fit={"cover"}
            alt="Profilkép"
          />
          <Box px={"5"} py={"5"}>
            <Text fontSize="sm">
              Profil
            </Text>
            <Text fontSize="4xl" fontWeight="bold">
              {account?.username}
            </Text>
            <Text fontSize="md">
              2 zene
            </Text>
          </Box>
        </Flex>
        <hr/>
        <Flex p={"5"} direction={"column"}>
          <Heading>Zenék</Heading>
        </Flex>
      </Box>: 
      ""}
    </Flex>
  );
}