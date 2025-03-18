import React, { useState, useEffect } from "react";
import { Box, Flex, Text, IconButton, Button } from "@chakra-ui/react";
import { Slider } from "../components/ui/slider";
import { useNavigate } from 'react-router-dom';
import { LuPlay, LuSkipBack, LuSkipForward, LuVolume, LuPause, LuArrowDown, LuArrowUp } from "react-icons/lu";
import { getCurrentMusic, handlePlay, handleSliderChange, randomMusic, togglePlayPause} from "../services/PlayerService";
import { url } from "../services/Api"
export default function Player({audioRef,themecolor,setIsPlaying, isPlaying }) {
  const navigate = useNavigate();
  const [open, setopen] = useState(false);
  const [volume, setVolume] = useState(50); 
  const currentMusic = getCurrentMusic();
  const [currentTime,setCurrentTime] = useState(0);
  const [duration,setDuration] = useState(0);
  // Zenére kattintáskor az oldalára dob
  const handleSongClick = () => {
    if (currentMusic) {
      navigate(`/music/${currentMusic.id}`);
    }
  };
  // Ha a currentMusic változik, automatikusan elindítja
  useEffect(() => {
    if (currentMusic && audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  }, [currentMusic]);
 // Zene jelenlegi idő frissítése
  useEffect(() => {
    if (audioRef.current) {
      const updateTime = () => {
        setCurrentTime(audioRef.current.currentTime);
      };
      audioRef.current.addEventListener('timeupdate', updateTime);

      audioRef.current.addEventListener('loadedmetadata', () => {
        setDuration(audioRef.current.duration);
      });

      return () => {
        audioRef.current.removeEventListener('timeupdate', updateTime);
      };
    }
  }, [audioRef]);
// Ha elindít egy zenét a lejátszó autómatikusan kinyílik
useEffect(() => {
  if(isPlaying){
    setopen(true);
  }
}, [isPlaying])
// Zene hangerejének módosítása
useEffect(() => {
  audioRef.current.volume = volume / 100;
}, [volume]);
// Ha van kiválasztva zene elindítja
useEffect(() => {
  if (audioRef.current && isPlaying) {
    audioRef.current.play();
  }
}, [isPlaying, audioRef]);
  return (
    // Lejátszó
    <Box
      bg="Background"
      position="fixed"
      boxShadow={`-5px 0px 50px -20px ${themecolor}`}
      bottom={{  base: open !== false ? "65px" : "5px", md: open !== false ? "0px" : "-63px" }}
      transition="all 1s ease-in-out"
      marginLeft={{ base: "0px", md: "50px" }}
      width={{ base: "100%", md: "97%" }}
      borderTopWidth="1px"
      borderTop="solid rgba(255, 255, 255, 0.16)"
      height="65px"
      paddingRight={4}
      borderLeftWidth={{ base: "0px", md: "1px" }}
    >
      <Flex align="center" justify="space-between" py="2">
        <Button
          height="50px"
          marginLeft="0px"
          _hover={{ transform: "scale(1.02)" }}
          variant="ghost"
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
        {/*  Zene időcsúszka */}
        <Box display={{ base: "none", md: "flex" }} alignItems="center" minWidth={"250px"} width={"lg"} mx="5">
  <Text fontSize="sm" mr="2">
    {`${Math.floor(currentTime / 60)}:${Math.floor(currentTime % 60).toString().padStart(2, '0')}`}
  </Text>
  <Slider
    size = {"sm"}
    value={[currentTime]}
    onValueChange={(a) => handleSliderChange(audioRef,a.value)}
    min={0}
    max={duration}
    step={1}
    width="75%"
  />
  <Text fontSize="sm" ml="2">
    {`${Math.floor(duration / 60)}:${Math.floor(duration % 60).toString().padStart(2, '0')}`}
  </Text>
</Box>
{/* Lejátszó gombok */}
          <Flex align="center" gap={4}>
            <IconButton
              aria-label="Previous"
              variant="ghost"
              zIndex="101"
              size="sm"
              onClick={async ()=> {
                handlePlay(audioRef,await randomMusic(),setIsPlaying,isPlaying)
              }}
            > <LuSkipBack /></IconButton>
            <IconButton
              aria-label={isPlaying ? "Pause" : "Play"}
              variant="ghost"
              zIndex="101"
              size="sm"
              onClick={()=> togglePlayPause(audioRef,isPlaying,setIsPlaying)}
              disabled={!currentMusic}
            > {isPlaying ? <LuPause /> : <LuPlay />} </IconButton>
            <IconButton
              aria-label="Next"
              variant="ghost"
              zIndex="101"
              size="sm"
              onClick={async ()=> {
                handlePlay(audioRef,await randomMusic(),setIsPlaying,isPlaying)
              }}
            ><LuSkipForward /></IconButton>

            <Box display={{ base: 'none', md: 'flex' }} width="150px">
              <LuVolume />
              <Slider
                width="100px"
                size="sm"
                value={[volume]}
                onValueChange={(a) => setVolume(a.value)}
                min={0}
                max={100}
                step={1}
              />
            </Box>
          </Flex>
      </Flex>
      {/* Lejátszó összecsukása */}
      <Flex position={"absolute"} bottom={"60px"} right={"0"}>
        {open ?
        <Button rounded={"xl"} onClick={() => (setopen(false))} bg={"Background"} variant={"outline"} borderBottomWidth={"0px"}>
        <LuArrowDown  />
        </Button> : 
        <Button rounded={"xl"} onClick={() => (setopen(true))} bg={"Background"} variant={"outline"} borderBottomWidth={"0px"}>
        <LuArrowUp  />
    </Button>}
    </Flex>
    <audio ref={audioRef} src={currentMusic ? `https://${url}/${currentMusic?.musicUrl}` : ""} />
    </Box>
  );
}
