import React, { useState } from 'react'
import { Avatar } from "../components/ui/avatar";
import { Button } from "../components/ui/button"
import {
  DrawerBackdrop,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerRoot,
  DrawerTitle,
  DrawerTrigger,
} from "../components/ui/drawer"
import { Flex, Span } from '@chakra-ui/react'
import { LuPanelRightClose } from "react-icons/lu";
import Cookies from "js-cookie";
import { Link } from 'react-router-dom';

export default function  MenuAvatar({ onLogout, profileMenuItems }) {
  const token = Cookies.get("token");
  const [account, setAccount] = useState({});
  return (
    <>
    <DrawerRoot placement={{ base: "top", md: "end" }} size={{ base: "full", md: "xs" }}>
      <DrawerBackdrop/> 
      <DrawerTrigger variant="outline" position="absolute" p={0} w="45px" right="5" borderRadius="50%" asChild>
            <Avatar src={account.profilkep} h="95%" colorPalette="teal" />
      </DrawerTrigger>
      <DrawerContent bg="Background" borderWidth={{base: "0px"}} borderRightWidth="1px">
      <DrawerTrigger fontWeight="bold" borderRadius="5px" variant="outline" width="100%" height="50px" position="absolute" top="0" right="0">
          <Flex justifyContent="space-between" fontSize="md">
          <Span width="100%">Profil</Span> 
          <Span w="10%" position="absolute" right="0" p="2px" color="#5eead4"><LuPanelRightClose/></Span>
          </Flex>
        </DrawerTrigger>
        <DrawerHeader p="5">
            <DrawerTitle>
              
            </DrawerTitle>
        </DrawerHeader>
        <DrawerHeader>
          <DrawerTitle>
          <Flex justifyContent="center" textAlign="center">
          <Avatar width="50px" height="50px" src={account?.profilkep}/><Flex p="3" color="#5eead4">{account?.userName}</Flex>
          </Flex>
          </DrawerTitle>
        </DrawerHeader>
        <DrawerBody>
        {profileMenuItems.map((item, index) => item.label !== "Menü" ? (
                <Link style={{display: "flex" , margin:"5px"}} onClick={onclose} to={item.path} key={index}>
                <Button
                  key={index}
                  mx={item.label === "Keresés" ? "auto" : "0"}
                  my={item.label === "Keresés" ? "5" : "0"}
                  justifyContent={{ base: "center", md: "space-between" }}
                  variant={"subtle"}
                  colorPalette={"teal"}
                  w={"100%"}
                  h="50px"

                >
                 {item.label} {item.icon}
                </Button>
                </Link>
              ) : "" )}
        </DrawerBody>
        <DrawerFooter justifyContent="center">
          <Button colorPalette="teal" variant="outline" onClick={()=> onLogout()}>Kijelenkezés</Button>
        </DrawerFooter>
      </DrawerContent>
    </DrawerRoot>
    </>
  )
}
