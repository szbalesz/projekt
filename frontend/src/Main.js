import React, { useState } from 'react'
import { Box, Grid, GridItem} from '@chakra-ui/react';

import Menu from './Menu';
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import Playlists from "./pages/Playlists";
import Settings from "./pages/Settings";

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Player from './menu/Player';
import CurrentSongPage from './pages/CurrentSongPage';


export default function Main({account}) {
    const [currentSong, setCurrentSong] = useState(null);

    const handlePlay = (song) => {
        setCurrentSong(song); // Beállítja a lejátszandó zenét
        console.log("Lejátszás: ", song);
    };
  return (
    <Box backgroundSize="cover" backgroundPosition="center" backgroundRepeat="no-repeat">
        <Router>
          {/* Main Grid */}
          <Grid templateRows="50px 1fr" templateColumns="50px 1fr" height="100vh">
                <Menu account={account} handlePlay={handlePlay}/>
              {/* Main Content */}
            <GridItem bg="Background" transition="all 1s ease-in-out" rowSpan={1} paddingTop={{ base: "35px", md: "0" }}  colSpan={{ base: "2", md: "1" }} paddingRight={{ base: "0px", md: "50px" }}>
              <Box py={5}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/favorites" element={<Favorites />} />
                  <Route path="/playlists" element={<Playlists />} />
                  <Route path="/settings" element={<Settings />} />
                  {/* Ha ismeretlen az útvonal, irányítsd a kezdőlapra */}
                  <Route path="*" element={<Navigate to="/" />} />
                  <Route path="/current-song" element={<CurrentSongPage currentSong={currentSong} />} />
                </Routes>
              </Box>
            </GridItem>
            <GridItem rowSpan={1} zIndex="4">
               <Player currentSong={currentSong}/>
            </GridItem>
          </Grid>
        </Router>
    </Box>
  )
}
