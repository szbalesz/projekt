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


export default function Main({ isLoggedIn, onRegister, onLogin, onLogout}) {
  const audioRef = useRef(null);
  const [currentMusic, setCurrentMusic] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  
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

    // Az oldal tetejére ugrik
    const ScrollToTop = () => {
      const location = useLocation();
    
      useEffect(() => {
        window.scrollTo(0, 0);
      }, [location]);
    
      return null;
    };
  return (
    <Box backgroundSize="cover" backgroundPosition="center" backgroundRepeat="no-repeat" bg={"Background"}>
          {/* Main Grid */}
          <Grid templateRows="50px 1fr" templateColumns="50px 1fr" minHeight="100vh">
              <ScrollToTop/> {/* Az oldal tetejére görget minden oldal váltáskor */}
                <Menu handlePlay={handlePlay} isLoggedIn={isLoggedIn} onLogout={onLogout}/>
              {/* Main Content */}
            <GridItem bg="Background" transition="all 1s ease-in-out" rowSpan={1}  colSpan="2">
              <Box bg="Background" minH="100vh" py="65px" px={{base: "0", md: "50px"}}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={<Login isLoggedIn={isLoggedIn} onLogin={onLogin}/>} />
                  <Route path="/register" element={<Register isLoggedIn={isLoggedIn} onRegister={onRegister}/>} />
                  <Route path="/playlists" element={<Playlists/>} />
                  <Route path="/settings" element={<Settings />} />
                  {/* Ha ismeretlen az útvonal, irányítsd a kezdőlapra */}
                  <Route path="*" element={<Navigate to="/" />} />
                  <Route path="/music/:id" element={<MusicPage currentMusic={currentMusic} handlePlay={handlePlay} isPlaying={isPlaying}/>} />
                  <Route path="/playlist/:id" element={<PlaylistPage handlePlay={handlePlay}/>} />
                  <Route path="/upload" element={<UploadPage/>} />
                  <Route path="/about" element={<About />} />
                </Routes>
                </Box>
                <Footer currentMusic={currentMusic}/>
            </GridItem>
            <GridItem rowSpan={1} zIndex="4">
               <Player currentMusic={currentMusic} isPlaying={isPlaying} togglePlayPause={togglePlayPause} audioRef={audioRef}/>
            </GridItem>
          </Grid>
    </Box>
  )
}
