import React, { useEffect, useState } from "react";
import MusicCard from "../cards/MusicCard";
import { AbsoluteCenter, Box, Button, Flex, Heading, Spinner, Text } from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import PlaylistEditMenu from "../menu/PlaylistEditMenu";
import { Avatar } from "../components/ui/avatar";
import { toaster } from "../components/ui/toaster";
import { getPlaylist } from "../services/PlaylistService";
import { getToken } from "../services/AuthService";

export default function PlaylistPage() {
  const navigate = useNavigate();
  const token = getToken();
  let { id } = useParams();
  const [playlistId, setPlaylistId] = useState(id);
  const [isPending, setPending] = useState(false);
  const [musics, setMusics] = useState([]);
  const [playlist, setPlaylist] = useState([]);
  const [creator, setCreator] = useState({})

  const load = async () => {
    await setPending(true);
    const response = await getPlaylist(id,toaster,navigate);
    if(response == null){
      navigate(-1);
    }
    setPlaylistId(response?.playlistid);
    setPlaylist(response?.playlist);
    setMusics(response?.musics);
    setCreator(response?.creator);
    await setPending(false);
  }

  useEffect(() => {
    load();
  }, [id]);
  

  return (
    // Lejátszási lista oldal
    <div>
      <Flex w={"100%"}>
    {isPending ? (
        <AbsoluteCenter>
          <Spinner />
        </AbsoluteCenter>
      ) : playlist?.playlistName ?
      <Box
        w={"full"}
        alignItems={"left"}
        justifyContent={"center"}
        position={"relative"}
      >
        <Flex zIndex={"1"} bgGradient="to-tr" gradientFrom="colorPalette.solid/65" gradientTo="transparent" position={"absolute"} w={"full"} h={"190px"}></Flex>
        <Flex overflowX={"clip"} backgroundImage={`url(${playlist?.imageUrl})`} backgroundPosition={"center"} backgroundSize={"cover"} direction={"row"} p={"5"}>
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
          <Box zIndex={"2"} px={"5"} pt={"5"} color={"white"}>
            <Text fontSize="sm">
              Lejátszási lista
            </Text>
            <Text fontSize="4xl" fontWeight="bold">
              {playlist?.playlistName}
            </Text>
            <Text fontSize="sm">
            {musics?.length} zene
            </Text>
            <Flex fontSize="md" p={"0"}>
              <Button color={"white"} onClick={()=> {
                navigate("/user/"+playlist?.creatorId)
              }} mr={"1"} p={"0"} size={"xs"} variant={"ghost"}>
              <Avatar width="25px" height="25px" src={creator.profilePictureURL}/>
              {creator.username}
              </Button>
              {token ? 
              <PlaylistEditMenu playlist={playlist} playlistName={playlist?.playlistName} playlistId={playlistId} load={load}/> 
              : null}
            </Flex>
          </Box>
        </Flex>
        <hr/>
        <Flex px={"5"} pt={"3"} direction={"column"}>
          {musics?.length > 0 ? <Heading>Zenék</Heading> : <Heading>A lejátszási lista üres.</Heading>}
          <Flex my={"3"} wrap={"wrap"} gap={4} width="100%">{musics?.map((music, index) => <MusicCard key={index} music={music} />)}</Flex>
        </Flex>
      </Box>: 
      null}
    </Flex>
    </div>
  );
}
