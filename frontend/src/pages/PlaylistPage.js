import React, { useEffect, useState } from "react";
import MusicCard from "../MusicCard";
import { AbsoluteCenter, Center, Flex, Heading, Spinner } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import api from "../Api";
import Cookies from "js-cookie";

export default function PlaylistPage() {
  const { id } = useParams();
  const [isPending, setPending] = useState(false);
  const [playlist, setPlaylist] = useState();

  const getPlaylist = () => {
    setPending(true);
    const token = Cookies.get("token");

   if(token){
    api.get("/PlaylistMusic/GetMusicFromPlaylist?id="+id)
      .then((response) => {
        let data = response.data;
        setPlaylist(data);
      })
      .catch((e) => {
        console.error("HIBA, Nem sikerült lekérni a lejátszási listát: ", e);
      })
      .finally(() => {
        setPending(false);
      });
   }
   else{
    setPending(false);
   }
  };

  useEffect(() => {
    getPlaylist();
  }, []);

  return (
    <div>
      <Flex display="block" justifyContent="center">
        <Heading textAlign="center"> {playlist?.playlistName} </Heading>
        <Center>
          <Flex wrap="wrap" justify="center" gap={4} width="100%">
            {isPending ? (
              <AbsoluteCenter>
                <Spinner />
              </AbsoluteCenter>
            ) : playlist ? (
              playlist.map((music, index) => <MusicCard key={index} music={music} />)
            ) : (
              <AbsoluteCenter color="red">Nem sikerült betölteni a zenéket!</AbsoluteCenter>
            )}
          </Flex>
        </Center>
      </Flex>
    </div>
  );
}
