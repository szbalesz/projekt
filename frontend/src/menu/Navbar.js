import React from 'react'
import { Button, Flex, Image } from "@chakra-ui/react";
import logo from "../media/logo.png";
import MenuAvatar from './MenuAvatar';
import { Link } from 'react-router-dom';
import { LuList } from 'react-icons/lu';

export default function Navbar({themecolor, setIsSidebarOpen,profileMenuItems, isLoggedIn, onLogout}) {
  return (
    <>
    <Flex bg="Background" as="nav" h="50px" align="center" justify="space-between" borderBottomWidth="1px" color="white">
        <Button display={{base: "none", md:"flex"}} h="50px" fontSize="10px" rounded={"0"} colorPalette={"gray"} color={themecolor+".300"} variant={"surface"} bg="Background" w="50px" onClick={()=>setIsSidebarOpen(true)}>
              <Flex justifyContent="center"><LuList/></Flex>
        </Button>
        <Flex w="100%" p="0" textAlign="center" justifyContent="center">
              <Link to={"/"}>
              <Image
              transition="all 0.5s ease-in-out"
              _hover={{ transform: "scale(1.05)" }}
              src={logo}
              alt="logo"
              filter= "brightness(100%) saturate(0%) contrast(0%)"
              height= "65px"
              padding="0"
              />
              </Link>
        </Flex>
        <MenuAvatar themecolor={themecolor} isLoggedIn={isLoggedIn} profileMenuItems={profileMenuItems} onLogout={onLogout}/> 
    </Flex>
    </>
  )
}
