import React, { useEffect, useState } from 'react';
import { LuSearch } from "react-icons/lu";
import { Input, Theme } from "@chakra-ui/react";
import { Button } from "../components/ui/button";
import { InputGroup } from "../components/ui/input-group";
import {
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
} from "../components/ui/dialog";
import MusicCard from '../cards/MusicCard';
import api from '../Api';
import { SegmentedControl } from "../components/ui/segmented-control"
import PlaylistCard from '../cards/PlaylistCard';

export default function Search( {handlePopupClose}) {
  const themecolor = localStorage.getItem("themecolor");
  const [searchType, setSearchType] = useState("Zenék")
  const [query, setQuery] = useState('');
  const [musics, setMusics] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  //ideiglenes keresés de ezt majd a backend fogja végezni
  const searchMusic=(q)=>{
    if(q.length > 0){
      api.get("/GetMusicByName?betu="+q)
      .then(response => {
        console.log(response.data)
        setMusics(response.data);
    
      })
      .catch(e => {console.error("HIBA, Nem sikerült lekérni a zenéket: ",e)}) 
    }
    else{
      api.get("/GetAllMusic")
      .then(response => {
        setMusics(response.data);
    
      })
      .catch(e => {console.error("HIBA, Nem sikerült lekérni a zenéket: ",e)}) 
    }
}

const searchPlaylist=(q)=>{
  if(q.length > 0){
    api.get("/GetPlaylistByName?betu="+q)
    .then(response => {
      setPlaylists(response.data);
  
    })
    .catch(e => {console.error("HIBA, Nem sikerült lekérni a zenéket: ",e)}) 
  }
  else{
    api.get("/GetAllPlaylist")
    .then(response => {
      setPlaylists(response.data);
  
    })
    .catch(e => {console.error("HIBA, Nem sikerült lekérni a zenéket: ",e)}) 
  }
}
  useEffect(() => {
    if(searchType === "Zenék"){
      searchMusic(query);
    }
    else{
      searchPlaylist(query);
    }
  }, [query,searchType])

  return (
    <DialogRoot defaultOpen onExitComplete={handlePopupClose} role="search" scrollBehavior="inside">
      <DialogContent bg="Background" width={{ base: "100%", md: "85%" }} height={{ base: "80%", md: "85%" }} maxW="1500px" maxH="750px">
      <Theme display={"flex"} flexDirection={"column"} colorPalette={themecolor} bg={"Background"} h={"100%"}>
        <DialogHeader>
          <DialogTitle display={"flex"} gap={"4"}>
            <InputGroup
              _hover={{ transform: "scale(1.01)" }}
              width="100%"
              flex="1"
              transition="all 0.3s ease-in-out"
              startElement={<LuSearch />}
            >
              <Input
                placeholder={searchType === "Zenék"? "Keresés a zenék között" : "Keresés a lejátszási listák között"}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </InputGroup>
            <SegmentedControl
               value={searchType}
               onValueChange={(e) => setSearchType(e.value)}
               items={["Zenék", "Listák"]}
            />
          </DialogTitle>
        </DialogHeader>

        <DialogBody p={{ base: "1", md: "5" }} justifyContent="center" textAlign="center">
        {searchType === "Zenék"? 
          musics.map((music,index)=>
            <MusicCard
            key={index}
            music={music}
            handlePopupClose={handlePopupClose}/>
            )
      : playlists.length > 0 ?
          playlists.map((playlist,index)=>
          <PlaylistCard key={index} playlist={playlist}/>
        ) : <p>Nincs találat.</p>
        }
        </DialogBody>

        <DialogFooter justifyContent="center">
          <Button variant="outline">
            Keresés
          </Button>
        </DialogFooter>
        </Theme>
      </DialogContent>
    </DialogRoot>
  );
}
