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
import { Flex } from '@chakra-ui/react'
import { LuPanelRightClose, LuSpace} from "react-icons/lu";
import profilKep from "../media/azahriah.jpg";

export default function MenuAvatar() {

  return (
    <>
    <DrawerRoot placement={{ base: "top", md: "end" }} size={{ base: "full", md: "xs" }}>
      <DrawerBackdrop/> 
      <DrawerTrigger position="absolute" right="5" asChild >
        <Button variant="outline" p="0" borderRadius="50%">
            <Avatar src={profilKep} h="95%" colorPalette="teal" />
        </Button>
      </DrawerTrigger>
      <DrawerContent bg="Background" borderWidth={{base: "0px"}} borderRightWidth="1px">
      <DrawerTrigger width="100%" variant="outline" position="absolute" top="0" right="0">
          <Button justifyContent="right" variant="outline" width="100%" height="50px">
          <Flex paddingLeft="25px" justifyContent="center" w="100%" fontSize="md">Profil</Flex> <LuPanelRightClose/>
          </Button>
        </DrawerTrigger>
        <DrawerHeader p="5">
            <DrawerTitle>
              
            </DrawerTitle>
        </DrawerHeader>
        <DrawerHeader>
          <DrawerTitle>
          <Flex justifyContent="center" textAlign="center">
          <Avatar width="50px" height="50px" src={profilKep}/><Flex p="3">TomeeL9</Flex>
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
          <Button colorPalette="teal" variant="outline">Kijelenkezés</Button>
        </DrawerFooter>
      </DrawerContent>
    </DrawerRoot>
    </>
  )
}
