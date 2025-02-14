import React, { useEffect, useState } from 'react'
import { Avatar } from "../components/ui/avatar";
import { Button } from "../components/ui/button"
import {
  DrawerActionTrigger,
  DrawerBackdrop,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerRoot,
  DrawerTitle,
  DrawerTrigger,
} from "../components/ui/drawer"
import { Flex, Span, Theme } from '@chakra-ui/react'
import { LuPanelRightClose, LuUser } from "react-icons/lu";
import Cookies from "js-cookie";
import { Link } from 'react-router-dom';
import api from '../Api';

export default function MenuAvatar({ isLoggedIn, onLogout, profileMenuItems }) {
  const themecolor = localStorage.getItem("themecolor");
  const userid = Cookies.get("userid");
  const [account, setAccount] = useState({});
  useEffect(() => {
    api.get("/user/GetProfile?Id="+userid)
    .then(response=>{
      setAccount(response.data[0]);
    })
  }, [isLoggedIn])
  
  return (
      <DrawerRoot placement={{ base: "top", md: "end" }} size={{ base: "full", md: "xs" }}>
        <DrawerBackdrop />
        <DrawerTrigger variant="outline" position="absolute" p={0} w="45px" right="5" borderRadius="50%" asChild>
          <Avatar src={account?.profilePictureURL} h="95%" />
        </DrawerTrigger>
        <DrawerContent bg="Background" borderWidth={{ base: "0px" }} borderRightWidth="1px">
        <Theme display={"flex"} flexDirection={"column"} colorPalette={themecolor} bg={"Background"} h={"100%"}>
          <DrawerTrigger fontWeight="bold" borderRadius="5px" variant="outline" width="100%" height="50px" position="absolute" top="0" right="0">
            <Flex justifyContent="space-between" fontSize="md">
              <Span width="100%">Profil</Span>
              <Span w="10%" position="absolute" right="0" p="2px" color="#5eead4"><LuPanelRightClose /></Span>
            </Flex>
          </DrawerTrigger>
          <DrawerHeader p="5">
            <DrawerTitle>

            </DrawerTitle>
          </DrawerHeader>
          <DrawerHeader>
            <DrawerTitle>
              <Flex justifyContent="center" textAlign="center">
                {isLoggedIn ?
                  <div>
                    <Avatar width="50px" height="50px" src={account?.profilePictureURL} /><Flex p="3" color="colorPalette.solid">{account?.username}</Flex>
                  </div> :
                  <DrawerActionTrigger as="div">
                    <Link style={{ display: "flex", margin: "5px" }} onClick={onclose} to={"/login"}>
                      <Button
                        mx={"0"}
                        my={"0"}
                        justifyContent={"space-between"}
                        w={"100%"}
                        h="50px"
                      >
                        Bejelentkezés <LuUser />
                      </Button>
                    </Link>
                  </DrawerActionTrigger>
                }
              </Flex>
            </DrawerTitle>
          </DrawerHeader>
          <DrawerBody>
            {isLoggedIn? profileMenuItems.map((item, index) =>
              <DrawerActionTrigger as="div" key={index}>
                <Link style={{ display: "flex", margin: "5px" }} onClick={onclose} to={item.path}>
                  <Button
                    mx={"0"}
                    my={"0"}
                    justifyContent={"space-between"}
                    variant={"subtle"}
                    colorPalette="current"
                    w={"100%"}
                    h="50px"
                  >
                    {item.label} {item.icon}
                  </Button>
                </Link>
              </DrawerActionTrigger>
            ): ""}
          </DrawerBody>
          {isLoggedIn ? <DrawerFooter justifyContent="center">
            <Button variant="outline" onClick={() => onLogout()}>Kijelenkezés</Button>
          </DrawerFooter> : ""}
          </Theme>
        </DrawerContent>
      </DrawerRoot>
  )
}
