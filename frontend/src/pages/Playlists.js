import React from 'react'
import { Heading, Flex, Center } from "@chakra-ui/react";
import MusicCard from '../MusicCard';

export default function Playlists() {
  const playlists = [
    {
      title: "Kedvencek",
      image: "https://m.blog.hu/re/recorder/image/filmrecorder/pogany_indulo.jpg",
    },
    {
      title: "Népszerű",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-azGumwf0E5jNxZvPtFYzHxKB_I5hzBtdaw&s",
    },
  ];
  
  return (
    <>
      <Flex display="block" justifyContent="center">
        <Heading textAlign="center"> Lejátszási listák </Heading>
        <Center>
          <Flex wrap="wrap" justify="center" gap={4} width="100%">
            {playlists.map((playlist, index) => (
              <MusicCard key={index} result={playlist} />
            ))}
          </Flex>
        </Center>
      </Flex>
    </>
  );
}
