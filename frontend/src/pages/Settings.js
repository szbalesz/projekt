import React from 'react'
import { Button, Center, Flex, Heading, Text } from '@chakra-ui/react'
import { useColorMode } from '../components/ui/color-mode';
import { LuMoon, LuPencil, LuSun } from 'react-icons/lu';
import { Link } from 'react-router-dom';
import { getToken } from '../services/AuthService';

export default function Settings({setThemecolor}) {
  const { colorMode, setColorMode } = useColorMode();
  const token = getToken();
  // Témák
  const themes = [
    {
      title: "Fehér",
      value: "gray"
    },
    {
      title: "Piros",
      value: "red"
    },
    {
      title: "Zöld",
      value: "green"
    },
    {
      title: "Kék",
      value: "blue"
    },
    {
      title: "Kékeszöld",
      value: "teal"
    },
    {
      title: "Rózsaszín",
      value: "pink"
    },
    {
      title: "Lila",
      value: "purple"
    },
    {
      title: "Ciánkék",
      value: "cyan"
    } 
  ]
  return (
    // Beállítások
      <Center padding={"25px"} height={"100%"}>
        <Flex width={"3xl"} direction={"column"}>
          <Heading py={"3"} size={"3xl"}>Beállítások</Heading>
          <hr/>
          {token? <>
          <Heading py={"3"} size={"1xl"}>Fiók</Heading>
          <Flex pb={"3"} direction={"row"} justifyContent={"space-between"}>
            <Text pt={"2"}>Személyes adatok módosítása</Text>
            <Link to={"/settings/profile"}><Button size={"sm"}  variant={"surface"}>Módosítás <LuPencil/></Button></Link>
          </Flex>
          <hr/>
          </> : null }
          <Heading py={"3"} size={"1xl"}>Megjelenítés</Heading>
          <Flex pb={"3"} direction={"row"}>
            <Button onClick={() => setColorMode("dark")}  variant={colorMode === "dark" ? "surface" : "outline"}><LuMoon /> <Text p={2}>Sötét</Text></Button>
            <Button onClick={() => setColorMode("light")} mx={2} variant={colorMode === "light" ? "surface" : "outline"} ><LuSun /> <Text p={2}>Világos</Text></Button>
          </Flex>
          <hr/>
          <Heading py={"3"} size={"1xl"}>Téma</Heading>
          <Flex wrap={"wrap"} pb={"3"} direction={"row"}>
            {/* Téma választás */}
            {themes.map((theme,index) => <Button onClick={()=> setThemecolor(theme.value)} key={index} colorPalette={theme.value} variant={"surface"} m={"1"}>{theme.title}</Button>)}
          </Flex>
        </Flex>
      </Center> 
  )
}
