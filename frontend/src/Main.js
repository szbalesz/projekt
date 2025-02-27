import React, { useEffect, useRef, useState } from 'react'
import { Box, Grid, GridItem} from '@chakra-ui/react';

import Menu from './Menu';
import Home from "./pages/Home";
import Login from './pages/Login';
import Playlists from "./pages/Playlists";
import Settings from "./pages/Settings";

import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Player from './menu/Player';
import MusicPage from './pages/MusicPage';
import PlaylistPage from './pages/PlaylistPage';
import Register from './pages/Register';
import About from './pages/About';
import Footer from './Footer';
import UploadPage from './pages/UploadPage';
import Cookie from './Cookie';
import UserPage from './pages/UserPage';
import ProfileSettings from './pages/ProfileSettings';
import Cookies from "js-cookie";

export default function Main({ themecolor, setThemecolor }) {
  const audioRef = useRef(null);
  // Bejelentkezés vizsgálata
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const savedToken = Cookies.get("token");
    if (savedToken) {
      setIsLoggedIn(true);
    }
  }, []);

  const [currentMusic, setCurrentMusic] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0); 
  const [volume, setVolume] = useState(50); 
  
  const togglePlayPause = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };
  
  const handlePlay = (music) => {
    if (currentMusic !== music) {
      setCurrentMusic(music); // Új zene beállítása
      setIsPlaying(true); // Automatikusan lejátszásra állítja
      setCurrentTime(0);
    } else {
      togglePlayPause(); // Ha ugyanaz a zene, akkor toggle
    }
  };
  
  // Ha a currentMusic változik, automatikusan elindítja
  useEffect(() => {
    if (currentMusic && audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  }, [currentMusic]);

  const location = useLocation();
    
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
    
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

  const handleSliderChange = (value) => {
    if (audioRef.current) {
      audioRef.current.currentTime = value;
    }
  };

  useEffect(() => {
    if (audioRef.current && isPlaying) {
      audioRef.current.play();
    }
  }, [isPlaying, audioRef]);

  useEffect(() => {
    audioRef.current.volume = volume / 100;
  }, [volume]);
  return (
    <Box backgroundSize="cover" backgroundPosition="center" backgroundRepeat="no-repeat" bg={"Background"}>
          {/* Main Grid */}
          <Grid templateRows="50px 1fr" templateColumns="50px 1fr" minHeight="100vh">
                <Menu themecolor={themecolor} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
              {/* Main Content */}
            <GridItem bg="Background" transition="all 1s ease-in-out" rowSpan={1}  colSpan="2">
              <Box bg="Background" minH="100vh" py="50px" pl={{base: "0", md: "50px"}}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} />}/>
                  <Route path="/register" element={<Register isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>} />
                  <Route path="/playlists" element={<Playlists/>} />
                  <Route path="/settings" element={<Settings setThemecolor={setThemecolor}/>} />
                  <Route path="/settings/profile" element={<ProfileSettings />} />
                  {/* Ha ismeretlen az útvonal, irányítsd a kezdőlapra */}
                  <Route path="*" element={<Navigate to="/" />} />
                  <Route path="/music/:id" element={<MusicPage currentTime={currentTime} duration={duration} handleSliderChange={handleSliderChange} currentMusic={currentMusic} handlePlay={handlePlay} isPlaying={isPlaying}/>} />
                  <Route path="/playlist/:id" element={<PlaylistPage/>} />
                  <Route path="/upload" element={<UploadPage/>} />
                  <Route path="/about" element={<About />} />
                  <Route path="/user/:id" element={<UserPage/>} />
                </Routes>
                </Box>
                <Footer/>
            </GridItem>
            <GridItem rowSpan={1} zIndex="4">
               <Player themecolor={themecolor} volume={volume} setVolume={setVolume} currentTime={currentTime} duration={duration} handleSliderChange={handleSliderChange} currentMusic={currentMusic} isPlaying={isPlaying} togglePlayPause={togglePlayPause}/>
               <audio ref={audioRef} src={currentMusic ? `https://localhost:5205/${currentMusic?.musicUrl}` : ""} />
            </GridItem>
          </Grid>
          <Cookie/>
    </Box>
  )
}
