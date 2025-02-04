import React from 'react'
import { Box, Button, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

export default function BigMusicCard({music}) {
  const navigate = useNavigate();
  return (
        <Button
        onClick={()=> navigate("/music/"+music.id)}
        borderRadius="lg"
        border="0px"
        overflow="hidden"
        _hover={{ transform: "scale(1.02)" }}
        transition={"all 0.2s ease-in-out"}
        variant="ghost"
        color="white"
        height="300px"
        width="300px"
        backgroundPosition="center"
        backgroundImage={"url("+music.imageUrl+")"}
        backgroundSize="cover"
        boxShadow="0 0 15px 0 #99f6e4"
        position="relative"
      
        >
            <Box w="100%" background="linear-gradient(to top, black, rgba(0, 0, 0, 0))" p={4} pt="75px" position="absolute" bottom="0">
                <Text fontSize="xl" fontWeight="bold" color="teal.300" mb={2}>
                {music.title}
                </Text>
                <Text fontSize="sm">Előadó: {music.artist}</Text>
            </Box>
        </Button>
  )
}
