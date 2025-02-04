import React from 'react'
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

export default function MenuAvatar({ account, onLogout }) {

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
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </DrawerBody>
        <DrawerFooter justifyContent="center">
          <Button colorPalette="teal" variant="outline" onClick={()=> onLogout()}>Kijelenkezés</Button>
        </DrawerFooter>
      </DrawerContent>
    </DrawerRoot>
    </>
  )
}
