import React, { useEffect, useState } from 'react'
import { Heading, Flex, Center, Spinner, AbsoluteCenter, Button } from "@chakra-ui/react";
import PlaylistCard from '../PlaylistCard';
import api from '../Api';
import Cookies from "js-cookie"
import PlaylistWindow from './PlaylistWindow';

export default function Playlists() {
  const themecolor = localStorage.getItem("themecolor");
  const [playlists, setPlaylists] = useState()
  const [isPending, setPending] = useState(false)
  const token = Cookies.get("token");
  const userid = Cookies.get("userid");

  const getPlaylists=()=>{
      setPending(true);
      if(token){
        api.get("/UserPlaylist/GetPlaylistByUser?id="+userid)
        .then(response => {
            setPlaylists(response.data);
        })
        .catch(e => {console.error("HIBA, Nem sikerült lekérni a lejátszási listák: ",e)})
        .finally(()=>{
          setPending(false);
        })
      }
      else{
        setPending(false);
      }
  }
  useEffect(() => {
    if(token !== ""){
      getPlaylists();
    }
  }, [])
  
  return (
    <>
      <Flex display="block" justifyContent="center">

        <Heading textAlign="center" m={"3"}> {token?  <PlaylistWindow themecolor={themecolor} userid={userid} getPlaylists={getPlaylists}/> : ""}  </Heading>
         <Center>
          {isPending? 
          <AbsoluteCenter>
            <Spinner/>
          </AbsoluteCenter>  
        : playlists? <Flex wrap="wrap" justify="center" gap={4} width="100%">
            {playlists.map((playlist, index) => (
              <PlaylistCard key={index} playlist={playlist} />
            ))}
          </Flex> : <AbsoluteCenter color="red">
            Nem sikerült betölteni a lejátszási listákat!
          </AbsoluteCenter>}
          
        </Center>
      </Flex>
    </>
  );
}
