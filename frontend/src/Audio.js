import React, { useEffect, useRef, useState } from 'react'
import Player from './menu/Player';
import { Route, Routes, useLocation } from 'react-router-dom';
import MusicPage from './pages/MusicPage';

export default function Audio({themecolor}) {
    const audioRef = useRef(null);
    const location = useLocation();
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
    <>
        <Player themecolor={themecolor} volume={volume} setVolume={setVolume} currentTime={currentTime} duration={duration} handleSliderChange={handleSliderChange} currentMusic={currentMusic} isPlaying={isPlaying} togglePlayPause={togglePlayPause}/>
        <audio ref={audioRef} src={currentMusic ? `https://localhost:5205/${currentMusic?.musicUrl}` : ""} />
    </>
  )
}

export const MusicPageRoute = () =>{
    return <Routes>
    <Route path="/music/:id" element={<MusicPage currentTime={currentTime} duration={duration} handleSliderChange={handleSliderChange} currentMusic={currentMusic} handlePlay={handlePlay} isPlaying={isPlaying}/>} />
</Routes>;
}