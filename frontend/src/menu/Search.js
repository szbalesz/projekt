import React, { useEffect, useState } from 'react';
import { LuSearch } from "react-icons/lu";
import { Input } from "@chakra-ui/react";
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
import MusicCard from '../MusicCard';

export default function Search({handlePlay, handlePopupClose}) {
  const [query, setQuery] = useState('');
  const [results] = useState([]);
  //ideiglenes keresés de ezt majd a backend fogja végezni
  const searchMusic=(q)=>{
    results.length = 0; //lista kiürítése
    fetch("http://localhost:5202/api/Lejatszasilista")
    .then(response => {
      return response.json();
    })
    .then(data => {
        for (let i = 0; i < data.length; i++) {
          for (let f = 0; f < data[i].zenes.length; f++) {
            results.push(data[i].zenes[f]);
          }
        }
  
    })
    .catch(e => {console.error("HIBA, Nem sikerült lekérni a zenéket: ",e)}) 
}

  useEffect(() => {
    searchMusic(query);
  }, [query])

  return (
    <DialogRoot defaultOpen onExitComplete={handlePopupClose} role="search" scrollBehavior="inside">
      <DialogContent bg="Background" width={{ base: "100%", md: "85%" }} height={{ base: "80%", md: "85%" }} maxW="1500px" maxH="750px">
        <DialogHeader>
          <DialogTitle>
            <InputGroup
              _hover={{ transform: "scale(1.01)" }}
              width="100%"
              flex="1"
              colorPalette="teal"
              transition="all 0.3s ease-in-out"
              startElement={<LuSearch />}
            >
              <Input
                placeholder="Keresés a zenék között"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </InputGroup>
          </DialogTitle>
        </DialogHeader>

        <DialogBody p={{ base: "1", md: "5" }} justifyContent="center" textAlign="center">
          {results.length > 0 ? (
            results.map((track,index) => (
              <MusicCard
                key={index}
                music={track}
                track={track}
                handlePlay={handlePlay}
                handlePopupClose={handlePopupClose}
              />
            ))
          ) : (
            <p>Nincs találat.</p>
          )}
        </DialogBody>

        <DialogFooter justifyContent="center">
          <Button colorPalette="teal" variant="outline">
            Keresés
          </Button>
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  );
}
