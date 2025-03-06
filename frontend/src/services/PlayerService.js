import { getAllMusic } from "./MusicService";

let currentMusic = null;
// Jelenlegi zene lekérése
export const getCurrentMusic = () =>{
    return currentMusic;
}
// Jelenlegi zene beállítása
export const setCurrentMusic = (music) => {
    currentMusic = music;
}
// Véletlenszerű zene lejátszása
export const randomMusic = async () => {
  const allMusic = await getAllMusic();
  return allMusic[Math.floor(Math.random()*allMusic.length)];
}
// Zene indítása/megállítása
export const togglePlayPause = (audioRef,isPlaying,setIsPlaying) => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };
// Zene idősáv mozgatása
export const handleSliderChange = (audioRef,value) => {
    if (audioRef.current) {
      audioRef.current.currentTime = value;
    }
  };
// Kiválasztott zene elindítása
export const handlePlay = (audioRef,music,setIsPlaying,isPlaying) => {
if (currentMusic !== music) {
    setCurrentMusic(music); // Új zene beállítása
    setIsPlaying(true); // Automatikusan lejátszásra állítja
} else {
    togglePlayPause(audioRef,isPlaying,setIsPlaying); // Ha ugyanaz a zene, akkor toggle
}
};