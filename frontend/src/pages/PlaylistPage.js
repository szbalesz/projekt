import React, { useEffect, useState } from "react";
import MusicCard from "../MusicCard";
import { AbsoluteCenter, Box, Button, Center, Flex, Heading, Spinner, Text } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import api from "../Api";
import Cookies from "js-cookie";
import { LuEllipsis } from "react-icons/lu";
import PlaylistEditMenu from "../menu/PlaylistEditMenu";

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
        const response = await api.get("/GetPlaylistByUser?id="+userid);
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
        const musicResponse = await api.get(`/GetMusicFromPlaylist?id=${playlistId}`);
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
      <Flex w={"100%"}>
    {isPending ? (
        <AbsoluteCenter>
          <Spinner />
        </AbsoluteCenter>
      ) : playlist?
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
            <Text fontSize="md">
              <PlaylistEditMenu/>
            </Text>
          </Box>
        </Flex>
        <hr/>
        <Flex px={"5"} pt={"3"} direction={"column"}>
          <Heading>Zenék</Heading>
          <Flex my={"3"} overflowX={"auto"} gap={4} width="100%">{playlist.map((music, index) => <MusicCard key={index} music={music} />)}</Flex>
        </Flex>
      </Box>: 
      ""}
    </Flex>
      {/* <Flex display="block" justifyContent="center">
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
      </Flex> */}
    </div>
  );
}
