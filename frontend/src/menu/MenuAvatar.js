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
import { Flex, Span, Text, Theme } from '@chakra-ui/react'
import { LuPanelRightClose, LuUser } from "react-icons/lu";
import Cookies from "js-cookie";
import { Link } from 'react-router-dom';
import api from '../services/Api';
import { onLogout } from '../services/AuthService';

export default function MenuAvatar({themecolor, setIsLoggedIn, isLoggedIn, profileMenuItems }) {
  const userid = Cookies.get("userid");
  const [account, setAccount] = useState({});
  useEffect(() => {
    api.get("/user/"+userid)
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
          <DrawerTrigger as={"div"} fontWeight="bold" borderRadius="5px" variant="outline" width="100%" position="absolute" top="0" right="0">
            <Button w="100%" variant="outline" justifyContent="space-between" fontSize="md" height="50px">
              <Span width="100%">Profil</Span>
              <Span w="10%" position="absolute" right="0" p="2px" color="colorPalette.solid"><LuPanelRightClose /></Span>
            </Button>
          </DrawerTrigger>
          <DrawerHeader p="5">
            <DrawerTitle>

            </DrawerTitle>
          </DrawerHeader>
          <DrawerHeader>
            <DrawerTitle>
              <Flex justifyContent="center" textAlign="center">
                {isLoggedIn ?
                  <Flex direction={"column"}>
                      <Avatar mx={"auto"} boxShadow={`0 0 20px 0 ${themecolor}`} width="125px" height="125px" src={account?.profilePictureURL} /><Flex p="3" color="colorPalette.solid">
                      <Text pt={"2"} mx={"auto"} fontSize={"2xl"} color="bg.inverted">{account?.username}</Text>
                      </Flex>
                  </Flex> :
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
            <Button variant="outline" onClick={() => onLogout(setIsLoggedIn)}>Kijelenkezés</Button>
          </DrawerFooter> : ""}
          </Theme>
        </DrawerContent>
      </DrawerRoot>
  )
}
