import React from 'react'
import {
  Button,
    Flex,
  } from "@chakra-ui/react";
import logo from "../media/logo.png";
import MenuAvatar from './MenuAvatar';

export default function Navbar() {
  return (
    <>
    <Flex bg="Background" as="nav" h="50px" align="center" justify="space-between" p="3" borderBottomWidth="1px" color="white">
        <Flex marginLeft="25px" w="100%" p="0" textAlign="center" justifyContent="center">
            <Button variant="ghost" p="0" _hover={{backgroundColor: 'bg'}} _focus={{outline: "none"}}>
              <img
              src={logo}
              alt="logo"
              style={{
                  pointerEvents: "none",
                  height: "65px",
                  padding: "0px",
                  filter: "brightness(100%) saturate(0%) contrast(0%)",
              }}
              />
            </Button>
        </Flex>
        <MenuAvatar/>
    </Flex>
    </>
  )
}
