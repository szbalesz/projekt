import React from 'react'
import { Box, Button, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

export default function BigMusicCard({music}) {
  const themecolor = localStorage.getItem("themecolor");
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
        boxShadow={`0 0 15px 0 ${themecolor}`}
        position="relative"
      
        >
            <Box w="100%" bgGradient="to-t" gradientFrom="black" gradientTo="transparent" p={4} pt="75px" position="absolute" bottom="0">
                <Text fontSize="xl" fontWeight="bold" color="colorPalette.300" mb={2}>
                {music.title}
                </Text>
                <Text fontSize="sm">{music.artist}</Text>
            </Box>
        </Button>
  )
}
