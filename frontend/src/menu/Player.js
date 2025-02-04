import React, { useState, useEffect } from "react";
import { Box, Flex, Text, IconButton, Button } from "@chakra-ui/react";
import { Slider } from "../components/ui/slider";
import { useNavigate } from 'react-router-dom';
import { LuPlay, LuSkipBack, LuSkipForward, LuVolume, LuPause } from "react-icons/lu";

import musicFile from "../music/deshwalkinastreet.mp3" //teszt zene

export default function Player({ currentMusic,togglePlayPause, isPlaying, audioRef}) {
  const navigate = useNavigate();
  const [volume, setVolume] = useState(50);

  const handleSongClick = () => {
    if (currentMusic) {
      navigate(`/music/${currentMusic.id}`);
    }
  };

  useEffect(() => {
    audioRef.current.volume = volume/100;
  }, [volume])
  

  return (
    <Box
      bg="Background"
      position="fixed"
      boxShadow="-5px 0px 50px -20px #5eead4"
      bottom={{ base: currentMusic?.title != null ? "65px" : "-70px", md: currentMusic?.title != null ? "0px" : "-70px" }}
      transition="all 1s ease-in-out"
      marginLeft={{ base: "0px", md: "50px" }}
      width={{ base: "100%", md: "100%" }}
      borderTopWidth="1px"
      borderTop="solid rgba(255, 255, 255, 0.16)"
      height="65px"
      paddingRight={4}
      zIndex="10"
      borderLeftWidth={{ base: "0px", md: "1px" }}
    >
      <Flex align="center" justify="space-between" py="2" marginRight={{ base: "0px", md: "75px" }}>
        {/* Current song info */}
        <Button
          height="50px"
          marginLeft="0px"
          _hover={{ transform: "scale(1.02)" }}
          variant="ghost"
          colorPalette="gray"
          onClick={handleSongClick}
        >
          <Box display="flex" alignItems="center" gap={3}>
            <Box
              backgroundSize="cover"
              backgroundImage={`url(${currentMusic?.imageUrl})`}
              width="45px"
              height="45px"
              borderRadius="8px"
            />
            <Box textAlign="left">
              <Text fontSize="md" p="0" maxW={{ base: "125px", md: "275px" }} h="25px" overflow="hidden" fontWeight="bold">
                {currentMusic?.title || ""}
              </Text>
              <Text fontSize="sm" p="0">{currentMusic?.artist || ""}</Text>
            </Box>
          </Box>
        </Button>

        {/* Playback controls */}
        {currentMusic?.title != null ? (
          <Flex align="center" gap={4}>
            <IconButton
              aria-label="Previous"
              variant="ghost"
              zIndex="101"
              size="sm"
            > <LuSkipBack /></IconButton>
            <IconButton
              aria-label={isPlaying ? "Pause" : "Play"}
              variant="ghost"
              zIndex="101"
              size="sm"
              colorPalette="teal"
              onClick={togglePlayPause}
            > {isPlaying ? <LuPause /> : <LuPlay />} </IconButton>
            <IconButton
              aria-label="Next"
              variant="ghost"
              zIndex="101"
              size="sm"
            ><LuSkipForward /></IconButton>

            {/* Volume Slider */}
            <Box display={{ base: 'none', md: 'flex' }} width="150px" mx="5">
              <LuVolume />
              <Slider
                width="100px"
                size="sm"
                value={[volume]}
                onValueChange={(a)=> setVolume(a.value)}
                min={0}
                max={100}
                step={1}
              />
            </Box>

          </Flex>
        ) : ""}
      </Flex>
]
      {/* Audio element */}
      {/* Majd a rendes elérési útja lesz currentmusic?.Path eddig csak ideiglenes*/}
      <audio ref={audioRef} src={musicFile} />
    </Box>
  );
}
