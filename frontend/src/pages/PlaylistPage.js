import React, { useEffect, useState } from "react";
import MusicCard from "../MusicCard";
import { AbsoluteCenter, Box, Button, Flex, Heading, Spinner, Text } from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../Api";
import Cookies from "js-cookie";
import PlaylistEditMenu from "../menu/PlaylistEditMenu";

export default function PlaylistPage() {
  const navigate = useNavigate();
  let userid = Cookies.get("userid");
  const { id } = useParams();
  const [isPending, setPending] = useState(false);
  const [playlist, setPlaylist] = useState([]);
  const [kedvenc, setKedvenc] = useState({});
  const [playlistName, setPlaylistname] = useState("");

  const getPlaylist = async () => {
    setPending(true);
    const token = Cookies.get("token");
    userid = Cookies.get("userid");

    if (token) {
      try {
        const response = await api.get("/GetAllPlaylist");
        if(id !== "Kedvencek"){
          const plist = response.data.find(pl => pl.id === id);
          if(plist !== undefined){
            setPlaylistname(plist?.playlistName)
          }
          else{
            navigate("/playlists")
          }
        }
        else{
          setPlaylistname("Kedvencek")
        }
        const kedvencPlaylist = response.data.find(pl => pl.playlistName === "Kedvencek");
        if (kedvencPlaylist) {
          setKedvenc(kedvencPlaylist);
        }

        const playlistId = id === "Kedvencek" && kedvenc.id ? kedvenc.id : id;
        const musicResponse = await api.get(`/GetMusicFromPlaylist?id=${playlistId}`);
        setPlaylist(musicResponse.data);
        
      } catch (e) {
        console.error("HIBA, Nem sikerült lekérni a lejátszási listát: ", e);
        navigate("/playlists")
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
      <Flex w={"100%"}>
    {isPending ? (
        <AbsoluteCenter>
          <Spinner />
        </AbsoluteCenter>
      ) : playlistName ?
      <Box
        w={"full"}
        alignItems={"left"}
        justifyContent={"center"}
        position={"relative"}
      >
        <Flex zIndex={"1"} bgGradient="to-tr" gradientFrom="colorPalette.solid/65" gradientTo="transparent" position={"absolute"} w={"full"} h={"190px"}></Flex>
        <Flex backgroundImage={`url(${playlist?.imageUrl})`} backgroundPosition={"center"} backgroundSize={"cover"} direction={"row"} p={"5"}>
          <Button
            zIndex={"2"}
            boxShadowColor={"colorPalette"}
            boxShadow={"0 0 25px 0"}
            backgroundImage={`url(${playlist?.imageUrl})`}
            boxSize={"150px"}
            variant={"outline"}
            borderRadius={"full"}
            backgroundSize={"cover"}
            backgroundPosition={"center"}
            fit={"cover"}
          />
          <Box zIndex={"2"} px={"5"} py={"5"}>
            <Text fontSize="sm">
              Lejátszási lista
            </Text>
            <Text fontSize="4xl" fontWeight="bold">
              {playlistName}
            </Text>
            <Text fontSize="sm">
            {playlist.length} zene
            </Text>
            <Text fontSize="md">
              <PlaylistEditMenu userId={userid} playlistName={playlistName} playlistId={id}/>
            </Text>
          </Box>
        </Flex>
        <hr/>
        <Flex px={"5"} pt={"3"} direction={"column"}>
          <Heading>Zenék</Heading>
          <Flex my={"3"} wrap={"wrap"} gap={4} width="100%">{playlist.map((music, index) => <MusicCard key={index} music={music} />)}</Flex>
        </Flex>
      </Box>: 
      ""}
    </Flex>
    </div>
  );
}
