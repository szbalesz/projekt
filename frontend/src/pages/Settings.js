import React from 'react'
import { Button, Center, Flex, Heading, Text } from '@chakra-ui/react'
import { useColorMode } from '../components/ui/color-mode';
import { LuMoon, LuPencil, LuSun } from 'react-icons/lu';
import { Link } from 'react-router-dom';

export default function Settings() {
  const { colorMode, setColorMode } = useColorMode();
  return (
      <Center padding={"25px"} height={"100%"}>
        <Flex width={"3xl"} direction={"column"}>
          <Heading py={"3"} size={"3xl"}>Beállítások</Heading>
          <hr/>
          <Heading py={"3"} size={"1xl"}>Fiók</Heading>
          <Flex pb={"3"} direction={"row"} justifyContent={"space-between"}>
            <Text pt={"2"}>Személyes adatok módosítása</Text>
            <Link to={"/settings/profile"}><Button size={"sm"}  variant={"surface"}>Módosítás <LuPencil/></Button></Link>
          </Flex>
          <hr/>
          <Heading py={"3"} size={"1xl"}>Megjelenítés</Heading>
          <Flex pb={"3"} direction={"row"}>
            <Button onClick={() => setColorMode("dark")}  variant={colorMode === "dark" ? "surface" : "outline"}><LuMoon /> <Text p={2}>Sötét</Text></Button>
            <Button onClick={() => setColorMode("light")} mx={2} variant={colorMode === "light" ? "surface" : "outline"} ><LuSun /> <Text p={2}>Világos</Text></Button>
          </Flex>
        </Flex>
      </Center> 
  )
}
