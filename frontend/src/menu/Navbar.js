import React from 'react'
import {  Flex, Image } from "@chakra-ui/react";
import logo from "../media/logo.png";
import MenuAvatar from './MenuAvatar';
import { Avatar } from "../components/ui/avatar";
import { Link } from 'react-router-dom';

export default function Navbar({account, isLoggedIn, onLogout}) {
  return (
    <>
    <Flex bg="Background" as="nav" h="50px" align="center" justify="space-between" p="3" borderBottomWidth="1px" color="white">
        <Flex marginLeft="25px" w="100%" p="0" textAlign="center" justifyContent="center">
              <Link to={"/"}>
              <Image
              src={logo}
              alt="logo"
              style={{
                  pointerEvents: "none",
                  height: "65px",
                  padding: "0px",
                  filter: "brightness(100%) saturate(0%) contrast(0%)",
              }}
              />
              </Link>
        </Flex>
        {isLoggedIn? 
        <MenuAvatar account={account} onLogout={onLogout}/> 
        : 
        <Link to={"/login"} style={{position: "absolute", p: "0", width: "45px", right:"15px"}}>
          <Avatar colorPalette="teal" />
        </Link>
        }
    </Flex>
    </>
  )
}
