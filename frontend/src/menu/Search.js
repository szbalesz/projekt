// Search.js

import React, { useState } from 'react';
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
  DialogTrigger,
} from "../components/ui/dialog";
import MusicCard from '../MusicCard';

export default function Search({handlePlay, handlePopupClose}) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);


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
                onKeyDown={()=> setResults([{
                          title: "XDDDDDD",
                          artist: "Azahriah",
                          listeners: "30",
                          image: "https://i.scdn.co/image/ab67616d0000b273b9f856c934243d5bb06f0deb",
                          }])}
              />
            </InputGroup>
          </DialogTitle>
        </DialogHeader>

        <DialogBody p={{ base: "1", md: "5" }} justifyContent="center" textAlign="center">
          {results.length > 0 ? (
            results.map((track,index) => (
              <MusicCard
                key={index}
                music={{
                  title: track.title,
                  artist: track.artist,
                  listeners: track.listeners,
                  image: track.image,
                }}
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
