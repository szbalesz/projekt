import React, { useEffect, useRef, useState } from 'react'
import { Box, Grid, GridItem} from '@chakra-ui/react';

import Menu from './Menu';
import Home from "./pages/Home";
import Login from './pages/Login';
import Playlists from "./pages/Playlists";
import Settings from "./pages/Settings";
import Admin from "./pages/Admin";

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
import { togglePlayPause } from './services/PlayerService';
import { Toaster } from './components/ui/toaster';


export default function Main({ themecolor, setThemecolor }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const location = useLocation();
    
  // Bármikor oldal váltás történik felgörget a legtetejére
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
    
  return (
    <Box backgroundSize="cover" backgroundPosition="center" backgroundRepeat="no-repeat" bg={"Background"}>
          {/* Main Grid */}
          <Grid templateRows="50px 1fr" templateColumns="50px 1fr" minHeight="100vh">
                <Menu themecolor={themecolor}/>
              {/* Main Content */}
            <GridItem bg="Background" transition="all 1s ease-in-out" rowSpan={1}  colSpan="2">
              <Box bg="Background" minH="100vh" py="50px" pl={{base: "0", md: "50px"}}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={<Login/>}/>
                  <Route path="/register" element={<Register/>} />
                  <Route path="/playlists" element={<Playlists/>} />
                  <Route path="/settings" element={<Settings setThemecolor={setThemecolor}/>} />
                  <Route path="/settings/profile" element={<ProfileSettings />} />
                  {/* Ha ismeretlen az útvonal, irányítsd a kezdőlapra */}
                  <Route path="*" element={<Navigate to="/" />} />
                  <Route path="/music/:id" element={<MusicPage audioRef={audioRef} setIsPlaying={setIsPlaying} isPlaying={isPlaying}/>} />
                  <Route path="/playlist/:id" element={<PlaylistPage/>} />
                  <Route path="/upload" element={<UploadPage/>} />
                  <Route path="/about" element={<About />} />
                  <Route path="/admin" element={<Admin />} />
                  <Route path="/user/:id" element={<UserPage/>} />
                </Routes>
                </Box>
                <Footer/>
                <Toaster />
            </GridItem>
            <GridItem rowSpan={1} zIndex="4">
               <Player 
               audioRef={audioRef} 
               themecolor={themecolor} 
               setIsPlaying={setIsPlaying}
               isPlaying={isPlaying} 
               togglePlayPause={()=> togglePlayPause(audioRef,isPlaying,setIsPlaying)}/>
            </GridItem>
          </Grid>
          <Cookie/>
    </Box>
  )
}
