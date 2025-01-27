import React, { useEffect, useState } from 'react'
import { Box, Grid, GridItem} from '@chakra-ui/react';

import Menu from './Menu';
import Home from "./pages/Home";
import Login from './pages/Login';
import Playlists from "./pages/Playlists";
import Settings from "./pages/Settings";

import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Player from './menu/Player';
import MusicPage from './pages/MusicPage';
import PlaylistPage from './pages/PlaylistPage';
import Register from './pages/Register';
import About from './pages/About';
import Footer from './Footer';


export default function Main({account, isLoggedIn, onLogin}) {
    const [currentMusic, setcurrentMusic] = useState(null);

    const handlePlay = (music) => {
        setcurrentMusic(music); // Beállítja a lejátszandó zenét
    };
    
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
        <Router>
          {/* Main Grid */}
          <Grid templateRows="50px 1fr" templateColumns="50px 1fr" minHeight="100vh">
              <ScrollToTop/> {/* Az oldal tetejére görget minden oldal váltáskor */}
                <Menu account={account} handlePlay={handlePlay} isLoggedIn={isLoggedIn}/>
              {/* Main Content */}
            <GridItem bg="Background" transition="all 1s ease-in-out" rowSpan={1} paddingTop={"15px"}  colSpan="2">
              <Box bg="Background" minH="100vh" padding={{base: "0", md: "50px"}}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={<Login onLogin={onLogin}/>} />
                  <Route path="/register" element={<Register/>} />
                  <Route path="/playlists" element={<Playlists />} />
                  <Route path="/settings" element={<Settings />} />
                  {/* Ha ismeretlen az útvonal, irányítsd a kezdőlapra */}
                  <Route path="*" element={<Navigate to="/" />} />
                  <Route path="/music/:guid" element={<MusicPage music={currentMusic} />} />
                  <Route path="/playlist/:name" element={<PlaylistPage handlePlay={handlePlay}/>} />
                  <Route path="/about" element={<About />} />
                </Routes>
                </Box>
                <Footer currentMusic={currentMusic}/>
            </GridItem>
            <GridItem rowSpan={1} zIndex="4">
               <Player currentMusic={currentMusic}/>
            </GridItem>
          </Grid>
        </Router>
    </Box>
  )
}
