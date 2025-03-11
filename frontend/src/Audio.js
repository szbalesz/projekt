import React, { useEffect, useRef, useState } from 'react'
import Player from './menu/Player';
import { Route, Routes, useLocation } from 'react-router-dom';
import MusicPage from './pages/MusicPage';

export default function Audio({themecolor}) {
    const audioRef = useRef(null);
    const [currentMusic] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0); 
    const [volume, setVolume] = useState(50); 
    
    // Ha a currentMusic változik, automatikusan elindítja
    useEffect(() => {
      if (currentMusic && audioRef.current) {
        audioRef.current.play();
        setIsPlaying(true);
      }
    }, [currentMusic]);
    // Idősáv változásának vizsgálata
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
    // Zene elindítása
    useEffect(() => {
      if (audioRef.current && isPlaying) {
        audioRef.current.play();
      }
    }, [isPlaying, audioRef]);
    // Hangerő változtatása
    useEffect(() => {
      audioRef.current.volume = volume / 100;
    }, [volume]);
  return (
    <>
        <Player themecolor={themecolor} volume={volume} setVolume={setVolume} currentTime={currentTime} duration={duration} currentMusic={currentMusic} isPlaying={isPlaying}/>
        <audio ref={audioRef} src={currentMusic ? `https://localhost:5205/${currentMusic?.musicUrl}` : ""} />
    </>
  )
}

export const MusicPageRoute = () =>{
    return <Routes>
    <Route path="/music/:id" element={<MusicPage currentTime={currentTime} duration={duration} currentMusic={currentMusic} isPlaying={isPlaying}/>} />
</Routes>;
}