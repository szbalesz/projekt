import { Flex } from '@chakra-ui/react';
import React from 'react';
import BigMusicCard from '../BigMusicCard';

export default function Home() {
  const zenek = [
    {
      guid: "undefined",
      cim: "Walkin' a Street",
      eloado: "DESH",
      kep: "https://cdn-images.dzcdn.net/images/cover/a88e0be2f94ae3ff617e035c52f4da45/0x1900-000000-80-0-0.jpg",
    },
    {
      guid: "undefined",
      cim: "Cipoe",
      eloado: "Azahriah",
      kep: "https://assets.4cdn.hu/kraken/7y0I8C0R5WmQ1AamOs.jpeg",
    },
    {
      guid: "undefined",
      cim: "Kukásautó",
      eloado: "DESH",
      kep: "https://pcpult.hu/galeria/2023/11/30/JOY-Desh_.jpg",
    },
  ];

  return (
    <>
      <Flex justifyContent="center">
        <Flex
          justifyContent="center"
          wrap="wrap"
          gap={6}
          padding={4}
        >
          {zenek.map((zene, index) => (
              <BigMusicCard key={index} zene={zene}/>
          ))}
        </Flex>
      </Flex>
    </>
  );
}
