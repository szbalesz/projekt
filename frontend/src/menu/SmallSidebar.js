import React from "react";
import { Button, Flex } from "@chakra-ui/react";
import { Link } from 'react-router-dom';

export default function SmallSidebar({ menuItems,selectedMenu, setIsSidebarOpen}) {
  const isMd = window.innerWidth >= 768; //ha kisméretű a kijelzője akkor csak 5 elemet jelenítsen meg 
  const maxItems = isMd ? 10 : 5;
  return (
    <>
    {/* Kis oldalsó menü / telefonos alsó menü */}
      <Flex direction={{ base: "row", md: "column" }} align="center" pt={{ base: "1", md: "0" }}>
        {menuItems.slice(0,maxItems).map((item, index) => (
          <Flex width={{base: "20%", md:"50px"}} p="0" m="0" key={index}>
              <Link style={{width: "100%"}} to={item.path} key={index}>
                <Button
                  h="50px"
                  fontSize="10px"
                  key={index}
                  transition="all 0.5s ease-in-out"
                  borderRadius={selectedMenu === item.label || item.label === "Keresés" ? "5rem" : "0"}
                  variant={selectedMenu === item.label ? "surface" : "ghost" && item.label === "Keresés" ? {base:"ghost",md:"subtle"} : "ghost" }
                  p={item.label === "Keresés" ? { base: "1", md: "0" } : 0}
                  my={item.label === "Keresés" ? { base: "0", md: "5" } : "0"}
                  display={{ base: "block", md: "flex" }}
                  w="100%"
                  onClick={()=>(item.label === "Menü"?  setIsSidebarOpen(true) : "")}
                >
                <Flex justifyContent="center">{item.icon}</Flex>
                <Flex justifyContent="center" display={{ base: "flex", md: "none" }}>{item.label}</Flex>
                </Button>
              </Link>
          </Flex>
        ))}
      </Flex>
    </>
  );
}
