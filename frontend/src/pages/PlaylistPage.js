import React, { useEffect, useState } from "react";
import MusicCard from "../MusicCard";
import { AbsoluteCenter, Center, Flex, Heading, Spinner } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import api from "../Api";
import Cookies from "js-cookie";

export default function PlaylistPage() {
  const { id } = useParams();
  const [isPending, setPending] = useState(false);
  const [playlist, setPlaylist] = useState([]);
  const [kedvenc, setKedvenc] = useState({});
  const [playlistName, setPlaylistname] = useState("");

  const getPlaylist = async () => {
    setPending(true);
    const token = Cookies.get("token");
    const userid = Cookies.get("userid");

    if (token) {
      try {
        const response = await api.get("/UserPlaylist/GetPlaylistByUser?id="+userid);
        if(id !== "Kedvencek"){
          const plist = response.data.find(pl => pl.id === id);
          setPlaylistname(plist.playlistName)
        }
        else{
          setPlaylistname("Kedvencek")
        }
        const kedvencPlaylist = response.data.find(pl => pl.playlistName === "Kedvencek");
        if (kedvencPlaylist) {
          setKedvenc(kedvencPlaylist);
        }

        const playlistId = id === "Kedvencek" && kedvenc.id ? kedvenc.id : id;
        const musicResponse = await api.get(`/PlaylistMusic/GetMusicFromPlaylist?id=${playlistId}`);
        setPlaylist(musicResponse.data);
        
      } catch (e) {
        console.error("HIBA, Nem sikerült lekérni a lejátszási listát: ", e);
      } finally {
        setPending(false);
      }
    } else {
      setPending(false);
    }
  };

  useEffect(() => {
    getPlaylist();
  }, [id, kedvenc.id]);

  return (
    <div>
      <Flex display="block" justifyContent="center">
      <Heading textAlign={"center"} m={"3"} color={"colorPalette.300"}>{playlistName}</Heading>
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
            {playlist.length < 1? <Heading size={"sm"}>Ebben a lejátszási listában nincsenek zenék!</Heading> : ""}
          </Flex>
        </Center>
      </Flex>
    </div>
  );
}
