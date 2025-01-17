import React from "react";
import { Box, Flex, Text, IconButton, Button } from "@chakra-ui/react";
import { Slider } from "../components/ui/slider"
import { useNavigate } from 'react-router-dom';
import { LuPlay, LuSkipBack, LuSkipForward, LuVolume } from "react-icons/lu";

export default function Player({ currentMusic }) {
  const navigate = useNavigate();

  const handleSongClick = () => {
    if (currentMusic) {
      navigate(`/music/${currentMusic.guid}`);
    }
  };
 
  return (
    <Box
      bg="Background"
      position="fixed"
      boxShadow="-5px 0px 50px -20px #5eead4"
      bottom={{ base: currentMusic?.cim != null ? "70px" : "-70px", md: currentMusic?.cim != null ? "0px" : "-70px" }}
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
        >
          <Box display="flex" alignItems="center" gap={3}>
            <Box
              backgroundSize="cover"
              backgroundImage={`url(${currentMusic?.kep})`}
              width="45px"
              height="45px"
              borderRadius="8px"
            />
            <Box textAlign="left" onClick={handleSongClick}>
              <Text fontSize="md" p="0" maxW={{ base: "125px", md: "275px" }} h="25px" overflow="hidden" fontWeight="bold">
                {currentMusic?.cim || ""}
              </Text>
              <Text fontSize="sm" p="0">{currentMusic?.eloado || ""}</Text>
            </Box>
          </Box>
        </Button>

        {/* Playback controls */}
        {currentMusic?.cim != null ? (
          <Flex align="center" gap={4}>
            <IconButton
              aria-label="Previous"
              variant="ghost"
              zIndex="101"
              size="sm"
              > <LuSkipBack /></IconButton>
            <IconButton
              aria-label="Play"
              variant="ghost"
              zIndex="101"
              size="sm"
              colorPalette="teal"
            > <LuPlay /> </IconButton>
            <IconButton
              aria-label="Next"
              variant="ghost"
              zIndex="101"
              size="sm"
            ><LuSkipForward /></IconButton>

            {/* Volume Slider */}
            <Box display={{base: "none", md:"flex"}} width="150px" mx="5">
            <LuVolume/>
              <Slider width="100px" size="sm" defaultValue={[50]} />
            </Box>
          </Flex>
        ) : ""}
      </Flex>
    </Box>
  );
}
