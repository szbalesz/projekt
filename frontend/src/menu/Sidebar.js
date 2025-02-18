import React, { useState } from "react";
import { LuPanelBottomClose } from "react-icons/lu";
import {
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerRoot,
  DrawerTitle,
  DrawerBackdrop
} from "../components/ui/drawer";
import { Button , Flex, Theme } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function Sidebar({menuItems,selectedMenu,setIsSidebarOpen}) {
  const themecolor = localStorage.getItem("themecolor");
  const [open,setOpen] = useState(true);

  const onClose=()=>{
    setOpen(false);
    setTimeout(() => {
      setIsSidebarOpen(false);
    }, 350);
  }

  return (
    <>
        <DrawerRoot open={open} onOpenChange={onClose} placement={{ base: "bottom", md: "start" }} size={{ base: "full", md: "xs" }}>
        <DrawerBackdrop/> 
        <DrawerContent bg="Background" borderWidth={{ base: "0px", md: "0px" }} borderTopWidth="0"  width={{ base: "100%", md: "225px" }}>
        <Theme display={"flex"} flexDirection={"column"} colorPalette={themecolor} bg={"Background"} h={"100%"}>
          <DrawerTitle textAlign="center">
            <Button top="0px" left="0px" width="100%" position="absolute" cursor="pointer" onClick={onClose} fontSize="md" justifyContent="space-between" height="50px" variant="outline">
            Menü <LuPanelBottomClose />
            </Button>
          </DrawerTitle>
          <DrawerHeader borderBottomWidth="1px" p="24.5px">

          </DrawerHeader>
          <DrawerBody p="0" onClick={onClose}>
              {menuItems.map((item, index) => item.label !== "Menü" ? (
                <Link style={{display: "flex"}} onClick={onclose} to={item.path} key={index}>
                <Button
                  key={index}
                  mx={item.label === "Keresés" ? "auto" : "0"}
                  my={item.label === "Keresés" ? "5" : "0"}
                  justifyContent={{ base: "center", md: "space-between" }}
                  variant={selectedMenu === item.label ? "surface" : (item.label === "Keresés" ? "subtle":"ghost")}
                  w={item.label === "Keresés" ? "50%" : "100%"}
                  h="50px"
                >
                 {item.label} {item.icon}
                </Button>
                </Link>
              ) : "" )}
          </DrawerBody>
          <DrawerFooter p="0" w="100%">
          <Flex w="100%" direction="column">
            <Button onClick={onClose} fontSize="md" justifyContent="space-between" display={{base: "flex", md:"none"}} width="100%" height="50px" variant="outline">
              <LuPanelBottomClose/> Bezárás <LuPanelBottomClose/>
            </Button>
          </Flex>
          </DrawerFooter>
          </Theme>
        </DrawerContent>
      </DrawerRoot>
    </>
  )
} 
