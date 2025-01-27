import React from 'react'
import { Box, Text } from '@chakra-ui/react';

export default function BigMusicCard({music}) {
  return (
        <Box
        borderRadius="md"
        overflow="hidden"
        _hover={{ transform: "scale(1.02)" }}
        transition={"all 0.2s ease-in-out"}
        variant="ghost"
        color="white"
        height="300px"
        w="300px"
        backgroundPosition="center"
        backgroundImage={"url("+music.kep+")"}
        backgroundSize="cover"
        boxShadow="0 0 15px 0 #99f6e4"
        >
            <Box p={4}>
                <Text fontSize="xl" fontWeight="bold" color="teal.300" mb={2}>
                {music.cim}
                </Text>
                <Text fontSize="sm">Előadó: {music.eloado}</Text>
            </Box>
        </Box>
  )
}
