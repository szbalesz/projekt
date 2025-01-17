import React, { useState } from 'react'
import { Box, Grid, GridItem} from '@chakra-ui/react';

import Menu from './Menu';
import Home from "./pages/Home";
import Login from './pages/Login';
import Favorites from "./pages/Favorites";
import Playlists from "./pages/Playlists";
import Settings from "./pages/Settings";

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Player from './menu/Player';
import MusicPage from './pages/MusicPage';
import PlaylistPage from './pages/PlaylistPage';
import Register from './pages/Register';


export default function Main({account, isLoggedIn, onLogin}) {
    const [currentMusic, setcurrentMusic] = useState(null);

    const handlePlay = (music) => {
        setcurrentMusic(music); // Beállítja a lejátszandó zenét
    };
  return (
    <Box backgroundSize="cover" backgroundPosition="center" backgroundRepeat="no-repeat">
        <Router>
          {/* Main Grid */}
          <Grid templateRows="50px 1fr" templateColumns="50px 1fr" height="100vh">
                <Menu account={account} handlePlay={handlePlay} isLoggedIn={isLoggedIn}/>
              {/* Main Content */}
            <GridItem bg="Background" transition="all 1s ease-in-out" rowSpan={1} paddingTop={{ base: "35px", md: "0" }}  colSpan={{ base: "2", md: "1" }} paddingRight={{ base: "0px", md: "50px" }}>
              <Box py={5}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={<Login onLogin={onLogin}/>} />
                  <Route path="/register" element={<Register/>} />
                  <Route path="/favorites" element={<Favorites />} />
                  <Route path="/playlists" element={<Playlists />} />
                  <Route path="/settings" element={<Settings />} />
                  {/* Ha ismeretlen az útvonal, irányítsd a kezdőlapra */}
                  <Route path="*" element={<Navigate to="/" />} />
                  <Route path="/music/:guid" element={<MusicPage music={currentMusic} />} />
                  <Route path="/playlist/:name" element={<PlaylistPage handlePlay={handlePlay}/>} />
                </Routes>
              </Box>
            </GridItem>
            <GridItem rowSpan={1} zIndex="4">
               <Player currentMusic={currentMusic}/>
            </GridItem>
          </Grid>
        </Router>
    </Box>
  )
}
