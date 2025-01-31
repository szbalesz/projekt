import React from 'react'
import { Button, Flex, Text } from '@chakra-ui/react'
import { useColorMode } from '../components/ui/color-mode';
import { LuMoon, LuSun } from 'react-icons/lu';

export default function Settings() {
  const { colorMode, setColorMode } = useColorMode();
  return (
    <>
      <Flex  h="100%" display="block" textAlign="center" justifyContent="center">
        {/* <Text fontSize={25} color={"gray"}>Beállítások</Text>*/}
        <Text p="3">Alkalmazás témája</Text>
        <Button onClick={() => setColorMode("dark")} colorPalette={colorMode === "dark" ? "teal" : ""} variant={colorMode === "dark" ? "surface" : "outline"}><LuMoon/> <Text p={2}>Sötét</Text></Button>
        <Button onClick={() => setColorMode("light")} m={2} colorPalette={colorMode === "light" ? "teal" : ""} variant={colorMode === "light" ? "surface" : "outline"} ><LuSun/> <Text p={2}>Világos</Text></Button>
      </Flex>
    </>
  )
}
