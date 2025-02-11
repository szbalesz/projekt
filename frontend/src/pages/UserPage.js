import { Box, Flex, Text, Heading } from '@chakra-ui/react';
import React from 'react';
import { Avatar } from "../components/ui/avatar";
import { Image } from "@chakra-ui/react"

export default function UserPage() {
  return (
    <Flex w={"100%"}>
      <Box
        w={"full"}
        alignItems={"left"}
        justifyContent={"center"}
        position={"relative"}
      >
        <Flex direction={"row"} p={"5"}>
          <Image
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTc3iw9U_DgP-f2ppJu0avXQ1P_9ARSEPdxYQ&s"
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
              TommY
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
      </Box>
    </Flex>
  );
}